import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Edit2, MoreVertical } from 'lucide-react';
import { MiembroEquipo } from '../listadoRolesApi';

interface TablaEquipoProps {
  equipo: MiembroEquipo[];
}

const getRolColor = (rol: string) => {
  const colors: Record<string, string> = {
    'Capitán': 'from-yellow-500 to-orange-500',
    'Entrenador Principal': 'from-blue-500 to-indigo-600',
    'Asistente': 'from-cyan-500 to-blue-500',
    'Fisioterapeuta': 'from-green-500 to-emerald-600',
    'Atleta': 'from-purple-500 to-pink-500',
  };
  return colors[rol] || 'from-gray-500 to-gray-600';
};

const getRolBadgeColor = (rol: string) => {
  const colors: Record<string, string> = {
    'Capitán': 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-yellow-200',
    'Entrenador Principal': 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200',
    'Asistente': 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-200',
    'Fisioterapeuta': 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200',
    'Atleta': 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200',
  };
  return colors[rol] || 'bg-gray-50 text-gray-700 border-gray-200';
};

export const TablaEquipo: React.FC<TablaEquipoProps> = ({ equipo }) => {
  return (
    <div className="space-y-3">
      {equipo.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex items-center gap-4">
            {/* Avatar con borde gradiente */}
            <div className="relative flex-shrink-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${getRolColor(member.rolPrincipal)} rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src={member.fotoPerfil}
                  alt={member.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Indicador de rol en icono */}
              <div className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br ${getRolColor(member.rolPrincipal)} rounded-lg flex items-center justify-center shadow-lg border-2 border-white`}>
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Información del miembro */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">{member.nombre}</h3>
                {member.rolPrincipal === 'Capitán' && (
                  <span className="text-yellow-500 text-xl">⭐</span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">{member.posicion}</p>
              </div>

              {/* Badge de rol */}
              <div className="inline-flex items-center gap-2">
                <div className={`px-4 py-1.5 rounded-full border ${getRolBadgeColor(member.rolPrincipal)}`}>
                  <span className="text-xs font-bold uppercase tracking-wide">{member.rolPrincipal}</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                title="Editar miembro"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                title="Más opciones"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {equipo.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-600">No se encontraron miembros</p>
          <p className="text-sm text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
        </motion.div>
      )}
    </div>
  );
};
