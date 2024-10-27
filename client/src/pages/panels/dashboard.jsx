import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const Dashboard = ({ userRole }) => {
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [projects, setProjects] = useState([]); // Placeholder for project data
  const [tasks, setTasks] = useState([]); // Placeholder for task data

  // Simulate fetching data (frontend only)
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // For simplicity, adding hardcoded sample data for projects and tasks
      setProjects([
        { _id: 1, name: 'Project Alpha', status: 'In Progress', isActive: true },
        { _id: 2, name: 'Project Beta', status: 'Completed', isActive: false },
        { _id: 3, name: 'Project Gamma', status: 'Not Started', isActive: true }
      ]);

      setTasks([
        { _id: 1, title: 'Task 1', projectName: 'Project Alpha', status: 'In Progress' },
        { _id: 2, title: 'Task 2', projectName: 'Project Beta', status: 'Completed' },
        { _id: 3, title: 'Task 3', projectName: 'Project Gamma', status: 'Pending' }
      ]);

      setLoading(false);
    }, 1500); // Simulated delay for data fetching
  }, []);

  return (
    <Container className="dashboard mt-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#343a40' }}>
        Dashboard Overview
      </h1>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Projects Section */}
      <Row className="mb-5">
        <Col className="text-center">
          <h3 style={{ fontSize: '1.8rem', color: '#007bff' }}>Projects Overview</h3>
          <p className="lead">{userRole === 'Admin' ? 'All Projects' : 'Your Assigned Projects'}</p>
        </Col>
      </Row>
      <Row>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col md={4} className="mb-4" key={project._id}>
              <Card className="shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' }}>{project.name}</Card.Title>
                  <Card.Text>Status: {project.status}</Card.Text>
                  <Card.Text>Active: {project.isActive ? 'Yes' : 'No'}</Card.Text>
                  <Button variant="primary" href={`/projects/${project._id}`} style={{ borderRadius: '20px' }}>
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No projects available.</p>
          </Col>
        )}
      </Row>

      {/* Tasks Section */}
      <Row className="mt-5">
        <Col className="text-center">
          <h3 style={{ fontSize: '1.8rem', color: '#007bff' }}>Tasks Overview</h3>
          <p className="lead">Your Assigned Tasks</p>
        </Col>
      </Row>
      <Row>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col md={4} className="mb-4" key={task._id}>
              <Card className="shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' }}>{task.title}</Card.Title>
                  <Card.Text>Project: {task.projectName}</Card.Text>
                  <Card.Text>Status: {task.status}</Card.Text>
                  <Button variant="secondary" style={{ borderRadius: '20px' }}>View Task</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No tasks available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
