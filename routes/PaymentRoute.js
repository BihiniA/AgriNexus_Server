import express from "express";

import {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
} from "../controller/Paymentcontroller.js";  // Update with the correct path to the payment controller

const route = express.Router();

// Route for creating a new payment
route.post("/payment", createPayment);

// Route for getting all payment records
route.get("/payments", getAllPayments);

// Route for getting a specific payment by ID
route.get("/payments/:id", getPaymentById);

// Route for updating payment details
route.put("/update/payment/:id", updatePayment);

// Route for deleting a payment record
route.delete("/delete/payment/:id", deletePayment);

export default route;
