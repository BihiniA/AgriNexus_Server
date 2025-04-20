import Item from "../model/itemModel.js";

// Create a New Item
export const createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);

        // Optional: Check if item already exists by name
        const itemExist = await Item.findOne({ itemName: newItem.itemName });
        if (itemExist) {
            return res.status(400).json({ message: "Item with this name already exists." });
        }

        const savedItem = await newItem.save();
        res.status(200).json({ message: "Item created successfully.", data: savedItem });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get All Items
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get a Specific Item by ID
export const getItemById = async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update an Item
export const updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { itemName, itemType, itemQuantity, itemPrice } = req.body;

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        // Update only if new values are provided
        item.itemName = itemName || item.itemName;
        item.itemType = itemType || item.itemType;
        item.itemQuantity = itemQuantity ?? item.itemQuantity;
        item.itemPrice = itemPrice ?? item.itemPrice;

        await item.save();
        res.status(200).json({ message: "Item updated successfully.", item });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete an Item
export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found." });
        }

        res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};