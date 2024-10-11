import React, { useState, useEffect, useCallback } from 'react';
import './ProjectPopup.css';
import api from '../../services/api';
import ParticipationGraph from './ParticipationGraph';
import ProjectMembersList from './ProjectMembersList';
import AddMemberForm from './AddMemberForm';
import useParticipants from '../../hooks/useParticipants';
import PropTypes from 'prop-types';
import { ProjectPropType } from '../../propTypes/propTypes';

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

  const fetchParticipations = useCallback(async () => {
    try {
      const updatedProjectResponse = await api.get(`/projects/${project.id}/`);
      setParticipations(updatedProjectResponse.data.participations || []);
    } catch (error) {
      console.error('Failed to fetch participations:', error.response?.data || error);
    }
  }, [project.id]);
  

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

       
        await fetchParticipations();

        
        setParticipantId('');
        setPercentage('');
      } catch (error) {
        console.error('Failed to add participation:', error.response?.data || error);
        alert('Failed to add member');
      } finally {
        setIsSubmitting(false);
      }
    },
    [participantId, percentage, participations, project.id, fetchParticipations]
  );

  const handleUpdateParticipation = async (participationId, updatedPercentage) => {
    setIsSubmitting(true);

    const totalPercentage = participations.reduce(
      (sum, p) =>
        sum + (p.id === participationId ? 0 : p.percentage || 0),
      0
    );

    if (totalPercentage + updatedPercentage > 100) {
      alert('Total participation percentage cannot exceed 100%');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.patch(`/participations/${participationId}/`, {
        percentage: updatedPercentage,
      });

      await fetchParticipations();
    } catch (error) {
      console.error('Failed to update participation:', error.response?.data || error);
      alert('Failed to update member participation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteParticipation = async (participationId) => {
    if (!window.confirm('Are you sure you want to remove this member from the project?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.delete(`/participations/${participationId}/`);

      await fetchParticipations();
    } catch (error) {
      console.error('Failed to delete participation:', error.response?.data || error);
      alert('Failed to remove member');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <ProjectMembersList
              participations={participations}
              onUpdateParticipation={handleUpdateParticipation}
              onDeleteParticipation={handleDeleteParticipation}
            />
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
  project: ProjectPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectPopup;
