import express from "express";
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery
} from "../controller/deliveryController.js";

const router = express.Router();

// Create a new delivery
router.post("/create", createDelivery);

// Get all deliveries
router.get("/getall", getAllDeliveries);

// Get a specific delivery by ID
router.get("/:deliveryId", getDeliveryById);

// Update a delivery by ID
router.put("/delivery/:deliveryId", updateDelivery);

// Delete a delivery by ID
router.delete("/delivery/:deliveryId", deleteDelivery);

export default router;
