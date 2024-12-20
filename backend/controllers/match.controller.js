import User from "../models/user.model.js";
import { getConnectedUsers, getIO } from "./../socket/socket.server.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser)
      return res.status(404).json({
        success: false,
        message: "User is not found",
      });

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();

      //if the other user liked us as well, its a match, so lets update both users
      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserId);
        likedUser.matches.push(currentUser.id);

        await Promise.all([currentUser.save(), likedUser.save()]);
        // send notification in real time with socket io
        // get connected users from the socket
        const connectedUsers = getConnectedUsers();
        // initialize the socket instance
        const io = getIO();

        // getting the liked user connected id.
        const likedUserSocketId = connectedUsers.get(likedUserId);

        if (likedUserSocketId) {
          io.to(likedUserSocketId).emit("newMatch", {
            _id: currentUser._id,
            name: currentUser.name,
            image: currentUser.image,
          });
        }
        const currentSocketId = connectedUsers.get(currentUser._id.toString());
        if (currentSocketId) {
          io.to(currentSocketId).emit("newMatch", {
            _id: likedUser._id,
            name: likedUser.name,
            image: likedUser.image,
          });
        }
      }
    }
  } catch (error) {
    console.log("Error in swipeRight", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//adding to the dislikes array
export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }
    res.status(200).json({ success: true, user: currentUser });
  } catch (error) {
    console.log("Error in swipeLeft", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//getting the user's matches
export const getMatches = async (req, res) => {
  try {
    //find the user by id and populate the matches array with the user's matches
    const user = await User.findById(req.user.id).populate(
      "matches",
      "name image"
    );
    //return the matches array
    res.status(200).json({
      success: true,
      matches: user.matches,
    });
  } catch (error) {
    console.log("Error in getMatches", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        {
          genderPreference: { $in: [currentUser.gender, "both"] },
        },
      ],
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in the getUserProfiles");
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
