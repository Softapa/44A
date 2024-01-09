/** @format */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,

      required: [true, 'First name must not be empty'],
    },
    secertKey: {
      type: String,
      required: [true, 'Enter secert key'],
    },
    key: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email must not be empty'],
      unique: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email); // Check if the email is in a valid format
        },
        message: 'Invalid email format.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password must not be empty'],
      min: 8,
      validate: {
        validator: function (password) {
          // Use a regular expression to validate the password
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(
            password
          );
        },
        message:
          'Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      },
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  userName,
  email,
  password,
  secertKey
) {
  // console.log('aghiih', firstname, lastname, email, password);
  if (!userName) {
    throw Error('The userName must not be empty');
  }
  if (!email) {
    throw Error('Email must not be empty');
  }
  if (!password) {
    throw Error('Password must not be empty');
  }
  if (password.length < 5) {
    throw Error(' Password should be at least 8 characters long');
  }

  if (!secertKey) {
    throw Error('Enter secert key');
  }
  if (secertKey.length === 12) {
    throw Error('Secert key should be Contain 12 Unique words');
  }
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error('Email is already in use by another account');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const hashedInputSecretKey = await bcrypt.hash(secertKey, salt);
  const user = await this.create({
    userName,
    email,
    password: hash,
    secertKey,
  });

  return user;
};
userSchema.statics.loginUser = async function (email, password) {
  if (!email) {
    throw Error('Email must not be empty');
  }
  if (!password) {
    throw Error('Password must not be empty');
  }
  const userexits = await this.findOne({ email });
  if (!userexits) {
    throw Error('There is no user corresponding to this email');
  }
  const match = await bcrypt.compare(password, userexits.password);
  if (!match) {
    throw Error('Incorrect Email or Password');
  }
  return userexits;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
