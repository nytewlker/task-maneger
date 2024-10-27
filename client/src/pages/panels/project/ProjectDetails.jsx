import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ProjectDetails = ({ projectId, onClose }) => {
  const [project, setProject] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [newTeamMember, setNewTeamMember] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTimeLogModal, setShowTimeLogModal] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/projects/getproject/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/projects/${projectId}/tasks`,
        { title: newTask.title, description: newTask.description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject({ ...project, tasks: [...project.tasks, response.data] });
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddTeamMember = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/projects/${projectId}/addMember`,
        { name: newTeamMember },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject({ ...project, teamMembers: [...project.teamMembers, response.data] });
      setNewTeamMember('');
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject({
        ...project,
        tasks: project.tasks.map((task) =>
          task._id === taskId ? { ...task, status } : task
        ),
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogTime = async () => {
    const totalTime = (new Date(endTime) - new Date(startTime)) / (1000 * 60);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/tasks/${selectedTask._id}/timelogs`,
        { startTime, endTime, totalTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowTimeLogModal(false);
      alert('Time logged successfully');
    } catch (error) {
      console.error('Error logging time:', error);
    }
  };

  const handleAddComment = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject({
        ...project,
        tasks: project.tasks.map((task) =>
          task._id === taskId
            ? { ...task, comments: [...task.comments, response.data] }
            : task
        ),
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleFileUpload = async (taskId) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/attachments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <Container className="bg-light p-4 rounded">
      <h2 className="text-center mb-4">Project Details</h2>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
          <Card.Text><strong>Status:</strong> {project.status}</Card.Text>
          <Button variant="warning" className="mr-2" onClick={onClose}>Edit</Button>
          <Button variant="secondary" onClick={onClose}>Back to Projects</Button>
        </Card.Body>
      </Card>

      {/* Add Task */}
      <h3>Add Task</h3>
      <Form className="mb-4">
        <Form.Group controlId="taskTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="taskDescription">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
      </Form>

      {/* Add Team Member */}
      <h3>Add Team Member</h3>
      <Form className="mb-4">
        <Form.Group controlId="teamMemberName">
          <Form.Label>Team Member Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter team member name"
            value={newTeamMember}
            onChange={(e) => setNewTeamMember(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddTeamMember}>Add Team Member</Button>
      </Form>

      {/* Task List */}
      <h3>Tasks</h3>
      <Row>
        {project.tasks.map((task) => (
          <Col md={6} lg={4} key={task._id}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text><strong>Status:</strong> {task.status}</Card.Text>
                <Button
                  variant={task.status === 'To-Do' ? 'info' : 'success'}
                  className="mr-2"
                  onClick={() => handleUpdateTaskStatus(task._id, task.status === 'To-Do' ? 'In Progress' : 'Done')}
                >
                  {task.status === 'To-Do' ? 'Start Task' : 'Mark as Done'}
                </Button>
                <Button variant="outline-secondary" onClick={() => setSelectedTask(task)}>Log Time</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Time Log Modal */}
      <Modal show={showTimeLogModal} onHide={() => setShowTimeLogModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogTime}>Log Time</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProjectDetails;
