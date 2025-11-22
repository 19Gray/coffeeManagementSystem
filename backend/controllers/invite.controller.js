import Invite from "../models/invite.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";
import { sendInviteEmail } from "../utils/emailService.js";
import jwt from "jsonwebtoken";
import { logAudit } from "../utils/auditLogger.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Create Staff Invite (CEO/ICT Manager only)
export const createInvite = asyncHandler(async (req, res, next) => {
  const { email, role } = req.body;

  console.log("[v0] Invite creation attempt:", {
    email,
    role,
    invitedBy: req.user.email,
  });

  if (!email || !role) {
    return next(new AppError("Email and role are required", 400));
  }

  // Validate role
  const allowedRoles = [
    "ict-manager",
    "operations-manager",
    "agronomist",
    "supervisor",
  ];
  if (!allowedRoles.includes(role)) {
    return next(new AppError("Invalid role for invitation", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User with this email already exists", 400));
  }

  // Check if pending invite exists
  const existingInvite = await Invite.findOne({ email, status: "pending" });
  if (existingInvite) {
    return next(
      new AppError("Pending invite already exists for this email", 400)
    );
  }

  // Generate unique token
  const token = crypto.randomBytes(32).toString("hex");

  // Create invite
  const invite = await Invite.create({
    email,
    organization: req.user.organization,
    role,
    invitedBy: req.user._id,
    token,
    status: "pending",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // Send invite email
  try {
    await sendInviteEmail(email, token, role, req.user.name);
    console.log("[v0] Invite email sent to:", email);

    // Log audit
    await logAudit({
      user: req.user._id,
      organization: req.user.organization,
      action: "CREATE_INVITE",
      resource: "Invite",
      resourceId: invite._id,
      details: { email, role },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({
      success: true,
      message: "Invite sent successfully",
      invite: {
        id: invite._id,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt,
      },
    });
  } catch (error) {
    await Invite.deleteOne({ _id: invite._id });
    console.error("[v0] Failed to send invite email:", error.message);
    return next(
      new AppError("Failed to send invite email. Please try again.", 500)
    );
  }
});

// Get All Invites
export const getInvites = asyncHandler(async (req, res, next) => {
  const invites = await Invite.find({ organization: req.user.organization })
    .populate("invitedBy", "name email")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: invites.length,
    invites,
  });
});

// Accept Invite and Set Password
export const acceptInvite = asyncHandler(async (req, res, next) => {
  const { token, password, fullName } = req.body;

  if (!token || !password || !fullName) {
    return next(
      new AppError("Token, password, and full name are required", 400)
    );
  }

  // Find invite
  const invite = await Invite.findOne({
    token,
    status: "pending",
    expiresAt: { $gt: Date.now() },
  }).populate("organization", "name");

  if (!invite) {
    return next(new AppError("Invalid or expired invite", 400));
  }

  // Create user
  const user = await User.create({
    name: fullName,
    email: invite.email,
    password,
    role: invite.role,
    organization: invite.organization._id,
    isVerified: true, // Auto-verify invited users
    status: "active",
  });

  // Update invite status
  invite.status = "accepted";
  await invite.save();

  // Generate auth token
  const authToken = generateToken(user._id);

  console.log("[v0] Invite accepted and user created:", user.email);

  res.status(201).json({
    success: true,
    message: `Welcome to ${invite.organization.name}!`,
    token: authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: invite.organization.name,
    },
  });
});

// Cancel/Delete Invite
export const deleteInvite = asyncHandler(async (req, res, next) => {
  const invite = await Invite.findById(req.params.id);

  if (!invite) {
    return next(new AppError("Invite not found", 404));
  }

  if (invite.organization.toString() !== req.user.organization.toString()) {
    return next(new AppError("Not authorized", 403));
  }

  await invite.deleteOne();

  // Log audit
  await logAudit({
    user: req.user._id,
    organization: req.user.organization,
    action: "DELETE_INVITE",
    resource: "Invite",
    resourceId: invite._id,
    details: { email: invite.email },
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(200).json({
    success: true,
    message: "Invite deleted successfully",
  });
});
