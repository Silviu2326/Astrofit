import React from 'react';
import { motion } from 'framer-motion';
import { Search, Frown } from 'lucide-react';
import { Ejercicio } from '../bibliotecaEjerciciosApi';
import { EjercicioCard } from './EjercicioCard';

interface EjerciciosGridProps {
  ejercicios: Ejercicio[];
}

export const EjerciciosGrid: React.FC<EjerciciosGridProps> = ({ ejercicios }) => {
  if (ejercicios.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 max-w-md w-full text-center relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            {/* Icono animado */}
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 shadow-xl"
            >
              <Search className="w-10 h-10" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No se encontraron ejercicios
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              No hay ejercicios que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros o buscar con otros términos.
            </p>

            {/* Sugerencias */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">Sugerencias:</p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Usa palabras más generales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Reduce los filtros aplicados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Revisa la ortografía</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {ejercicios.map((ejercicio, index) => (
        <EjercicioCard key={ejercicio.id} ejercicio={ejercicio} index={index} />
      ))}
    </div>
  );
};
