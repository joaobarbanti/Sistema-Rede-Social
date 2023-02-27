const express = require("express");
const UserActionController = require("../controllers/UserActionControllers");
const VerifyToken = require("../middleware/checkauth")

const router = express.Router();

router.get("/:id",VerifyToken ,UserActionController.GetUser);
router.get("/:id/friends",VerifyToken, UserActionController.GetUserFriends);
router.patch("/:id/:FriendId", VerifyToken, UserActionController.AddRemoveFriends)

module.exports = router;
