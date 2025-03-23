import Inventories from "../model/inventoryAdminModel.js";  //connecting the model to controller

// Create the New Inventory
export const create = async (req, res) => {
    try {
        const newInventory = new Inventories(req.body);

        const inventoryExist = await Inventories.findOne({ inventoryname: newInventory.inventoryname });
        if (inventoryExist) {
            return res.status(400).json({ message: "Inventory already exists." });
        }
        // Save the new inventory data
        const savedData = await newInventory.save();

        res.status(200).json({ message: "Inventory created successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View All Inventories with Details
export const getAllInventories = async (req, res) => {
    try {
        const InventoryData = await Inventories.find();

        // If no Inventorys are found, return a 404 message
        if (InventoryData.length === 0) {
            return res.status(404).json({ message: "Inventory data not found." });
        }

        res.status(200).json(InventoryData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View Inventory By Id
export const getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Received ID:", id);
        const inventoryExist = await Inventories.findById(id);
        if (!inventoryExist) {
            return res.status(404).json({ message: "Inventory not found." });
        }
        res.status(200).json(inventoryExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


//  Update Inventory Detail
export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;


        const inventoryExist = await Inventories.findById(id);
        if (!inventoryExist) {
            return res.status(404).json({ message: "Inventory not found." });
        }


        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }

        const updateInventory = await Inventories.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            message: "Inventory details updated successfully.",
            updateInventory,
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};


// Delete the Inventory
export const deleteInventory = async (req, res) => {
    try {
        const id = req.params.id;
        const inventoryExist = await Inventories.findById(id);
        if (!inventoryExist) {
            return res.status(404).json({ message: "Inventory not found." });
        }
        await Inventories.findByIdAndDelete(id);
        res.status(200).json({ message: "Inventory Details deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};