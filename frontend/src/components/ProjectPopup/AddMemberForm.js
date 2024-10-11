import React, { useState } from 'react';
import './AddMemberForm.css';

const AddMemberForm = ({
  participantsList,
  participantId,
  setParticipantId,
  percentage,
  setPercentage,
  handleAddMember,
  isSubmitting,
}) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddMember(); 
      setSuccessMessage('Member added successfully');
      setTimeout(() => setSuccessMessage(''), 3000); 
    } catch (error) {
      alert('Failed to add member');
    }
  };

  return (
    <>
      <div className="bottomDiv">
        <h3>Adicione um membro</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Membro:
            <select
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              required
            >
              <option value="">Escolha o membro</option>
              {participantsList.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.first_name} {participant.last_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Participação:
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              min="0"
              max="100"
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Adicionar'}
          </button>
        </form>
      </div>
      {successMessage && <div className="success-notification">{successMessage}</div>}
    </>
  );
};

export default React.memo(AddMemberForm);
