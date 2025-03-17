import express from "express";

// controller :

import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

// middlewares:
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authorizationMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

// http://localhost:3000/api/v1/users/auth
router.post("/auth", loginUser);

// http://localhost:3000/api/v1/users/logout
router.post("/logout", logoutCurrentUser);

//  http://localhost:3000/api/v1/users/profile (will give id )
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

export default router;
