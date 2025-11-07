import axios from "axios";

export const getAllProducts = async (req, res, next) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};
