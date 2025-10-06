import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Trophy, Stethoscope, GraduationCap, Briefcase } from 'lucide-react';

const VisualizadorRoles: React.FC = () => {
  const [roles] = useState([
    { name: 'Jugador', count: 15, icon: Trophy, color: 'from-blue-500 to-cyan-500' },
    { name: 'Capitán', count: 2, icon: GraduationCap, color: 'from-yellow-500 to-orange-500' },
    { name: 'Entrenador', count: 3, icon: Users, color: 'from-green-500 to-emerald-500' },
    { name: 'Fisioterapeuta', count: 2, icon: Stethoscope, color: 'from-red-500 to-pink-500' },
    { name: 'Directivo', count: 4, icon: Briefcase, color: 'from-purple-500 to-indigo-500' },
  ]);

  const totalMembers = roles.reduce((sum, role) => sum + role.count, 0);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Vista</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Roles Actuales
            </h3>
          </div>
        </div>

        {/* Contador total */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Total Miembros</span>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {totalMembers}
            </span>
          </div>
        </div>

        {/* Grid de roles */}
        <div className="space-y-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 border border-gray-100 hover:border-indigo-200 group/item"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-md group-hover/item:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{role.name}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(role.count / totalMembers) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full bg-gradient-to-r ${role.color} rounded-full`}
                    ></motion.div>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${role.color} shadow-sm`}>
                  <span className="text-sm font-bold text-white">{role.count}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualizadorRoles;
