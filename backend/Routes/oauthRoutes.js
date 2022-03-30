const express = require('express');
const {
  googleCallback,
  googleLogout,
  googleFailed,
  googleSuccess,
} = require('../Controllers/oauthController');
const {
  googleLogin,
  googleOauth,
  isGoogleLogged,
} = require('../Middleware/oauthMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'You are not logged in' });
});

router.get('/googleFailed', googleFailed);
router.get('/googleSuccess', isGoogleLogged, googleSuccess);
router.get('/google', googleLogin);
router.get('/google/callback', googleOauth, googleCallback);
router.get('/logout', googleLogout);

module.exports = router;
