import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//signup controller
export const Signup = async (req, res) => {
  //get the date from req body
  const { fullName, email, password } = req.body;

  try {
    //some validatation of req data
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    //check the email are existing or not
    const exstingUser = await User.findOne({ email });
    if (exstingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //create a JWT token
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        name: newUser.fullName,
        password: newUser.password,

        message: "Account created successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error.message);
    res.status(500).json({ message: "INternal server error" });
  }
};

//login controller
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return null;

    //find the user
    const user = await User.findOne({ email });
    //if the user not found
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    //passwords are not match
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //generate the token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.fullName,
      password: user.password,

      message: "Login successfully",
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//logout controller
export const Logout = async (req, res) => {
  try {
    //create the token in the cookie
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in logut controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get profile controller
export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in get profile controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update profile controller
export const updateProfile = async (req, res) => {
  try {
    const { fullName, about } = req.body;
    const userId = req.user._id;

    if (!fullName && !about) return null;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        about,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
