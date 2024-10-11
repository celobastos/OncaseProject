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
            <h2>Adicione um membro</h2>
            <input type="text" placeholder="Nome" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Sobrenome" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default UserForm;
