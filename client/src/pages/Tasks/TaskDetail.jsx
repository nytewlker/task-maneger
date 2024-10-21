// src/pages/TaskDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${id}`);
        setTask(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching task', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`/api/tasks/${id}`, { status });
      alert('Task status updated!');
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>

      <div>
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleStatusUpdate}>Update Status</button>
      </div>
    </div>
  );
};

export default TaskDetail;
