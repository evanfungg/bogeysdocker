'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, PointElement, LineElement);

const GIRGraphSummary = ({ rounds = [] }) => {
    
    const totalGIRsPerRound = rounds.map(round =>
        round.holes.reduce((acc, hole) => acc + (hole.GIR ? 1 : 0), 0)
    );

    
    const roundLabels = rounds.map(round => round.name);

    const data = {
        labels: roundLabels,
        datasets: [
            {
                label: "Total GIRs Per Round",
                data: totalGIRsPerRound,
                borderColor: 'rgba(255, 99, 132, 1)', 
                backgroundColor: 'rgba(255, 99, 132, 0.5)', 
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
              text: 'Total GIRs'
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

export default GIRGraphSummary;
