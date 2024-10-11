import React from 'react';

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
    <h3>Add a Member</h3>
    <form onSubmit={handleAddMember}>
      <label>
        Participant:
        <select
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          required
        >
          <option value="">Select Participant</option>
          {participantsList.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.first_name} {participant.last_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Percentage:
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
        {isSubmitting ? 'Adding...' : 'Add Member'}
      </button>
    </form>
  </div>
);

export default React.memo(AddMemberForm);
