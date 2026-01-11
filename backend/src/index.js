import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import path from "path";
import express from "express";

dotenv.config({
  path: "./.env",
});


const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend','dist','index.html'));
});
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  });
