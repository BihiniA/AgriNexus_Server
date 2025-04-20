import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import inventoryAdminRoute from "./routes/inventoryAdminRoute.js";   //Adding the router
import itemRoute from "./routes/itemRoute.js";


const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT} `);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", inventoryAdminRoute);
app.use("/api", itemRoute);
