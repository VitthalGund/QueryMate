import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Message = new Schema({
  chatId: {
    type: String,
    ref: "chat",
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: Object || Array,
  },
});

export const ChatMessage = mongoose.model("Message", Message);
