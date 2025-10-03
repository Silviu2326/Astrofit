import React, { useEffect, useState } from 'react';
import { getClientesConRiesgo, Cliente } from '../alertasRetencionApi';

const TarjetasRiesgo: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientesConRiesgo();
        setClientes(data);
      } catch (error) {
        // Manejar error
      }
    };
    fetchClientes();
  }, []);

  const getCardClass = (riesgo: Cliente['riesgo']) => {
    switch (riesgo) {
      case 'alto':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'medio':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'bajo':
        return 'bg-green-100 border-green-500 text-green-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getRiskText = (riesgo: Cliente['riesgo']) => {
    switch (riesgo) {
      case 'alto':
        return 'Alto Riesgo';
      case 'medio':
        return 'Riesgo Medio';
      case 'bajo':
        return 'Estable';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow col-span-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tarjetas de Riesgo de Clientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className={`p-4 rounded-lg border-l-4 ${getCardClass(cliente.riesgo)}`}>
            <h3 className="font-bold text-lg mb-1">{cliente.nombre}</h3>
            <p>Riesgo: <span className="font-semibold">{getRiskText(cliente.riesgo)}</span></p>
            <p>Progreso: {cliente.progreso}%</p>
            <p>Semanas sin progreso: {cliente.semanasSinProgreso}</p>
            {cliente.semanasSinProgreso >= 2 && (
              <p className="text-sm mt-2 font-medium">Alerta: Más de 2 semanas sin progreso.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarjetasRiesgo;
