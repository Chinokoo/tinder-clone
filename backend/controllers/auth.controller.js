import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//token creation function
const createToken = (id) => {
  //jwt token creation
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    //all fields must be filled
    if (!name || !email || !password || !age || !gender || !genderPreference)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    //check if age is 18 or older
    if (age < 18)
      return res.status(400).json({
        success: false,
        message: "You must be 18 or older to use this service.",
      });

    //password must be 6 characters long
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });

    let user = await User.findOne({ email });
    if (user && email == user?.email)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, //prevents client-side access to cookies and XSS attacks
      sameSite: "strict", //ensures that cookies are only sent to the server-side and prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", //ensures that cookies are only sent over HTTPS in production
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    //password must be 6 characters long
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, //prevents client-side access to cookies and XSS attacks
      sameSite: "strict", //ensures that cookies are only sent to the server-side and prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", //ensures that cookies are only sent over HTTPS in production
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    path: "/",
    domain: "localhost",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
