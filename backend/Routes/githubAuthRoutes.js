import { Router } from 'express';
import passport from 'passport';
import {
  githubCallback,
  isGithubLogged,
  githubLogout,
  githubSignin,
  githubFailed,
} from '../Controllers/githubAuthController.js';
import { githubAuth } from '../Middleware/githubAuthMiddleware.js';
const router = Router();

router.get('/signin/github/', githubSignin);

router.get('/signin/github/callback', githubAuth, githubCallback);

router.get('/githubFailed', githubFailed);

router.get('/isGithubLogged', isGithubLogged);

router.get('/githubLogout', githubLogout);

export default router;
