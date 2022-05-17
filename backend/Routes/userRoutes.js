import { Router } from 'express';
import auth from '../Middleware/auth.js';
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  deleteALL,
} from '../Controllers/userController.js';

const router = new Router();

//Register new user
router.post('/register', registerNewUser);

//Login User
router.post('/login', loginUser);

//Logout User
router.post('/logout', auth, logoutUser);

//Get Personal Profile
router.get('/me', auth, getProfile);

//update Profile
router.put('/update', auth, updateUser);

//Delete Profile
router.delete('/delete', auth, deleteUser);

//Get All Users
router.get('/get', getUsers);

// forgot email-password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:_id/:newToken', resetPassword);

router.get('/deleteAll', deleteALL);

export default router;
