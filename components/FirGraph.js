"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, BarElement);

const FIRGraph = ({ holes = [] }) => {
  const holeNumbers = holes.map(hole => `Hole ${hole.holeNumber}`);
  
  const backgroundColors = holes.map(hole => hole.FIR ? 'rgb(0, 255, 0, 0.5)' : 'rgb(255, 0, 0, 0.5)');

  const data = {
    labels: holeNumbers,
    datasets: [
      {
        label: 'FIRs',
        data: holes.map(hole => 1), 
        backgroundColor: backgroundColors, 
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FIRGraph;
