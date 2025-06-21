const UserSchema = require('../model/userSchema');
const jwt = require('jsonwebtoken');

exports.Protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, Message: "Token is empty" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await UserSchema.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ success: false, Message: "No user found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ success: false, Message: "Token is invalid" });
    }

  } else {
    return res.status(401).json({ success: false, Message: "You are not authorized to use this route" });
  }
};
