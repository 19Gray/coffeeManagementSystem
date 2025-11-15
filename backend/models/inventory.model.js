import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Please provide item name"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: 0,
    },
    unit: {
      type: String,
      required: [true, "Please provide unit"],
    },
    minimumStock: {
      type: Number,
      required: [true, "Please provide minimum stock level"],
    },
    cost: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["equipment", "pesticides", "fertilizer", "seeds", "other"],
      default: "other",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
