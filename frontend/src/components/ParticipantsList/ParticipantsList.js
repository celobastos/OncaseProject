import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ParticipantsList.css';

const ParticipantsList = () => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await api.get('/participants/');
                setParticipants(response.data);
            } catch (error) {
                console.error('Failed to fetch participants', error);
            }
        };
        fetchParticipants();
    }, []);

    return (
        <div className="participants-list">
            <h2>Participants</h2>
            <ul>
                {participants.map(participant => (
                    <li key={participant.id}>
                        {participant.first_name} {participant.last_name} - {participant.participation}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantsList;