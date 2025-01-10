import mongoose from "mongoose";
import { Message } from "./messageModel";

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
},{timestamps:true})

export const Conversation = mongoose.model("conversation", conversationModel);