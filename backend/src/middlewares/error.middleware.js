import { ApiError } from "../utils/api-error.js";

export const errorMiddleware = (err, req, res, next) => {
  console.log("🔥 Server Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: err.message || "Internal Server Error",
    errors: [],
  });
};
