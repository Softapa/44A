const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const twitterFollowerSchema = new Schema({
  id: {
    type: Number,
    require: true,
  },
  id_str: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  screen_name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  protected: {
    type: Boolean,
    require: true,
  },
  verified: {
    type: Boolean,
    require: true,
  },
  followers_count: {
    type: Number,
    require: true,
  },
  friends_count: {
    type: Number,
    require: true,
  },
  listed_count: {
    type: Number,
    require: true,
  },
  favourites_count: {
    type: Number,
    require: true,
  },
  statuses_count: {
    type: Number,
    require: true,
  },
  created_at: {
    type: String,
    require: true,
  },
  profile_banner_url: {
    type: String,
    require: true,
  },
  profile_image_url_https: {
    type: String,
    require: true,
  },
  can_dm: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("TwitterFollower", twitterFollowerSchema);
