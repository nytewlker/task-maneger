import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Alert, Container, Spinner } from 'react-bootstrap';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data);
      } catch (error) {
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    if (user.role === 'Team Member') {
      navigate(`/tasks/project/${projectId}`); // Redirect to the task component for that project
    } else {
      // Optionally handle manager or admin views, e.g., redirecting to a detailed project view
      navigate(`/projects/${projectId}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Projects</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <ul className="list-group">
        {projects.map((project) => (
          <li key={project._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to="#" onClick={() => handleProjectClick(project._id)}>
              {project.name}
            </Link>
            <span>{project.teamMembers.length} Members</span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Projects;
