import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Plus, ArrowRight, Timer, Zap } from 'lucide-react';

interface SuperseriesItem {
  id: string;
  name: string;
  exercises: string[];
  sets: number;
  rest: number;
}

const SuperseriesManager: React.FC = () => {
  const [superseries, setSuperseries] = useState<SuperseriesItem[]>([
    {
      id: 'ss1',
      name: 'Push-Pull Supremo',
      exercises: ['Press Banca', 'Remo con Barra', 'Press Militar', 'Dominadas'],
      sets: 3,
      rest: 90
    },
    {
      id: 'ss2',
      name: 'Pierna Completa',
      exercises: ['Sentadilla', 'Peso Muerto Rumano', 'Zancadas'],
      sets: 4,
      rest: 120
    }
  ]);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Link2 className="w-6 h-6" />
          </div>
          Superseries Manager
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {superseries.map((ss, index) => (
          <motion.div
            key={ss.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-4 border border-orange-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  {ss.name}
                </h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{ss.sets}</span> sets
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    <span>{ss.rest}s descanso</span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                {ss.exercises.length} ejercicios
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ss.exercises.map((ex, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex-1 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{ex}</p>
                  </div>
                  {idx < ss.exercises.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ))}

        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Crear Nueva Superserie
        </button>
      </div>
    </div>
  );
};

export default SuperseriesManager;
