const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error); // ✅ Pass error to Express error handler
  }
};

export default asyncHandler;
