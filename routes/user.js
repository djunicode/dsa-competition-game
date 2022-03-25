import express from'express'
import auth from'../middleware/auth.js'
import {
  registerNewUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
} from'../controllers/user.js'

const router = new express.Router()

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Logout User
router.post('/logout', auth, logoutUser)

//Forgot Password
router.post('/forgot_password', forgotPassword)

//Get Personal Profile
router.get('/me', auth, getProfile)

//update Profile
router.put('/update', auth, updateUser)

//Delete Profile
router.delete('/delete', auth, deleteUser)


//Get All Users
router.get('/get', getUsers)


export default router