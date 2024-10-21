import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', assignee: '' });
  const [filter, setFilter] = useState('all');
  const [userRole, setUserRole] = useState(''); // Role of the user (Admin, Manager, Team Member)

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Assuming the user info is stored in localStorage
        setUserRole(user.role);
        
        // Fetch all tasks for the current project (assume projectId is available)
        const projectId = 'YOUR_PROJECT_ID'; // Replace with actual project ID
        const { data } = await axios.get(`/api/tasks/project/${projectId}`);
        setTasks(data);
      } catch (error) {
        setError('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/tasks', {
        ...newTask,
        project: 'YOUR_PROJECT_ID', // Replace with actual project ID
      });
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask({ title: '', description: '', priority: 'Medium', assignee: '' });
    } catch (error) {
      setError('Error creating task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      setError('Error deleting task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.status === 'Done';
    if (filter === 'in-progress') return task.status === 'In Progress';
    if (filter === 'to-do') return task.status === 'To-Do';
    return true; // For 'all'
  });

  return (
    <Container className="mt-5">
      <h2>My Tasks</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Form for Admins and Managers to create a new task */}
      {(userRole === 'Admin' || userRole === 'Manager') && (
        <Form onSubmit={handleCreateTask} className="mb-4">
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Assignee ID"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Low">Low Priority</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                required
              />
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="mt-3">
            Create Task
          </Button>
        </Form>
      )}

      {/* Filter tasks by status */}
      <Form.Select
        aria-label="Filter tasks"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="in-progress">In Progress Tasks</option>
        <option value="to-do">To-Do Tasks</option>
      </Form.Select>

      {/* List of tasks */}
      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/tasks/${task._id}`}>
              <strong>{task.title}</strong> - <em>{task.status}</em>
            </Link>
            {(userRole === 'Admin' || userRole === 'Manager') && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Tasks;
