import User from "../models/user.model.js";
import SignupCode from "../models/signupCode.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailService.js";
import { generateResetToken, hashToken } from "../utils/tokenUtils.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const generateOTP = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phone, signupCode } = req.body;

  console.log("[v0] Register attempt with:", { name, email, role, phone });

  if (!name || !email || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already registered", 400));
  }

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

  const isEmailConfigured =
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD &&
    process.env.EMAIL_PASSWORD !== "your-actual-google-app-password";

  if (!isEmailConfigured) {
    return next(
      new AppError(
        "Email service is not configured. Please contact the administrator.",
        500
      )
    );
  }

  const otp = generateOTP();
  const hashedOTP = hashToken(otp);

  let signupData;
  try {
    signupData = await User.create({
      name,
      email,
      password,
      role: role || "farm-worker",
      phone: phone || "",
      verificationOTP: hashedOTP,
      verificationTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      isVerified: false,
    });
    console.log("[v0] Signup data stored for:", email);
  } catch (createError) {
    console.error("[v0] Signup data storage failed:", createError.message);
    return next(
      new AppError(`Registration failed: ${createError.message}`, 400)
    );
  }

  try {
    await sendVerificationEmail(email, otp, name);
    console.log("[v0] Verification OTP sent to:", email);

    res.status(201).json({
      success: true,
      message: "Signup successful! Check your email for the verification code.",
      email: email,
      verificationSent: true,
    });
  } catch (error) {
    console.error("[v0] Failed to send verification email:", error.message);
    await User.deleteOne({ _id: signupData._id });
    return next(
      new AppError("Failed to send verification email. Please try again.", 500)
    );
  }
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  const hashedOTP = hashToken(otp);
  const user = await User.findOne({
    email: email.toLowerCase(),
    verificationOTP: hashedOTP,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired OTP", 400));
  }

  user.isVerified = true;
  user.verificationOTP = null;
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
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

export const resendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("Email already verified", 400));
  }

  const otp = generateOTP();
  const hashedOTP = hashToken(otp);

  user.verificationOTP = hashedOTP;
  user.verificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  try {
    await sendVerificationEmail(email, otp, user.name);
    console.log("[v0] Verification OTP resent to:", email);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.error("[v0] Failed to resend verification email:", error.message);
    return next(
      new AppError("Failed to send verification email. Please try again.", 500)
    );
  }
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
