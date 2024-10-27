import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AssignTeam = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await axios.get('/api/users');
      const projectResponse = await axios.get('/api/projects');
      setUsers(userResponse.data);
      setProjects(projectResponse.data);
    };
    fetchData();
  }, []);

  const handleAssignTeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/projects/${selectedProject}/assign`, { userId: selectedUser });
      alert('Team member assigned successfully');
    } catch (error) {
      console.error('Error assigning team member', error);
    }
  };

  return (
    <div>
      <h2>Assign Team Members</h2>
      <Form onSubmit={handleAssignTeam}>
        <Form.Group controlId="projectSelect">
          <Form.Label>Select Project</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedProject(e.target.value)}>
            <option>Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="userSelect">
          <Form.Label>Select User</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedUser(e.target.value)}>
            <option>Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Assign User
        </Button>
      </Form>
    </div>
  );
};

export default AssignTeam;
