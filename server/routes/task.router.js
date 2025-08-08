const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const isAuthenticated = require("../middlewares/isAuthenticated"); // Make sure file name matches exactly

// Routes for task management
router
  .route('/')
  .post(isAuthenticated, createTask) // POST /api/tasks → Creates a task
  .get(isAuthenticated, getTasks); // GET /api/tasks → Fetch all tasks for logged-in user

router
  .route('/:id')
  .put(isAuthenticated, updateTask) // PUT /api/tasks/:id → Updates a specific task
  .delete(isAuthenticated, deleteTask); // DELETE /api/tasks/:id → Deletes a specific task
// router.route('/delete/:id')
//   .put(isAuthenticated, updateTask) // PUT /api/tasks/:id → Updates a specific task
//   .delete(isAuthenticated, deleteTask); // DELETE /api/tasks/:id → Deletes a specific task
module.exports = router;
