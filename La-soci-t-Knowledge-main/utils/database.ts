import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  // Mangodb connection
  const MONGODB_URI: any = process.env.MONGODB_URI;
  // Test if connection was successful
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  // Connect to MongoDB
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "ecommerce",
    });
    // set isConnected to true
    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
