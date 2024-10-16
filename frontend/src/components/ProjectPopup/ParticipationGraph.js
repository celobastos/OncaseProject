import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './ParticipationGraph.css';

const COLORS = ['#EF476F', '#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'];

const ParticipationGraph = ({ participationData, showTitle = true }) => (
  <div className="graph-container">
    {showTitle && <h3>Gráfico de Participação</h3>}
    <div className="chart-and-legend">
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
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="legend">
        {participationData.map((entry, index) => (
          <div key={`legend-${index}`} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: entry.color || COLORS[index % COLORS.length] }}
            ></div>
            <span className="legend-text">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default React.memo(ParticipationGraph);
