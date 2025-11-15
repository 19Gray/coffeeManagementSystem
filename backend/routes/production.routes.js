import express from "express";
import {
  getAllProduction,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction,
} from "../controllers/production.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllProduction);
router.get("/:id", getProductionById);
router.post("/", authorize("ceo", "agronomist"), createProduction);
router.put("/:id", authorize("ceo", "agronomist"), updateProduction);
router.delete("/:id", authorize("ceo", "ict-manager"), deleteProduction);

export default router;
