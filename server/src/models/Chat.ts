import mongoose from "mongoose";
const Schema = mongoose.Schema;
// eslint-disable-next-line @typescript-eslint/no-var-requires
import id from "mongoose-shortid-nodeps";

const Chat = new Schema({
  chatId: id,
  title: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: "NO File",
  },
  passage: {
    type: String,
    required: true,
  },
  multi: {
    type: Boolean,
    default: false,
  },
});

export const UserChat = mongoose.model("Chat", Chat);
