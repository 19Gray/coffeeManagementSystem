import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post(
  "/",
  authorize("ceo", "operations-manager", "supervisor"),
  createTask
);
router.put(
  "/:id",
  authorize("ceo", "operations-manager", "supervisor"),
  updateTask
);
router.delete("/:id", authorize("ceo", "operations-manager"), deleteTask);

export default router;
