const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Done"],
    default: "To-Do",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project" 
  },
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Comment" 
  }],
  attachments: [String], // URLs for files uploaded
  dependencies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Task" 
  }], // Task dependencies
  timeLogs: [
    {
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
      startTime: Date,
      endTime: Date,
      totalTime: Number, // Time calculated in hours or minutes
    },
  ],
  deadline: Date,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date,
    default: Date.now
  },
});

// Middleware to automatically update `updatedAt` on save
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
