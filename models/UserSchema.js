const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [],
});

const model = mongoose.model("Users", UserSchema);

module.exports = model;
