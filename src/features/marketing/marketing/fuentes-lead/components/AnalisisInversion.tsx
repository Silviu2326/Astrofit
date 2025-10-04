import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Award,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { getInvestmentAnalysis, InvestmentAnalysis } from '../fuentesLeadApi';

const AnalisisInversion: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      const data = await getInvestmentAnalysis();
      setInvestmentData(data);
      setLoading(false);
    };
    fetchInvestmentData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
            <p className="text-gray-600 font-semibold">Cargando análisis...</p>
          </div>
        </div>
      </div>
    );
  }

  const maxInvestment = Math.max(...investmentData.map(d => d.investment));
  const maxROI = Math.max(...investmentData.map(d => d.roi));
  const bestROI = investmentData.reduce((max, d) => d.roi > max.roi ? d : max, investmentData[0]);
  const worstCPA = investmentData.reduce((max, d) => d.costPerCustomer > max.costPerCustomer ? d : max, investmentData[0]);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <DollarSign className="w-6 h-6" />
            </div>
            Análisis de Inversión
          </h3>
          <p className="text-orange-100 mt-2">ROI y rendimiento por canal</p>
        </div>
      </div>

      <div className="p-6">
        {/* Recomendaciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500 rounded-xl">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">Mejor ROI</p>
                <p className="text-lg font-bold text-green-900">{bestROI.channel}</p>
                <p className="text-sm text-green-700">{bestROI.roi.toFixed(0)}% de retorno</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500 rounded-xl">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-800 mb-1">Mayor CPA</p>
                <p className="text-lg font-bold text-orange-900">{worstCPA.channel}</p>
                <p className="text-sm text-orange-700">€{worstCPA.costPerCustomer.toFixed(2)} por cliente</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabla estilizada */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Canal
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Inversión
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Leads
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  CPL
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Clientes
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  CPA
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {investmentData.map((item, index) => (
                <motion.tr
                  key={item.channel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{item.channel}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-700">€{item.investment.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{(item.investment / item.costPerCustomer * item.customersAcquired / item.customersAcquired).toFixed(0)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                      €{(item.investment / item.customersAcquired).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-emerald-600">{item.customersAcquired}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                      €{item.costPerCustomer.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-600">{item.roi.toFixed(0)}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráficos de barras comparativos */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              <h4 className="text-lg font-bold text-gray-800">Inversión por Canal</h4>
            </div>
            <div className="space-y-3">
              {investmentData.map((item, index) => {
                const percentage = (item.investment / maxInvestment) * 100;
                return (
                  <motion.div
                    key={`inv-${item.channel}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">{item.channel}</span>
                      <span className="text-sm font-bold text-gray-900">€{item.investment.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-8 bg-gray-100 rounded-xl overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.05 + 0.5, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl flex items-center justify-end pr-3"
                      >
                        <span className="text-xs font-bold text-white drop-shadow-lg">
                          {percentage.toFixed(0)}%
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h4 className="text-lg font-bold text-gray-800">ROI por Canal</h4>
            </div>
            <div className="space-y-3">
              {investmentData.map((item, index) => {
                const percentage = (item.roi / maxROI) * 100;
                return (
                  <motion.div
                    key={`roi-${item.channel}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.6 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">{item.channel}</span>
                      <span className="text-sm font-bold text-green-600">{item.roi.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-8 bg-gray-100 rounded-xl overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.05 + 0.8, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-xl flex items-center justify-end pr-3"
                      >
                        <span className="text-xs font-bold text-white drop-shadow-lg">
                          {percentage.toFixed(0)}%
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recomendaciones de optimización */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones de Optimización
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span className="text-sm text-blue-800">
                <strong>{bestROI.channel}</strong> tiene el mejor ROI ({bestROI.roi.toFixed(0)}%). Considera aumentar la inversión en este canal.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span className="text-sm text-blue-800">
                <strong>{worstCPA.channel}</strong> tiene el CPA más alto (€{worstCPA.costPerCustomer.toFixed(2)}). Revisa la estrategia de este canal.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span className="text-sm text-blue-800">
                Diversifica tu inversión entre los 3 canales con mejor ROI para optimizar resultados.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalisisInversion;
