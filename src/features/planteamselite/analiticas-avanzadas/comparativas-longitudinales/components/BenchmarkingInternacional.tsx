// src/features/comparativas-longitudinales/components/BenchmarkingInternacional.tsx
// Sistema benchmarking bases datos deportivas internacionales
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, ArrowUp, ArrowDown } from 'lucide-react';

const BenchmarkingInternacional: React.FC = () => {
  const benchmarks = [
    { country: 'España', rank: 3, score: 92, change: 2 },
    { country: 'Alemania', rank: 1, score: 98, change: 0 },
    { country: 'Francia', rank: 5, score: 87, change: -1 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200">
        <Globe className="w-5 h-5 text-teal-600" />
        <p className="text-sm font-semibold text-teal-700">
          Comparación internacional: <span className="font-bold">{benchmarks.length} países</span>
        </p>
      </div>

      <div className="space-y-2">
        {benchmarks.map((benchmark, index) => (
          <motion.div
            key={benchmark.country}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                  benchmark.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  benchmark.rank <= 3 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                  'bg-gradient-to-br from-orange-400 to-orange-600'
                }`}>
                  {benchmark.rank === 1 && <Award className="w-5 h-5" />}
                  {benchmark.rank !== 1 && `#${benchmark.rank}`}
                </div>

                <div>
                  <h5 className="font-bold text-gray-900">{benchmark.country}</h5>
                  <p className="text-xs text-gray-600">Puntuación: {benchmark.score}/100</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {benchmark.change > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                    <ArrowUp className="w-3 h-3 text-green-700" />
                    <span className="text-xs font-bold text-green-700">+{benchmark.change}</span>
                  </div>
                )}
                {benchmark.change < 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
                    <ArrowDown className="w-3 h-3 text-red-700" />
                    <span className="text-xs font-bold text-red-700">{benchmark.change}</span>
                  </div>
                )}
                {benchmark.change === 0 && (
                  <div className="px-2 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-bold text-gray-700">—</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 w-full bg-teal-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${benchmark.score}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-600 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkingInternacional;
