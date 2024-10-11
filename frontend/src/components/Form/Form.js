import React, { useState } from 'react';
import api from '../../services/api';

const UserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/participants/', {
                first_name: firstName,
                last_name: lastName,
            });
            alert('User added successfully');
            setFirstName('');
            setLastName('');
        } catch (error) {
            alert('Failed to add user');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <button type="submit">Criar Membro</button>
        </form>
    );
};

export default UserForm;
