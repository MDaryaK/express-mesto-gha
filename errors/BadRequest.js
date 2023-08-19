class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = 400;
    this.isOperational = true;
  }
}

module.exports = BadRequestError;
