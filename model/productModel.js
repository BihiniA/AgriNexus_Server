// Importing mongoose to create a schema and interact with MongoDB
import mongoose from "mongoose"

// Importing mongoose to create a schema and interact with MongoDB
const ProductSchema = new mongoose.Schema({
   // Name of the product (e.g., "Tomato Seeds")
  name: { type: String, required: true },// Field is mandatory
   // Category of the product, must be one of the predefined options
  category: { type: String, enum: ["Seeds", "Tools", "Product", "Fertilizer"], required: true },
  // Quantity available (in units)
  quantity: { type: Number, required: true },
   // Price of the product (per unit or item)
  price: { type: Number, required: true },
   // Image URL or path (used to display product image)
  image: { type: String, required: true },
});


export default mongoose.model("Product", ProductSchema)