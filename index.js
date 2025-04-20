import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"; 
import orderItemAdminRoute from "./routes/orderItemAdminRoute.js";
import deliveryRoute from "./routes/deliveryRoute.js";

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

app.use("/api", orderItemAdminRoute);
app.use("/api", deliveryRoute);
