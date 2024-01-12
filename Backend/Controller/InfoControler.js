/** @format */

const Walletinfo = require('./../models/Info');
const User = require('../models/User');
const { forgetPassword } = require('./UsersControler');
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

const fetchdata = [
  {
    name: 'ammar143',
    value: '386757tvftyvjhbrvt797697987890',
  },
  {
    name: 'adamjohn13',
    value: '9i9i9i9iibrvt797697987890',
  },
  {
    name: 'XhandleValue',
    value: '9i9i9i9iibrvt797697987890',
  },
];

const getinfo = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const allUsers = await Walletinfo.find();
    const matchedUsers = allUsers.filter((user) =>
      fetchdata.some((item) => user.Xhandle === item.name)
    );
    res.status(200).json({ matchedUsers });
    // if () {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'user not found ',
    //   });
    // }
    // let data = {
    //   email: userExist.userName,
    //   userName: userExist.email,
    // };
    // res.status(200).json({
    //   status: 'success',
    //   data: data,
    // });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      Error: error.message,
    });
  }
};

module.exports = { info, getinfo };
