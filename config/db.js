import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    console.log('MongoDB connected successfully');
    return db; // Return the connected database object
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export default connectDB;