const Task = require('../models/task.model');

// Create a task
const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        // Default status if not provided
        const taskStatus = status || "pending";

        // Optional: validate status
        const allowedStatuses = ["pending", "in-progress", "completed"];
        if (!allowedStatuses.includes(taskStatus)) {
            return res.status(400).json({ message: "Invalid task status" });
        }

        const newTask = await Task.create({ title, description, status: taskStatus });
        return res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        // Validate status if provided
        if (status) {
            const allowedStatuses = ["pending", "in-progress", "completed"];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ message: "Invalid task status" });
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
