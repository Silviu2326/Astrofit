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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con perfil */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-700 mb-3">
            {jugador.nombre} {jugador.apellido}
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
              <span className="text-sm font-bold text-blue-700">Posición: {jugador.posicion}</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
              <span className="text-sm font-bold text-purple-700">Nacimiento: {jugador.fechaNacimiento}</span>
            </div>
          </div>
        </div>

        {/* Tabs mejorados */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('tecnico')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${activeTab === 'tecnico' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Técnico
            </button>
            <button
              onClick={() => setActiveTab('fisico')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${activeTab === 'fisico' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Físico
            </button>
            <button
              onClick={() => setActiveTab('tactico')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${activeTab === 'tactico' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Táctico
            </button>
            <button
              onClick={() => setActiveTab('mental')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${activeTab === 'mental' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Mental
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'tecnico' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades Técnicas</h3>
                <div className="space-y-3">
                  {Object.entries(jugador.tecnico).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-sm font-bold text-indigo-600">{value}/100</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {renderRadarChart(jugador.tecnico, 'Técnico')}
              </div>
            </div>
          )}
          {activeTab === 'fisico' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades Físicas</h3>
                <div className="space-y-3">
                  {Object.entries(jugador.fisico).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-sm font-bold text-green-600">{value}/100</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {renderRadarChart(jugador.fisico, 'Físico')}
              </div>
            </div>
          )}
          {activeTab === 'tactico' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades Tácticas</h3>
                <div className="space-y-3">
                  {Object.entries(jugador.tactico).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-sm font-bold text-purple-600">{value}/100</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {renderRadarChart(jugador.tactico, 'Táctico')}
              </div>
            </div>
          )}
          {activeTab === 'mental' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades Mentales</h3>
                <div className="space-y-3">
                  {Object.entries(jugador.mental).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-sm font-bold text-orange-600">{value}/100</span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {renderRadarChart(jugador.mental, 'Mental')}
              </div>
            </div>
          )}
        </div>

        {/* Notas de Scouts */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Notas de Scouts</h3>
          <div className="space-y-2">
            {jugador.notasScouts.map((nota, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm leading-relaxed">{nota}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Videos Destacados */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Videos Destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jugador.videosDestacados.map((video, index) => (
              <a
                key={index}
                href={video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>Video {index + 1}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaTecnica;
