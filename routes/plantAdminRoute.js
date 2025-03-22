import express from "express";

import {
    create,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant,
} from "../controller/plantAdminController.js";

const route = express.Router();

route.post("/plant", create);
route.get("/plants", getAllPlants);
route.get("/plants/:id", getPlantById);
route.put("/update/plant/:id", updatePlant);
route.delete("/delete/plant/:id", deletePlant);

export default route;