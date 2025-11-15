import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a farm name"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    area: {
      type: Number,
      required: [true, "Please provide farm area in hectares"],
    },
    totalProduction: {
      type: Number,
      default: 0,
    },
    productionCost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
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

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
