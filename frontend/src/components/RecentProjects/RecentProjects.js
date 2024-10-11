import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../../services/api';
import './RecentProjects.css';

const RecentProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/participations/');
                setProjects(response.data);
            } catch (error) {
                alert('Failed to fetch participation data');
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="recent-projects">
            <h3>Projetos Recentes</h3>
            {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                    <div key={index} className="project-chart">
                        <h4>{project.project_name}</h4>
                        {project.participants && project.participants.length > 0 ? (
                            <Pie
                                data={{
                                    labels: project.participants.map((p) => p.name),
                                    datasets: [
                                        {
                                            data: project.participants.map((p) => p.percentage),
                                            backgroundColor: [
                                                '#FF6384',
                                                '#36A2EB',
                                                '#FFCE56',
                                                '#4BC0C0',
                                                '#9966FF',
                                            ],
                                        },
                                    ],
                                }}
                            />
                        ) : (
                            <p>No participants available for this project.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No projects available.</p>
            )}
        </div>
    );
};

export default RecentProjects;
