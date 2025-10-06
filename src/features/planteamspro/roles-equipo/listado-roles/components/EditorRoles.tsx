import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Users, Shield } from 'lucide-react';

const EditorRoles: React.FC = () => {
  const rolesEjemplo = ['Capitán', 'Entrenador Principal', 'Asistente', 'Fisioterapeuta', 'Atleta'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Edit3 className="w-6 h-6" />
          </div>
          Editor Visual de Roles
        </h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">Arrastra y suelta para reorganizar roles</p>

        <div className="space-y-3">
          {rolesEjemplo.map((rol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 cursor-move group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700 flex-1">{rol}</span>
              <div className="text-gray-400">⋮⋮</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EditorRoles;
