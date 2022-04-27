import express from 'express';
import passport from 'passport';

const githubAuth = passport.authenticate('github', {
  failureRedirect: '/api/user/githubFailed',
});

export { githubAuth };
