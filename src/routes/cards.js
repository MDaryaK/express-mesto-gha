const router = require('express').Router();

const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cards');

router
  .route('/')
  .get(getCards)
  .post(createCard);

router
  .route('/:cardId')
  .delete(removeCard);

router
  .route('/:cardId/likes')
  .put(toggleCardLike)
  .delete(toggleCardLike);

module.exports = router;