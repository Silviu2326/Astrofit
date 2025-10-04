import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { Tarea, useTareas, completarTarea, TareasFilters } from '../tareasApi';
import TareaCard from './TareaCard';

interface TareasListProps {
  filterStatus?: Tarea['estado'];
  filters?: Partial<TareasFilters>;
  onTareaUpdate?: () => void;
  isLoading?: boolean;
}

const TareasList: React.FC<TareasListProps> = ({ filterStatus, filters, onTareaUpdate, isLoading: externalLoading }) => {
  const { data: tareas, isLoading: internalLoading, refetch } = useTareas({
    ...filters,
    estado: filterStatus || filters?.estado
  });

  const loading = externalLoading || internalLoading;

  const handleToggleComplete = async (tarea: Tarea) => {
    try {
      if (tarea.estado === 'completada') {
        // Si está completada, cambiar a pendiente
        await import('../tareasApi').then(m => m.updateTarea(tarea.id, { estado: 'pendiente' }));
      } else {
        // Si no está completada, marcar como completada
        await completarTarea(tarea.id);
      }

      // Actualizar la lista
      refetch();

      // Notificar al componente padre para actualizar estadísticas
      if (onTareaUpdate) {
        onTareaUpdate();
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-700">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {tareas.map((tarea, index) => (
        <motion.div
          key={tarea.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.05 }}
        >
          <TareaCard tarea={tarea} onToggleComplete={handleToggleComplete} />
        </motion.div>
      ))}

      {tareas.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No se encontraron tareas
          </h3>
          <p className="text-gray-600">
            {filters && Object.keys(filters).some(k => filters[k as keyof typeof filters])
              ? 'No se encontraron tareas que coincidan con los filtros seleccionados'
              : 'Crea tu primera tarea para comenzar a organizar tu trabajo'
            }
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TareasList;
