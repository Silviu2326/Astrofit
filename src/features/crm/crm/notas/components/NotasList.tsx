import React from 'react';
import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';
import { Nota } from '../notasApi';
import NotaCard from './NotaCard';

interface NotasListProps {
  notas: Nota[];
  onEdit: (nota: Nota) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
}

const NotasList: React.FC<NotasListProps> = ({ notas, onEdit, onDelete, viewMode }) => {
  if (notas.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
      >
        <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">No hay notas</h3>
        <p className="text-gray-600">No se encontraron notas con los filtros seleccionados</p>
      </motion.div>
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
      {notas.map((nota, index) => (
        <motion.div
          key={nota.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.05 }}
        >
          <NotaCard nota={nota} onEdit={onEdit} onDelete={onDelete} viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  );
};

export default NotasList;
