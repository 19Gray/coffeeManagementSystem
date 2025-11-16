/**
 * Global imports
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/**
 * Local imports
 */
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import farmRoutes from "./routes/farm.routes.js";
import productionRoutes from "./routes/production.routes.js";
import taskRoutes from "./routes/task.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import signupCodeRoutes from "./routes/signupCode.routes.js"; // Added signup code routes

dotenv.config();

/**
 * Connect to the database
 */
connectDB();

const app = express();

/**
 *  Middleware
 */
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
      timestamp: new Date().toISOString(),
    });
  }
  next();
});

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/auth/codes", signupCodeRoutes); // Added signup code routes
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/inventory", inventoryRoutes);

/**
 * Error Handling middleware
 */
app.use(notFound);
app.use(errorHandler);

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Unhandled Rejection]", {
    timestamp: new Date().toISOString(),
    reason: reason instanceof Error ? reason.message : reason,
    promise,
  });
});

process.on("uncaughtException", (error) => {
  console.error("[Uncaught Exception]", {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
