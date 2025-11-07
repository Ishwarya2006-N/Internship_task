import express from "express";
import axios from "axios";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Error fetching product" });
  }
});

export default router;
