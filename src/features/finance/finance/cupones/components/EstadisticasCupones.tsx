
import React, { useEffect, useState } from 'react';
import { getCouponStats } from '../cuponesApi';

interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalUses: number;
  conversionRate: string;
  couponEffectiveness: Array<{ code: string; uses: number; effectiveness: string }>;
}

const EstadisticasCupones: React.FC = () => {
  const [stats, setStats] = useState<CouponStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getCouponStats();
        setStats(data);
      } catch (err) {
        setError('Error al cargar las estadísticas de cupones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <p>Cargando estadísticas de cupones...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!stats) return <p>No se pudieron cargar las estadísticas.</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-blue-600">Total de Cupones</p>
          <p className="text-2xl font-bold text-blue-800">{stats.totalCoupons}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-green-600">Cupones Activos</p>
          <p className="text-2xl font-bold text-green-800">{stats.activeCoupons}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-red-600">Cupones Caducados</p>
          <p className="text-2xl font-bold text-red-800">{stats.expiredCoupons}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-yellow-600">Usos Totales</p>
          <p className="text-2xl font-bold text-yellow-800">{stats.totalUses}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasa de Conversión General</h3>
        <p className="text-4xl font-bold text-indigo-600">{stats.conversionRate}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Efectividad por Cupón</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usos</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efectividad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.couponEffectiveness.map((coupon, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.uses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.effectiveness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasCupones;
