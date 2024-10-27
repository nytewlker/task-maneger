import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  const handleUpdateTask = async (taskId, status) => {
    try {
      await axios.patch(`/api/tasks/${taskId}/status`, { status });
      alert('Task status updated');
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  return (
    <div>
      <h2>All Projects</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Team Members</th>
            <th>Tasks</th>
            <th>Task Status</th>
            <th>Update Task</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.teamMembers.join(', ')}</td>
              <td>{project.tasks.map(task => task.description).join(', ')}</td>
              <td>{project.tasks.map(task => task.status).join(', ')}</td>
              <td>
                {project.tasks.map(task => (
                  <Button
                    key={task.id}
                    onClick={() => handleUpdateTask(task.id, task.status === 'pending' ? 'completed' : 'pending')}
                  >
                    {task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewProjects;
