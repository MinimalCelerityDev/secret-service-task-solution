import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import secretsRoutes from "../backend/routes/secret"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//  all the middlewars( all of them:) )
app.use(express.json());
app.use(cors());

// Registration of the routes
app.use("/api/secret", secretsRoutes);

// Here is the connection with MongoDb
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB succesfully");
    app.listen(PORT, () => console.log(`Backend is running on this port :  ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error, try again, it will work", err);
  });
