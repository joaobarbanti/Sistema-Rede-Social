const User = require("../models/UserSchema");
const Post = require("../models/PostSchema");

const GetUser = async (req, res) => {
  try {
    const { UserId } = req.params;

    const user = await User.findById(UserId);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetUserFriends = async (req, res) => {
  try {
    const { UserId } = req.params;

    const user = await User.findById(UserId);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const AddRemoveFriends = async (req, res) => {
  try {
    const {id, FriendsId } = req.params;

    const user = await User.findById(id);

    const friend = await User.findById(FriendsId);

    if (user.friends.includes(FriendsId)) {
      user.friends = user.friends.filter((id) => id !== FriendsId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(FriendsId);
      friend.friends.push(id);
    }
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.GetUser = GetUser;
exports.GetUserFriends = GetUserFriends;
exports.AddRemoveFriends = AddRemoveFriends;
