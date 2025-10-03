import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, TrendingUp, Copy, Eye } from 'lucide-react';

const BibliotecaFormaciones: React.FC = () => {
  const formacionesEjemplo = [
    { id: 1, nombre: '4-3-3 Ofensivo', victorias: 15, rating: 4.8, uso: 'Alto' },
    { id: 2, nombre: '4-4-2 Clásico', victorias: 12, rating: 4.5, uso: 'Medio' },
    { id: 3, nombre: '3-5-2 Defensivo', victorias: 10, rating: 4.2, uso: 'Medio' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900">Biblioteca de Formaciones</h4>
          <p className="text-sm text-gray-600">Formaciones exitosas guardadas</p>
        </div>
      </div>

      {/* Grid de formaciones */}
      <div className="grid grid-cols-1 gap-3">
        {formacionesEjemplo.map((formacion, index) => (
          <motion.div
            key={formacion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-violet-200 hover:border-violet-400 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

            {/* Decoración */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-600 opacity-5 rounded-full blur-xl"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-gray-900">{formacion.nombre}</h5>
                  {/* Badge de rating */}
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                    <Star className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                    <span className="text-xs font-bold text-yellow-700">{formacion.rating}</span>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="font-semibold">{formacion.victorias} victorias</span>
                  </div>
                  <div className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                    {formacion.uso} uso
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  title="Ver formación"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  title="Copiar formación"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer con estadísticas */}
      <div className="mt-4 pt-4 border-t border-violet-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Total de formaciones guardadas</span>
          <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-bold text-xs">
            {formacionesEjemplo.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaFormaciones;
