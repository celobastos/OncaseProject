import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ chartData }) => {
    return (
        <div className="chart-section">
            <h4>Participation Chart</h4>
            <Pie data={chartData} />
        </div>
    );
};

export default ChartComponent;
