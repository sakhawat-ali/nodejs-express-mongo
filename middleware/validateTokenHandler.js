const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.header("Authorization") || req.header("authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: "Invalid authorization header" });
        throw new Error("User not authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid authorization header" });
  }
});

module.exports = validateToken;
