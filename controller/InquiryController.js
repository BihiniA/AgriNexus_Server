import Inquiries from "../model/inquiryModel.js";

// Create a New Inquiry
export const createInquiry = async (req, res) => {
    try {
        // Create a new inquiry object using data from the request body
        const newInquiry = new Inquiries(req.body);

        // Check if an inquiry already exists for this plant (based on plant name)
        const inquiryExist = await Inquiries.findOne({ plantName: newInquiry.plantName });
        if (inquiryExist) {
            return res.status(400).json({ message: "Inquiry for this plant already exists." });
        }

        // Save the new inquiry data to the database
        const savedInquiry = await newInquiry.save();

        // Return a success response with the saved inquiry data
        res.status(200).json({ message: "Inquiry created successfully.", data: savedInquiry });
    } catch (error) {
        // If there was an error, return an error response
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all Inquiries for Admin
export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiries.find();
        res.status(200).json({ inquiries });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Admin Respond to Inquiry
export const respondToInquiry = async (req, res) => {
    try {
        const { inquiryId, responseMessage } = req.body;

        // Find the inquiry by its ID
        const inquiry = await Inquiries.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found." });
        }

        // Update the inquiry with the admin's response and status
        inquiry.reply = responseMessage;
        inquiry.status = "Responded"; // You could also use 'Pending' or 'Closed' statuses

        // Save the updated inquiry
        await inquiry.save();

        res.status(200).json({ message: "Response added successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get specific Inquiry by ID for Admin to view
export const getInquiryById = async (req, res) => {
    try {
        const { inquiryId } = req.params;

        const inquiry = await Inquiries.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found." });
        }

        res.status(200).json({ inquiry });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete an Inquiry
export const deleteInquiry = async (req, res) => {
    try {
        const { inquiryId } = req.params;

        // Find the inquiry by its ID and delete it
        const inquiry = await Inquiries.findByIdAndDelete(inquiryId);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found." });
        }

        res.status(200).json({ message: "Inquiry deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update Inquiry (Admin response or change the status)
export const updateInquiry = async (req, res) => {
    try {
        const { inquiryId } = req.params;
        const { reply, status } = req.body; // Fields to update (reply, status, etc.)

        // Find the inquiry by its ID
        const inquiry = await Inquiries.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found." });
        }

        // Update the inquiry's reply and status (or other fields as needed)
        inquiry.reply = reply || inquiry.reply;
        inquiry.status = status || inquiry.status; // Can set status to 'Responded', 'Pending', 'Closed', etc.

        // Save the updated inquiry
        await inquiry.save();

        res.status(200).json({ message: "Inquiry updated successfully.", inquiry });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


