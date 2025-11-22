import Worker from "../models/worker.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { logAudit } from "../utils/auditLogger.js";

// Create Worker (Supervisor only)
export const createWorker = asyncHandler(async (req, res, next) => {
  const { name, nationalId, phone, assignedFarm } = req.body;

  console.log("[v0] Worker creation attempt:", { name, nationalId, phone });

  if (!name || !nationalId || !phone) {
    return next(new AppError("Name, national ID, and phone are required", 400));
  }

  // Check if worker already exists
  const existingWorker = await Worker.findOne({ nationalId });
  if (existingWorker) {
    return next(
      new AppError("Worker with this national ID already exists", 400)
    );
  }

  // Create worker
  const worker = await Worker.create({
    name,
    nationalId,
    phone,
    organization: req.user.organization,
    assignedFarm: assignedFarm || null,
    supervisor: req.user._id,
    status: "active",
  });

  // Log audit
  await logAudit({
    user: req.user._id,
    organization: req.user.organization,
    action: "CREATE_WORKER",
    resource: "Worker",
    resourceId: worker._id,
    details: { name, nationalId },
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  console.log("[v0] Worker created successfully:", worker.name);

  res.status(201).json({
    success: true,
    message: "Worker added successfully",
    worker,
  });
});

// Get All Workers
export const getWorkers = asyncHandler(async (req, res, next) => {
  const query = { organization: req.user.organization };

  // Supervisors can only see their assigned workers
  if (req.user.role === "supervisor") {
    query.supervisor = req.user._id;
  }

  const workers = await Worker.find(query)
    .populate("assignedFarm", "name location")
    .populate("supervisor", "name email")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: workers.length,
    workers,
  });
});

// Get Single Worker
export const getWorkerById = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id)
    .populate("assignedFarm", "name location")
    .populate("supervisor", "name email");

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  // Check organization access
  if (worker.organization.toString() !== req.user.organization.toString()) {
    return next(new AppError("Not authorized", 403));
  }

  res.status(200).json({
    success: true,
    worker,
  });
});

// Update Worker
export const updateWorker = asyncHandler(async (req, res, next) => {
  const { name, phone, assignedFarm, status } = req.body;

  const worker = await Worker.findById(req.params.id);

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  if (worker.organization.toString() !== req.user.organization.toString()) {
    return next(new AppError("Not authorized", 403));
  }

  if (name) worker.name = name;
  if (phone) worker.phone = phone;
  if (assignedFarm !== undefined) worker.assignedFarm = assignedFarm;
  if (status) worker.status = status;

  await worker.save();

  // Log audit
  await logAudit({
    user: req.user._id,
    organization: req.user.organization,
    action: "UPDATE_WORKER",
    resource: "Worker",
    resourceId: worker._id,
    details: { name, phone, status },
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(200).json({
    success: true,
    worker,
  });
});

// Soft Delete Worker
export const deleteWorker = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id);

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  if (worker.organization.toString() !== req.user.organization.toString()) {
    return next(new AppError("Not authorized", 403));
  }

  // Soft delete: set status to inactive
  worker.status = "inactive";
  await worker.save();

  // Log audit
  await logAudit({
    user: req.user._id,
    organization: req.user.organization,
    action: "DELETE_WORKER",
    resource: "Worker",
    resourceId: worker._id,
    details: { name: worker.name },
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(200).json({
    success: true,
    message: "Worker deactivated successfully",
  });
});
