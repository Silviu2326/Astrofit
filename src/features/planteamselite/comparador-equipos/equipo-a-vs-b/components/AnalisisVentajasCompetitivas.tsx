import React from 'react';
import { TrendingUp, Shield, Zap, Target, CheckCircle } from 'lucide-react';

const AnalisisVentajasCompetitivas: React.FC = () => {
  const ventajas = [
    { equipo: 'A', icono: Shield, ventaja: 'Solidez defensiva en casa', color: 'text-green-600', bgColor: 'bg-green-50' },
    { equipo: 'A', icono: Zap, ventaja: 'Velocidad en contraataques', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { equipo: 'B', icono: Target, ventaja: 'Control del mediocampo', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { equipo: 'B', icono: TrendingUp, ventaja: 'Experiencia en partidos importantes', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
          Ventajas Competitivas
        </h3>
      </div>

      <div className="space-y-3">
        {ventajas.map((item, index) => {
          const Icon = item.icono;
          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 ${item.bgColor} rounded-xl border hover:shadow-md transition-all duration-300`}
            >
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-lg ${item.color} bg-white flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 ${item.color} text-xs font-bold rounded-full bg-white`}>
                    Equipo {item.equipo}
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm font-medium text-gray-700">{item.ventaja}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalisisVentajasCompetitivas;
