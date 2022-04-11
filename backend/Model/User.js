const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      // unique: [true, 'UserName already taken'],
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      // unique: [true, 'Email already taken'],
      type: String,
      required: [false, 'Please enter the email'],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: [false, 'Password is required'],
    },
    contact: {
      // unique: [true, 'Mobile no already registered, try logging in'],
      type: Number,
      minLength: 10,
      maxLength: 10,
      required: [true, 'Please provide a contact number'],
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
  const token = jwt.sign(
    { _id: user.id.toString() },
    process.env.TOKEN_SECRET,
    { expiresIn: '365d' }
  );

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

  const isMatch = await bcrypt.compare(password, user.password);

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
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
