import PropTypes from 'prop-types';

export const ParticipantPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
});

export const ParticipationPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  participant: ParticipantPropType.isRequired,
  percentage: PropTypes.number,
});

export const ProjectPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  participations: PropTypes.arrayOf(ParticipationPropType),
});