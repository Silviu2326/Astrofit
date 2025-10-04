import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Calendar, TrendingUp, Clock,
  Sparkles
} from 'lucide-react';
import EditorNotas from './components/EditorNotas';
import PlantillasRapidas from './components/PlantillasRapidas';
import HistorialNotas from './components/HistorialNotas';

const NotasSesionPage: React.FC = () => {
  // Datos de ejemplo para estadísticas
  const stats = [
    {
      title: "Notas Creadas Este Mes",
      value: "24",
      change: "+15.3",
      icon: FileText,
      gradient: "from-lime-500 to-green-600",
      bgGradient: "from-lime-500/5 to-green-600/5",
      progress: 75
    },
    {
      title: "Sesiones Documentadas",
      value: "18",
      change: "+8.2",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/5 to-emerald-600/5",
      progress: 65
    },
    {
      title: "Promedio Notas/Sesión",
      value: "1.3",
      change: "+5.1",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/5 to-teal-600/5",
      progress: 85
    },
    {
      title: "Últimas Notas",
      value: "Hoy",
      change: "+12.0",
      icon: Clock,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-500/5 to-cyan-600/5",
      progress: 90
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50/30 to-green-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <FileText className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Notas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sesión</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-lime-100 max-w-3xl leading-relaxed">
            Registra y organiza tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">observaciones profesionales</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Editor Profesional</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Templates Predefinidos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EditorNotas />
        </div>
        <div className="space-y-6">
          <PlantillasRapidas />
          <HistorialNotas />
        </div>
      </div>
    </div>
  );
};

export default NotasSesionPage;
