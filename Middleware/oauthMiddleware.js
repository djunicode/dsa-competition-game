const express = require('express');
const passport = require('passport');

const googleLogin = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

const googleOauth = passport.authenticate('google', {
  failureRedirect: '/googleFailed',
});

const isGoogleLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  googleLogin,
  googleOauth,
  isGoogleLogged,
};
