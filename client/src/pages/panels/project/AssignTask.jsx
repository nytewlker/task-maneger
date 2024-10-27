import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AssignTask = () => {
  const [tasks, setTasks] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/projects/${selectedProject}/tasks`, { task: selectedTask });
      alert('Task assigned successfully');
    } catch (error) {
      console.error('Error assigning task', error);
    }
  };

  return (
    <div>
      <h2>Assign Tasks</h2>
      <Form onSubmit={handleAssignTask}>
        <Form.Group controlId="projectSelect">
          <Form.Label>Select Project</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedProject(e.target.value)}>
            <option>Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="taskInput">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Assign Task
        </Button>
      </Form>
    </div>
  );
};

export default AssignTask;
