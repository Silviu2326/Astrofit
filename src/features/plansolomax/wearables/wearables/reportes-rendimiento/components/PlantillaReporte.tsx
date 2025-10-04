import React from 'react';

interface PlantillaReporteProps {
  data: any; // Datos del reporte
}

const PlantillaReporte: React.FC<PlantillaReporteProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Reporte de Rendimiento de Wearables</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sección de Sueño</h3>
        <p>Promedio de sueño: {data?.sleep?.average} horas/día</p>
        <p>Tendencia: {data?.sleep?.trend}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sección de Actividad</h3>
        <p>Pasos promedio: {data?.activity?.steps}</p>
        <p>Tendencia: {data?.activity?.trend}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sección de Frecuencia Cardíaca</h3>
        <p>Frecuencia cardíaca promedio: {data?.heartRate?.average} bpm</p>
        <p>Tendencia: {data?.heartRate?.trend}</p>
      </div>

      {/* Otras secciones del reporte */}
    </div>
  );
};

export default PlantillaReporte;
