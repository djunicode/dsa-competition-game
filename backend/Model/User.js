import pkg from 'mongoose';
const { Schema, model } = pkg;

import validator from 'validator';
const { isEmail } = validator;

import bcrypt from 'bcryptjs';
const { compare, hash } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter your name'],
      unique: true,
      dropDups: true,
    },
    email: {
      unique: [true, 'Email already taken'],
      type: String,
      required: [true, 'Please enter the email'],
      validate(value) {
        if (!isEmail(value)) {
          throw new Error('email is invalid');
        }
      },
    },
    password: {
      type: String,
      // required: [true, 'Password is required'],
    },
    // role: {
    //   type: String,
    //   enum: ['client', 'vendor'],
    //   required:[true,'Role must be defined']
    // },

    // profilePic: {
    //   type: Buffer
    // },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = sign({ _id: user.id.toString() }, process.env.TOKEN_SECRET, {
    expiresIn: '365d',
  });

  //user.tokens = user.tokens.concat({token})

  await user.save();

  return token;
};

//to find the user by email and password from the database and send it back
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

//to hash the plaintext password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  //only want to hash the password if the user modifies the password, if it is already hashed, then it shouldn't get hashed again
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
});

const User = model('User', userSchema);
export default User;
