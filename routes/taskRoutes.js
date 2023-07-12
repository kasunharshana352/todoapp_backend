const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create task route
router.post("/", authMiddleware, taskController.createTask);

// Get all tasks route
router.get("/", authMiddleware, taskController.getAllTasks);

// Get Completed tasks route
router.get("/completed", authMiddleware, taskController.getCompletedTasks);

// Get Not Completed tasks route
router.get(
  "/notcompleted",
  authMiddleware,
  taskController.getNotCompletedTasks
);

// Get task by ID route
router.get("/:id", authMiddleware, taskController.getTask);

// Update task route
router.put("/:id", authMiddleware, taskController.updateTask);

// Delete task route
router.delete("/:id", authMiddleware, taskController.deleteTask);

// Complete task route
router.put("/:id/complete", authMiddleware, taskController.completeTask);

// Not Complete task route
router.put("/:id/notcomplete", authMiddleware, taskController.notCompleteTask);

module.exports = router;
