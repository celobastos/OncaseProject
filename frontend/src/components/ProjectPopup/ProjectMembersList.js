// ProjectMembersList.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ParticipationPropType } from '../../propTypes/propTypes';
import './ProjectMembersList.css';

const ITEMS_PER_PAGE = 8;

const ProjectMembersList = ({
  participations,
  onUpdateParticipation,
  onDeleteParticipation,
  isSubmitting,
}) => {
  const [editingParticipationId, setEditingParticipationId] = useState(null);
  const [newPercentage, setNewPercentage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleItemClick = (participation) => {
    if (isSubmitting) return;
    setEditingParticipationId(participation.id);
    setNewPercentage(participation.percentage);
  };

  const handleSaveEdit = (participation) => {
    if (newPercentage === '' || isNaN(newPercentage)) {
      alert('Please enter a valid percentage');
      return;
    }
    onUpdateParticipation(participation.id, parseFloat(newPercentage));
    setEditingParticipationId(null);
    setNewPercentage('');
  };

  const handleCancelEdit = () => {
    setEditingParticipationId(null);
    setNewPercentage('');
  };

  const totalPages = Math.ceil(participations.length / ITEMS_PER_PAGE);

  const paginatedParticipations = participations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="projectMembers">
      <h3>Project Members</h3>
      <ul>
        {paginatedParticipations.map((participation) => (
          <li key={participation.id}>
            <div
              className="memberInfo"
              onClick={() => handleItemClick(participation)}
            >
              {participation.participant.full_name} -{' '}
              {editingParticipationId === participation.id ? (
                <>
                  <input
                    type="number"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(e.target.value)}
                    min="0"
                    max="100"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                  %
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveEdit(participation);
                    }}
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelEdit();
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {participation.percentage}%
                </>
              )}
            </div>
            <button
              className="deleteButton"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteParticipation(participation.id);
              }}
              disabled={isSubmitting}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

ProjectMembersList.propTypes = {
  participations: PropTypes.arrayOf(ParticipationPropType).isRequired,
  onUpdateParticipation: PropTypes.func.isRequired,
  onDeleteParticipation: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default React.memo(ProjectMembersList);
