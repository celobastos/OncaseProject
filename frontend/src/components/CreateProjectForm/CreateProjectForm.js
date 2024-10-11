import React, { useState } from 'react';
import api from '../../services/api';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
    const [projectName, setProjectName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects/', {
                name: projectName,
            });
            alert('Project created successfully');
            setProjectName('');
        } catch (error) {
            alert('Failed to create project');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="Project name" value={projectName} onChange={e => setProjectName(e.target.value)} required />
            <button type="submit">Create Project</button>
        </form>
    );
};

export default CreateProjectForm;
