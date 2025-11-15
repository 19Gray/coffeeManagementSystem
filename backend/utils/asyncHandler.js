const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("[Async Handler Error]", {
      timestamp: new Date().toISOString(),
      message: error.message,
      path: req.path,
      method: req.method,
    });
    next(error);
  });
};

export default asyncHandler;
