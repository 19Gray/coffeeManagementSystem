import Farm from "../models/farm.model.js";

export const getAllFarms = async (req, res, next) => {
  try {
    const farms = await Farm.find();

    res.status(200).json({
      success: true,
      data: farms,
      count: farms.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getFarmById = async (req, res, next) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.status(200).json({
      success: true,
      data: farm,
    });
  } catch (error) {
    next(error);
  }
};

export const createFarm = async (req, res, next) => {
  try {
    const { name, location, area, totalProduction, productionCost } = req.body;

    const farm = await Farm.create({
      name,
      location,
      area,
      totalProduction: totalProduction || 0,
      productionCost: productionCost || 0,
    });

    res.status(201).json({
      success: true,
      data: farm,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.status(200).json({
      success: true,
      data: farm,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id);

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.status(200).json({
      success: true,
      message: "Farm deleted successfully",
      data: farm,
    });
  } catch (error) {
    next(error);
  }
};
