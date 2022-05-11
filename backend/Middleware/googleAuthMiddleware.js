import express from 'express';
import passport from 'passport';
import auth from '../Middleware/auth.js';

const googleLogin =
  // (req, res) => {
  //   if (isGoogleJWT()) {
  //     res.redirect('googleSuccess/');
  //   } else {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  });
// }
// };

const googleOauth = passport.authenticate('google', {
  successRedirect: '/api/user/googleSuccess',
  failureRedirect: '/api/user/googleFailed',
});

const isGoogleLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res
      .status(401)
      .json({ success: 'false', message: 'Google login failed, please login' });
  }
};

const isGoogleJWT = (req, res, next) => {};

export { googleLogin, googleOauth, isGoogleLogged, isGoogleJWT };
