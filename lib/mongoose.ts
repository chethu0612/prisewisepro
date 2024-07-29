import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB Connection Error:', error);
    throw error; // Rethrow the error after logging
  }
};
