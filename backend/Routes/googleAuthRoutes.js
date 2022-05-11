import { Router } from 'express';
import {
  googleCallback,
  googleLogout,
  googleFailed,
  googleSuccess,
} from '../Controllers/googleAuthController.js';
import auth from '../Middleware/auth.js';
import {
  googleLogin,
  googleOauth,
  isGoogleLogged,
  isGoogleJWT,
} from '../Middleware/googleAuthMiddleware.js';
const router = Router();

router.get('/google', googleLogin);
router.get('/google/callback', googleOauth, googleCallback);
router.get('/googleSuccess', isGoogleLogged, googleSuccess);
router.get('/googleFailed', googleFailed);
router.get('/googleLogout', googleLogout);

export default router;
