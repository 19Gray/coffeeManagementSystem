import mongoose from "mongoose";

const productionSchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: [true, "Please provide a farm ID"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide production quantity"],
    },
    unit: {
      type: String,
      enum: ["kg", "bags", "tons"],
      default: "kg",
    },
    harvestDate: {
      type: Date,
      required: [true, "Please provide harvest date"],
    },
    quality: {
      type: String,
      enum: ["grade-a", "grade-b", "grade-c"],
      default: "grade-a",
    },
    cost: {
      type: Number,
      default: 0,
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

const Production = mongoose.model("Production", productionSchema);
export default Production;
