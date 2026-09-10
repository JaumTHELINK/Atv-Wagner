class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Registro não encontrado.') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  AppError,
  NotFoundError,
};
