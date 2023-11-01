import { Product } from "../models/productModel.js";

export const addProduct = async (req, res) => {
  if (req.method === "GET") {
    return res.status(400).json({ error: "Bad request" });
  }

  const { name, listedBy, description, price } = req.body;

  if (!name || !listedBy || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = new Product({
      name,
      listedBy,
      description,
      price,
    });

    const savedProduct = await product.save();

    return res
      .status(201)
      .json({ message: "Product added", data: savedProduct });
  } catch (error) {
    return res.status(500).json({ error: "Product could not be added" });
  }
};

export const addBid = async (req, res) => {
  if (req.method === "GET") {
    return res.status(400).json({ error: "Bad request" });
  }
  const { productId, bidder, amount } = req.body;
  if (!productId || !bidder || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.bids.push({ bidder, amount });
    const updatedProduct = await product.save();
    return res.status(200).json({ message: "Bid added", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error: "Bid could not be added" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product Not Found" });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching products" });
  }
};
