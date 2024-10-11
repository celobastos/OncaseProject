import React from 'react';
import ProjectsList from '../ProjectsList/ProjectsList';
import CreateUserForm from '../Form/Form';
import CreateProjectForm from '../CreateProjectForm/CreateProjectForm';
import RecentProjects from '../RecentProjects/RecentProjects';
import './HomeScreen.css';
import NavBar from '../NavBar/NavBar';

const HomeScreen = () => {
    return (
        <div className="home-screen">
            <NavBar />
            <div className="first-section">
                <ProjectsList />
                <CreateUserForm />
                <CreateProjectForm />
            </div>
            <RecentProjects />
        </div>
    );
};


export default HomeScreen;
