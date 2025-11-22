import express from "express";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
} from "../controllers/organization.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route for organization creation
router.post("/create", createOrganization);

// Protected routes
router.use(protect);
router.get("/", getOrganization);
router.put("/", authorize("ceo"), updateOrganization);

export default router;
