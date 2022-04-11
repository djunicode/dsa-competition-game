const express = require('express');
const passport = require('passport');
const {
    githubCallback,
    isGithubLogged,
    githubLogout,
    githubSignin,
    githubFailed
} = require('../Controllers/githubAuthController');
const { githubAuth } = require('../Middleware/githubAuthMiddleware');
const router = express.Router();

router.get('/signin/github/', githubSignin);

router.get('/signin/github/callback', githubAuth, githubCallback);

router.get('/githubFailed', githubFailed);

router.get('/isGithubLogged', isGithubLogged);

router.get('/githubLogout', githubLogout);

module.exports = router;