import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, CheckCircle, RefreshCw, XCircle, Heart } from 'lucide-react';
import { Convocatoria, Atleta } from '../listaConvocatoriasApi';

interface TablaEventosProps {
  convocatorias: Convocatoria[];
}

const EstadoAtletaBadge: React.FC<{ estado: Atleta['estado'] }> = ({ estado }) => {
  let icon: React.ReactNode;
  let bgColor: string;
  let textColor: string;
  let label: string;

  switch (estado) {
    case 'convocado':
      icon = <CheckCircle className="w-4 h-4" />;
      bgColor = 'bg-green-50';
      textColor = 'text-green-600';
      label = 'Convocado';
      break;
    case 'suplente':
      icon = <RefreshCw className="w-4 h-4" />;
      bgColor = 'bg-yellow-50';
      textColor = 'text-yellow-600';
      label = 'Suplente';
      break;
    case 'no disponible':
      icon = <XCircle className="w-4 h-4" />;
      bgColor = 'bg-red-50';
      textColor = 'text-red-600';
      label = 'No disponible';
      break;
    case 'lesionado':
      icon = <Heart className="w-4 h-4" />;
      bgColor = 'bg-orange-50';
      textColor = 'text-orange-600';
      label = 'Lesionado';
      break;
    default:
      icon = null;
      bgColor = 'bg-gray-50';
      textColor = 'text-gray-600';
      label = estado;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${bgColor} rounded-full ${textColor} text-xs font-semibold`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'confirmado':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500 rounded-full text-white text-xs font-bold">
          <CheckCircle className="w-3.5 h-3.5" />
          Confirmado
        </div>
      );
    case 'pendiente':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500 rounded-full text-white text-xs font-bold">
          <RefreshCw className="w-3.5 h-3.5" />
          Pendiente
        </div>
      );
    case 'rechazado':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold">
          <XCircle className="w-3.5 h-3.5" />
          Rechazado
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-500 rounded-full text-white text-xs font-bold">
          {estado}
        </div>
      );
  }
};

export const TablaEventos: React.FC<TablaEventosProps> = ({ convocatorias }) => {
  return (
    <div className="space-y-6">
      {convocatorias.map((convocatoria, index) => (
        <motion.div
          key={convocatoria.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden relative group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10 p-6">
            {/* Header con estado */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {convocatoria.evento?.tipo === 'partido' ? convocatoria.evento?.rival : convocatoria.evento?.tipo || 'Evento'}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{convocatoria.evento?.fecha || 'Fecha no disponible'}</p>
                  </div>
                </div>
              </div>
              {convocatoria.estado && getEstadoBadge(convocatoria.estado)}
            </div>

            {/* Información del evento */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{convocatoria.evento?.lugar || 'Lugar no disponible'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{convocatoria.atletas?.length || 0} Atletas</span>
              </div>
            </div>

            {/* Lista de atletas */}
            {convocatoria.atletas && convocatoria.atletas.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Atletas Convocados
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {convocatoria.atletas.map((atleta) => (
                    <div
                      key={atleta.id}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {atleta.nombre?.charAt(0) || '?'}
                        </div>
                        <span className="font-semibold text-gray-900 truncate">{atleta.nombre}</span>
                      </div>
                      <EstadoAtletaBadge estado={atleta.estado} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
