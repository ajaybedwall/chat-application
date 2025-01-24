import express from "express";
import "dotenv/config"; 
import connectDB from "./config/database.js"; 
import userRoute from "./routes/userRoutes.js"; 
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"


const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json()); 
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); 
// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoutes);




// Start the server
app.listen(PORT, () => {
  connectDB(); 
  console.log(`Server running at http://localhost:${PORT}`);
});
