"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, PointElement, LineElement);

const ScoresGraph = ({ holes = [] }) => {
  const holeNumbers = holes.map(hole => `Hole ${hole.holeNumber}`);
  const scoreDifferentials = holes.map(hole => hole.strokes - hole.par);

  
  const pointColors = scoreDifferentials.map(diff => {
    if (diff < 0) return 'green'; 
    if (diff > 0) return 'red';   
    return 'black';               
  });

  const data = {
    labels: holeNumbers,
    datasets: [
      {
        label: 'Score Differential',
        data: scoreDifferentials,
        backgroundColor: pointColors,
        borderColor: 'black', 
        borderWidth: 1,
        pointBackgroundColor: pointColors, 
        fill: false, 
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Line data = {data} options = {options}></Line>
  )
}

export default ScoresGraph