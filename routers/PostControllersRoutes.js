const express = require("express");
const PostController = require("../controllers/PostControllers");
const postsupload = require("../multerconfigposts/configposts");
const VerifyToken = require("../middleware/checkauth")

const router = express.Router();

router.get("/",VerifyToken,PostController.TakeAllPosts);
router.post(
  "/",
  VerifyToken,
  postsupload.single("image"),
  PostController.MakePost
);
router.get("/:UserId", VerifyToken,PostController.GetUserPosts);

module.exports = router;
