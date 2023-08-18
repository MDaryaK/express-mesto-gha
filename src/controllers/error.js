const BadRequestError = require('../errors/BadRequest');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Неправильные данные. ${errors.join('. ')}`;

  return new BadRequestError(message);
};

const createError = (err) => {
  let error = { ...err };
  error.message = err.message;

  if (error.message.includes('validation failed')) error = handleValidationErrorDB(error);
  if (error.message.includes('failed for value')) error = new BadRequestError('Неверный тип');

  return error;
};

const sendError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: 'Что-то пошло не так',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  sendError(createError(err), res);

  next();
};