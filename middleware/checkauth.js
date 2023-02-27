const jwt = require("jsonwebtoken");

function VerifyToken (req, res, next) {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Acess Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = VerifyToken
