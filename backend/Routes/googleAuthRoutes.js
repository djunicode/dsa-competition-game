import { Router } from 'express';
import {
  googleLogout,
  googleFailed,
  googleSuccess,
} from '../Controllers/googleAuthController.js';
import {
  googleLogin,
  googleOauth,
  isGoogleLogged,
} from '../Middleware/googleAuthMiddleware.js';
const router = Router();

router.get('/google', googleLogin);
router.get('/google/callback', googleOauth);
router.get('/googleSuccess', isGoogleLogged, googleSuccess);
router.get('/googleFailed', googleFailed);
router.get('/googleLogout', googleLogout);

export default router;
