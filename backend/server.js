import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ensureMockUser } from "./mockUser.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure mock user exists
await ensureMockUser();

// Routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/products", productRoutes);
// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
