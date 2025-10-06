import React from 'react';
import { motion } from 'framer-motion';
import { Users, Dumbbell, Heart, TrendingUp, Shield } from 'lucide-react';

interface TeamPerformance {
  team: string;
  weeklyLoad: number;
  injuryPercentage: number;
  trainingAdherence: number;
  availability: number;
  performance: number;
}

interface WidgetsConfigurablesProps {
  teamData: TeamPerformance[];
}

const WidgetsConfigurables: React.FC<WidgetsConfigurablesProps> = ({ teamData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          Widgets Configurables por Equipo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  {team.team}
                </h3>

                <div className="space-y-3">
                  {/* Carga de Trabajo */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Carga de Trabajo</span>
                    </div>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      {team.weeklyLoad}
                    </span>
                  </div>

                  {/* Disponibilidad */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-green-50 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Disponibilidad</span>
                    </div>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                      {team.availability}%
                    </span>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Performance</span>
                    </div>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {team.performance}%
                    </span>
                  </div>

                  {/* % Lesiones */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-red-50 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">% Lesiones</span>
                    </div>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                      {team.injuryPercentage}%
                    </span>
                  </div>

                  {/* Adherencia Entrenos */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Adherencia Entrenos</span>
                      <span className="text-sm font-bold text-indigo-600">{team.trainingAdherence}%</span>
                    </div>
                    <div className="w-full bg-indigo-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${team.trainingAdherence}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 text-sm text-gray-500 text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
        >
          <span className="font-semibold">*</span> Estos widgets son configurables y muestran métricas agrupadas por equipo.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WidgetsConfigurables;
