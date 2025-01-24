import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message field is required" });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();

      const populatedConversation = await Conversation.findById(
        gotConversation._id
      ).populate("messages");

      return res.status(200).json({
        message: "Message sent successfully",
        conversation: populatedConversation, 
      });
    } else {
      return res.status(500).json({ message: "Failed to create message" });
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};



export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },

    }).populate("messages");
    return res.status(200).json(conversation?.messages);
    //  console.log(conversation);
  } catch (error) {
    console.log("Error in getMessage:", error);
    
  }
 }