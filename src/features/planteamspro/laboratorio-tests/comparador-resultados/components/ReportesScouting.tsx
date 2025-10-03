import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle } from 'lucide-react';

const ReportesScouting: React.FC = () => {
  const reportes = [
    { tipo: 'Reporte Completo', estado: 'Listo', fecha: '15 Ene 2025' },
    { tipo: 'Análisis Táctico', estado: 'Listo', fecha: '14 Ene 2025' },
    { tipo: 'Métricas Avanzadas', estado: 'Generando...', fecha: 'Hoy' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Reportes de Scouting</h3>
        </div>

        <div className="space-y-3">
          {reportes.map((rep, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 hover:border-cyan-200 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500 rounded-xl">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{rep.tipo}</p>
                    <p className="text-xs text-gray-600">{rep.fecha}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rep.estado === 'Listo' ? (
                    <>
                      <div className="px-2 py-1 bg-green-100 rounded-lg">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Download className="w-4 h-4 text-white" />
                      </motion.button>
                    </>
                  ) : (
                    <div className="px-3 py-1 bg-yellow-100 rounded-full">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-yellow-700">Generando</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportesScouting;
