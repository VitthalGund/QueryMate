import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Chat = new Schema({
  chatId: {
    type: String,
    ref: "chat",
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
});

export const ChatMessage = mongoose.model("Chat", Chat);
