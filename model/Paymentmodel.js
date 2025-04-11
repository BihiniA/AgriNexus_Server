import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    // Credit Card Payment Fields
    cdholdername: {
        type: String,
        required: true
    },
    cdtype: {
        type: String,
        required: true,
        enum: ["Visa", "MasterCard", "American Express", "Discover"]  // Card types (customize as needed)
    },
    bank: {
        type: String,
        required: true,
        enum: ["Sampath Bank", "Commercial Bank", "Hatton National Bank", "People's Bank", "Bank of Ceylon"]  // Popular Sri Lankan Banks
    },
    cdnum: {
        type: String,
        required: true,
        match: /^[0-9]{16}$/,  // Ensuring the card number is exactly 16 digits
    },
    cvv: {
        type: String,
        required: true,
        match: /^[0-9]{3}$/,  // Ensuring the CVV is exactly 3 digits
    },
    exdate: {
        type: String,
        required: true,
        match: /^(0[1-9]|1[0-2])\/\d{2}$/,  // Expiration date in MM/YY format
    },

    // User Information Fields
    mobilenumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,  // Only allows exactly 10 digits for mobile numbers
    },
    emailaddress: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Validating email format
    },
    paymentamount: {
        type: Number,
        required: true,
    },
    billingaddress: {
        type: String,
        required: false  // Optional billing address
    },
    
    // Optional Payment Method (e.g., for mobile wallets)
    paymentmethod: {
        type: String,
        enum: ["Credit/Debit Card", "eZ Cash", "Mobitel", "Dialog", "Other"],  // Mobile wallets and other methods
        required: true
    }
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
