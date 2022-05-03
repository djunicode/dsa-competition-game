import { Router } from 'express';
import {
  googleCallback,
  googleLogout,
  googleFailed,
  googleSuccess,
} from '../Controllers/oauthController.js';
import {
  googleLogin,
  googleOauth,
  isGoogleLogged,
} from '../Middleware/oauthMiddleware.js';
const router = Router();

router.get('/googleFailed', googleFailed);
router.get('/googleSuccess', isGoogleLogged, googleSuccess);
router.get('/google', googleLogin);
router.get('/google/callback', googleOauth, googleCallback);
router.get('/googleLogout', googleLogout);

export default router;
