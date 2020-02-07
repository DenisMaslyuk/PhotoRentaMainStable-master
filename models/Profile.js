const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = new Schema({
  login: String,
  profileName: String,
  profileSecondName: String,
  passport: String,
  urlImagePassport: String,
});

module.exports = mongoose.model("Profile", Profile);
