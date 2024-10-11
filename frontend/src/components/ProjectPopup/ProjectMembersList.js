import React from 'react';

const ProjectMembersList = ({ participations }) => (
  <div className="projectMembers">
    <h3>Project Members</h3>
    <ul>
      {participations.map((participation) => (
        <li key={participation.id}>
          {participation.participant.full_name} - {participation.percentage}%
        </li>
      ))}
    </ul>
  </div>
);

export default React.memo(ProjectMembersList);
