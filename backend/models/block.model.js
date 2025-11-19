import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a block name"],
      trim: true,
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: [true, "Please provide a farm reference"],
    },
    area: {
      type: Number,
      required: [true, "Please provide block area in hectares"],
    },
    cropType: {
      type: String,
      enum: ["arabica", "robusta", "mixed"],
      default: "arabica",
    },
    plantingDate: {
      type: Date,
      default: null,
    },
    expectedHarvestDate: {
      type: Date,
      default: null,
    },
    currentProduction: {
      type: Number,
      default: 0,
    },
    expectedYield: {
      type: Number,
      default: 0,
    },
    health: {
      type: String,
      enum: ["excellent", "good", "fair", "poor"],
      default: "good",
    },
    status: {
      type: String,
      enum: ["preparation", "growing", "mature", "harvesting", "fallow"],
      default: "preparation",
    },
    notes: {
      type: String,
      default: "",
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

const Block = mongoose.model("Block", blockSchema);
export default Block;
