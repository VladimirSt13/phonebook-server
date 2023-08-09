import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDb = async () => {
  return mongoose.connect(process.env.MONGO_URL);
};
