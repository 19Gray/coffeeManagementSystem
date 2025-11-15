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
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes.js";
import farmRoutes from "./routes/farm.routes.js";
import productionRoutes from "./routes/production.routes.js";
import taskRoutes from "./routes/task.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";

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

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/inventory", inventoryRoutes);

/**
 * Error Handleing middleware
 *
 */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
