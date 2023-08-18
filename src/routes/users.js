const router = require('express').Router();

const {
  getUsers, createUser, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.route('/')
  .get(getUsers)
  .post(createUser);
router.get('/:userId', getUser);

router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;