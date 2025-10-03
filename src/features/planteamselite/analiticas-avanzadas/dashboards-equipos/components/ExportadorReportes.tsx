import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, File } from 'lucide-react';

const ExportadorReportes: React.FC = () => {
  const formatosExportacion = [
    { formato: 'PDF', icon: FileText, color: 'from-red-500 to-pink-600' },
    { formato: 'Excel', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-600' },
    { formato: 'CSV', icon: File, color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
            <Download className="w-5 h-5 text-white" />
          </div>
          Exportador de Reportes
        </h3>

        <div className="space-y-3">
          {formatosExportacion.map((formato, index) => {
            const Icon = formato.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${formato.color} shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group/btn`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white">Exportar {formato.formato}</span>
                </div>
                <Download className="w-5 h-5 text-white group-hover/btn:translate-y-1 transition-transform duration-300" />
              </motion.button>
            );
          })}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
        >
          <p className="text-xs text-gray-600 text-center">
            <span className="font-semibold">Reportes ejecutivos</span> con métricas completas
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExportadorReportes;
