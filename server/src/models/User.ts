import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userProfileImage: {
    type: Buffer,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
