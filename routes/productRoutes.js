import express from "express";

import {
  create,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();

route.post("/product", create);
route.get("/products", getAllProducts);
route.get("/products/:id", getProductById);
route.put("/update/product/:id", updateProduct);
route.delete("/delete/product/:id", deleteProduct);

export default route;