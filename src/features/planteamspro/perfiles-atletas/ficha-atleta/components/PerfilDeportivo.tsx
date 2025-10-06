import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, MapPin, Flag, Users, TrendingUp } from 'lucide-react';
import { Atleta, fetchAtletaData } from '../fichaAtletaApi';

const PerfilDeportivo: React.FC = () => {
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAtletaData().then((data) => {
      setAtleta(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center text-gray-600 flex items-center justify-center gap-3">
          <div className="animate-spin w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          <span className="font-semibold">Cargando perfil del atleta...</span>
        </div>
      </div>
    );
  }
  if (!atleta) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200">
        <div className="text-center text-red-600 font-semibold">No se pudo cargar el perfil del atleta.</div>
      </div>
    );
  }

  const athleteData = [
    { icon: User, label: 'Nombre Completo', value: `${atleta.nombre} ${atleta.apellidos}`, color: 'from-indigo-500 to-purple-600' },
    { icon: Activity, label: 'Posición', value: atleta.posicion, color: 'from-blue-500 to-indigo-600' },
    { icon: TrendingUp, label: 'Altura', value: `${atleta.alturaCm} cm`, color: 'from-emerald-500 to-teal-600' },
    { icon: TrendingUp, label: 'Peso', value: `${atleta.pesoKg} kg`, color: 'from-green-500 to-emerald-600' },
    { icon: User, label: 'Edad', value: `${atleta.edad} años`, color: 'from-purple-500 to-pink-600' },
    { icon: Flag, label: 'Nacionalidad', value: atleta.nacionalidad, color: 'from-orange-500 to-red-600' },
    { icon: Users, label: 'Equipo Actual', value: atleta.equipoActual, color: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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

          <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <User className="w-7 h-7" />
            </div>
            Perfil Básico
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {athleteData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Decoración de fondo */}
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                  <div className="relative z-10 flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <dt className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        {item.label}
                      </dt>
                      <dd className="text-base font-bold text-gray-900 truncate">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerfilDeportivo;
