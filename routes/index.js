const express = require("express");
const router = express.Router();

// Import individual route files
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");

// Configure routes
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

module.exports = router;
