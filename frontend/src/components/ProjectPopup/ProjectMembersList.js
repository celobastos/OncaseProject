import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ParticipationPropType } from '../../propTypes/propTypes';
import './ProjectMembersList.css';

const ITEMS_PER_PAGE = 5;

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
      alert('Digite uma porcentagem valida');
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
      <h3>Membros do Projeto</h3>
      <div className="members-grid">
        <div className="grid-header">
          <div className="header-item">Nome</div>
          <div className="header-item">%</div>
          <div className="header-item">Ações</div>
        </div>
        {paginatedParticipations.map((participation) => (
          <div className="grid-row" key={participation.id}>
            <div
              className="member-name"
              onClick={() => handleItemClick(participation)}
            >
              {participation.participant.full_name}
            </div>
            <div
              className="member-percentage"
              onClick={() => handleItemClick(participation)}
            >
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
                </>
              ) : (
                `${participation.percentage}%`
              )}
            </div>
            <div className="member-actions">
              {editingParticipationId === participation.id ? (
                <>
                  <button
                    className="action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveEdit(participation);
                    }}
                    disabled={isSubmitting}
                  >
                    Salvar
                  </button>
                  <button
                    className="action-button cancel-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelEdit();
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
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
              )}
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            ‹
          </button>
          <span>
             {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            ›
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
