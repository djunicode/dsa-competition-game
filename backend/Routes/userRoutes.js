const express = require('express');
const auth = require('../Middleware/auth.js');
const {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
  verifySignUpOtp,
  verifyLoginOtp,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController.js');

const router = new express.Router();

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

// Verify Otp-Signup
router.post('/verifyOtp/:name/:email/:password/:contact', verifySignUpOtp);

// Verify Otp-Login
router.post('/verifyLoginOtp/:email', verifyLoginOtp);

// forgot email-password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:_id/:newToken', resetPassword);

module.exports = router;
