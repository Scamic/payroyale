// LineChartComponent.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ data }) => {
  if (!data.headers || !data.rows || data.headers.length < 3) {
    return <p>No data available</p>;
  }

  // Prepare chart data
  const chartData = {
    labels: data.rows.map(row => "✨FF | "+ row[1]), // Assuming the first column is the player identifier or time
    datasets: [
      {
        label: 'Scores',
        data: data.rows.map(row => row[5]), // Assuming the sixth column is scores
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    
      
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Player Performance Metrics',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Players',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Score / Fame',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="p-6 bg-green-100 rounded-lg shadow-lg w-full">
      <h3 className="text-xl font-bold text-green-800 mb-4">Performance Line Chart</h3>
      <div className="w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartComponent;
