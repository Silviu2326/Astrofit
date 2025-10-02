import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface Sugerencia {
  id: string;
  cliente: string;
  avatar: string;
  probabilidadReactivacion: number;
  accionSugerida: string;
  razon: string;
  ltv: number;
  prioridad: 'alta' | 'media' | 'baja';
}

const SugerenciasReactivacion: React.FC = () => {
  const sugerencias: Sugerencia[] = [
    {
      id: 's1',
      cliente: 'Cliente D',
      avatar: '👨‍💼',
      probabilidadReactivacion: 75,
      accionSugerida: 'Ofrecer descuento personalizado del 30%',
      razon: 'Precio elevado fue la razón de inactividad',
      ltv: 2200,
      prioridad: 'alta'
    },
    {
      id: 's2',
      cliente: 'Cliente E',
      avatar: '👩‍💻',
      probabilidadReactivacion: 50,
      accionSugerida: 'Enviar encuesta de satisfacción con incentivo',
      razon: 'Insatisfacción con servicio detectada',
      ltv: 1500,
      prioridad: 'media'
    },
    {
      id: 's3',
      cliente: 'Cliente F',
      avatar: '🧑‍🎨',
      probabilidadReactivacion: 90,
      accionSugerida: 'Llamada personal urgente + sesión gratis',
      razon: 'Alto engagement previo, pausa temporal',
      ltv: 3800,
      prioridad: 'alta'
    },
    {
      id: 's4',
      cliente: 'Cliente G',
      avatar: '👨‍🏫',
      probabilidadReactivacion: 42,
      accionSugerida: 'Email emotivo recordando beneficios',
      razon: 'Falta de tiempo, horarios flexibles ahora',
      ltv: 890,
      prioridad: 'baja'
    }
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability > 70) return {
      text: 'text-green-600',
      bg: 'bg-green-500',
      ring: 'ring-green-200',
      gradient: 'from-green-500 to-emerald-500'
    };
    if (probability > 40) return {
      text: 'text-yellow-600',
      bg: 'bg-yellow-500',
      ring: 'ring-yellow-200',
      gradient: 'from-yellow-500 to-orange-500'
    };
    return {
      text: 'text-red-600',
      bg: 'bg-red-500',
      ring: 'ring-red-200',
      gradient: 'from-red-500 to-pink-500'
    };
  };

  const getPrioridadStyles = (prioridad: 'alta' | 'media' | 'baja') => {
    switch (prioridad) {
      case 'alta':
        return {
          badge: 'bg-red-100 text-red-700 border-red-300',
          icon: AlertCircle,
          iconColor: 'text-red-600'
        };
      case 'media':
        return {
          badge: 'bg-yellow-100 text-yellow-700 border-yellow-300',
          icon: Target,
          iconColor: 'text-yellow-600'
        };
      case 'baja':
        return {
          badge: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: CheckCircle,
          iconColor: 'text-blue-600'
        };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
              Sugerencias de Reactivación
            </h3>
            <p className="text-sm text-gray-600">Predicciones impulsadas por IA</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          {sugerencias.map((sugerencia, index) => {
            const colorStyles = getProbabilityColor(sugerencia.probabilidadReactivacion);
            const prioridadStyles = getPrioridadStyles(sugerencia.prioridad);
            const PrioridadIcon = prioridadStyles.icon;

            return (
              <motion.div
                key={sugerencia.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar con badge de prioridad */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {sugerencia.avatar}
                    </div>
                    <div className={`absolute -top-1 -right-1 p-1 ${prioridadStyles.badge} rounded-full border-2`}>
                      <PrioridadIcon className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{sugerencia.cliente}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">LTV:</span>
                          <span className="text-sm font-bold text-green-600">${sugerencia.ltv}</span>
                        </div>
                      </div>

                      {/* Badge de prioridad */}
                      <div className={`px-3 py-1 ${prioridadStyles.badge} border text-xs font-bold rounded-full uppercase flex items-center gap-1`}>
                        <PrioridadIcon className="w-3 h-3" />
                        {sugerencia.prioridad}
                      </div>
                    </div>

                    {/* Probabilidad con barra de progreso */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Probabilidad de Reactivación</span>
                        <span className={`text-lg font-bold ${colorStyles.text}`}>
                          {sugerencia.probabilidadReactivacion}%
                        </span>
                      </div>
                      <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ring-2 ${colorStyles.ring}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${sugerencia.probabilidadReactivacion}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${colorStyles.gradient} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Acción sugerida */}
                    <div className="p-3 bg-white/80 rounded-xl border border-blue-200 mb-2">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Acción Recomendada</p>
                          <p className="text-sm font-bold text-gray-800">{sugerencia.accionSugerida}</p>
                        </div>
                      </div>
                    </div>

                    {/* Razón */}
                    <div className="flex items-start gap-2 text-xs text-gray-600">
                      <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p><strong>Insight:</strong> {sugerencia.razon}</p>
                    </div>

                    {/* Botón de acción */}
                    <button className={`mt-3 w-full py-2 bg-gradient-to-r ${colorStyles.gradient} text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2`}>
                      <CheckCircle className="w-5 h-5" />
                      Aplicar Sugerencia
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resumen de efectividad */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 mb-1">Efectividad del Motor de Sugerencias</p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">82%</p>
                  <p className="text-xs text-gray-600">Precisión</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-xs text-gray-600">Sugerencias</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">$42K</p>
                  <p className="text-xs text-gray-600">Valor Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SugerenciasReactivacion;
