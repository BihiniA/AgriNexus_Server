import Payment from "../model/Paymentmodel.js";  // Import the Payment model

// Create a new payment record
export const createPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);

        const paymentExist = await Payment.findOne({ cdnum: newPayment.cdnum });
        if (paymentExist) {
            return res.status(400).json({ message: "Payment already exists." });
        }

        // Save the new payment data
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: "Payment created successfully.", savedPayment });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View all payment records
export const getAllPayments = async (req, res) => {
    try {
        const paymentData = await Payment.find();

        // If no payments are found, return a 404 message
        if (paymentData.length === 0) {
            return res.status(404).json({ message: "Payment data not found." });
        }

        res.status(200).json(paymentData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// View a payment by ID
export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Received ID:", id);
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
            return res.status(404).json({ message: "Payment not found." });
        }
        res.status(200).json(paymentExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update payment details
export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
            return res.status(404).json({ message: "Payment not found." });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data provided for update." });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            message: "Payment details updated successfully.",
            updatedPayment,
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};

// Delete a payment record
export const deletePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
            return res.status(404).json({ message: "Payment not found." });
        }
        await Payment.findByIdAndDelete(id);
        res.status(200).json({ message: "Payment details deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
