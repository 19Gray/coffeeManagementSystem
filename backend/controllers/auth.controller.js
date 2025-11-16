import User from "../models/user.model.js";
import SignupCode from "../models/signupCode.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phone, signupCode, codeId } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exists", 400));
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

    // Mark code as used
    code.isUsed = true;
    code.usedBy = req.body.userId; // Will be set after user creation
    await code.save();
  } else if (role === "farm-worker") {
    // Farm workers can signup without code
  } else if (["ict-manager", "ceo"].includes(role)) {
    return next(
      new AppError("ICT Managers and CEOs cannot self-register", 403)
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "farm-worker",
    phone,
  });

  // Update code with usedBy
  if (signupCode) {
    await SignupCode.updateOne(
      { code: signupCode.toUpperCase() },
      { usedBy: user._id }
    );
  }

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
