/** @format */

const headers = require('./../Middleware/Checkauth');
const {
  signupUser,
  login,
  forgetPassword,
  ResetPassword,
  getProfile,
} = require('../Controller/UsersControler');
const router = require('express').Router();

router.post('/signup', signupUser);

router.get('/profile/:id', getProfile);
router.post('/login', login);
router.post('/forget_password/:secertKey', forgetPassword);
router.patch('/Reset_password/:key', ResetPassword);

module.exports = router;
