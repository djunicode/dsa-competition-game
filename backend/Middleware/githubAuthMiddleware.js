const express = require('express');
const passport = require('passport');

const githubAuth = passport.authenticate('github', {
  failureRedirect: '/api/user/githubFailed',
});

module.exports = {
  githubAuth,
};
