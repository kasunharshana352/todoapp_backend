const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Signup route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Login route
router.get("/profile", authMiddleware, authController.getUser);

module.exports = router;
