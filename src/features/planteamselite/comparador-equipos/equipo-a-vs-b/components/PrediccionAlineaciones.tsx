import React from 'react';
import { Users, Layout, Sparkles } from 'lucide-react';

const PrediccionAlineaciones: React.FC = () => {
  const formaciones = [
    { equipo: 'A', formacion: '4-3-3', probabilidad: 75, color: 'red' },
    { equipo: 'B', formacion: '4-4-2', probabilidad: 80, color: 'blue' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
          <Layout className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Predicción de Alineaciones
        </h3>
      </div>

      <div className="space-y-4">
        {formaciones.map((form, index) => (
          <div
            key={index}
            className={`p-4 bg-gradient-to-r ${
              form.color === 'red' ? 'from-red-50 to-pink-50' : 'from-blue-50 to-indigo-50'
            } rounded-xl border ${
              form.color === 'red' ? 'border-red-200' : 'border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                  form.color === 'red' ? 'from-red-500 to-pink-600' : 'from-blue-500 to-indigo-600'
                } flex items-center justify-center text-white shadow-lg`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Equipo {form.equipo}</p>
                  <p className="text-lg font-bold text-gray-800">{form.formacion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold text-purple-700">{form.probabilidad}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${
                  form.color === 'red' ? 'from-red-500 to-pink-600' : 'from-blue-500 to-indigo-600'
                } rounded-full transition-all duration-1000`}
                style={{ width: `${form.probabilidad}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrediccionAlineaciones;
