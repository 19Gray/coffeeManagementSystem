import crypto from "crypto";

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const isTokenExpired = (createdAt, expirationMinutes = 1440) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMinutes = (now - created) / (1000 * 60);
  return diffMinutes > expirationMinutes;
};
