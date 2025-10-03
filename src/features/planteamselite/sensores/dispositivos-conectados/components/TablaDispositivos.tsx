
import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, Heart, Zap, Settings, WifiOff, Wifi, RefreshCw, AlertTriangle } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'Pulsómetro' | 'Medidor de Potencia';
  status: 'conectado' | 'desconectado' | 'batería baja' | 'sincronizando';
  batteryLevel: number; // 0-100
  lastSync: string; // Date string
  assignedPlayer: string | null;
}

interface TablaDispositivosProps {
  devices: Device[];
}

const getStatusColor = (status: Device['status']) => {
  switch (status) {
    case 'conectado':
      return 'text-green-600';
    case 'desconectado':
      return 'text-red-600';
    case 'batería baja':
      return 'text-yellow-600';
    case 'sincronizando':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'GPS':
      return Satellite;
    case 'Pulsómetro':
      return Heart;
    case 'Medidor de Potencia':
      return Zap;
    default:
      return Settings;
  }
};

export const TablaDispositivos: React.FC<TablaDispositivosProps> = ({ devices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {devices.map((device, index) => {
        const DeviceIcon = getDeviceIcon(device.type);
        const statusIcons = {
          'conectado': <Wifi className="w-4 h-4 text-green-500 animate-pulse" />,
          'desconectado': <WifiOff className="w-4 h-4 text-red-500" />,
          'batería baja': <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />,
          'sincronizando': <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
        };

        return (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Header con icono del dispositivo */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <DeviceIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.type}</p>
                  </div>
                </div>

                {/* Badge de estado */}
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                  device.status === 'conectado' ? 'bg-green-100 text-green-700' :
                  device.status === 'desconectado' ? 'bg-red-100 text-red-700' :
                  device.status === 'batería baja' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {statusIcons[device.status]}
                  <span className="ml-1">{device.status}</span>
                </div>
              </div>

              {/* Batería */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Batería</span>
                  <span className="text-sm font-bold text-gray-900">{device.batteryLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.batteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                    className={`h-full rounded-full relative ${
                      device.batteryLevel < 20 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                      device.batteryLevel < 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                  >
                    {/* Efecto de brillo interno */}
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Última Sinc:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(device.lastSync).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Jugador:</span>
                  <span className={`font-medium ${device.assignedPlayer ? 'text-gray-900' : 'text-gray-500 italic'}`}>
                    {device.assignedPlayer || 'Sin asignar'}
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                {device.status === 'sincronizando' ? (
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sincronizando...
                  </button>
                ) : device.status === 'desconectado' ? (
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                    <Wifi className="w-4 h-4" />
                    Conectar
                  </button>
                ) : (
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                    <RefreshCw className="w-4 h-4" />
                    Sincronizar
                  </button>
                )}
                <button className="px-4 py-2.5 border-2 border-cyan-500 text-cyan-600 rounded-xl font-semibold hover:bg-cyan-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
