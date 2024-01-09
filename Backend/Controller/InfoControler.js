/** @format */

const Walletinfo = require('./../models/Info');
const User = require('../models/User');
const info = async (req, res) => {
  console.log('hittttttttttttttttttttttttttttttt');
  const { id } = req.params;
  const { walletAddress, Xhandle } = req.body;
  try {
    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const walletExists = await Walletinfo.findOne({ userId: id });

    if (
      walletExists &&
      walletExists.userId.toString() === userExists._id.toString()
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Already found',
      });
    }

    if (!walletExists) {
      const infoWallet = await Walletinfo.info(
        walletAddress,
        Xhandle,
        userExists._id
      );

      if (infoWallet) {
        return res.status(200).json({
          status: 'success',
          message: 'Successfully sent data',
        });
      } else {
        return res.status(400).json({
          status: 'fail',
          message: 'Error in fetching wallet info',
        });
      } 
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getinfo = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const userExist = await Walletinfo.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'user not found ',
      });
    }
    let data = {
      email: userExist.userName,
      userName: userExist.email,
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

module.exports = { info, getinfo };
