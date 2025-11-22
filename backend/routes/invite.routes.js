import express from "express";
import {
  createInvite,
  getInvites,
  acceptInvite,
  deleteInvite,
} from "../controllers/invite.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route for accepting invites
router.post("/accept", acceptInvite);

// Protected routes - only CEO and ICT Manager can manage invites
router.use(protect);
router.use(authorize("ceo", "ict-manager"));

router.post("/", createInvite);
router.get("/", getInvites);
router.delete("/:id", deleteInvite);

export default router;
