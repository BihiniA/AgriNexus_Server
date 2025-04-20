import Delivery from "../model/deliveryModel.js";

// Create a New Delivery
export const createDelivery = async (req, res) => {
    try {
        const newDelivery = new Delivery(req.body);
        const savedDelivery = await newDelivery.save();
        res.status(200).json({ message: "Delivery created successfully.", data: savedDelivery });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get All Deliveries
export const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json({ deliveries });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get Delivery by ID
export const getDeliveryById = async (req, res) => {
    try {
        const { deliveryId } = req.params;
        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }
        res.status(200).json({ delivery });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update Delivery
export const updateDelivery = async (req, res) => {
    try {
        const { deliveryId } = req.params;
        const updatedDelivery = await Delivery.findByIdAndUpdate(deliveryId, req.body, { new: true });
        if (!updatedDelivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }
        res.status(200).json({ message: "Delivery updated successfully.", updatedDelivery });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete Delivery
export const deleteDelivery = async (req, res) => {
    try {
        const { deliveryId } = req.params;
        const deletedDelivery = await Delivery.findByIdAndDelete(deliveryId);
        if (!deletedDelivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }
        res.status(200).json({ message: "Delivery deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
