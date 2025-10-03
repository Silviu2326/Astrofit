import React from 'react';
import { motion } from 'framer-motion';

interface SegmentoPreviewProps {
  count: number;
}

const SegmentoPreview: React.FC<SegmentoPreviewProps> = ({ count }) => {
  const getPreviewMessage = () => {
    if (count === 0) {
      return "Ajusta las reglas para ver una previsualización de los miembros.";
    } else if (count < 10) {
      return "Segmento pequeño - ideal para campañas personalizadas.";
    } else if (count < 50) {
      return "Segmento mediano - perfecto para seguimiento directo.";
    } else if (count < 200) {
      return "Segmento grande - ideal para campañas masivas.";
    } else {
      return "Segmento muy grande - considera dividir en sub-segmentos.";
    }
  };

  const getPreviewColor = () => {
    if (count === 0) return "text-gray-600";
    if (count < 10) return "text-green-700";
    if (count < 50) return "text-blue-700";
    if (count < 200) return "text-orange-700";
    return "text-red-700";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-xl font-semibold text-blue-800">Previsualización del Segmento</h3>
      </div>
      
      {count > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">{count}</span>
            <div>
              <p className="text-lg font-medium text-blue-800">miembros encontrados</p>
              <p className={`text-sm ${getPreviewColor()}`}>{getPreviewMessage()}</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              <strong>💡 Sugerencia:</strong> {count > 100 ? 
                "Considera usar filtros adicionales para segmentar mejor tu audiencia." :
                "Este segmento es ideal para campañas personalizadas y seguimiento directo."
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-blue-700 mb-2">🔍 No hay miembros que cumplan con las reglas actuales</p>
          <p className="text-sm text-blue-600">Ajusta las reglas para ver una previsualización de los miembros.</p>
        </div>
      )}
    </motion.div>
  );
};

export default SegmentoPreview;