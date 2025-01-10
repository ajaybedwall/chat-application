import express from "express";
import "dotenv/config"; 
import connectDB from "./config/database.js"; 
import userRoute from "./routes/userRoutes.js"; 


const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use("/api/v1/user", userRoute);

// Start the server
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running at http://localhost:${PORT}`);
});
