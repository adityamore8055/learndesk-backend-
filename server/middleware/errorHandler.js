const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (res.headersSent) {
    return;
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource id" });
  }

  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
