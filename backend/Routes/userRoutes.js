const express = require('express')
const auth = require('../Middleware/auth.js')
const {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
} = require('../controllers/userController.js')

const router = new express.Router()

//Register new user
router.post('/register', registerNewUser)

//Login User
router.post('/login', loginUser)

//Logout User
router.post('/logout', auth, logoutUser)

//Get Personal Profile
router.get('/me', auth, getProfile)

//update Profile
router.put('/update', auth, updateUser)

//Delete Profile
router.delete('/delete', auth, deleteUser)


//Get All Users
router.get('/get', getUsers)


module.exports = router