import express from 'express';

import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
} from '../controller/userController.js';

const route = express.Router();

// Define routes for user management
route.post("/user", createUser);
route.get("/users", getAllUsers);
route.get("/users/:id", getUserById);
route.put("/update/user/:id", updateUser);
route.delete("/delete/user/:id", deleteUser);
route.post("/user/login", loginUser);

export default route;
