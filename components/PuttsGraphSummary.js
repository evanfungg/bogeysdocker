'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, PointElement, LineElement);

const PuttsGraphSummary = ({ rounds = [] }) => {
    
    
    const totalPuttsPerRound = rounds.map(round =>
        round.holes.reduce((acc, hole) => acc + hole.totalPutts, 0)
    );

    
    const roundLabels = rounds.map(round => round.name);
    

    const data = {
        labels: roundLabels,
        datasets: [
            {
                label: "Total Putts Per Round",
                data: totalPuttsPerRound,
                borderColor: 'rgba(75,192,192,1)', 
                backgroundColor: 'rgba(75,192,192,0.2)', 
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Putts'
            }
          },
          
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Line data={data} options={options} />;
}

export default PuttsGraphSummary;
