const Task = require("../models/task.model");

// Allowed statuses
const allowedStatuses = ["pending", "in-progress", "completed"];

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Validate required field
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    // Validate status
    const taskStatus = status || "pending";
    if (!allowedStatuses.includes(taskStatus)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    // Create new task (attach user if you have auth middleware)
    const newTask = await Task.create({
      title,
      description,
      status: taskStatus,
      priority,
      dueDate,
      user: req.user?.id || null, // if authentication is used
    });

    return res.status(201).json({
      message: "✅ Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("❌ Create Task Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    // If user-based: Task.find({ user: req.user.id })
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("❌ Get Tasks Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // Validate status if provided
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "✅ Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("❌ Update Task Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "🗑️ Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("❌ Delete Task Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
