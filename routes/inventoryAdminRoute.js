import express from "express";

import {
    create,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
} from "../controller/inventoryAdminController.js";

const route = express.Router();

route.post("/inventory", create);
route.get("/inventories", getAllInventories);
route.get("/inventories/:id", getInventoryById);
route.put("/update/inventory/:id", updateInventory);
route.delete("/delete/inventory/:id", deleteInventory);

export default route;