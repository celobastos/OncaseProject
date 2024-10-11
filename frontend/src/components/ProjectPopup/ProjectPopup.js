import React, { useState, useEffect } from 'react';
import './ProjectPopup.css';
import api from '../../services/api'; 
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#C0392B'];

const ProjectPopup = ({ project, onClose }) => {
    const [participations, setParticipations] = useState([]);
    const [participantsList, setParticipantsList] = useState([]);
    const [participantId, setParticipantId] = useState('');
    const [percentage, setPercentage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (project) {
            setParticipations(project.participations || []);
        }
    }, [project]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await api.get('/participants/');
                setParticipantsList(response.data);
            } catch (error) {
                console.error('Failed to fetch participants:', error);
            }
        };
        fetchParticipants();
    }, []);

    const participationData = participations.map((participation, index) => ({
        name: participation.participant.full_name,
        value: participation.percentage || 0,
        color: COLORS[index % COLORS.length],
    }));

    const handleAddMember = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const totalPercentage = participations.reduce(
            (sum, p) => sum + (p.percentage || 0),
            0
        );
        if (totalPercentage + parseFloat(percentage) > 100) {
            alert('Total participation percentage cannot exceed 100%');
            setIsSubmitting(false);
            return;
        }

        try {
            const newParticipation = {
                participant_id: parseInt(participantId),
                project_id: project.id,
                percentage: parseFloat(percentage),
            };

            console.log('Adding participation:', newParticipation);

            await api.post('/participations/', newParticipation);

            const updatedProjectResponse = await api.get(`/projects/${project.id}/`);
            setParticipations(updatedProjectResponse.data.participations || []);

            setParticipantId('');
            setPercentage('');
        } catch (error) {
            console.error('Failed to add participation:', error.response?.data || error);
            alert('Failed to add member');
        }
        setIsSubmitting(false);
    };

    return (
        <div
            className="popup-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
        >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modalTitle" id="modalTitle">{project.name}</h2>
                <div className="modalWrapper">
                    <div className="topRow">
                        <div className="graphDiv">
                            <h3>Participation Graph</h3>
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={participationData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {participationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                        <div className="projectMembers">
                            <h3>Project Members</h3>
                            <ul>
                                {participations.map((participation) => (
                                    <li key={participation.id}>
                                        {participation.participant.full_name} - {participation.percentage}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="bottomDiv">
                        <h3>Add a Member</h3>
                        <form onSubmit={handleAddMember}>
                            <label>
                                Participant:
                                <select
                                    value={participantId}
                                    onChange={(e) => setParticipantId(e.target.value)}
                                    required
                                >
                                    <option value="">Select Participant</option>
                                    {participantsList.map((participant) => (
                                        <option key={participant.id} value={participant.id}>
                                            {participant.first_name} {participant.last_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Percentage:
                                <input
                                    type="number"
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    min="0"
                                    max="100"
                                    required
                                />
                            </label>
                            <button type="submit" disabled={isSubmitting}>Add Member</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPopup;
