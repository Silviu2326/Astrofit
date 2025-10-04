import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, TrendingUp, Award, Target } from 'lucide-react';
import { getParticipantesReto } from '../retosHabitosApi';

interface ListadoParticipantesProps {
  retoId?: string; // Opcional, si se quiere listar participantes de un reto específico
}

const ListadoParticipantes: React.FC<ListadoParticipantesProps> = ({ retoId = 'reto-ejemplo-123' }) => {
  const [participantes, setParticipantes] = useState<any[]>([]); // Usar el tipo Participante de retosHabitosApi.ts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        setLoading(true);
        const data = await getParticipantesReto(retoId);
        setParticipantes(data);
      } catch (err) {
        setError('Error al cargar los participantes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [retoId]);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Cargando participantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200">
        <div className="flex items-center gap-3 text-red-600">
          <Award className="w-6 h-6" />
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Participantes Activos</h3>
            <p className="text-sm text-gray-600">{participantes.length} miembros en el reto</p>
          </div>
        </div>

        {participantes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300"
          >
            <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No hay participantes inscritos en este reto aún.</p>
            <p className="text-sm text-gray-500 mt-2">Sé el primero en unirte al desafío</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {participantes.map((participante, index) => {
              const progresoNum = Number(participante.progreso) || 0;

              return (
                <motion.div
                  key={participante.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    {/* Info del participante */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {(participante.nombreUsuario || 'U').charAt(0).toUpperCase()}
                      </div>

                      {/* Nombre y detalles */}
                      <div className="flex-1">
                        <p className="text-gray-900 font-bold text-lg">
                          {participante.nombreUsuario || `Usuario ${participante.usuarioId.substring(0, 8)}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">ID: {participante.usuarioId.substring(0, 8)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progreso */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            {progresoNum}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mt-1">Progreso</p>
                      </div>

                      {/* Barra de progreso */}
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progresoNum}%` }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Estadística total si hay participantes */}
        {participantes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: participantes.length * 0.05 + 0.2, duration: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-gray-900">Progreso Promedio del Grupo</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {Math.round(participantes.reduce((acc, p) => acc + (Number(p.progreso) || 0), 0) / participantes.length)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ListadoParticipantes;
