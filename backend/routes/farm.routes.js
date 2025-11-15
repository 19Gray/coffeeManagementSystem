import express from "express";
import {
  getAllFarms,
  getFarmById,
  createFarm,
  updateFarm,
  deleteFarm,
} from "../controllers/farm.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllFarms);
router.get("/:id", getFarmById);
router.post("/", authorize("ceo", "operations-manager"), createFarm);
router.put("/:id", authorize("ceo", "operations-manager"), updateFarm);
router.delete("/:id", authorize("ceo", "ict-manager"), deleteFarm);

export default router;
