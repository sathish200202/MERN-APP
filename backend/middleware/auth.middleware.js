import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//it's a midlleware, so we use next() function
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    //if there is no token
    if (!token) {
      return res
        .status(400)
        .json({ message: "UNauthorized - no token provided" });
    }

    //decode the token and verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //not maching
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Invalid token" });
    }

    //find the user
    const user = await User.findById(decoded.userId).select("-password");

    //if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //set the user to req user
    req.user = user;

    //call the next function
    next();
  } catch (error) {
    console.log("Error in protectRoute ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
