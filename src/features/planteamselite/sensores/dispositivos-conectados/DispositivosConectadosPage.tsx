
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Activity, AlertTriangle, Zap, Radio, BatteryCharging } from 'lucide-react';
import { TablaDispositivos } from './components/TablaDispositivos';
import MonitorConectividad from './components/MonitorConectividad';
import CalibracionAutomatica from './components/CalibracionAutomatica';
import AnalisisFallos from './components/AnalisisFallos';
import GestorFirmware from './components/GestorFirmware';
import TroubleshootingAutomatico from './components/TroubleshootingAutomatico';
import IntegracionMarcas from './components/IntegracionMarcas';
import DashboardUtilizacion from './components/DashboardUtilizacion';
import SistemaReservas from './components/SistemaReservas';

interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'Pulsómetro' | 'Medidor de Potencia';
  status: 'conectado' | 'desconectado' | 'batería baja' | 'sincronizando';
  batteryLevel: number; // 0-100
  lastSync: string; // Date string
  assignedPlayer: string | null;
}

const DispositivosConectadosPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Simulate fetching devices
    const fetchDevices = async () => {
      // In a real app, this would call dispositivosConectadosApi.getDevices()
      const simulatedDevices: Device[] = [
        {
          id: 'dev-001',
          name: 'Garmin Forerunner 945',
          type: 'GPS',
          status: 'conectado',
          batteryLevel: 85,
          lastSync: '2025-09-28T10:30:00Z',
          assignedPlayer: 'Lionel Messi',
        },
        {
          id: 'dev-002',
          name: 'Polar H10',
          type: 'Pulsómetro',
          status: 'batería baja',
          batteryLevel: 15,
          lastSync: '2025-09-27T18:00:00Z',
          assignedPlayer: 'Cristiano Ronaldo',
        },
        {
          id: 'dev-003',
          name: 'Stages Power Meter',
          type: 'Medidor de Potencia',
          status: 'desconectado',
          batteryLevel: 0,
          lastSync: '2025-09-26T09:00:00Z',
          assignedPlayer: null,
        },
        {
          id: 'dev-004',
          name: 'Wahoo ELEMNT BOLT',
          type: 'GPS',
          status: 'sincronizando',
          batteryLevel: 60,
          lastSync: '2025-09-28T11:00:00Z',
          assignedPlayer: 'Serena Williams',
        },
      ];
      setDevices(simulatedDevices);
    };

    fetchDevices();
  }, []);

  // Calcular estadísticas
  const connectedDevices = devices.filter(d => d.status === 'conectado').length;
  const lowBatteryDevices = devices.filter(d => d.status === 'batería baja').length;
  const syncingDevices = devices.filter(d => d.status === 'sincronizando').length;
  const avgBattery = devices.length > 0
    ? Math.round(devices.reduce((acc, d) => acc + d.batteryLevel, 0) / devices.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Radio className="w-10 h-10 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Dispositivos <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">Conectados</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-8">
            Control total de tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">ecosistema IoT deportivo</span> con monitoreo en tiempo real
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
            >
              <Wifi className="w-5 h-5 text-green-300 animate-pulse" />
              <span className="text-sm font-semibold text-white">{connectedDevices} Conectados</span>
            </motion.div>

            {syncingDevices > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
              >
                <Activity className="w-5 h-5 text-blue-300 animate-pulse" />
                <span className="text-sm font-semibold text-white">{syncingDevices} Sincronizando</span>
              </motion.div>
            )}

            {lowBatteryDevices > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="text-sm font-semibold text-white">{lowBatteryDevices} Batería Baja</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
            >
              <BatteryCharging className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">Batería Prom: {avgBattery}%</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tabla de Dispositivos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <TablaDispositivos devices={devices} />
      </motion.div>

      {/* Alerta de batería baja */}
      {lowBatteryDevices > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-900 mb-1">Alerta de Batería Baja</h3>
              <p className="text-sm text-orange-700">
                {lowBatteryDevices} {lowBatteryDevices === 1 ? 'dispositivo tiene' : 'dispositivos tienen'} batería baja. Se recomienda cargarlos pronto para evitar interrupciones.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Funcionalidades Avanzadas */}
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
            Funcionalidades Avanzadas de IoT Deportivo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MonitorConectividad />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <CalibracionAutomatica />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnalisisFallos />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <GestorFirmware />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <TroubleshootingAutomatico />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <IntegracionMarcas />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <DashboardUtilizacion />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <SistemaReservas />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DispositivosConectadosPage;
