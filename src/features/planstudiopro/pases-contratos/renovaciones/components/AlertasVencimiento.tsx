import React, { useEffect, useState } from 'react';
import { Contrato, getContratosProximosAVencer } from '../renovacionesApi';

const AlertasVencimiento: React.FC = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContratos = async () => {
      const data = await getContratosProximosAVencer();
      setContratos(data);
      setLoading(false);
    };
    fetchContratos();
  }, []);

  const getDaysUntilExpiration = (dateString: string): number => {
    const today = new Date();
    const expirationDate = new Date(dateString);
    const diffTime = expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getAlertClass = (days: number): string => {
    if (days <= 7) return 'bg-red-100 text-red-800'; // Rojo
    if (days <= 15) return 'bg-orange-100 text-orange-800'; // Naranja
    if (days <= 30) return 'bg-yellow-100 text-yellow-800'; // Amarillo
    return 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow">Cargando alertas...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Alertas de Vencimiento</h2>
      {
        contratos.length === 0 ? (
          <p className="text-gray-600">No hay contratos próximos a vencer.</p>
        ) : (
          <ul className="space-y-3">
            {contratos.map((contrato) => {
              const days = getDaysUntilExpiration(contrato.fechaVencimiento);
              return (
                <li
                  key={contrato.id}
                  className={`p-3 rounded-md flex justify-between items-center ${getAlertClass(days)}`}
                >
                  <div>
                    <p className="font-medium">{contrato.cliente} - {contrato.servicio}</p>
                    <p className="text-sm">Vence en {days} días ({contrato.fechaVencimiento})</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-50">
                    {contrato.estado}
                  </span>
                </li>
              );
            })}
          </ul>
        )
      }
    </div>
  );
};

export default AlertasVencimiento;
