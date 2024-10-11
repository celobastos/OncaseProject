import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './RecentProjects.css';
import ProjectPopup from '../ProjectPopup/ProjectPopup';
import ParticipationGraph from '../ProjectPopup/ParticipationGraph';

const RecentProjects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects/');
                setProjects(response.data.slice(0, 3));
            } catch (error) {
                alert('Failed to fetch project data');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
    };

    return (
        <div className="recent-projects">
            <h3>Projetos Recentes</h3>
            {loading ? (
                <p>Carregando Projetos...</p>
            ) : (
                <div className="projects-row">
                    {projects && projects.length > 0 ? (
                        projects.map((project) => {
                            const participationData = project.participations.map((participation, index) => ({
                                name: participation.participant.full_name,
                                value: participation.percentage || 0,
                                color: participation.color, 
                            }));

                            return (
                                <div
                                    key={project.id}
                                    className="project-chart"
                                    onClick={() => handleProjectClick(project)}
                                    tabIndex="0"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleProjectClick(project);
                                    }}
                                    aria-label={`View details for ${project.name}`}
                                >
                                    <h4>{project.name}</h4>
                                    {participationData && participationData.length > 0 ? (
                                        <ParticipationGraph
                                            participationData={participationData}
                                            width={200}
                                            height={200}
                                            outerRadius={80}
                                            showTitle={false} 
                                        />
                                    ) : (
                                        <p>Sem Participantes para esse projeto.</p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>Sem projetos.</p>
                    )}
                </div>
            )}
            {selectedProject && (
                <ProjectPopup project={selectedProject} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default RecentProjects;
