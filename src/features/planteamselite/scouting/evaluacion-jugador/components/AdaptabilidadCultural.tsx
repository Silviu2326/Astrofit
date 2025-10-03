import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages, Users, MapPin } from 'lucide-react';

const AdaptabilidadCultural: React.FC = () => {
  const atributos = [
    { nombre: 'Idioma', nivel: 'Intermedio', icono: Languages, color: 'blue' },
    { nombre: 'Integración', nivel: 'Alto', icono: Users, color: 'green' },
    { nombre: 'Experiencia Int.', nivel: 'Sí', icono: Globe, color: 'purple' },
  ];

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'purple':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Globe className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Adaptabilidad Cultural</h2>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Evaluación cultural y lingüística para fichajes internacionales
        </p>

        {/* Atributos con badges */}
        <div className="space-y-3">
          {atributos.map((atributo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-indigo-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <atributo.icono className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{atributo.nombre}</span>
              </div>
              <div className={`px-3 py-1 ${getBadgeColor(atributo.color)} text-white text-xs font-bold rounded-full`}>
                {atributo.nivel}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ubicación */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span className="font-medium">Ubicación preferida:</span>
            <span className="font-bold text-indigo-700">Europa</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdaptabilidadCultural;
