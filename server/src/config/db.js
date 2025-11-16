import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed:${error}`);
    
  }
};

export default connectDB;
