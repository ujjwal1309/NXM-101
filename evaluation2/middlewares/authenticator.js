const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "ssj", (err, decoded) => {
      if (decoded) {
        req.body.user=decoded.userId;
        next();
      } else {
        res.send({ msg: "Login first" });
      }
    });
  } catch (error) {
    res.send({ msg: "Login first" });
  }
};

module.exports = { authenticator };
