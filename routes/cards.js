const router = require('express').Router();

const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cards');

const {
  cardPreValidator,
} = require('../middlewares');

const {
  createCardReqCheck, cardIdReqCheck,
} = cardPreValidator;

router
  .route('/')
  .get(getCards)
  .post(createCardReqCheck, createCard);

router
  .route('/:cardId')
  .delete(cardIdReqCheck, removeCard);

router
  .route('/:cardId/likes')
  .put(cardIdReqCheck, toggleCardLike)
  .delete(cardIdReqCheck, toggleCardLike);

module.exports = router;