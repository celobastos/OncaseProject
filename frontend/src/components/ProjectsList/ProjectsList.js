import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ProjectsList.css';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 3;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects/');
                setProjects(response.data);
            } catch (error) {
                alert('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const nextPage = () => {
        if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="projects-list">
            <h2>Projects</h2>
            <ul>
                {currentProjects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
            <div className="pagination">
                {currentPage > 1 && (
                <button 
                    className="page-button" 
                    onClick={prevPage}
                >
                    <span>&#9664;</span>
                </button>
            )}
                <span className="current-page">{currentPage}</span>
                {currentPage < Math.ceil(projects.length / projectsPerPage) && (
                <button 
                    className="page-button" 
                    onClick={nextPage}
                >
                    <span>&#9654;</span>
                </button>
            )}
            </div>
        </div>
    );
};

export default ProjectsList;