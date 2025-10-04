import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Edit, Trash2, Play, Pause } from 'lucide-react';
import { Membresia } from '../listadoMembresiasApi';

// Los datos ahora se cargan desde la API en el componente padre

const TarjetaMembresia: React.FC<{ 
  membresia: Membresia; 
  index: number;
  onEdit: (membresia: Membresia) => void;
  onDelete: (membresia: Membresia) => void;
}> = ({ membresia, index, onEdit, onDelete }) => {

  const getNivelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'bronce': return 'from-amber-500 to-orange-600';
      case 'plata': return 'from-gray-400 to-gray-600';
      case 'oro': return 'from-yellow-400 to-yellow-600';
      case 'premium': return 'from-purple-500 to-pink-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const getNivelIcon = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'bronce': return '🥉';
      case 'plata': return '🥈';
      case 'oro': return '🥇';
      case 'premium': return '💎';
      default: return '👑';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${getNivelColor(membresia.nivel)} opacity-5 rounded-full blur-2xl`}></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header con gradiente */}
        <div className={`bg-gradient-to-r ${getNivelColor(membresia.nivel)} p-4 rounded-2xl mb-4 relative overflow-hidden`}>
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="text-3xl">{getNivelIcon(membresia.nivel)}</div>
            <div>
              <h3 className="text-xl font-bold text-white">Membresía {membresia.nivel}</h3>
              <div className="flex items-center gap-2 mt-1">
                {membresia.estado === 'activo' ? (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Play className="w-3 h-3 text-green-300" />
                    <span className="text-xs font-semibold text-white">Activa</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Pause className="w-3 h-3 text-yellow-300" />
                    <span className="text-xs font-semibold text-white">Pausada</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Miembros Activos</p>
              <p className="text-2xl font-bold text-gray-900">{membresia.miembrosActivos}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Ingresos Generados</p>
              <p className="text-2xl font-bold text-gray-900">${membresia.ingresosGenerados.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 flex gap-2">
          <motion.button
            onClick={() => onEdit(membresia)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar
          </motion.button>
          <motion.button
            onClick={() => onDelete(membresia)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const TarjetasMembresia: React.FC<{
  membresias: Membresia[];
  onEdit: (membresia: Membresia) => void;
  onDelete: (membresia: Membresia) => void;
}> = ({ membresias, onEdit, onDelete }) => {
  return (
    <>
      {membresias.map((membresia, index) => (
        <TarjetaMembresia 
          key={membresia.id} 
          membresia={membresia} 
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default TarjetasMembresia;
