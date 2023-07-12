const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "secretKey"
    );

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secretKey"
    );

    res
      .status(200)
      .json({ token, userId: user._id, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve user information from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  deleteUser,
};
