const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Update user route
router.put("/", authMiddleware, userController.updateUser);

// Delete user route
router.delete("/", authMiddleware, userController.deleteUser);

module.exports = router;
