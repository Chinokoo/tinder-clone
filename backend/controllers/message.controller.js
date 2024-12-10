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
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, reciever: userId },
        { sender: userId, reciever: req.user._id },
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
