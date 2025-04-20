import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  packageType: {
    type: String,
    enum: ['Parcel', 'Box', 'Bag'], // dropdown options
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'In Progress', 'Done', 'Cancelled'], // optional enhancement
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Delivery = mongoose.model("delivery", deliverySchema);
export default Delivery;
