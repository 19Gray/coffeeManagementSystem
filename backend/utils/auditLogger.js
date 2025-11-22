import AuditLog from "../models/auditLog.model.js";

export const logAudit = async (data) => {
  try {
    await AuditLog.create(data);
    console.log("[v0] Audit log created:", data.action);
  } catch (error) {
    console.error("[v0] Failed to create audit log:", error.message);
  }
};
