import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ProjectsList.css';
import ProjectPopup from '../ProjectPopup/ProjectPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectData, setProjectData] = useState(null);
    const projectsPerPage = 3;

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects/');
            const sortedProjects = response.data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setProjects(sortedProjects);
        } catch (error) {
            alert('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
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
        fetchProjects();
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
            <h2>Projetos</h2>
            <ul>
                {currentProjects.map((project) => (
                    <li key={project.id} onClick={() => handleProjectClick(project)}>
                        {project.name}
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button
                    className="page-button"
                    onClick={prevPage}
                    aria-label="Previous Page"
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className="current-page">{currentPage}</span>
                <button
                    className="page-button"
                    onClick={nextPage}
                    aria-label="Next Page"
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
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
