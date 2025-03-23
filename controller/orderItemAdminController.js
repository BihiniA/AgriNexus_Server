import OrderItems from "../model/orderItemAdminModel.js";

// Create the New orderitem
export const create = async (req, res) => {
    try {
        const newOrderItem = new OrderItems(req.body);

        const orderItemExist = await OrderItems.findOne({ order_id: newOrderItem.order_id });
        if (orderItemExist) {
            return res.status(400).json({ message: "OrderItem already exists." });
        }
        // Save the new OrderItems data
        const savedData = await newOrderItem.save();

        res.status(200).json({ message: "OrderItem created successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View All OrderItems with Details
export const getAllOrderItems = async (req, res) => {
    try {
        const orderItemData = await OrderItems.find();

        // If no OrderItems are found, return a 404 message
        if (orderItemData.length === 0) {
            return res.status(404).json({ message: "OrderItems data not found." });
        }

        res.status(200).json(orderItemData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View orderitem By Id
export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Received ID:", id);
        const orderItemExist = await OrderItems.findById(id);
        if (!orderItemExist) {
            return res.status(404).json({ message: "OrderItems not found." });
        }
        res.status(200).json(orderItemExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


//  Update OrderItems Detail
export const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;


        const orderItemExist = await OrderItems.findById(id);
        if (!orderItemExist) {
            return res.status(404).json({ message: "Order Items not found." });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }
        const updateOrderItem = await OrderItems.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            message: "OrderItems details updated successfully.",
            updateOrderItem,
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};


// Delete the OrderItems
export const deleteOrderItem = async (req, res) => {
    try {
        const id = req.params.id;
        const orderItemExist = await OrderItems.findById(id);
        if (!orderItemExist) {
            return res.status(404).json({ message: "OrderItems not found." });
        }
        await OrderItems.findByIdAndDelete(id);
        res.status(200).json({ message: "OrderItems Details deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};