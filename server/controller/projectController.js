const Project = require('../model/Project');
const User = require('../model/User');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (only Manager or Admin)
exports.createProject = async (req, res) => {
    const { name, description, manager, teamMembers } = req.body;

    try {
        // Check if manager exists
        const managerExists = await User.findById(manager);
        if (!managerExists) {
            return res.status(400).json({ message: "Manager not found" });
        }

        // Create new project
        const project = new Project({
            name,
            description,
            manager,
            teamMembers,
        });

        // Save project
        await project.save();

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (Admin, Manager)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('manager teamMembers tasks');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Get a project by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('manager teamMembers tasks');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (only Manager or Admin)
exports.updateProject = async (req, res) => {
    const { name, description, manager, teamMembers } = req.body;

    try {
        // Find project by ID
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update project details
        project.name = name || project.name;
        project.description = description || project.description;
        project.manager = manager || project.manager;
        project.teamMembers = teamMembers || project.teamMembers;

        // Save updated project
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (only Manager or Admin)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.remove();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
