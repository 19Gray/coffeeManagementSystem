/**
 * Global imports
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/**
 * Local imports
 */
import { notFound, errorHandler } from "./middlewares/error.middleware";
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";

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
app.use("/api/admins");
app.use("/api/users");

/**
 * Error Handleing middleware
 *
 */
app.use(notFound);
app.use(errorHandler);

const PORT = ProcessingInstruction.end.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
