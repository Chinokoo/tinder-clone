import { getConnectedUsers, getIO } from "../socket/socket.server.js";
import Message from "./../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    //todo: send message to reciever in real time.
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const recieverSocketId = connectedUsers.get(receiverId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", {
        message: newMessage,
      });
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.log("error in sending message", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getConversation = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: id },
        { sender: id, receiver: req.user.id },
      ],
    }).sort("createdAt");

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log("error in getting conversation", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
