import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockUserPath = path.join(__dirname, "../mockUser.json");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await fs.readFile(mockUserPath, "utf-8");
    const mockUser = JSON.parse(data);

    if (email === mockUser.email && password === mockUser.password) {
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
        },
        token: "fake-jwt-token-123", // fake token for frontend
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get profile route
router.get("/profile", async (req, res) => {
  try {
    const data = await fs.readFile(mockUserPath, "utf-8");
    const mockUser = JSON.parse(data);
    res.json({ success: true, user: mockUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
