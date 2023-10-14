import mongoose from "mongoose";
const Schema = mongoose.Schema;
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

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
  Date: {
    type: String,
    default: formatDate(new Date()),
  },
});

export const ChatMessage = mongoose.model("Message", Message);
