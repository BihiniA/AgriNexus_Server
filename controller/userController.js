import User from '../model/userModel.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { email, nic, password, type } = req.body;

    // Check for duplicate email or NIC
    const existingUser = await User.findOne({ $or: [{ email }, { nic }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or NIC already exists' });
    }

    // Check admin email/password rule
    if (type === 'admin' && email !== 'admin@admin.com' && password === 'adminAA@123') {
      return res.status(400).json({ message: 'Admin has a fixed email' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
};

// View User By Id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id);
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check for admin login
    if (email === "admin@admin.com" && password === "adminAA@123") {
      return res.status(200).json({ type: "admin", email });
    }

    // Search regular user
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success
    return res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      type: user.type, // 'customer', 'worker', etc.
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

