import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarMetrics {
  attack: number;
  defense: number;
  midfield: number;
  overall: number;
}

interface GraficoRadarProps {
  teamA: RadarMetrics;
  teamB: RadarMetrics;
}

const GraficoRadar: React.FC<GraficoRadarProps> = ({ teamA, teamB }) => {
  const data = {
    labels: ['Ataque', 'Defensa', 'Mediocampo', 'General'],
    datasets: [
      {
        label: 'Equipo A',
        data: [teamA.attack, teamA.defense, teamA.midfield, teamA.overall],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Equipo B',
        data: [teamB.attack, teamB.defense, teamB.midfield, teamB.overall],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          display: false, // Hide the ticks values
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.r !== null) {
              label += context.parsed.r;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="relative h-96 w-full">
      <Radar data={data} options={options} />
    </div>
  );
};

export default GraficoRadar;
