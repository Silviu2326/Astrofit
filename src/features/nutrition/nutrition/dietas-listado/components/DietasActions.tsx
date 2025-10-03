import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Download,
  Mail,
  FileText,
  Printer,
  CheckSquare,
  Share2
} from 'lucide-react';

export const DietasActions: React.FC = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      {/* Botón principal - Nueva Dieta */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.dispatchEvent(new CustomEvent('app:navigate', { detail: { page: 'dieta-nueva' } }))}
        className="px-6 py-3 bg-gradient-to-br from-lime-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

        <Plus className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Nueva Dieta</span>
      </motion.button>

      {/* Botón Enviar Recordatorios */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-blue-200 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center gap-2 shadow-lg"
      >
        <Mail className="w-5 h-5" />
        <span>Enviar Recordatorios</span>
      </motion.button>

      {/* Dropdown Exportar */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-emerald-200 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 flex items-center gap-2 shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>Exportar</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showExportMenu ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showExportMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="p-2">
                <button className="w-full px-4 py-3 flex items-center gap-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 rounded-xl transition-all duration-200 group">
                  <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Exportar CSV</div>
                    <div className="text-xs text-gray-500">Descargar como CSV</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 rounded-xl transition-all duration-200 group">
                  <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Exportar Excel</div>
                    <div className="text-xs text-gray-500">Descargar como XLSX</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 rounded-xl transition-all duration-200 group">
                  <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Exportar PDF</div>
                    <div className="text-xs text-gray-500">Generar reporte PDF</div>
                  </div>
                </button>

                <div className="my-2 border-t border-gray-200"></div>

                <button className="w-full px-4 py-3 flex items-center gap-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 rounded-xl transition-all duration-200 group">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Printer className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Imprimir</div>
                    <div className="text-xs text-gray-500">Vista de impresión</div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón Generar Reportes */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-purple-200 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center gap-2 shadow-lg"
      >
        <FileText className="w-5 h-5" />
        <span className="hidden sm:inline">Reportes</span>
      </motion.button>

      {/* Botón Compartir */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 shadow-lg"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Compartir</span>
      </motion.button>
    </div>
  );
};
