/** @format */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const twitterApproved = new Schema({
  info: {
    type: {},
  },
});

twitterApproved.statics.info = async function (info) {
  const userinfo = await this.create({
    info,
  });

  return userinfo;
};
const listfollowers = mongoose.model('twitterApproved', twitterApproved);

module.exports = listfollowers;
