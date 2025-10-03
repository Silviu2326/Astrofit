import React, { useState, useEffect } from 'react';
import { JugadorDetalle, fetchJugadorDetalle } from '../evaluacionJugadorApi';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const FichaTecnica: React.FC = () => {
  const [jugador, setJugador] = useState<JugadorDetalle | null>(null);
  const [activeTab, setActiveTab] = useState<'tecnico' | 'fisico' | 'tactico' | 'mental'>('tecnico');

  useEffect(() => {
    const loadJugador = async () => {
      const data = await fetchJugadorDetalle('jugador-123'); // Hardcoded for now
      setJugador(data);
    };
    loadJugador();
  }, []);

  if (!jugador) {
    return <div className="text-center p-4">Cargando datos del jugador...</div>;
  }

  const renderRadarChart = (data: Record<string, number>, label: string) => {
    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label,
          data: Object.values(data),
          backgroundColor: 'rgba(34, 197, 94, 0.2)', // Tailwind green-500 with opacity
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: {
            font: {
              size: 12,
            },
          },
          ticks: {
            display: false, // Hide the ticks labels (0, 20, 40, etc.)
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          borderWidth: 2,
        },
        point: {
          radius: 4,
          backgroundColor: 'rgba(34, 197, 94, 1)',
          borderColor: '#fff',
          borderWidth: 1,
        },
      },
    };

    return <Radar data={chartData} options={options} />;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Ficha Técnica de {jugador.nombre} {jugador.apellido}</h2>
      <p className="text-gray-600 mb-2">Posición: {jugador.posicion}</p>
      <p className="text-gray-600 mb-4">Fecha de Nacimiento: {jugador.fechaNacimiento}</p>

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('tecnico')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'tecnico' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Técnico
          </button>
          <button
            onClick={() => setActiveTab('fisico')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'fisico' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Físico
          </button>
          <button
            onClick={() => setActiveTab('tactico')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'tactico' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Táctico
          </button>
          <button
            onClick={() => setActiveTab('mental')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'mental' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Mental
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'tecnico' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Habilidades Técnicas</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(jugador.tecnico).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              {renderRadarChart(jugador.tecnico, 'Técnico')}
            </div>
          </div>
        )}
        {activeTab === 'fisico' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Habilidades Físicas</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(jugador.fisico).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              {renderRadarChart(jugador.fisico, 'Físico')}
            </div>
          </div>
        )}
        {activeTab === 'tactico' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Habilidades Tácticas</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(jugador.tactico).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              {renderRadarChart(jugador.tactico, 'Táctico')}
            </div>
          </div>
        )}
        {activeTab === 'mental' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Habilidades Mentales</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(jugador.mental).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              {renderRadarChart(jugador.mental, 'Mental')}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Notas de Scouts</h3>
        <ul className="list-disc list-inside space-y-1">
          {jugador.notasScouts.map((nota, index) => (
            <li key={index}>{nota}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Videos Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jugador.videosDestacados.map((video, index) => (
            <a key={index} href={video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Video {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FichaTecnica;
