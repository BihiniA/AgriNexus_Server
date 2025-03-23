import express from "express";

import {
    create,
    getAllOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem,
} from "../controller/orderItemAdminController.js";

const route = express.Router();

route.post("/orderitem", create);
route.get("/orderitems", getAllOrderItems);
route.get("/orderitems/:id", getOrderItemById);
route.put("/update/orderitem/:id", updateOrderItem);
route.delete("/delete/orderitem/:id", deleteOrderItem);

export default route;