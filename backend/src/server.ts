import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config"; // এইটা আপনার উপরের config.ts ফাইল
import routes from "./modules/routes";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/",(req:Request,res:Response)=>{
  res.send({
    success: true,
    message: "Welcome to B5A3 Mongoose Master",
  });
})

// Start Express Server
async function startServer() {
  try {
    await mongoose.connect(config.database_url);
    console.log("✅ MongoDB Connected Successfully");

    app.listen(config.port, () => {
      console.log(`✅ Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

startServer();
