import express from "express";
import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
} from "../controller/itemController.js";

const router = express.Router();

router.post("/create", createItem);
router.get("/getall", getAllItems);
router.get("/:itemId", getItemById);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);

export default router;