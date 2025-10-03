import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { Tarea, getTareas, updateTarea } from '../tareasApi';
import TareaCard from './TareaCard';

interface TareasListProps {
  filterStatus?: Tarea['estado'];
  filters?: {
    estado?: Tarea['estado'];
    fechaVencimiento?: string;
    asignadoA?: string;
    clienteRelacionado?: string;
  };
  onTareaUpdate?: () => void;
}

const TareasList: React.FC<TareasListProps> = ({ filterStatus, filters, onTareaUpdate }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTareas = async () => {
      setLoading(true);
      const data = await getTareas();
      setTareas(data);
      setLoading(false);
    };
    fetchTareas();
  }, [onTareaUpdate]);

  const handleToggleComplete = async (tarea: Tarea) => {
    const newEstado: Tarea['estado'] = tarea.estado === 'completada' ? 'pendiente' : 'completada';
    const updatedTarea = { ...tarea, estado: newEstado };
    await updateTarea(updatedTarea);
    setTareas((prevTareas) =>
      prevTareas.map((t) => (t.id === updatedTarea.id ? updatedTarea : t))
    );
    // Notificar al componente padre para actualizar estadísticas
    if (onTareaUpdate) {
      onTareaUpdate();
    }
  };

  // Función para aplicar todos los filtros
  const applyFilters = (tareas: Tarea[]) => {
    return tareas.filter((tarea) => {
      // Filtro por estado (prioridad al filterStatus si existe)
      const estadoFilter = filterStatus || filters?.estado;
      if (estadoFilter && tarea.estado !== estadoFilter) {
        return false;
      }

      // Filtro por fecha de vencimiento
      if (filters?.fechaVencimiento) {
        const tareaDate = new Date(tarea.fechaVencimiento).toDateString();
        const filterDate = new Date(filters.fechaVencimiento).toDateString();
        if (tareaDate !== filterDate) {
          return false;
        }
      }

      // Filtro por asignado a
      if (filters?.asignadoA && !tarea.asignadoA.toLowerCase().includes(filters.asignadoA.toLowerCase())) {
        return false;
      }

      // Filtro por cliente relacionado
      if (filters?.clienteRelacionado && tarea.clienteRelacionado) {
        if (!tarea.clienteRelacionado.toLowerCase().includes(filters.clienteRelacionado.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredTareas = applyFilters(tareas);

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
      {filteredTareas.map((tarea, index) => (
        <motion.div
          key={tarea.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.05 }}
        >
          <TareaCard tarea={tarea} onToggleComplete={handleToggleComplete} />
        </motion.div>
      ))}

      {filteredTareas.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {tareas.length === 0 ? 'No hay tareas' : 'No se encontraron tareas'}
          </h3>
          <p className="text-gray-600">
            {tareas.length === 0 
              ? 'Crea tu primera tarea para comenzar a organizar tu trabajo'
              : 'No se encontraron tareas que coincidan con los filtros seleccionados'
            }
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TareasList;
