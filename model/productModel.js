import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["Seeds", "Tools", "Product", "Fertilizer"], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});


export default mongoose.model("Product", ProductSchema)