const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    // Create a new task
    const newTask = await Task.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve all tasks
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve all tasks
    const tasks = await Task.find({ user: userId, isCompleted: true });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getNotCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve all tasks
    const tasks = await Task.find({ user: userId, isCompleted: false });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    // Retrieve the task
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user.userId;

    // Find and update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    // Delete the task
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

const completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    // Find and update the task's completion status
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { isCompleted: true },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to complete task" });
  }
};

const notCompleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    // Find and update the task's completion status
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { isCompleted: false },
      { new: false }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to complete task" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  notCompleteTask,
  getCompletedTasks,
  getNotCompletedTasks,
};
