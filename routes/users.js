const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const user = require('../controllers/users');

router
  .route('/register')
  .get(user.renderRegisterForm)
  .post(catchAsync(user.register));

router
  .route('/login')
  .get(user.renderLogInForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    user.login
  );

router.get('/logout', user.logout);

module.exports = router;
