import React from 'react';
import { Cloud, MapPin, Thermometer, Wind } from 'lucide-react';

const CondicionesAmbientales: React.FC = () => {
  const condiciones = [
    { factor: 'Localía', valor: 'Equipo A', icono: MapPin, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { factor: 'Temperatura', valor: '22°C', icono: Thermometer, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { factor: 'Clima', valor: 'Despejado', icono: Cloud, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { factor: 'Viento', valor: '15 km/h', icono: Wind, color: 'text-gray-600', bgColor: 'bg-gray-50' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl text-white shadow-lg">
          <Cloud className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          Condiciones Ambientales
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {condiciones.map((condicion, index) => {
          const Icon = condicion.icono;
          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-4 ${condicion.bgColor} rounded-xl border hover:shadow-md transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded-lg ${condicion.color} bg-white flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{condicion.factor}</p>
                <p className="text-sm font-bold text-gray-800">{condicion.valor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CondicionesAmbientales;
