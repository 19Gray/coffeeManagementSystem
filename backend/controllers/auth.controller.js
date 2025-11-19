import User from "../models/user.model.js";
import SignupCode from "../models/signupCode.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailService.js";
import {
  generateVerificationToken,
  generateResetToken,
  hashToken,
} from "../utils/tokenUtils.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phone, signupCode } = req.body;

  console.log("[v0] Register attempt with:", { name, email, role, phone });

  if (!name || !email || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  // Check if user already exists (including pending verification)
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already registered", 400));
  }

  // Validate role-based signup rules
  if (["agronomist", "supervisor"].includes(role)) {
    if (!signupCode) {
      return next(
        new AppError(`Signup code required for ${role} registration`, 400)
      );
    }

    const code = await SignupCode.findOne({ code: signupCode.toUpperCase() });
    if (
      !code ||
      code.isUsed ||
      new Date() > code.expiresAt ||
      code.role !== role
    ) {
      return next(new AppError("Invalid or expired signup code", 400));
    }

    code.isUsed = true;
    await code.save();
  } else if (!["farm-worker"].includes(role)) {
    if (["ict-manager", "ceo"].includes(role)) {
      return next(
        new AppError("ICT Managers and CEOs cannot self-register", 403)
      );
    }
  }

  const verificationToken = generateVerificationToken();
  const hashedToken = hashToken(verificationToken);

  let signupData;
  try {
    signupData = await User.create({
      name,
      email,
      password,
      role: role || "farm-worker",
      phone: phone || "",
      verificationToken: hashedToken,
      verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isVerified: false, // User is not verified yet
    });
    console.log("[v0] Signup data stored for:", email);
  } catch (createError) {
    console.error("[v0] Signup data storage failed:", createError.message);
    return next(
      new AppError(`Registration failed: ${createError.message}`, 400)
    );
  }

  // Send verification email
  try {
    await sendVerificationEmail(email, verificationToken);
    console.log("[v0] Verification email sent to:", email);
  } catch (error) {
    console.error("[v0] Failed to send verification email:", error.message);
    // Delete the signup record if email fails
    await User.deleteOne({ _id: signupData._id });
    return next(
      new AppError("Failed to send verification email. Please try again.", 500)
    );
  }

  res.status(201).json({
    success: true,
    message: "Signup successful! Check your email to verify your account.",
    email: email,
    verificationSent: true,
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new AppError("Verification token is required", 400));
  }

  const hashedToken = hashToken(token);
  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired verification token", 400));
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiry = null;
  await user.save();

  console.log("[v0] User verified successfully:", user.email);

  const authToken = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Email verified successfully! You can now login.",
    token: authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!user.isVerified) {
    return next(
      new AppError("Please verify your email before logging in", 403)
    );
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide your email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const resetToken = generateResetToken();
  const hashedToken = hashToken(resetToken);

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  try {
    await sendPasswordResetEmail(user.email, resetToken);
  } catch (error) {
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();
    return next(new AppError("Failed to send password reset email", 500));
  }

  res.status(200).json({
    success: true,
    message: "Password reset email sent",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return next(new AppError("Token and password are required", 400));
  }

  const hashedToken = hashToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired reset token", 400));
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;
  await user.save();

  const authToken = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
    token: authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
});
