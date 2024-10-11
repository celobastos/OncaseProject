import { useState, useEffect } from 'react';
import api from '../services/api';

const useParticipants = () => {
  const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get('/participants/');
        setParticipantsList(response.data);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      }
    };
    fetchParticipants();
  }, []);

  return participantsList;
};

export default useParticipants;
