import Production from "../models/production.model.js";

export const getAllProduction = async (req, res, next) => {
  try {
    const productions = await Production.find().populate("farmId");

    res.status(200).json({
      success: true,
      data: productions,
      count: productions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductionById = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id).populate(
      "farmId"
    );

    if (!production) {
      return res.status(404).json({ message: "Production record not found" });
    }

    res.status(200).json({
      success: true,
      data: production,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduction = async (req, res, next) => {
  try {
    const { farmId, quantity, unit, harvestDate, quality, cost } = req.body;

    const production = await Production.create({
      farmId,
      quantity,
      unit: unit || "kg",
      harvestDate,
      quality: quality || "grade-a",
      cost: cost || 0,
    });

    await production.populate("farmId");

    res.status(201).json({
      success: true,
      data: production,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduction = async (req, res, next) => {
  try {
    const production = await Production.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("farmId");

    if (!production) {
      return res.status(404).json({ message: "Production record not found" });
    }

    res.status(200).json({
      success: true,
      data: production,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduction = async (req, res, next) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.id);

    if (!production) {
      return res.status(404).json({ message: "Production record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Production record deleted successfully",
      data: production,
    });
  } catch (error) {
    next(error);
  }
};
