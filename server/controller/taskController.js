const Task = require('../model/Task');
const Project = require('../model/Project');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (only Manager or Admin)
exports.createTask = async (req, res) => {
  const { title, description, priority, assignee, project, deadline } = req.body;

  try {
    // Check if project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(400).json({ message: 'Project not found' });
    }

    // Create a new task
    const task = new Task({
      title,
      description,
      priority,
      assignee,
      project,
      deadline,
    });

    // Save task
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignee comments dependencies timeLogs.userId');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignee comments dependencies timeLogs.userId');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  const { title, description, status, priority, assignee, deadline, attachments, dependencies } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignee = assignee || task.assignee;
    task.deadline = deadline || task.deadline;
    task.attachments = attachments || task.attachments;
    task.dependencies = dependencies || task.dependencies;

    // Save updated task
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
