import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageCircle,
  Phone,
  Gift,
  AlertCircle
} from 'lucide-react';
import { getSugerenciasAccion, SugerenciaAccion } from '../alertasRetencionApi';

interface Intervencion {
  id: string;
  fecha: string;
  tipo: 'realizada' | 'programada' | 'sugerida';
  accion: string;
  cliente: string;
  resultado?: string;
  icon: React.ElementType;
}

const SugerenciasRetencion: React.FC = () => {
  const [sugerencias, setSugerencias] = useState<SugerenciaAccion[]>([]);

  useEffect(() => {
    const fetchSugerencias = async () => {
      try {
        const data = await getSugerenciasAccion('cliente-generico');
        setSugerencias(data);
      } catch (error) {
        // Datos mockeados de fallback
        setSugerencias([
          { id: '1', descripcion: 'Ofrecer una sesión de coaching gratuita para clientes con riesgo alto' },
          { id: '2', descripcion: 'Enviar mensaje motivacional personalizado a clientes inactivos' },
          { id: '3', descripcion: 'Programar llamada de seguimiento con clientes sin progreso reciente' }
        ]);
      }
    };
    fetchSugerencias();
  }, []);

  // Timeline de intervenciones (datos mockeados)
  const intervenciones: Intervencion[] = [
    {
      id: '1',
      fecha: 'Hoy, 10:30',
      tipo: 'realizada',
      accion: 'Llamada de seguimiento con María García',
      cliente: 'María García',
      resultado: 'Comprometida a retomar entrenamientos',
      icon: Phone
    },
    {
      id: '2',
      fecha: 'Hoy, 15:00',
      tipo: 'programada',
      accion: 'Sesión gratuita ofrecida a Juan Pérez',
      cliente: 'Juan Pérez',
      icon: Gift
    },
    {
      id: '3',
      fecha: 'Ayer, 14:20',
      tipo: 'realizada',
      accion: 'Email motivacional enviado a Ana Martínez',
      cliente: 'Ana Martínez',
      resultado: 'Email abierto, sin respuesta aún',
      icon: MessageCircle
    },
    {
      id: '4',
      fecha: 'Mañana, 09:00',
      tipo: 'programada',
      accion: 'Revisión de objetivos con Carlos López',
      cliente: 'Carlos López',
      icon: TrendingUp
    },
    {
      id: '5',
      fecha: 'Pendiente',
      tipo: 'sugerida',
      accion: 'Contactar a Laura Sánchez para feedback',
      cliente: 'Laura Sánchez',
      icon: AlertCircle
    }
  ];

  const getTipoConfig = (tipo: Intervencion['tipo']) => {
    switch (tipo) {
      case 'realizada':
        return {
          color: 'text-green-600',
          bg: 'bg-green-500',
          borderColor: 'border-green-200',
          bgLight: 'bg-green-50',
          label: 'COMPLETADA'
        };
      case 'programada':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-500',
          borderColor: 'border-blue-200',
          bgLight: 'bg-blue-50',
          label: 'PROGRAMADA'
        };
      case 'sugerida':
        return {
          color: 'text-orange-600',
          bg: 'bg-orange-500',
          borderColor: 'border-orange-200',
          bgLight: 'bg-orange-50',
          label: 'SUGERIDA'
        };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Timeline de Intervenciones
              </h2>
              <p className="text-orange-100 text-sm">Acciones realizadas y programadas</p>
            </div>
          </div>
        </div>

        {/* Sugerencias automáticas */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Recomendaciones IA
          </h3>
          <div className="space-y-2">
            {sugerencias.map((sugerencia, index) => (
              <motion.div
                key={sugerencia.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{sugerencia.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline de intervenciones */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Historial de Acciones
          </h3>

          <div className="space-y-4 relative">
            {/* Línea vertical del timeline */}
            <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-200 via-blue-200 to-orange-200"></div>

            {intervenciones.map((intervencion, index) => {
              const config = getTipoConfig(intervencion.tipo);
              const Icon = intervencion.icon;

              return (
                <motion.div
                  key={intervencion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="relative flex items-start gap-4 pl-0"
                >
                  {/* Icono en la línea del timeline */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center text-white shadow-lg z-10`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Contenido */}
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className={`flex-1 p-4 ${config.bgLight} rounded-2xl border ${config.borderColor} hover:border-opacity-60 transition-all duration-300 group`}
                  >
                    {/* Header de la intervención */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{intervencion.accion}</h4>
                          <div className={`px-2 py-0.5 ${config.bg} rounded-full`}>
                            <span className="text-xs font-bold text-white">{config.label}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-medium">{intervencion.fecha}</span>
                          </div>
                          <span>•</span>
                          <span className="font-medium">{intervencion.cliente}</span>
                        </div>
                      </div>
                    </div>

                    {/* Resultado si existe */}
                    {intervencion.resultado && (
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-gray-700 italic">{intervencion.resultado}</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer con estadística */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">
                {intervenciones.filter(i => i.tipo === 'realizada').length} intervenciones completadas esta semana
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Tasa de éxito</p>
              <p className="text-lg font-bold text-green-600">78%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SugerenciasRetencion;
