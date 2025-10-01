
// src/features/referidos/components/EstadisticasReferidos.tsx

import React, { useState, useEffect } from 'react';
import { getReferrerStats, ReferrerStats } from '../referidosApi';

interface EstadisticasReferidosProps {
  currentUserId: string;
}

const EstadisticasReferidos: React.FC<EstadisticasReferidosProps> = ({ currentUserId }) => {
  const [stats, setStats] = useState<ReferrerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getReferrerStats();
        setStats(data.find(s => s.referrerId === currentUserId) || null);
      } catch (err) {
        setError('Error al cargar las estadísticas de referidos.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [currentUserId]);

  if (loading) return <div className="text-center py-4">Cargando estadísticas de referidos...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  if (!stats) return <div className="bg-white shadow rounded-lg p-6 mb-6 text-center text-gray-500">No hay estadísticas de referidos disponibles para ti.</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tus Estadísticas de Referidos</h2>
      <p className="text-gray-600 mb-4">Monitorea tu impacto y las recompensas que has ganado.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <p className="text-3xl font-bold text-green-700">{stats.totalReferrals}</p>
          <p className="text-green-600">Referidos Totales</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <p className="text-3xl font-bold text-yellow-700">{stats.successfulReferrals}</p>
          <p className="text-yellow-600">Referidos Exitosos</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <p className="text-3xl font-bold text-blue-700">{stats.pendingReferrals}</p>
          <p className="text-blue-600">Referidos Pendientes</p>
        </div>
      </div>

      {stats.rewardsEarned.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Recompensas Obtenidas</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {stats.rewardsEarned.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EstadisticasReferidos;
