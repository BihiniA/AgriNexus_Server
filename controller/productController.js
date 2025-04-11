// Importing the Product model from the model folder
import Products from "../model/productModel.js";

// Create Products
export const create = async (req, res) => {
    try {
         // Create a new product instance with data from the request body
        const newProduct = new Products(req.body);
          // Check if a product with the same name already exists in the database
        const productExist = await Products.findOne({ name: newProduct.name });
        if (productExist) {
            return res.status(400).json({ message: "Product already exists." });
        }
         // Save the new product to the database
        const savedData = await newProduct.save();
        // res.status(200).json(savedData);
        res.status(200).json({ message: "Product Created successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View All Product with Details
export const getAllProducts = async (req, res) => {
    try {
        const productData = await Products.find();

        // If no product are found, return a 404 message
        if (productData.length === 0) {
            return res.status(404).json({ message: "Product data not found." });
        }

        res.status(200).json(productData);
         // Handle server errors
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get Product By ID
export const getProductById = async (req, res) => {
    try {
         // Retrieve all product documents from the database
        const { id } = req.params;
        console.log("id", id)
        const productExist = await Products.findById(id);
        // If no products are found, return a not found message
        if (!productExist) {
            return res.status(404).json({ message: "Product not found." });
        }
         // Respond with the list of products
        res.status(200).json(productExist);
    } catch (error) {
         // Handle server errors
        res.status(500).json({ errorMessage: error.message });
    }
};

//  Update Prouct Detail
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productExist = await Products.findById(id);
        if (!productExist) {
            return res.status(404).json({ message: "Product not found." });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            message: "Product details updated successfully.",
            updatedProduct,
        });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};

// Delete the Product
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Products.findById(id);
        if (!productExist) {
            return res.status(404).json({ message: "Product not found." });
        }
        await Products.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Details deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};