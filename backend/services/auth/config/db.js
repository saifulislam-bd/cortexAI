import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if the URI actually exists
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file!");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ✔`);
  } catch (error) {
    console.error(`❌Database Connection Error: ${error.message}`);
    process.exit(1); // Stop the app if it can't connect
  }
};

export default connectDB;
