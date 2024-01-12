/** @format */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Error } = require('mongoose');

require('dotenv').config();
console.log(process.env.SECRET);
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' });
};

const signupUser = async (req, res) => {
  const { userName, email, password, secertKey } = req.body;

  try {
    const user = await User.signup(userName, email, password, secertKey);

    const jsonUser = {
      email: user.email,
      _id: user._id,
    };

    user &&
      res.status(201).json({
        status: 'success',
        message: 'Account Created Successfully!',
        data: jsonUser,
      });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const loginuser = await User.loginUser(email, password);
    const token = createToken(loginuser._id);
    const jsondata = {
      _id: loginuser._id,
      email: loginuser.email,
      userName: loginuser.userName,
      bearertoken: token,
    };
    loginuser &&
      res.status(200).json({
        message: 'login Successfully!',
        data: jsondata,
      });
  } catch (error) {
    res.status(400).json({
      message: 'login failed',
      Error: error.message,
    });
  }
};
const forgetPassword = async (req, res) => {
  // const { id } = req.params;
  const { secertKey } = req.params;
  console.log(secertKey);
  try {
    const userExist = await User.findOne({ secertKey: secertKey });
    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(secertKey, salt);

    if (userExist) {
      let nums = 'qwertyuiopASDFGHJKLzXCVBNMqwertyuiopasdfghjklzxcvbnm';
      let reNewParams = '';
      for (let i = 4; i > 0; i--) {
        reNewParams += nums[Math.floor(Math.random() * nums.length)];
      }
      const codeUpdate = await User.updateOne(
        { secertKey },
        { $set: { key: reNewParams } }
      );

      if (codeUpdate) {
        res.status(200).json({
          status: 'Correct secertkey',
          data: {
            key: reNewParams,
          },
        });
      }
    } else {
      res.status(400).json({
        status: 'Rejected',
        message: 'enter your correct secert key',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'enter your secert key',
      error: error.message,
    });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { key } = req.params;
    const { password } = req.body;

    const userExist = await User.findOne({ key: key });
    console.log('userExist.userName', userExist);

    if (!userExist) {
      return res.status(400).json({
        status: 'Reset-Password failed',
        message: 'User not found',
      });
    }

    if (password?.length < 7 || !password) {
      return res.status(400).json({
        status: 'Reset-Password failed',
        message: 'Password must not be empty ',
        messageStrong: 'Password should be at least 8 characters long',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await User.updateOne(
      { key: key },
      {
        $set: {
          password: hash,
          key: '',
        },
      }
    );
    if (result) {
      res.status(200).json({
        status: 'successfuly Updated',
        message: 'Password updated successfully',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'user not found ',
      });
    }
    let data = {
      email: user.email,
      userName: user.userName,
    };
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      Error: error.message,
    });
  }
};

module.exports = {
  signupUser,
  login,
  forgetPassword,
  ResetPassword,
  getProfile,
};
