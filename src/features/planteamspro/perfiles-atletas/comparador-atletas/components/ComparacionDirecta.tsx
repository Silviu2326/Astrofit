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
    return <p className="text-center text-xl">Cargando datos de comparaci??n...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  if (!comparacionData) {
    return <p className="text-center text-xl">No hay datos para mostrar.</p>;
  }

  const { atleta1, atleta2, resumen } = comparacionData;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Comparaci??n entre {atleta1.nombre} y {atleta2.nombre}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Resumen Ejecutivo de {atleta1.nombre}</h3>
          <p><strong>Fortalezas:</strong> {resumen.fortalezasAtleta1.length > 0 ? resumen.fortalezasAtleta1.join(', ') : 'Ninguna destacada'}</p>
          <p><strong>Debilidades:</strong> {resumen.debilidadesAtleta1.length > 0 ? resumen.debilidadesAtleta1.join(', ') : 'Ninguna destacada'}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Resumen Ejecutivo de {atleta2.nombre}</h3>
          <p><strong>Fortalezas:</strong> {resumen.fortalezasAtleta2.length > 0 ? resumen.fortalezasAtleta2.join(', ') : 'Ninguna destacada'}</p>
          <p><strong>Debilidades:</strong> {resumen.debilidadesAtleta2.length > 0 ? resumen.debilidadesAtleta2.join(', ') : 'Ninguna destacada'}</p>
        </div>
      </div>

      <div className="h-96 mb-8">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">M??tricas de {atleta1.nombre}</h3>
          <p>Fuerza: {atleta1.fuerza}</p>
          <p>Resistencia: {atleta1.resistencia}</p>
          <p>T??cnica: {atleta1.tecnica}</p>
          <p>Velocidad: {atleta1.velocidad}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-md">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">M??tricas de {atleta2.nombre}</h3>
          <p>Fuerza: {atleta2.fuerza}</p>
          <p>Resistencia: {atleta2.resistencia}</p>
          <p>T??cnica: {atleta2.tecnica}</p>
          <p>Velocidad: {atleta2.velocidad}</p>
        </div>
      </div>
    </div>
  );
};

export default ComparacionDirecta;
