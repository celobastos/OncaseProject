import React from 'react';
import Form from '../src/components/Form/Form';
import ParticipantsList from '../src/components/ParticipantsList/ParticipantsList';

const App = () => {
    return (
        <div className="App">
            <h1>Participants Management</h1>
            <Form />
            <ParticipantsList />
        </div>
    );
};

export default App;