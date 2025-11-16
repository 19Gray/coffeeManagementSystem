import SignupCode from "../models/signupCode.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// Only ICT Manager and CEO can generate signup codes
export const generateSignupCode = asyncHandler(async (req, res, next) => {
  const { role } = req.body;

  if (!role || !["agronomist", "supervisor"].includes(role)) {
    return next(
      new AppError("Invalid role. Must be agronomist or supervisor", 400)
    );
  }

  // Verify user is ICT Manager or CEO
  if (!["ict-manager", "ceo"].includes(req.user.role)) {
    return next(
      new AppError("Only ICT Manager and CEO can generate signup codes", 403)
    );
  }

  // Generate unique code
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const signupCode = await SignupCode.create({
    code,
    role,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: signupCode,
    message: `Signup code generated: ${code}`,
  });
});

// Verify signup code before registration
export const verifySignupCode = asyncHandler(async (req, res, next) => {
  const { code, role } = req.body;

  if (!code) {
    // Farmers don't need a code
    if (role === "farm-worker") {
      return res.status(200).json({
        success: true,
        data: { valid: true, role: "farm-worker" },
        message: "Farm workers can signup without a code",
      });
    }

    return next(new AppError("Signup code is required for this role", 400));
  }

  const signupCode = await SignupCode.findOne({ code: code.toUpperCase() });

  if (!signupCode) {
    return next(new AppError("Invalid signup code", 400));
  }

  if (signupCode.isUsed) {
    return next(new AppError("Signup code has already been used", 400));
  }

  if (new Date() > signupCode.expiresAt) {
    return next(new AppError("Signup code has expired", 400));
  }

  if (signupCode.role !== role) {
    return next(
      new AppError(`This code is for ${signupCode.role} role only`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: { valid: true, role: signupCode.role, codeId: signupCode._id },
    message: "Signup code is valid",
  });
});

// Get all signup codes (for ICT Manager/CEO dashboard)
export const getSignupCodes = asyncHandler(async (req, res, next) => {
  if (!["ict-manager", "ceo"].includes(req.user.role)) {
    return next(
      new AppError("Only ICT Manager and CEO can view signup codes", 403)
    );
  }

  const codes = await SignupCode.find({ createdBy: req.user.id }).populate(
    "usedBy",
    "name email"
  );

  res.status(200).json({
    success: true,
    data: codes,
  });
});
