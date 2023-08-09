import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app.js";
import { connectDb } from "./src/db/connection.js";

const PORT = process.env.PORT || 3003;

export const start = async () => {
  try {
    await connectDb();

    app.listen(PORT, (error) => {
      if (error) {
        console.log("error in server launch:", error);
        process.exit(1);
      }
      console.log(`Database connection successful. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
    process.exit(1);
  }
};

start();
