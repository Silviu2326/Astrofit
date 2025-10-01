import React from 'react';
import RadarClientes from './components/RadarClientes';
import TarjetasRiesgo from './components/TarjetasRiesgo';
import AccionesRapidas from './components/AccionesRapidas';
import SugerenciasRetencion from './components/SugerenciasRetencion';

const AlertasRetencionPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Alertas de Retención de Clientes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Tarjetas de Riesgo */}
        <TarjetasRiesgo />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar de Clientes */}
        <RadarClientes />
        
        {/* Sugerencias de Retención */}
        <SugerenciasRetencion />
      </div>

      <div className="mb-8">
        {/* Acciones Rápidas */}
        <AccionesRapidas />
      </div>

      {/* Aquí se podría añadir la lista de clientes con baja asistencia o adherencia */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Clientes con Baja Asistencia o Adherencia</h2>
        {/* Implementar tabla o lista de clientes aquí */}
        <p className="text-gray-600">Lista de clientes con baja asistencia o adherencia, con detalles de su progreso y riesgo de churn.</p>
        {/* Ejemplo de alerta automática */}
        <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">Alerta Automática:</p>
          <p>El cliente Juan Pérez lleva más de 2 semanas sin registrar progreso.</p>
        </div>
      </div>
    </div>
  );
};

export default AlertasRetencionPage;
