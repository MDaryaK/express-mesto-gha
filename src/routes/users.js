const router = require('express').Router();

const {
  getUsers, createUser, getUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

const {
  userPreValidator,
} = require('../middlewares');

const {
  userIdReqCheck, updateUserDataReqCheck, updateUserAvatarReqCheck,
} = userPreValidator;

router.route('/')
  .get(getUsers)
  .post(createUser);
router.get('/:userId', userIdReqCheck, getUser);

router.patch('/me', updateUserDataReqCheck, updateUserData);
router.patch('/me/avatar', updateUserAvatarReqCheck, updateUserAvatar);

module.exports = router;