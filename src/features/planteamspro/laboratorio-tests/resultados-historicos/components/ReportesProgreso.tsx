// components/ReportesProgreso.tsx - Reportes automáticos progreso atletas entrenadores
import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const ReportesProgreso: React.FC = () => {
  // Datos de ejemplo
  const ultimoReporte = '15 Dic 2024';
  const reportesGenerados = 12;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Reportes de Progreso</h3>
      </div>

      <div className="space-y-3">
        <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Último Reporte</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" />
            <p className="text-xl font-bold text-violet-600">{ultimoReporte}</p>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Reportes Generados</span>
            <span className="px-3 py-1 bg-violet-500 text-white text-sm font-bold rounded-full">
              {reportesGenerados}
            </span>
          </div>
        </div>

        <button className="w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>Descargar Reporte</span>
        </button>

        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs font-bold text-blue-900 mb-1">Incluye:</p>
          <ul className="space-y-0.5 text-xs text-blue-800">
            <li className="flex items-center gap-1">
              <span className="text-blue-500">•</span>
              <span>Evolución de resultados</span>
            </li>
            <li className="flex items-center gap-1">
              <span className="text-blue-500">•</span>
              <span>Análisis de tendencias</span>
            </li>
            <li className="flex items-center gap-1">
              <span className="text-blue-500">•</span>
              <span>Recomendaciones personalizadas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportesProgreso;
