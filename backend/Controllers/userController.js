import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import User from '../Model/User.js';
import dotenv from 'dotenv';
dotenv.config();
import Mail from '../Mailing/gmail.js';

//Register a user
const registerNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({ ...req.body });
    const token = await user.generateAuthToken();
    console.log(user);
    await user.save((err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res
            .status(422)
            .json({ success: false, message: 'User already exist!' });
        }
        // Some other error
        return res.status(422).send(err);
      }
    });
    res.status(201).json({
      success: true,
      data: token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//Login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//Logout User
const logoutUser = async (req, res) => {
  try {
    req.tokens === '';

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//Get Personal Profile
const getProfile = async (req, res) => {
  try {
    const user = await req.user;
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//Update user details
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'contact'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid Updates' });
  }
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Please login',
    });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    req.user.save();

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Please login',
    });
  }
  try {
    await req.user.remove();
    res.status(200).json({
      success: true,
      data: 'User deleted successfully',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    }

    const secret = process.env.SECRET_KEY + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const newToken = sign(payload, secret, { expiresIn: '15m' });
    const link = `http://localhost:5000/api/user/reset-password/${user._id}/${newToken}`;
    await Mail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'dsa-competition game',
      template: 'forgot-password',
      templateVars: {
        emailAddress: user.email,
        name: user.name,
        resetLink: link,
      },
    });
    res.status(200).send({
      success: true,
      message:
        'Password reset link was sent to your registered EmailId if account exists',
      link,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { _id, newToken } = req.params;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid User',
      });
    }
    const secret = process.env.SECRET_KEY + user.password;
    const payload = verify(newToken, secret);
    const newPassword = {
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    if (newPassword.password != newPassword.confirmPassword) {
      res.status(400).json({
        success: false,
        message: 'newPassword and confirmPassword must be the same',
      });
      return;
    }
    const updatePass = await User.updateOne(
      user,
      { $set: { password: await hash(newPassword.password, 8) } },
      { omitUndefined: 1 }
    );
    res.status(201).json({
      success: true,
      message: 'User Password changed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerNewUser,
  loginUser,
  logoutUser,
  getUsers,
  getProfile,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
