import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#C0392B'];

const ParticipationGraph = ({ participationData }) => (
  <div className="graphDiv">
    <h3>Participation Graph</h3>
    <PieChart width={300} height={300}>
      <Pie
        data={participationData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {participationData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
);

export default React.memo(ParticipationGraph);
