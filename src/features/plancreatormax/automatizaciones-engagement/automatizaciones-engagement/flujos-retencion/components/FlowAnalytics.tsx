import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Users, Mail, MousePointer, DollarSign, Clock,
  BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Eye
} from 'lucide-react';
import { FlowAnalytics as FlowAnalyticsType } from '../types';

interface FlowAnalyticsProps {
  analytics: FlowAnalyticsType;
  onClose: () => void;
}

const FlowAnalytics: React.FC<FlowAnalyticsProps> = ({ analytics, onClose }) => {
  const conversionFunnelData = analytics.nodeMetrics.map((metric, index) => ({
    step: index + 1,
    name: `Paso ${index + 1}`,
    reached: metric.reached,
    converted: metric.converted,
    dropOff: metric.dropOffRate,
    percentage: (metric.reached / analytics.totalEntries) * 100
  }));

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Total Entradas</p>
              <p className="text-2xl font-bold text-gray-800">{analytics.totalEntries}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Conversiones</p>
              <p className="text-2xl font-bold text-gray-800">{analytics.completions}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="w-3 h-3 text-green-600" />
            <span className="font-bold text-green-600">{analytics.conversionRate}%</span>
            <span className="text-gray-500">tasa conversión</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-gray-800">{analytics.averageTime}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Ingresos</p>
              <p className="text-2xl font-bold text-gray-800">${analytics.revenue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Funnel de Conversión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          Funnel de Conversión
        </h3>

        <div className="space-y-4">
          {conversionFunnelData.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{step.name}</p>
                    <p className="text-xs text-gray-500">{step.reached} usuarios llegaron</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{step.percentage.toFixed(1)}%</p>
                  {step.dropOff > 0 && (
                    <div className="flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                      <span className="text-xs font-bold text-red-600">{step.dropOff}% drop-off</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-end pr-2"
                  >
                    <span className="text-xs font-bold text-white">{step.converted}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Email Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Mail className="w-6 h-6 text-green-500" />
          Métricas de Email
        </h3>

        <div className="space-y-4">
          {analytics.emailMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-800">Email {index + 1}</p>
                <span className="text-xs font-bold text-gray-500">{metric.sent} enviados</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600">Apertura</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{metric.openRate}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.openRate}%` }}
                      transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                      className="h-full bg-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{metric.opened} abrieron</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-600">Clicks</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{metric.clickRate}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.clickRate}%` }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                      className="h-full bg-green-500 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{metric.clicked} hicieron click</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mt-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-purple-500" />
          Rendimiento en el Tiempo
        </h3>

        <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-300 flex items-center justify-center">
          <div className="text-center">
            <PieChart className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Gráfico temporal de conversiones</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlowAnalytics;
