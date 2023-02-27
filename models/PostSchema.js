const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  UserId:{type:String, required:true},
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true},
  username: { type: String, required: true },
});

const model = mongoose.model("Posts", PostSchema);

module.exports = model;
