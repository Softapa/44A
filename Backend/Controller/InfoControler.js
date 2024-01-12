/** @format */

const Walletinfo = require('./../models/Info');
const User = require('../models/User');
const listfollowers = require('../models/TwitterFollower');
const twitterApproved = require('../models/Approved');
const { forgetPassword } = require('./UsersControler');
const info = async (req, res) => {
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
    const allUsers = await Walletinfo.find();
    const twiterfollowers = await listfollowers.find();

    const matchedUsers = allUsers.filter((user) =>
      twiterfollowers.some((item) => user.Xhandle === item.name)
    );
    console.log(matchedUsers);
    // return;
    if (!matchedUsers) {
      return;
    } else {
      let all = matchedUsers.map((i) => i.Xhandle);
      const allapproved = await twitterApproved.find();
      let final = allapproved.map((i) => i.Xhandle);
      if (all != final) {
        const user = await twitterApproved.info(matchedUsers.map((i) => i));
        user && res.status(200).json({ user });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      Error: error.message,
    });
  }
};

module.exports = { info, getinfo };
