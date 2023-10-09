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
  fileName: {
    type: String,
    required: true,
  },
  passage: {
    type: String,
    required:true
  }
});

export const UserChat = mongoose.model("Chat", Chat);
