
import React from 'react';
import { mockServicios, Servicio } from '../landingServiciosApi';

interface ServiciosGridProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const ServiciosGrid: React.FC<ServiciosGridProps> = ({ brandColors }) => {
  return (
    <section className="py-16">
      <h2 className={`text-4xl font-bold text-center mb-12 ${brandColors.secondary}`}>Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockServicios.map((servicio: Servicio) => (
          <div
            key={servicio.id}
            className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition duration-300 border-t-4 border-blue-500"
          >
            <div className={`text-5xl mb-4 ${brandColors.primary.replace('bg-', 'text-')}`}>{servicio.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{servicio.name}</h3>
            <p className="text-gray-600 mb-4">{servicio.description}</p>
            <p className={`text-xl font-bold ${brandColors.secondary}`}>{servicio.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiciosGrid;
