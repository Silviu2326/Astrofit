import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, AlertCircle, Bell, CheckCircle, XCircle,
  WifiOff, Battery, Thermometer, Shield, Clock, X
} from 'lucide-react';

interface Alerta {
  id: string;
  tipo: 'critica' | 'alta' | 'media' | 'baja';
  titulo: string;
  descripcion: string;
  dispositivo: string;
  timestamp: string;
  resuelta: boolean;
  icono: any;
}

const AlertasSeguridad: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'critica',
      titulo: 'Dispositivo Offline',
      descripcion: 'Torniquete Parking ha perdido conexión hace 2 horas',
      dispositivo: 'Torniquete Parking',
      timestamp: 'Hace 2h',
      resuelta: false,
      icono: WifiOff
    },
    {
      id: '2',
      tipo: 'alta',
      titulo: 'Tasa de Error Alta',
      descripcion: 'Torniquete Salida Emergencia presenta 8.7% de tasa de error',
      dispositivo: 'Torniquete Salida Emergencia',
      timestamp: 'Hace 45m',
      resuelta: false,
      icono: AlertTriangle
    },
    {
      id: '3',
      tipo: 'alta',
      titulo: 'Temperatura Elevada',
      descripcion: 'Torniquete Salida Emergencia alcanzó 45°C',
      dispositivo: 'Torniquete Salida Emergencia',
      timestamp: 'Hace 30m',
      resuelta: false,
      icono: Thermometer
    },
    {
      id: '4',
      tipo: 'media',
      titulo: 'Batería Baja',
      descripcion: 'Torniquete Parking tiene batería al 15%',
      dispositivo: 'Torniquete Parking',
      timestamp: 'Hace 1h',
      resuelta: false,
      icono: Battery
    },
    {
      id: '5',
      tipo: 'baja',
      titulo: 'Firmware Desactualizado',
      descripcion: 'Torniquete Salida Emergencia usa firmware v2.3.8 (actual: v2.4.1)',
      dispositivo: 'Torniquete Salida Emergencia',
      timestamp: 'Hace 3h',
      resuelta: false,
      icono: AlertCircle
    }
  ]);

  const [selectedAlerta, setSelectedAlerta] = useState<Alerta | null>(null);

  const getPriorityBadge = (tipo: string) => {
    const badges = {
      critica: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500', label: 'CRÍTICA' },
      alta: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500', label: 'ALTA' },
      media: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500', label: 'MEDIA' },
      baja: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500', label: 'BAJA' }
    };
    const badge = badges[tipo as keyof typeof badges];

    return (
      <div className={`px-3 py-1 rounded-lg font-bold text-xs ${badge.bg} ${badge.text} border-2 ${badge.border}`}>
        {badge.label}
      </div>
    );
  };

  const resolverAlerta = (id: string) => {
    setAlertas(alertas.map(alerta =>
      alerta.id === id ? { ...alerta, resuelta: true } : alerta
    ));
  };

  const alertasActivas = alertas.filter(a => !a.resuelta);
  const alertasCriticas = alertasActivas.filter(a => a.tipo === 'critica').length;
  const alertasAltas = alertasActivas.filter(a => a.tipo === 'alta').length;

  return (
    <>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Bell className="w-6 h-6 animate-pulse" />
              </div>
              Alertas de Seguridad
            </h3>
            <p className="text-red-50">Centro de alertas y notificaciones</p>

            {/* Contadores */}
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-bold text-white">{alertasActivas.length} activas</span>
              </div>
              {alertasCriticas > 0 && (
                <div className="flex items-center gap-2 bg-red-600 rounded-full px-4 py-2 shadow-lg animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{alertasCriticas} críticas</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lista de alertas */}
        <div className="p-6 max-h-[500px] overflow-y-auto space-y-3">
          <AnimatePresence>
            {alertasActivas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No hay alertas activas</p>
                <p className="text-sm text-gray-500 mt-2">Todos los sistemas funcionando correctamente</p>
              </motion.div>
            ) : (
              alertasActivas.map((alerta, index) => {
                const Icon = alerta.icono;
                return (
                  <motion.div
                    key={alerta.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative p-4 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      alerta.tipo === 'critica'
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
                        : alerta.tipo === 'alta'
                        ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300'
                        : alerta.tipo === 'media'
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
                    }`}
                    onClick={() => setSelectedAlerta(alerta)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icono */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        alerta.tipo === 'critica' ? 'bg-red-500' :
                        alerta.tipo === 'alta' ? 'bg-orange-500' :
                        alerta.tipo === 'media' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{alerta.titulo}</h4>
                          {getPriorityBadge(alerta.tipo)}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alerta.descripcion}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>{alerta.dispositivo}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{alerta.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botón resolver */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          resolverAlerta(alerta.id);
                        }}
                        className="flex-shrink-0 p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-colors"
                        title="Marcar como resuelta"
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                    {/* Barra decorativa */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                      alerta.tipo === 'critica' ? 'bg-red-500' :
                      alerta.tipo === 'alta' ? 'bg-orange-500' :
                      alerta.tipo === 'media' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {alertasActivas.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {alertasActivas.length} alerta{alertasActivas.length !== 1 ? 's' : ''} pendiente{alertasActivas.length !== 1 ? 's' : ''}
              </span>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Ver historial completo →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalle de alerta */}
      <AnimatePresence>
        {selectedAlerta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlerta(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full"
            >
              {/* Header del modal */}
              <div className={`p-6 relative overflow-hidden ${
                selectedAlerta.tipo === 'critica' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                selectedAlerta.tipo === 'alta' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                selectedAlerta.tipo === 'media' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedAlerta.titulo}</h2>
                    {getPriorityBadge(selectedAlerta.tipo)}
                  </div>
                  <button
                    onClick={() => setSelectedAlerta(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-semibold text-gray-600 uppercase">Descripción</span>
                  <p className="text-gray-900 mt-1">{selectedAlerta.descripcion}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-600 uppercase">Dispositivo</span>
                    <p className="text-gray-900 font-bold mt-1">{selectedAlerta.dispositivo}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-600 uppercase">Timestamp</span>
                    <p className="text-gray-900 font-bold mt-1">{selectedAlerta.timestamp}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Acciones Recomendadas:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Verificar estado del dispositivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Contactar al técnico si persiste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Documentar el incidente</span>
                    </li>
                  </ul>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      resolverAlerta(selectedAlerta.id);
                      setSelectedAlerta(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Marcar como Resuelta
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAlerta(null)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlertasSeguridad;
