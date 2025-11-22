import Organization from "../models/organization.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/emailService.js";
import { hashToken } from "../utils/tokenUtils.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const generateOTP = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

// CEO/Owner Registration - Public
export const createOrganization = asyncHandler(async (req, res, next) => {
  const { organizationName, fullName, workEmail, password } = req.body;

  console.log("[v0] Organization creation attempt:", {
    organizationName,
    fullName,
    workEmail,
  });

  if (!organizationName || !fullName || !workEmail || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  // Check if organization already exists
  const orgExists = await Organization.findOne({ name: organizationName });
  if (orgExists) {
    return next(new AppError("Organization name already taken", 400));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email: workEmail });
  if (userExists) {
    return next(new AppError("Email already registered", 400));
  }

  // Generate OTP for email verification
  const otp = generateOTP();
  const hashedOTP = hashToken(otp);

  // Create organization first (without owner reference)
  const organization = await Organization.create({
    name: organizationName,
    ownerEmail: workEmail,
    owner: null, // Will be updated after user creation
    status: "active",
  });

  // Create CEO user
  const user = await User.create({
    name: fullName,
    email: workEmail,
    password,
    role: "ceo",
    organization: organization._id,
    isVerified: false,
    verificationOTP: hashedOTP,
    verificationTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    status: "active",
  });

  // Update organization with owner reference
  organization.owner = user._id;
  await organization.save();

  // Send verification email
  try {
    await sendVerificationEmail(workEmail, otp, fullName);
    console.log(
      "[v0] Organization created and verification email sent to:",
      workEmail
    );

    res.status(201).json({
      success: true,
      message:
        "Organization created successfully! Check your email for verification code.",
      email: workEmail,
      organizationId: organization._id,
    });
  } catch (error) {
    // Rollback: delete user and organization if email fails
    await User.deleteOne({ _id: user._id });
    await Organization.deleteOne({ _id: organization._id });
    console.error("[v0] Failed to send verification email:", error.message);
    return next(
      new AppError("Failed to send verification email. Please try again.", 500)
    );
  }
});

// Get Organization Details
export const getOrganization = asyncHandler(async (req, res, next) => {
  const organization = await Organization.findById(
    req.user.organization
  ).populate("owner", "name email");

  if (!organization) {
    return next(new AppError("Organization not found", 404));
  }

  res.status(200).json({
    success: true,
    organization,
  });
});

// Update Organization Settings
export const updateOrganization = asyncHandler(async (req, res, next) => {
  const { name, settings } = req.body;

  // Only CEO can update organization
  if (req.user.role !== "ceo") {
    return next(
      new AppError("Only organization owner can update settings", 403)
    );
  }

  const organization = await Organization.findById(req.user.organization);

  if (!organization) {
    return next(new AppError("Organization not found", 404));
  }

  if (name) organization.name = name;
  if (settings)
    organization.settings = { ...organization.settings, ...settings };

  await organization.save();

  res.status(200).json({
    success: true,
    organization,
  });
});
