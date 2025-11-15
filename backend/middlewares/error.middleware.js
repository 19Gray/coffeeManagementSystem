const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();

  console.error("[Error]", {
    timestamp,
    message: err.message,
    path: req.path,
    method: req.method,
    statusCode: err.statusCode || 500,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });

  let statusCode =
    err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  let errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    timestamp,
  };

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    errorResponse.message = "Validation Error";
    errorResponse.details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Mongoose cast error (invalid MongoDB ID)
  if (err.name === "CastError") {
    statusCode = 400;
    errorResponse.message = "Invalid ID format";
    errorResponse.details = { field: err.path, value: err.value };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    errorResponse.message = `${field} already exists`;
    errorResponse.details = { field, value: err.keyValue[field] };
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorResponse.message = "Invalid or malformed token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    errorResponse.message = "Token has expired";
    errorResponse.details = { expiredAt: err.expiredAt };
  }

  // MongoDB connection error
  if (err.name === "MongoNetworkError" || err.name === "MongooseError") {
    statusCode = 503;
    errorResponse.message = "Database connection error";
  }

  // Add stack trace only in development
  if (process.env.NODE_ENV !== "production") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export { notFound, errorHandler };
