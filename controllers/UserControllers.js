const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const file = req.file;

    const { name, username, email, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashpassword = await bcrypt.hash(password, salt);

    const NewUser = new User({
      image: file.path,
      name,
      username,
      email,
      password: hashpassword,
    });

    const savedUser = await NewUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ message: "Email Não Encontrado No Servidor" });

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword)
      return res.status(400).json({ message: "Senha Incorreta" });

    const token = await jwt.sign({ id: user._id }, process.env.TOKEN);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.Register = Register;
exports.Login = Login;
