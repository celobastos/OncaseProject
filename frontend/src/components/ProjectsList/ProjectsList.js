import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ProjectsList.css';

import ProjectPopup from '../ProjectPopup/ProjectPopup';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectData, setProjectData] = useState(null);
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

    const handleProjectClick = async (project) => {
        try {
            const response = await api.get(`/projects/${project.id}/`);
            setProjectData(response.data); 
            setSelectedProject(project);
        } catch (error) {
            alert('Failed to fetch project details');
        }
    };

    const closePopup = () => {
        setSelectedProject(null);
        setProjectData(null); 
    };

    const refreshProjectData = async () => {
        if (selectedProject) {
            try {
                const response = await api.get(`/projects/${selectedProject.id}/`);
                setProjectData(response.data);
            } catch (error) {
                alert('Failed to refresh project data');
            }
        }
    };

    return (
        <div className="projects-list">
            <h2>Projects</h2>
            <ul>
                {currentProjects.map((project) => (
                    <li key={project.id} onClick={() => handleProjectClick(project)}>
                        {project.name}
                    </li>
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

            {projectData && (
                <ProjectPopup 
                    project={projectData} 
                    onClose={closePopup} 
                    onMemberAdded={refreshProjectData} 
                />
            )}
        </div>
    );
};

export default ProjectsList;