import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertOctagon, TrendingDown, Activity, ArrowRight } from 'lucide-react';

interface ClienteRiesgo {
  id: string;
  nombre: string;
  scoreRiesgo: number; // 0-100
  nivel: 'crítico' | 'alto' | 'medio' | 'bajo';
  ultimaActividad: string;
  tendencia: 'bajando' | 'estable' | 'subiendo';
  acciones: number;
}

const RadarClientes: React.FC = () => {
  // Datos mockeados de clientes priorizados
  const clientesPriorizados: ClienteRiesgo[] = [
    {
      id: '1',
      nombre: 'María García',
      scoreRiesgo: 92,
      nivel: 'crítico',
      ultimaActividad: 'Hace 3 semanas',
      tendencia: 'bajando',
      acciones: 3
    },
    {
      id: '2',
      nombre: 'Juan Pérez',
      scoreRiesgo: 85,
      nivel: 'crítico',
      ultimaActividad: 'Hace 2 semanas',
      tendencia: 'bajando',
      acciones: 2
    },
    {
      id: '3',
      nombre: 'Ana Martínez',
      scoreRiesgo: 68,
      nivel: 'alto',
      ultimaActividad: 'Hace 1 semana',
      tendencia: 'estable',
      acciones: 1
    },
    {
      id: '4',
      nombre: 'Carlos López',
      scoreRiesgo: 62,
      nivel: 'alto',
      ultimaActividad: 'Hace 1 semana',
      tendencia: 'bajando',
      acciones: 1
    },
    {
      id: '5',
      nombre: 'Laura Sánchez',
      scoreRiesgo: 45,
      nivel: 'medio',
      ultimaActividad: 'Hace 3 días',
      tendencia: 'estable',
      acciones: 0
    },
    {
      id: '6',
      nombre: 'Pedro Ramírez',
      scoreRiesgo: 28,
      nivel: 'bajo',
      ultimaActividad: 'Hoy',
      tendencia: 'subiendo',
      acciones: 0
    }
  ];

  const getNivelConfig = (nivel: ClienteRiesgo['nivel']) => {
    switch (nivel) {
      case 'crítico':
        return {
          color: 'text-red-600',
          bg: 'bg-red-500',
          gradient: 'from-red-500 to-rose-600',
          label: 'CRÍTICO'
        };
      case 'alto':
        return {
          color: 'text-orange-600',
          bg: 'bg-orange-500',
          gradient: 'from-orange-500 to-amber-600',
          label: 'ALTO'
        };
      case 'medio':
        return {
          color: 'text-yellow-600',
          bg: 'bg-yellow-500',
          gradient: 'from-yellow-500 to-amber-500',
          label: 'MEDIO'
        };
      case 'bajo':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-500',
          gradient: 'from-emerald-500 to-teal-600',
          label: 'BAJO'
        };
    }
  };

  const getTendenciaIcon = (tendencia: ClienteRiesgo['tendencia']) => {
    switch (tendencia) {
      case 'bajando':
        return { icon: TrendingDown, color: 'text-red-500', label: 'Empeorando' };
      case 'estable':
        return { icon: Activity, color: 'text-yellow-500', label: 'Estable' };
      case 'subiendo':
        return { icon: Activity, color: 'text-green-500', label: 'Mejorando' };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-rose-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Radar de Clientes
              </h2>
              <p className="text-rose-100 text-sm">Lista priorizada por score de riesgo de churn</p>
            </div>
          </div>
        </div>

        {/* Lista priorizada de clientes */}
        <div className="space-y-3">
          {clientesPriorizados.map((cliente, index) => {
            const config = getNivelConfig(cliente.nivel);
            const tendencia = getTendenciaIcon(cliente.tendencia);
            const TendenciaIcon = tendencia.icon;

            return (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 group cursor-pointer shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  {/* Número de prioridad */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {index + 1}
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    {/* Nombre y badge de nivel */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-base truncate">{cliente.nombre}</h3>
                      <div className={`px-2 py-0.5 ${config.bg} rounded-full`}>
                        <span className="text-xs font-bold text-white">{config.label}</span>
                      </div>
                    </div>

                    {/* Score de riesgo con barra */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-600 uppercase">Score de Riesgo</span>
                        <span className={`text-sm font-bold ${config.color}`}>{cliente.scoreRiesgo}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cliente.scoreRiesgo}%` }}
                          transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
                          className={`h-full bg-gradient-to-r ${config.gradient}`}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Info adicional */}
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <TendenciaIcon className={`w-3.5 h-3.5 ${tendencia.color}`} />
                        <span className="font-medium">{tendencia.label}</span>
                      </div>
                      <span>•</span>
                      <span>{cliente.ultimaActividad}</span>
                      {cliente.acciones > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <AlertOctagon className="w-3.5 h-3.5 text-red-500" />
                            <span className="font-semibold text-red-600">{cliente.acciones} acción{cliente.acciones > 1 ? 'es' : ''} pendiente{cliente.acciones > 1 ? 's' : ''}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Flecha de acción */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer con estadística */}
        <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl border border-rose-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <span className="text-sm font-semibold text-gray-700">
                {clientesPriorizados.filter(c => c.nivel === 'crítico' || c.nivel === 'alto').length} clientes requieren atención urgente
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Ver todos
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarClientes;
