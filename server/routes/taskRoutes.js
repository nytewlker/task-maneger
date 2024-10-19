const express = require('express');
const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controller/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, authorizeRoles('Admin', 'Manager'), createTask);
router.get('/project/:projectId', protect, getTasksByProject);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, authorizeRoles('Admin', 'Manager'), updateTask);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteTask);

module.exports = router;
