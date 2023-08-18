const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const consts = require('../configuration/constants');

const messages = {
  name: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.CARD_NAME_REQUIRED,
    'string.empty': consts.CARD_NAME_REQUIRED,
    'string.min': consts.CARD_NAME_MIN_LENGTH,
    'string.max': consts.CARD_NAME_MAX_LENGTH,
  },
  link: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.CARD_LINK_REQUIRED,
    'string.empty': consts.CARD_LINK_REQUIRED,
    'string.uri': consts.CARD_LINK_IS_URL,
  },
};

exports.createCardReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.name),
    link: Joi.string()
      .required()
      .uri()
      .messages(messages.link),
  }).prefs({ stripUnknown: true }),
});

exports.cardIdReqCheck = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.objectId()
      .message(consts.INVALID_REQUEST),
  }),
});