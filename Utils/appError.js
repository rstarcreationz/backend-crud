class AppError extends Error {
  constructor(status, message, statusCode) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructour);
  }
}

module.exports = AppError;
