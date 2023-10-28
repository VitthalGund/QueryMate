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
  },
  refreshToken: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  socialLogin: {
    type: Boolean,
  },
});

export const User = mongoose.model("User", userSchema);
