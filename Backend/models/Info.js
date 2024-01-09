/** @format */

const mongoose = require('mongoose');
const User = require('../models/User');
const infousers = new mongoose.Schema(
  {
    walletAddress: {
      type: String,

      required: [true, 'must sent your wallet address'],
    },
    Xhandle: {
      type: String,
      required: [true, 'Enter your X username'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  },
  { timestamps: true }
);
infousers.statics.info = async function (walletAddress, Xhandle, userId) {
  if (!walletAddress) {
    throw Error('walled address must not be empty');
  }
  if (!Xhandle) {
    throw Error('Xhandle must not be empty');
  }
  const userinfo = await this.create({
    walletAddress,
    Xhandle,
    userId,
  });

  return userinfo;
};
const Walletinfo = mongoose.model('Walletinfo', infousers);

module.exports = Walletinfo;
