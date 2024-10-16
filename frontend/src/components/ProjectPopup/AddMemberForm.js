import React from 'react';
import './AddMemberForm.css';

const AddMemberForm = ({
  participantsList,
  participantId,
  setParticipantId,
  percentage,
  setPercentage,
  handleAddMember,
  isSubmitting,
}) => (
  <div className="bottomDiv">
    <h3>Adicione um membro</h3>
    <form onSubmit={handleAddMember}>
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
);

export default React.memo(AddMemberForm);
