import express from 'express';
import passport from 'passport';

const googleLogin = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

const googleOauth = passport.authenticate('google', {
  failureRedirect: '/api/user/googleFailed',
});

const isGoogleLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export { googleLogin, googleOauth, isGoogleLogged };
