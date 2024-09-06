import mongoose from 'mongoose';

let isConnected = false; // Tracks if the connection has been established

export const connectDB = async (uri: string) => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true; // Set the connection status to true
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
