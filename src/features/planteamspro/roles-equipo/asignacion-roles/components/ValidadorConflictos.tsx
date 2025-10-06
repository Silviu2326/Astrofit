import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const ValidadorConflictos: React.FC = () => {
  const [conflicts] = useState([
    { id: 1, person: 'Juan Pérez', role1: 'Capitán', role2: 'Entrenador', severity: 'high' },
    { id: 2, person: 'María García', role1: 'Jugador', role2: 'Fisioterapeuta', severity: 'medium' },
  ]);

  const hasConflicts = conflicts.length > 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group h-full"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* Icono y título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Validación</p>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              Conflictos de Roles
            </h3>
          </div>
        </div>

        {/* Estado */}
        <div className={`p-4 rounded-2xl mb-4 flex items-center gap-3 ${
          hasConflicts
            ? 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200'
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
        }`}>
          {hasConflicts ? (
            <>
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-bold text-red-700">Conflictos Detectados</p>
                <p className="text-sm text-red-600">{conflicts.length} incompatibilidades</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-bold text-green-700">Sin Conflictos</p>
                <p className="text-sm text-green-600">Todas las asignaciones son válidas</p>
              </div>
            </>
          )}
        </div>

        {/* Lista de conflictos */}
        {hasConflicts && (
          <div className="space-y-2">
            {conflicts.map((conflict, index) => (
              <motion.div
                key={conflict.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-red-200"
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    conflict.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{conflict.person}</p>
                    <p className="text-xs text-gray-600">
                      {conflict.role1} + {conflict.role2}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Barra decorativa inferior */}
        <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: hasConflicts ? '70%' : '100%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full rounded-full ${
              hasConflicts
                ? 'bg-gradient-to-r from-orange-500 to-red-600'
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
            }`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ValidadorConflictos;
