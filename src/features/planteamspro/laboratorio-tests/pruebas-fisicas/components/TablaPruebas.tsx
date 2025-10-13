import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle, Clock, XCircle, PlayCircle } from 'lucide-react';
import { PruebaFisica, EstadoPrueba, Atleta } from '../pruebasFisicasApi';

interface TablaPruebasProps {
  pruebas: PruebaFisica[];
}

const getEstadoBadge = (estado: EstadoPrueba) => {
  switch (estado) {
    case 'programada':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: Calendar,
        gradient: 'from-blue-500 to-indigo-500'
      };
    case 'en curso':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        icon: PlayCircle,
        gradient: 'from-yellow-500 to-orange-500'
      };
    case 'completada':
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: CheckCircle,
        gradient: 'from-green-500 to-emerald-500'
      };
    case 'cancelada':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: XCircle,
        gradient: 'from-red-500 to-pink-500'
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        icon: Clock,
        gradient: 'from-gray-500 to-gray-600'
      };
  }
};

const TablaPruebas: React.FC<TablaPruebasProps> = ({ pruebas }) => {
  if (pruebas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-red-100 mb-4">
          <Calendar className="w-8 h-8 text-orange-600" />
        </div>
        <p className="text-gray-600 font-medium">No hay pruebas programadas</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-50 to-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tipo de Prueba
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Atletas Participantes
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Resultados
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200">
              {pruebas.map((prueba, index) => {
                const estadoInfo = getEstadoBadge(prueba.estado);
                const EstadoIcon = estadoInfo.icon;

                return (
                  <motion.tr
                    key={prueba.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 bg-gradient-to-r ${estadoInfo.gradient} text-white text-xs font-bold rounded-full`}>
                          {prueba.tipo}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{prueba.fecha}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {prueba.atletasParticipantes?.map((atleta: Atleta) => (
                          <div
                            key={atleta.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200"
                          >
                            <Users className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-700">{atleta.nombre}</span>
                          </div>
                        )) || (
                          <span className="text-gray-400 text-sm">Sin atletas asignados</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 ${estadoInfo.bg} rounded-full border ${estadoInfo.border}`}>
                        <EstadoIcon className={`w-4 h-4 ${estadoInfo.text}`} />
                        <span className={`text-sm font-bold ${estadoInfo.text}`}>
                          {prueba.estado.charAt(0).toUpperCase() + prueba.estado.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {prueba.resultados ? (
                        <div className="space-y-1">
                          {Object.entries(prueba.resultados).map(([atletaId, resultado]) => {
                            const atleta = prueba.atletasParticipantes?.find(a => a.id === atletaId);
                            return (
                              <div
                                key={atletaId}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="font-semibold text-gray-700">{atleta?.nombre || `Atleta ${atletaId}:`}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs">
                                  {resultado}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">Sin resultados</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaPruebas;
