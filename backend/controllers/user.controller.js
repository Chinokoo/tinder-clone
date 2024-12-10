import cloudinary from "../config/cloudnary.js";
import User from "./../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;

    if (image) {
      //base64 format.
      try {
        if (image.startsWith("data:image")) {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        }
      } catch (error) {
        console.log("error in the cloudinary upload", error);
        res.status(400).json({ message: "Error uploading image" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("error in the usercontroller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
