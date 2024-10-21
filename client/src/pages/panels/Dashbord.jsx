import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = ({ userRole }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch projects and tasks based on user role
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch projects based on user role
        const projectResponse = await axios.get('http://localhost:5000/api/projects');
        setProjects(projectResponse.data);

        // Fetch tasks based on projects
        const taskResponse = await axios.get('http://localhost:5000/api/tasks'); // You can also pass project ID to filter tasks
        setTasks(taskResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userRole]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <Container className="dashboard mt-5">
      <h1 className="text-center mb-4">Dashboard Overview</h1>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Projects Overview */}
      <Row className="mb-4">
        <Col>
          <h3>Projects Overview</h3>
          <p>{userRole === 'Admin' ? 'All Projects' : 'Your Assigned Projects'}</p>
        </Col>
      </Row>

      <Row>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col md={4} className="mb-4" key={project._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>Status: {project.status}</Card.Text>
                  <Card.Text>Active: {project.isActive ? 'Yes' : 'No'}</Card.Text>
                  <Button variant="primary" href={`/projects/${project._id}`}>
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </Row>

      {/* Tasks Overview */}
      <Row className="mt-5">
        <Col>
          <h3>Tasks Overview</h3>
        </Col>
      </Row>

      <Row>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col md={4} className="mb-4" key={task._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>Project: {task.projectName}</Card.Text>
                  <Card.Text>Status: {task.status}</Card.Text>
                  <Button variant="secondary">View Task</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
