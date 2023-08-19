const router = require('express').Router();
const NotFoundError = require('../errors/NotFound');

const getErrorPage = (req, res, next) => {
  next(new NotFoundError(`Страница не найдена: ${req.originalUrl}`));
};

router.use(getErrorPage);

module.exports = router;
