import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';

const BenchmarksHistoricos: React.FC = () => {
  const benchmarks = [
    { periodo: '2024', promedio: 82, cambio: '+12%', color: 'green' },
    { periodo: '2023', promedio: 73, cambio: '+8%', color: 'blue' },
    { periodo: '2022', promedio: 68, cambio: '+5%', color: 'gray' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Benchmarks Históricos</h3>
        </div>

        <div className="space-y-3">
          {benchmarks.map((bench, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-xl">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{bench.periodo}</p>
                  <p className="text-xs text-gray-600">Promedio del equipo</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-indigo-600">{bench.promedio}%</span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    bench.color === 'green' ? 'bg-green-100' : bench.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <ArrowUpRight className={`w-3 h-3 ${
                      bench.color === 'green' ? 'text-green-600' : bench.color === 'blue' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <span className={`text-xs font-bold ${
                      bench.color === 'green' ? 'text-green-600' : bench.color === 'blue' ? 'text-blue-600' : 'text-gray-600'
                    }`}>{bench.cambio}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BenchmarksHistoricos;
