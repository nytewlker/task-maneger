import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    managerId: "",
  });
  const [managers, setManagers] = useState([]); // For storing available managers
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch managers from the API when the component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/auth/managers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManagers(response.data); // Update state with managers data
      } catch (err) {
        console.error('Error fetching managers', err);
        setError('Error fetching managers. Please try again later.');
      }
    };

    fetchManagers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        "http://localhost:5000/api/projects/createproject",
        {
          name: formData.projectName,
          description: formData.projectDescription,
          manager: formData.managerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Project  Successfully created ");

      // Reset form fields
      setFormData({
        projectName: "",
        projectDescription: "",
        managerId: "",
      });
    } catch (error) {
      console.error("Error creating project", error);
      setError(error.response?.data?.message || "Failed to create project. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Universal-Container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="text-center text-light">
            <h1>Create Project</h1>
            <p className="lead">
              Fill in the details to create a new project.
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {/* Success Message */}
          {success && <Alert variant="success">{success}</Alert>}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container">
            <Form onSubmit={handleCreateProject}>
              <Form.Group controlId="projectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  placeholder="Enter project name"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="projectDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="projectDescription"
                  placeholder="Enter project description"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="managerId">
                <Form.Label>Select Manager</Form.Label>
                <Form.Control
                  as="select"
                  name="managerId"
                  value={formData.managerId}
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

              <Button variant="dark" type="submit" className="mt-4 w-100" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Creating Project...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateProject;
