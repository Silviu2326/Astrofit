import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { AtletaComparacionData, ComparacionResult, comparadorAtletasApi } from '../comparadorAtletasApi';

Chart.register(...registerables);

interface ComparacionDirectaProps {
  atleta1Id: string;
  atleta2Id: string;
}

const ComparacionDirecta: React.FC<ComparacionDirectaProps> = ({ atleta1Id, atleta2Id }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [comparacionData, setComparacionData] = useState<ComparacionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComparacion = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await comparadorAtletasApi.getComparacionDirecta(atleta1Id, atleta2Id);
        setComparacionData(data);
      } catch (err) {
        setError('Error al cargar los datos de comparaci??n.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparacion();
  }, [atleta1Id, atleta2Id]);

  useEffect(() => {
    if (comparacionData && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const { atleta1, atleta2 } = comparacionData;

      const labels = ['Fuerza', 'Resistencia', 'T??cnica', 'Velocidad'];
      const dataAtleta1 = [atleta1.fuerza, atleta1.resistencia, atleta1.tecnica, atleta1.velocidad];
      const dataAtleta2 = [atleta2.fuerza, atleta2.resistencia, atleta2.tecnica, atleta2.velocidad];

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: atleta1.nombre,
              data: dataAtleta1,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: atleta2.nombre,
              data: dataAtleta2,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }
  }, [comparacionData]);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
        <p className="text-xl font-medium text-gray-700">Cargando datos de comparaci??n...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 text-center">
        <div className="inline-flex p-3 bg-red-100 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xl font-medium text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!comparacionData) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center">
        <p className="text-xl font-medium text-gray-600">No hay datos para mostrar.</p>
      </div>
    );
  }

  const { atleta1, atleta2, resumen } = comparacionData;

  // Calcular diferencias para badges
  const calcularDiferencia = (val1: number, val2: number) => {
    const diff = val1 - val2;
    const porcentaje = val2 > 0 ? ((diff / val2) * 100).toFixed(1) : '0';
    return { diff, porcentaje, esMejor: diff > 0 };
  };

  const metricas = [
    { label: 'Fuerza', val1: atleta1.fuerza, val2: atleta2.fuerza },
    { label: 'Resistencia', val1: atleta1.resistencia, val2: atleta2.resistencia },
    { label: 'T??cnica', val1: atleta1.tecnica, val2: atleta2.tecnica },
    { label: 'Velocidad', val1: atleta1.velocidad, val2: atleta2.velocidad }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Decoraci??n de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white text-center relative z-10">
          Comparaci??n entre {atleta1.nombre} vs {atleta2.nombre}
        </h2>
      </div>

      <div className="p-6 md:p-8 relative z-10">
        {/* Tarjetas de resumen lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Atleta 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {atleta1.nombre.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{atleta1.nombre}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Fortalezas</p>
                  <div className="flex flex-wrap gap-2">
                    {resumen.fortalezasAtleta1.length > 0 ? (
                      resumen.fortalezasAtleta1.map((fortaleza, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          {fortaleza}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Ninguna destacada</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Debilidades</p>
                  <div className="flex flex-wrap gap-2">
                    {resumen.debilidadesAtleta1.length > 0 ? (
                      resumen.debilidadesAtleta1.map((debilidad, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                          {debilidad}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Ninguna destacada</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atleta 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-300 rounded-full blur-2xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {atleta2.nombre.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{atleta2.nombre}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Fortalezas</p>
                  <div className="flex flex-wrap gap-2">
                    {resumen.fortalezasAtleta2.length > 0 ? (
                      resumen.fortalezasAtleta2.map((fortaleza, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          {fortaleza}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Ninguna destacada</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Debilidades</p>
                  <div className="flex flex-wrap gap-2">
                    {resumen.debilidadesAtleta2.length > 0 ? (
                      resumen.debilidadesAtleta2.map((debilidad, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                          {debilidad}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Ninguna destacada</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gr??fico comparativo */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Comparaci??n Visual</h3>
          <div className="h-96">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* M??tricas comparativas con progress bars */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">An??lisis Detallado por M??trica</h3>

          {metricas.map((metrica, idx) => {
            const diff1 = calcularDiferencia(metrica.val1, metrica.val2);
            const diff2 = calcularDiferencia(metrica.val2, metrica.val1);

            return (
              <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{metrica.label}</h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      {atleta1.nombre}: {metrica.val1}
                    </span>
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                      {atleta2.nombre}: {metrica.val2}
                    </span>
                  </div>
                </div>

                {/* Progress bars comparativos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Barra Atleta 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">{atleta1.nombre}</span>
                      {diff1.esMejor && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                          +{diff1.porcentaje}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                        style={{ width: `${metrica.val1}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Barra Atleta 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">{atleta2.nombre}</span>
                      {diff2.esMejor && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                          +{diff2.porcentaje}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000"
                        style={{ width: `${metrica.val2}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparacionDirecta;
