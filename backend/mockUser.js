import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockUserPath = path.join(__dirname, "mockUser.json");

export const ensureMockUser = async () => {
  try {
    const exists = await fs
      .access(mockUserPath)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      const user = {
        id: 1,
        username: "demoUser",
        email: "demo@example.com",
        password: "123456",
      };
      await fs.writeFile(mockUserPath, JSON.stringify(user, null, 2));
      console.log("mockUser.json created successfully");
    }
  } catch (error) {
    console.error("Error ensuring mock user:", error);
  }
};

// LOGIN route with proper error handling
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
        token: "fake-jwt-token-123",
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" }); 
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

export default router;
