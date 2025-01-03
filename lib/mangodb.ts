import { MongoClient, Db } from 'mongodb';

const MONGODB_URI =  'mongodb://127.0.0.1:27017/maktab90';
const DB_NAME = 'maktab90';

export const connectToDatabase = async (): Promise<Db> => {
    try {
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      console.log("Connected to MongoDB");
      return client.db(DB_NAME);
    } catch (error) {
      console.error("MongoDB connection failed", error);
      throw error; 
    }
  };