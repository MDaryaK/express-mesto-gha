const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const consts = require('../configuration/constants');

const messages = {
  name: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.USER_NAME_REQUIRED,
    'string.empty': consts.USER_NAME_REQUIRED,
    'string.min': consts.USER_NAME_MIN_LENGTH,
    'string.max': consts.USER_NAME_MAX_LENGTH,
  },
  about: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.USER_ABOUT_REQUIRED,
    'string.empty': consts.USER_ABOUT_REQUIRED,
    'string.min': consts.USER_ABOUT_MIN_LENGTH,
    'string.max': consts.USER_ABOUT_MAX_LENGTH,
  },
  avatar: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.USER_AVATAR_REQUIRED,
    'string.empty': consts.USER_AVATAR_REQUIRED,
    'string.uri': consts.USER_AVATAR_IS_URL,
  },
  email: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.USER_EMAIL_REQUIRED,
    'string.empty': consts.USER_EMAIL_REQUIRED,
    'string.email': consts.USER_EMAIL_IS_EMAIL,
  },
  password: {
    'string.base': consts.INVALID_REQUEST,
    'any.required': consts.USER_PASSWORD_REQUIRED,
    'string.empty': consts.USER_PASSWORD_REQUIRED,
    'string.min': consts.USER_PASSWORD_MIN_LENGTH,
  },
};

exports.createUserReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.name),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.about),
    avatar: Joi.string()
      .required()
      .uri()
      .messages(messages.avatar),
    email: Joi.string()
      .required()
      .email()
      .messages(messages.email),
    password: Joi.string()
      .required()
      .min(8)
      .messages(messages.password),
  }).prefs({ stripUnknown: true }),
});

exports.loginReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages(messages.email),
    password: Joi.string()
      .required()
      .min(8)
      .messages(messages.password),
  }).prefs({ stripUnknown: true }),
});

exports.updateUserDataReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.name),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages(messages.about),
  }).prefs({ stripUnknown: true }),
});

exports.updateUserAvatarReqCheck = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string()
      .required()
      .uri()
      .messages(messages.avatar),
  }).prefs({ stripUnknown: true }),
});

exports.userIdReqCheck = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.objectId()
      .message(consts.INVALID_REQUEST),
  }),
});
