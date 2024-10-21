// src/pages/ProjectDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${id}`);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <h3>Tasks</h3>
      <ul>
        {project.tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}:</strong> {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
