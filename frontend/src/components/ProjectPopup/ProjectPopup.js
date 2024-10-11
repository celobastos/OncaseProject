import React from 'react';
import './ProjectPopup.css';
import api from '../../services/api';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectPopup = ({ project, onClose }) => {
    const [members, setMembers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [participation, setParticipation] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get(`/participations/?project=${project.id}`);
                setMembers(response.data);
            } catch (error) {
                alert('Failed to fetch project members');
            }
        };
        fetchMembers();
    }, [project.id]);

    const handleAddMember = async (e) => {
        e.preventDefault();

        const newMember = {
            project: project.id,
            first_name: firstName,
            last_name: lastName,
            participation: participation,
        };

        try {
            await api.post('/participations/', newMember);
            setFirstName('');
            setLastName('');
            setParticipation('');

            const response = await api.get(`/participations/?project=${project.id}`);
            setMembers(response.data);
        } catch (error) {
            alert('Failed to add member');
        }
    };

    const chartData = {
        labels: members.map((member) => `${member.first_name} ${member.last_name}`),
        datasets: [
            {
                data: members.map((member) => member.participation),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>{project.name}</h3>
                <p>Project ID: {project.id}</p>
                <div className="members-list">
                    <h4>Members Assigned to the Project</h4>
                    <ul>
                        {members.map((member) => (
                            <li key={member.id}>
                                {`${member.first_name} ${member.last_name}`} - {member.participation}%
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleAddMember} className="add-member-form">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Participation (%)"
                        value={participation}
                        onChange={(e) => setParticipation(e.target.value)}
                        required
                    />
                    <button type="submit">Add Member</button>
                </form>
                <div className="chart-container">
                    <h4>Participation Chart</h4>
                    <Pie data={chartData} key={project.id} />
                </div>
            </div>
        </div>
    );
};

export default ProjectPopup;
