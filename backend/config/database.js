import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MongoDB URI exists:", !!process.env.MONGO_URI);
    console.log(
      "MongoDB URI starts with:",
      process.env.MONGO_URI?.substring(0, 30)
    );

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;
