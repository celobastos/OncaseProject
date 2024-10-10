import React, { useState } from 'react';
import api from '../../services/api';
import './Form.css';

const Form = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [participation, setParticipation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/participants/', {
                first_name: firstName,
                last_name: lastName,
                participation: parseFloat(participation),
            });
            
        } catch (error) {
            alert('Failed to add participant');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <input type="text" placeholder="Participation" value={participation} onChange={e => setParticipation(e.target.value)} required />
            <button type="submit">Send</button>
        </form>
    );
};

export default Form;