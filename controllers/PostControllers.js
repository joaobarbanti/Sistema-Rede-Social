const User = require("../models/UserSchema");
const Post = require("../models/PostSchema");

const TakeAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const MakePost = async (req, res) => {
  try {
    const { title, description, UserId } = req.body;

    const user = await User.findById(UserId);

    const file = req.file;

    const MakeaNewPost = new Post({
      UserId,
      image: file.path,
      title: title,
      description: description,
      name: user.name,
      username: user.username,
    });

    const savedpost = await MakeaNewPost.save();

    res.status(200).json(savedpost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetUserPosts = async (req, res) => {
  try {
    const { UserId } = req.params;

    const posts = await Post.find({ UserId });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.TakeAllPosts = TakeAllPosts;
exports.MakePost = MakePost;
exports.GetUserPosts = GetUserPosts;
