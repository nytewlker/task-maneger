import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from 'axios';

const AddEditProject = ({ projectId, onClose }) => {
  const [project, setProject] = useState({ name: '', description: '', status: '', managerId: '' });
  const [managers, setManagers] = useState([]); // List of managers
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch project details when editing
  useEffect(() => {
    if (projectId) {
      setIsEdit(true); // Set form to Edit mode
      const fetchProject = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`http://localhost:5000/api/projects/getproject/${projectId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProject(response.data); // Populate project details
        } catch (error) {
          setError('Error fetching project. Please try again.');
          console.error('Error fetching project:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [projectId, token]);

  // Fetch managers list for assigning a manager to the project
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/managers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManagers(response.data); // Update state with managers data
      } catch (error) {
        console.error('Error fetching managers:', error);
        setError('Error fetching managers. Please try again later.');
      }
    };

    fetchManagers();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for both create and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEdit) {
        // PUT request to update the project
        await axios.put(
          `http://localhost:5000/api/projects/updateproject/${projectId}`, // Correct this path if necessary
          {
              name: project.name,
              description: project.description,
              status: project.status, // Ensure this is included if needed
              manager: project.managerId, // Make sure this field matches what your backend expects
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
        setSuccess('Project updated successfully');
      } else {
        // POST request to create a new project
        await axios.post(
          'http://localhost:5000/api/projects/createproject',
          {
            name: project.name,
            description: project.description,
            manager: project.managerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccess('Project created successfully');
        setProject({ name: '', description: '', status: '', managerId: '' }); // Reset form after adding a new project
      }
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Error saving project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Universal-Container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="text-center text-light">
            <h2>{isEdit ? 'Edit Project' : 'Add Project'}</h2>
            <p className="lead">{isEdit ? 'Edit the details of your project' : 'Fill in the details to create a new project'}</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="projectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="projectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={project.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

                <Form.Group controlId="managerId">
                  <Form.Label>Select Manager</Form.Label>
                  <Form.Control
                    as="select"
                    name="managerId"
                    value={project.managerId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a manager...</option>
                    {managers.map((manager) => (
                      <option key={manager._id} value={manager._id}>
                        {manager.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

              {isEdit && (
                <Form.Group controlId="projectStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={project.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>
              )}

              <Button variant="dark" type="submit" className="mt-4 w-100" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEdit ? 'Update Project' : 'Create Project'
                )}
              </Button>
              <Button variant="secondary" className="mt-3 w-100" onClick={onClose}>
                Cancel
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddEditProject;
