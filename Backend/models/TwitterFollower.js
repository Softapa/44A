const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const twitterFollowerSchema = new Schema({
  id: {
    type: Number,
    require: true,
     unique: true, 
  },
  name: {
    type: String,
    require: true,
     unique: true,
  },
  screen_name: {
    type: String,
    require: true,
     unique: true,
  },
});

twitterFollowerSchema.statics.info = async function ( id, name, screen_name,) {


  const userinfo = await this.create({
  id,
  name,
    screen_name,
  });

  return userinfo;
};
const listfollowers = mongoose.model('listfollowers', twitterFollowerSchema);

module.exports = listfollowers;

