import React, { useState, useEffect, useCallback } from 'react';
import './ProjectPopup.css';
import api from '../../services/api';
import ParticipationGraph from './ParticipationGraph';
import ProjectMembersList from './ProjectMembersList';
import AddMemberForm from './AddMemberForm';
import useParticipants from '../../hooks/useParticipants';
import PropTypes from 'prop-types';

const ProjectPopup = ({ project, onClose }) => {
  const [participations, setParticipations] = useState([]);
  const [participantId, setParticipantId] = useState('');
  const [percentage, setPercentage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const participantsList = useParticipants();

  useEffect(() => {
    if (project) {
      setParticipations(project.participations || []);
    }
  }, [project]);

  const participationData = participations.map((participation, index) => ({
    name: participation.participant.full_name,
    value: participation.percentage || 0,
    color: participation.color, 
  }));

  const handleAddMember = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const totalPercentage = participations.reduce(
        (sum, p) => sum + (p.percentage || 0),
        0
      );

      const newPercentage = parseFloat(percentage);

      if (totalPercentage + newPercentage > 100) {
        alert('Total participation percentage cannot exceed 100%');
        setIsSubmitting(false);
        return;
      }

      try {
        const newParticipation = {
          participant_id: parseInt(participantId),
          project_id: project.id,
          percentage: newPercentage,
        };

        await api.post('/participations/', newParticipation);

      
        const updatedProjectResponse = await api.get(`/projects/${project.id}/`);
        setParticipations(updatedProjectResponse.data.participations || []);

       
        setParticipantId('');
        setPercentage('');
      } catch (error) {
        console.error('Failed to add participation:', error.response?.data || error);
        alert('Failed to add member');
      } finally {
        setIsSubmitting(false);
      }
    },
    [participantId, percentage, participations, project.id]
  );

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modalTitle" id="modalTitle">
          {project.name}
        </h2>
        <div className="modalWrapper">
          <div className="topRow">
            <ParticipationGraph participationData={participationData} />
            <ProjectMembersList participations={participations} />
          </div>
          <AddMemberForm
            participantsList={participantsList}
            participantId={participantId}
            setParticipantId={setParticipantId}
            percentage={percentage}
            setPercentage={setPercentage}
            handleAddMember={handleAddMember}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

ProjectPopup.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    participations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        participant: PropTypes.shape({
          id: PropTypes.number.isRequired,
          full_name: PropTypes.string.isRequired,
        }).isRequired,
        percentage: PropTypes.number,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectPopup;
