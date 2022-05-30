import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import User from '../Model/User.js';
import dotenv from 'dotenv';
dotenv.config();
import Mail from '../Mailing/gmail.js';
import mongoose from 'mongoose';

//Register a user
const registerNewUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    const findUserName = await User.findOne({ username: req.body.username });
    if (findUser) {
      res.status(409).json({
        success: false,
        message: 'Email already exists,try signing In!',
      });
    } else if (findUserName) {
      res.status(409).json({
        success: false,
        message: 'UserName already Taken',
      });
    } else {
      const user = new User({ ...req.body });
      const token = await user.generateAuthToken();
      await user.save();
      res.status(200).json({
        success: true,
        data: token,
        message: 'User successfully registered',
      });
    }
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
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Please login',
    });
  }
  try {
    const user = User.findOne(req.user.username);
    const updateData = {
      ...req.body,
      password: req.body.password
        ? await bcrypt.hash(req.body.password, 8)
        : req.body.password,
    };
    const found = await User.updateOne(
      user,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'User updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log(error);
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
    res.status(204).json({
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

const deleteALL = async (req, res) => {
  try {
    User.deleteMany({}, () => {
      res.status(200).json({ message: 'Deleted all users!' });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  deleteALL,
};
