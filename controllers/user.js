import User from '../models/User.js'
import { sendWelcomeEmail } from '../emails/account.js'

//Register a user
const registerNewUser = async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await user.save()
    console.log(user)
    sendWelcomeEmail(user.email, user.name)
    res.status(201).send(token)
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send(token)
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Forgot password
const forgotPassword = async (req, res) => {

}

//Logout User
const logoutUser = async (req, res) => {
  try {
    req.tokens === ''
    // await req.data.save()

    res.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
}

//Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    })
  }
}

//Get Personal Profile
const getProfile = async (req, res) => {
  try {
    const user = await req.user
    res.json({
      success: true,
      data: user,
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
}

//Update user details
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'name',
    'email',
    'password',
    'contact',
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid Updates' })
  }
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Please login',
    })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))

    req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Delete User
const deleteUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Please login',
    })
  }
  try {
    await req.user.remove()
    res.json({
      success: true,
      data: 'User deleted successfully',
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    })
  }
}

export {
  registerNewUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
}
