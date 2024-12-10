import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    //getting token from request cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    //verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const currentUser = await User.findById(decoded.id);

    //setting user to request object
    req.user = currentUser;
    //calling next middleware
    next();
  } catch (error) {
    console.log("error in auth middleware:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};
