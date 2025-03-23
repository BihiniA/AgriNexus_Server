import mongoose from "mongoose"

//Implementing the model
const inventorySchema = new mongoose.Schema({
        inventoryname: {
                type: String,
                required: true
        },
        inventorytype: {
                type: String,
                required: true,
                enum: ["Garden Tools", "Fertilizer", "Seeds"]
        },
        quantity: {
                type: Number,
                required: true,
                validate: {
                        validator: Number.isInteger,
                        message: '{VALUE} is not an integer value',
                }
        },
                price: {
                        type: String,
                        required: true
                },
                supplier: {
                        type: String,
                        required: true
                },
                expierydate: {
                        type: Date,
                        required: true
                },
        });

const Inventories = mongoose.model("Inventories", inventorySchema);
export default Inventories;