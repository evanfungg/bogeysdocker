"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';


Chart.register(LinearScale, CategoryScale, PointElement, LineElement);


const PuttsGraph = ({holes = []}) => {

    const puttsPerHole = holes.map(hole => hole.totalPutts)
    const holeNumber = holes.map(hole => `Hole ${hole.holeNumber}`)

    const data = {
        labels: holeNumber,
        datasets: [
            {
                label: "Putts",
                data: puttsPerHole,
                borderColor: 'black', 
                borderWidth: 1,
            },
        ],
    }

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

export default PuttsGraph