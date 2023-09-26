import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    // eslint-disable-next-line no-undef
    await mongoose.connect(
      process.env.DATABASE_URI || "mongodb://0.0.0.0:27017/QueryMate"
    );
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
