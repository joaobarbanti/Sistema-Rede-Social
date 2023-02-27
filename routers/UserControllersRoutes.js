const express = require("express");
const UserController = require("../controllers/UserControllers");
const upload = require("../multerconfig/config");

const router = express.Router();

router.post("/register", upload.single("image"), UserController.Register);
router.post("/login", UserController.Login);

module.exports = router;
