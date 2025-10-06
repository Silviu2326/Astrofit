import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DoorOpen, Activity, CheckCircle, XCircle, Clock,
  TrendingUp, AlertTriangle, Settings, Zap, Users
} from 'lucide-react';
import PanelTornos from './components/PanelTornos';
import ConfiguradorHorarios from './components/ConfiguradorHorarios';
import MonitorTiempoReal from './components/MonitorTiempoReal';
import AlertasSeguridad from './components/AlertasSeguridad';
import ControlRemoto from './components/ControlRemoto';
import RegistroEventos from './components/RegistroEventos';
import AccesosEspeciales from './components/AccesosEspeciales';
import DashboardEstadisticas from './components/DashboardEstadisticas';
import WebSocketSimulator from './components/WebSocketSimulator';

const GestionTornosPage: React.FC = () => {
  // Estadísticas rápidas mockeadas
  const [quickStats, setQuickStats] = useState({
    tornosOnline: 7,
    tornosTotal: 10,
    accesosPermitidos: 1247,
    accesosDenegados: 18,
    tiempoRespuesta: 45
  });

  const statsCards = [
    {
      title: 'Tornos Online',
      value: `${quickStats.tornosOnline}/${quickStats.tornosTotal}`,
      icon: DoorOpen,
      gradient: 'from-cyan-500 via-teal-500 to-green-500',
      bgGradient: 'from-cyan-500/10 to-teal-500/10',
      change: '+2',
      description: 'Dispositivos activos'
    },
    {
      title: 'Accesos Permitidos',
      value: quickStats.accesosPermitidos.toLocaleString(),
      icon: CheckCircle,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      change: '+12.5%',
      description: 'Hoy'
    },
    {
      title: 'Accesos Denegados',
      value: quickStats.accesosDenegados,
      icon: XCircle,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      change: '-3',
      description: 'Hoy'
    },
    {
      title: 'Tiempo de Respuesta',
      value: `${quickStats.tiempoRespuesta}ms`,
      icon: Zap,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-500/10 to-purple-500/10',
      change: '-8ms',
      description: 'Promedio'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 pb-12">
      {/* HERO SECTION - Tornos */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-teal-600 to-green-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <DoorOpen className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Torniquetes</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Control en tiempo real de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">puntos de acceso</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema Activo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{quickStats.accesosPermitidos} accesos hoy</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${stat.change.includes('-') ? 'bg-red-50' : 'bg-green-50'} rounded-lg`}>
                  <TrendingUp className={`w-4 h-4 ${stat.change.includes('-') ? 'text-red-600 rotate-180' : 'text-green-600'}`} />
                </div>
                <span className={`text-sm font-bold ${stat.change.includes('-') ? 'text-red-600' : 'text-green-600'}`}>{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">{stat.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="space-y-8">
        {/* Panel Principal de Tornos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <PanelTornos />
        </motion.div>

        {/* Monitor en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <MonitorTiempoReal />
        </motion.div>

        {/* Dashboard de Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <DashboardEstadisticas />
        </motion.div>

        {/* Grid de Componentes Secundarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alertas de Seguridad */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <AlertasSeguridad />
          </motion.div>

          {/* Control Remoto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <ControlRemoto />
          </motion.div>

          {/* Registro de Eventos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <RegistroEventos />
          </motion.div>

          {/* Configurador de Horarios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <ConfiguradorHorarios />
          </motion.div>
        </div>

        {/* Accesos Especiales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <AccesosEspeciales />
        </motion.div>

        {/* WebSocket Simulator (Solo desarrollo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <WebSocketSimulator />
        </motion.div>
      </div>
    </div>
  );
};

export default GestionTornosPage;
