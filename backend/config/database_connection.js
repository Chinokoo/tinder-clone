import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    process.exit(1); //0 means success, 1 means failure
  }
};
