import express from "express";
import AuditLog from "../models/auditLog.model.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.use(protect);
router.use(authorize("ceo", "ict-manager"));

// Get audit logs for the organization
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 50, action, resource } = req.query;

    const query = { organization: req.user.organization };

    if (action) query.action = action;
    if (resource) query.resource = resource;

    const logs = await AuditLog.find(query)
      .populate("user", "name email role")
      .sort("-createdAt")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      logs,
    });
  })
);

export default router;
