const express = require('express');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controller/projectController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post("/createproject", protect, authorizeRoles("Admin", "Manager"), createProject);
router.get('/getallprojects', protect, getProjects);
router.get('/getproject/:id', protect, getProjectById);
router.put('/updateproject/:id', protect, authorizeRoles('Admin', 'Manager'), updateProject);
router.delete('/:id', protect, authorizeRoles('Admin', 'Manager'), deleteProject);


module.exports = router;
