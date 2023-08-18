const User = require('../models/user');
const NotFoundError = require('../errors/NotFound');

exports.createUser = (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => res.send(user))
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь с _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

exports.updateUserData = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail(new NotFoundError('Пользователь с _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

exports.updateUserAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar })
    .orFail(new NotFoundError('Пользователь с _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};