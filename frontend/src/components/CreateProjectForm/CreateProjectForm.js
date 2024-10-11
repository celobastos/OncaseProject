import React, { useState } from 'react';
import api from '../../services/api';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
    const [projectName, setProjectName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects/', {
                name: projectName,
            });
            setSuccessMessage('Projeto criado com sucesso');
            setProjectName('');
            setTimeout(() => setSuccessMessage(''), 2500); 
        } catch (error) {
            alert('Failed to create project');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Crie um projeto</h2>
                <input type="text" placeholder="Nome do projeto" value={projectName} onChange={e => setProjectName(e.target.value)} required />
                <button type="submit">Adicionar</button>
            </form>
            {successMessage && <div className="success-notification">{successMessage}</div>}
         </>
    );
};

export default CreateProjectForm;
