import mongoose from 'mongoose';

export let isDbConnected = false;

const connectDB = async () => {
  mongoose.set('bufferCommands', false);

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set — history will not be saved');
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isDbConnected = false;
    await mongoose.disconnect().catch(() => {});
    console.warn(`MongoDB unavailable: ${error.message}`);
    console.warn('Server running without database — analysis works, history disabled');
    return false;
  }
};

export default connectDB;
