// src/features/comparativas-longitudinales/components/VentanasCriticas.tsx
// Identificación automática ventanas críticas desarrollo
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

const VentanasCriticas: React.FC = () => {
  const windows = [
    { period: 'Semana 12-16', status: 'critical', importance: 'Alta', description: 'Pico de adaptación muscular' },
    { period: 'Semana 20-24', status: 'optimal', importance: 'Media', description: 'Consolidación técnica' },
    { period: 'Semana 28-32', status: 'warning', importance: 'Alta', description: 'Pre-competición' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
        <Clock className="w-5 h-5 text-amber-600" />
        <p className="text-sm font-semibold text-amber-700">
          Ventanas identificadas: <span className="font-bold">{windows.length} períodos</span>
        </p>
      </div>

      <div className="space-y-3">
        {windows.map((window, index) => (
          <motion.div
            key={window.period}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 transition-all duration-300 hover:shadow-lg ${
              window.status === 'critical' ? 'border-red-200 bg-red-50/50' :
              window.status === 'warning' ? 'border-yellow-200 bg-yellow-50/50' :
              'border-green-200 bg-green-50/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {window.status === 'critical' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                {window.status === 'warning' && <Clock className="w-5 h-5 text-yellow-600" />}
                {window.status === 'optimal' && <CheckCircle2 className="w-5 h-5 text-green-600" />}

                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{window.period}</h5>
                  <p className="text-xs text-gray-600">{window.description}</p>
                </div>
              </div>

              <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                window.importance === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {window.importance}
              </div>
            </div>

            <div className={`mt-3 p-2 rounded-xl text-xs font-semibold ${
              window.status === 'critical' ? 'bg-red-100 text-red-700' :
              window.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {window.status === 'critical' && '⚠️ Ventana crítica - Requiere atención inmediata'}
              {window.status === 'warning' && '⏰ Ventana de alerta - Monitoreo recomendado'}
              {window.status === 'optimal' && '✅ Ventana óptima - Aprovecha este período'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VentanasCriticas;
