'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, PointElement, LineElement);

const FIRGraphSummary = ({ rounds = [] }) => {
   
    const totalFIRsPerRound = rounds.map(round =>
        round.holes.reduce((acc, hole) => acc + (hole.FIR ? 1 : 0), 0)
    );

    
    const roundLabels = rounds.map(round => round.name);

    const data = {
        labels: roundLabels,
        datasets: [
            {
                label: "Total FIRs Per Round",
                data: totalFIRsPerRound,
                borderColor: 'rgba(53, 162, 235, 1)', 
                backgroundColor: 'rgba(53, 162, 235, 0.5)', 
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
              text: 'Total FIRs'
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

export default FIRGraphSummary;
