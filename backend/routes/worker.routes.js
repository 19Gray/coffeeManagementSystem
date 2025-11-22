import express from "express";
import {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
} from "../controllers/worker.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

// Supervisors, Agronomists, and higher roles can manage workers
router.post(
  "/",
  authorize(
    "supervisor",
    "agronomist",
    "operations-manager",
    "ict-manager",
    "ceo"
  ),
  createWorker
);
router.get(
  "/",
  authorize(
    "supervisor",
    "agronomist",
    "operations-manager",
    "ict-manager",
    "ceo"
  ),
  getWorkers
);
router.get(
  "/:id",
  authorize(
    "supervisor",
    "agronomist",
    "operations-manager",
    "ict-manager",
    "ceo"
  ),
  getWorkerById
);
router.put(
  "/:id",
  authorize(
    "supervisor",
    "agronomist",
    "operations-manager",
    "ict-manager",
    "ceo"
  ),
  updateWorker
);
router.delete(
  "/:id",
  authorize("supervisor", "operations-manager", "ict-manager", "ceo"),
  deleteWorker
);

export default router;
