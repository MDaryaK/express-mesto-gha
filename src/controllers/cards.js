const Card = require('../models/card');
const NotFoundError = require('../errors/NotFound');

exports.getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => card.populate('owner').execPopulate())
    .then((card) => res.send(card))
    .catch(next);
};

exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указаным _id не найдена'))
    .then((card) => {
      card.remove();
      res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

exports.toggleCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  const doc = req.method === 'PUT'
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };

  Card.findByIdAndUpdate(cardId, doc)
    .orFail(new NotFoundError('Карточка с указаным _id не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};