import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Hashing Password
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

//   REgistration -  Grabing Credentials from the User :
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);

  //  Checking iF the credentials are Correct or not
  if (!username || !email || !password) {
    throw new Error("Please Fill All the Fiedls ");
  }
  // if User Exists In database :
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User Alreedy Exists ");

  //  HAsh the user password :

  const salt = await bcrypt.genSalt(10); // generating the Salt
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data ");
  }
});

//  Login User :

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const existingUser = await User.findOne({ email });
  console.log(existingUser);

  //  Comparing The PAssword we type with the existing Password connected to the email we created
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({
        message: "Invalid Password",
      });
    }
  } else {
    res.status(401).json({
      message: "User Not Found",
    });
  }
});

//  Logout :

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully !" });
});

//  GEt ALL Registered User :

const getAllUsers = asyncHandler(async (req, res) => {
  //   this will get all registred user from Find
  const users = await User.find({});
  res.json(users);

  //  All users Set isAdmin = true in mongo db of Aarrya
  //  http://localhost:3000/api/v1/users
  //  this will show reqgistred user
});

//  Get Current USer Profile  by Id :

//  http://localhost:3000/api/v1/users/profile

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found ");
  }
});

//  Update The Profile : PUT  Method : http://localhost:3000/api/v1/users/profile ( changing pass username email )

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;

    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
