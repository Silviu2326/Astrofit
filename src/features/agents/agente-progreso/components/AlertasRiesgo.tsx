import React, { useEffect, useState } from 'react';
import { agenteProgresoApi, Cliente } from '../agenteProgresoApi';

const AlertasRiesgo: React.FC = () => {
  const [clientesEnRiesgo, setClientesEnRiesgo] = useState<Cliente[]>([]);

  useEffect(() => {
    agenteProgresoApi.getClientes().then(clientes => {
      const hoy = new Date();
      const riesgo = clientes.filter(cliente => {
        const lastActivityDate = new Date(cliente.lastActivity);
        const diffTime = Math.abs(hoy.getTime() - lastActivityDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Simplificando la l??gica de "sin avances visibles" a solo la ??ltima actividad
        // En un caso real, se analizar??a el progreso de m??tricas espec??ficas
        return diffDays > 14;
      });
      setClientesEnRiesgo(riesgo);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alertas de Riesgo</h2>
      {clientesEnRiesgo.length > 0 ? (
        <ul className="space-y-3">
          {clientesEnRiesgo.map((cliente) => (
            <li key={cliente.id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <p className="text-sm text-red-700 font-medium">Cliente: <span className="font-bold">{cliente.nombre}</span></p>
              <p className="text-sm text-red-700">??ltima actividad: {cliente.lastActivity}</p>
              <p className="text-sm text-red-700">Sin avances visibles en m??s de 2 semanas.</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay clientes con alertas de riesgo actualmente.</p>
      )}
    </div>
  );
};

export default AlertasRiesgo;
