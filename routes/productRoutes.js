import express from "express";

import {
  create,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();

// Route to create a new product
// Method: POST
// Endpoint: /product
route.post("/product", create);
// Route to retrieve all products
// Method: GET
// Endpoint: /products
route.get("/products", getAllProducts);
// Route to retrieve a single product by its ID
// Method: GET
// Endpoint: /products/:id
route.get("/products/:id", getProductById);
// Route to update an existing product by its ID
// Method: PUT
// Endpoint: /update/product/:id
route.put("/update/product/:id", updateProduct);
// Route to delete a product by its ID
// Method: DELETE
// Endpoint: /delete/product/:id
route.delete("/delete/product/:id", deleteProduct);

export default route;