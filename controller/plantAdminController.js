import Plants from "../model/plantAdminModel.js";

// Create the New Plant
export const create = async (req, res) => {
    try {
        const newPlant = new Plants(req.body);

        const plantExist = await Plants.findOne({ plantname: newPlant.plantname });
        if (plantExist) {
            return res.status(400).json({ message: "Plant already exists." });
        }
        // Save the new plant data
        const savedData = await newPlant.save();

        res.status(200).json({ message: "Plant created successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View All Plants with Details
export const getAllPlants = async (req, res) => {
    try {
        const plantData = await Plants.find();

        // If no plants are found, return a 404 message
        if (plantData.length === 0) {
            return res.status(404).json({ message: "Plant data not found." });
        }

        res.status(200).json(plantData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View Plant By Id
export const getPlantById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Received ID:", id);
        const plantExist = await Plants.findById(id);
        if (!plantExist) {
            return res.status(404).json({ message: "Plant not found." });
        }
        res.status(200).json(plantExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


//  Update Plant Detail
export const updatePlant = async (req, res) => {
    try {
        const { id } = req.params;


        const plantExist = await Plants.findById(id);
        if (!plantExist) {
            return res.status(404).json({ message: "Plant not found." });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }
        const updatedPlant = await Plants.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            message: "Plant details updated successfully.",
            updatedPlant,
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};


// Delete the Plant
export const deletePlant = async (req, res) => {
    try {
        const id = req.params.id;
        const plantExist = await Plants.findById(id);
        if (!plantExist) {
            return res.status(404).json({ message: "Plant not found." });
        }
        await Plants.findByIdAndDelete(id);
        res.status(200).json({ message: "Plant Details deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};