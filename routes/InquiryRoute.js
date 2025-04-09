import express from "express";
import {
  createInquiry,
  getAllInquiries,
  respondToInquiry,
  getInquiryById,
  deleteInquiry,
  updateInquiry ,
} from "../controller/InquiryController.js";

const router = express.Router();

// Create a new inquiry
router.post("/create", createInquiry);

// Get all inquiries (admin)
router.get("/getall", getAllInquiries);

// Get a specific inquiry by ID
router.get("/:inquiryId", getInquiryById);

// Admin responds to an inquiry
router.put("/respond", respondToInquiry);

router.delete("/inquiry/:inquiryId", deleteInquiry);
router.put("/inquiry/:inquiryId", updateInquiry);

export default router;
