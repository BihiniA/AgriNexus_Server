import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({

    itemName: {

        type: String,

        required: true

    },

    itemType: {

        type: String,

        required: true

    },

    itemQuantity: {

        type: Number,

        required: true

    },

    itemPrice: {

        type: Number,

        required: true

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

const Item = mongoose.model("Item", itemSchema);

export default Item;

