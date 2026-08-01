export function notFound(request, response) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}

export function errorHandler(error, _request, response, _next) {
  const status = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
  response.status(status).json({
    success: false,
    message: error.message || "Unexpected server error",
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
}
