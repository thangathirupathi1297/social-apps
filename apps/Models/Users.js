const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [],
  following: [],
  profile: {
    type: String,
  },
});
const UserModel = mongoose.model("Users", userSchema);
module.exports.UserModel = UserModel;

module.exports.userSchema = userSchema;
