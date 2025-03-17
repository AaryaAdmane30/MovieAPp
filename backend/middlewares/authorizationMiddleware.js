import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

// Check if the User is authenticated
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the "jwt" cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); // Fixed `findByID` to `findById`
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

//  check if user is Admin or Not :
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

//  set isAdmin = true in mongo Db
export { authenticate, authorizeAdmin };
