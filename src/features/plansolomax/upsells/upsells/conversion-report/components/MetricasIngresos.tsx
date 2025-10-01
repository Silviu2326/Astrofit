import React, { useEffect, useState } from 'react';
import { fetchConversionReport } from '../conversionReportApi';

const MetricasIngresos: React.FC = () => {
  const [totalExtraRevenue, setTotalExtraRevenue] = useState<number>(0);
  const [totalUpsellsOffered, setTotalUpsellsOffered] = useState<number>(0);
  const [totalUpsellsAccepted, setTotalUpsellsAccepted] = useState<number>(0);

  useEffect(() => {
    const getReport = async () => {
      const report = await fetchConversionReport();
      setTotalExtraRevenue(report.totalExtraRevenue);
      setTotalUpsellsOffered(report.totalUpsellsOffered);
      setTotalUpsellsAccepted(report.totalUpsellsAccepted);
    };
    getReport();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Métricas Clave</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Upsells Ofrecidos:</span>
          <span className="text-lg font-bold text-blue-600">{totalUpsellsOffered}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Upsells Aceptados:</span>
          <span className="text-lg font-bold text-green-600">{totalUpsellsAccepted}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Ingresos Extra Generados:</span>
          <span className="text-lg font-bold text-purple-600">${totalExtraRevenue.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricasIngresos;
