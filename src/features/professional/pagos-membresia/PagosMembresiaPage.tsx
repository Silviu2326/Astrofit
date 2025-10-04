import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { GestionSuscripciones } from './components/GestionSuscripciones';
import { HistorialTransacciones } from './components/HistorialTransacciones';
import { MetodosPago } from './components/MetodosPago';
import { FacturasManager } from './components/FacturasManager';

export const PagosMembresiaPage = () => {
  const [activeTab, setActiveTab] = useState<'suscripciones' | 'transacciones' | 'metodos' | 'facturas'>('suscripciones');

  // Estadísticas generales
  const stats = [
    {
      title: 'Suscripciones Activas',
      value: '1,247',
      change: '+12.5',
      icon: Users,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      trend: 'up'
    },
    {
      title: 'Ingresos MRR',
      value: '$45,890',
      change: '+18.2',
      icon: DollarSign,
      color: 'from-green-600 via-emerald-600 to-teal-600',
      trend: 'up'
    },
    {
      title: 'Tasa de Retención',
      value: '94.3%',
      change: '+2.1',
      icon: TrendingUp,
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      trend: 'up'
    },
    {
      title: 'Pagos Pendientes',
      value: '23',
      change: '-5.4',
      icon: Clock,
      color: 'from-orange-500 via-red-500 to-pink-500',
      trend: 'down'
    }
  ];

  const tabs = [
    { id: 'suscripciones' as const, label: 'Suscripciones', icon: Users },
    { id: 'transacciones' as const, label: 'Transacciones', icon: CreditCard },
    { id: 'metodos' as const, label: 'Métodos de Pago', icon: DollarSign },
    { id: 'facturas' as const, label: 'Facturas', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <CreditCard className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Pagos y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Membresías</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona suscripciones, pagos recurrentes y facturación de manera <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">profesional</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Pagos Automáticos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Facturación Inteligente</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Analytics en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
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
                <div className={`p-1 ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                </div>
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contenido según tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'suscripciones' && <GestionSuscripciones />}
        {activeTab === 'transacciones' && <HistorialTransacciones />}
        {activeTab === 'metodos' && <MetodosPago />}
        {activeTab === 'facturas' && <FacturasManager />}
      </motion.div>
    </div>
  );
};
