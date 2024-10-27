import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddEditProject from "./AddEditProject";
import ProjectDetails from "./ProjectDetails";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Icons for better UI

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/projects/getallprojects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleAddProject = () => {
    setShowAddEdit(true);
    setSelectedProjectId(null);
  };

  const handleEditProject = (id) => {
    setShowAddEdit(true);
    setSelectedProjectId(id);
  };

  const handleViewProject = (id) => {
    setSelectedProjectId(id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="Universal-Container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Projects</h2>
        <button className="btn btn-success" onClick={handleAddProject}>
          + Add Project
        </button>
      </div>

      {showAddEdit ? (
        <AddEditProject
          projectId={selectedProjectId}
          onClose={() => setShowAddEdit(false)}
        />
      ) : showDetails ? (
        <ProjectDetails
          projectId={selectedProjectId}
          onClose={handleCloseDetails}
        />
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditProject(project._id)}
                        title="Edit Project"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(project._id)}
                        title="Delete Project"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleViewProject(project._id)}
                        title="View Project"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Projects;
