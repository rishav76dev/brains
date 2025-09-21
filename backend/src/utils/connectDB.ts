import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Connected Successfully");
    console.log(process.env.MONGO_URI)
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

export default connectDB;
