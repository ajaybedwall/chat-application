import express from "express";
import "dotenv/config"; 
import connectDB from "./config/database.js"; 
import userRoute from "./routes/userRoutes.js"; 
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"
import cors from "cors";


const PORT = process.env.PORT || 5000;

const app = express();
//meadlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser())

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});




// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoutes);




// Start the server
app.listen(PORT, () => {
  connectDB(); 
  console.log(`Server running at http://localhost:${PORT}`);
});
