// src/features/comparativas-longitudinales/components/ReportesCientificos.tsx
// Reportes científicos significancia estadística cambios
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BarChart3, CheckCircle } from 'lucide-react';

const ReportesCientificos: React.FC = () => {
  const reports = [
    { title: 'Análisis Longitudinal Q1 2024', status: 'ready', pValue: 0.001, size: '2.4 MB' },
    { title: 'Comparativa Multi-Anual', status: 'ready', pValue: 0.015, size: '3.1 MB' },
    { title: 'Tendencias Predictivas', status: 'processing', pValue: null, size: '—' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
        <FileText className="w-5 h-5 text-violet-600" />
        <p className="text-sm font-semibold text-violet-700">
          Reportes disponibles: <span className="font-bold">{reports.filter(r => r.status === 'ready').length}</span>
        </p>
      </div>

      <div className="space-y-3">
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{report.title}</h5>
                  <p className="text-xs text-gray-600">{report.size}</p>
                </div>
              </div>

              {report.status === 'ready' && (
                <button className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Descargar
                </button>
              )}

              {report.status === 'processing' && (
                <div className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold">
                  Procesando...
                </div>
              )}
            </div>

            {report.pValue !== null && (
              <div className="flex items-center gap-4 mt-3 p-2 bg-green-50 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Significancia estadística</p>
                  <p className="text-xs font-bold text-green-700">
                    p-value: {report.pValue} {report.pValue < 0.05 ? '✓ Significativo' : ''}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportesCientificos;
