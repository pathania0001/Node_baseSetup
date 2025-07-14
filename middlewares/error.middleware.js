
const errorMiddleware = (err, req, res, next) => {
  console.error("rrrrr",err)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errorDetails = err.errors || err.feilds;

  return res.status(statusCode).json({
    success: false,
    message,
    data: {},
    error: errorDetails,
  });
};

module.exports = errorMiddleware;
