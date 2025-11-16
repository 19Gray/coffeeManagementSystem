import express from "express";
import {
  generateSignupCode,
  verifySignupCode,
  getSignupCodes,
} from "../controllers/signupCode.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/verify", verifySignupCode);
router.post("/generate", protect, generateSignupCode);
router.get("/", protect, getSignupCodes);

export default router;
