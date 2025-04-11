import Product from "../models/ProductDetail.js"; // Update the path if needed

export const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const products = await Product.find({
      name: { $regex: search, $options: "i" }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};