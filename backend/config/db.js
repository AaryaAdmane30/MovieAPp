import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected  To MongoDb 🔶");
  } catch (error) {
    console.error(`Error: ${error.message} `);
    process.exit(1);
  }
};
export default connectDB;
