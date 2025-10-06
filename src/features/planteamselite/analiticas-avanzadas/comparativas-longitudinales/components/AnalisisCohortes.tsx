// src/features/comparativas-longitudinales/components/AnalisisCohortes.tsx
// Análisis cohortes comparar generaciones atletas
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp } from 'lucide-react';

const AnalisisCohortes: React.FC = () => {
  const cohorts = [
    { generation: '2018-2020', athletes: 45, avgPerf: 82, badge: 'Oro' },
    { generation: '2021-2023', athletes: 38, avgPerf: 78, badge: 'Plata' },
    { generation: '2024+', athletes: 52, avgPerf: 85, badge: 'Oro' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200">
        <Users className="w-5 h-5 text-indigo-600" />
        <p className="text-sm font-semibold text-indigo-700">
          Cohortes analizadas: <span className="font-bold">{cohorts.length} generaciones</span>
        </p>
      </div>

      <div className="space-y-3">
        {cohorts.map((cohort, index) => (
          <motion.div
            key={cohort.generation}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-bold text-gray-900 text-sm">{cohort.generation}</h5>
                <p className="text-xs text-gray-600">{cohort.athletes} atletas</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                cohort.badge === 'Oro'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <Award className="w-3 h-3 inline mr-1" />
                {cohort.badge}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Rendimiento promedio:</span>
              <span className="text-sm font-bold text-blue-700">{cohort.avgPerf}%</span>
            </div>

            <div className="mt-2 w-full bg-blue-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cohort.avgPerf}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalisisCohortes;
