import express from "express";
import {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventory.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllInventory);
router.get("/:id", getInventoryById);
router.post("/", authorize("ceo", "ict-manager"), createInventory);
router.put("/:id", authorize("ceo", "ict-manager"), updateInventory);
router.delete("/:id", authorize("ceo", "ict-manager"), deleteInventory);

export default router;
