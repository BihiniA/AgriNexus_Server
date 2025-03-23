import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regex pattern to match a basic phone number format (e.g., 123-456-7890 or 1234567890)
        return /^\d{10}$/.test(value);
      },
      message: "Customer phone must be a valid 10-digit number.",
    },
  },
  total_amount: {
    type: Number,
    required: true,
    //validating the amount
    validate: {
      validator: function (value) {
        return !isNaN(value) && value % 1 !== 0; // Checks if it's a float
      },
      message: "Total amount must be a float.",
    },
  },
  order_status: {
    type: String,
    required: true,
    enum: ["Processing", "Dispatched", "Delivered", "Cancelled"],
  },
  order_date: {
    type: Date,
    required: true,
  },
});

const OrderItems = mongoose.model("OrderItems", orderItemSchema);
export default OrderItems;
