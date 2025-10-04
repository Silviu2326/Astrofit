import React from 'react';
import { motion } from 'framer-motion';
import { Receta } from '../recetasBibliotecaApi';
import { RecetaCard } from './RecetaCard';
import { UtensilsCrossed } from 'lucide-react';

interface RecetasGridProps {
  recetas: Receta[];
  onSelectReceta: (receta: Receta) => void;
}

export const RecetasGrid: React.FC<RecetasGridProps> = ({ recetas, onSelectReceta }) => {
  if (recetas.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
            <UtensilsCrossed className="w-12 h-12 text-pink-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">No se encontraron recetas</h3>
          <p className="text-gray-600 max-w-md">
            No hay recetas que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {recetas.map((receta, index) => (
        <motion.div
          key={receta.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <RecetaCard receta={receta} onSelectReceta={onSelectReceta} />
        </motion.div>
      ))}
    </div>
  );
};
