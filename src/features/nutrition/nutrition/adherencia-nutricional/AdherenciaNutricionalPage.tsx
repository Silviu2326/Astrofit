
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  TrendingUp,
  Target,
  Flame,
  Droplet,
  MessageCircle,
  FileText,
  Bell,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';
import ChecklistDiario from './components/ChecklistDiario';
import ResumenSemanal from './components/ResumenSemanal';
import EstadisticasAdherencia from './components/EstadisticasAdherencia';
import FeedbackCliente from './components/FeedbackCliente';
import { getAdherenceData } from './adherenciaNutricionalApi';

const AdherenciaNutricionalPage: React.FC = () => {
  const [stats, setStats] = useState({
    weeklyAdherence: 0,
    consecutiveDays: 0,
    mealsLogged: 0,
    calorieGoalMet: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getAdherenceData();
      const last7Days = data.slice(-7);

      // Calculate weekly adherence
      const weeklyAdherence = Math.round(
        last7Days.reduce((sum, day) => sum + day.adherencePercentage, 0) / last7Days.length
      );

      // Calculate consecutive days (adherence > 80%)
      let consecutive = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].adherencePercentage >= 80) consecutive++;
        else break;
      }

      // Total meals logged this week
      const mealsLogged = last7Days.reduce((sum, day) => sum + day.mealsLogged, 0);

      // Days with calorie goal met
      const calorieGoalMet = last7Days.filter(
        (day) => Math.abs(day.calories - day.caloriesTarget) <= 100
      ).length;

      setStats({ weeklyAdherence, consecutiveDays: consecutive, mealsLogged, calorieGoalMet });
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-green-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-green-600 to-lime-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <CheckCircle2 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Seguimiento de{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                Adherencia
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed">
            Monitorea el{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
              progreso diario
            </span>{' '}
            de tus clientes y su constancia en el plan nutricional
          </p>

          {/* Métricas globales */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-xs font-semibold text-teal-100">Adherencia Semanal</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.weeklyAdherence}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-xs font-semibold text-teal-100">Días Consecutivos</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.consecutiveDays}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-blue-300" />
                <span className="text-xs font-semibold text-teal-100">Comidas Registradas</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.mealsLogged}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-orange-300" />
                <span className="text-xs font-semibold text-teal-100">Objetivo Cumplido</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.calorieGoalMet}/7</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="space-y-8">
        {/* Estadísticas y acciones rápidas */}
        <EstadisticasAdherencia />

        {/* Checklist y Resumen lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChecklistDiario />
          <ResumenSemanal />
        </div>

        {/* Feedback del cliente */}
        <FeedbackCliente />

        {/* Acciones rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <button className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-white text-left group border border-white/20">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <FileText className="w-6 h-6 mb-2 relative z-10" />
            <p className="font-semibold relative z-10">Registrar Comida</p>
          </button>

          <button className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-white text-left group border border-white/20">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Calendar className="w-6 h-6 mb-2 relative z-10" />
            <p className="font-semibold relative z-10">Ver Dieta Asignada</p>
          </button>

          <button className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-white text-left group border border-white/20">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <MessageCircle className="w-6 h-6 mb-2 relative z-10" />
            <p className="font-semibold relative z-10">Contactar Nutricionista</p>
          </button>

          <button className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-white text-left group border border-white/20">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Bell className="w-6 h-6 mb-2 relative z-10" />
            <p className="font-semibold relative z-10">Ajustar Recordatorios</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdherenciaNutricionalPage;
