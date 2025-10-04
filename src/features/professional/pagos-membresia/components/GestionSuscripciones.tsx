import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Crown,
  Star,
  Zap,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Gift,
  Target
} from 'lucide-react';

interface Suscripcion {
  id: string;
  cliente: string;
  plan: 'basico' | 'pro' | 'premium' | 'enterprise';
  estado: 'activa' | 'cancelada' | 'pausada' | 'trial';
  precio: number;
  fechaInicio: string;
  proximoPago: string;
  metodoPago: string;
  renovacionAutomatica: boolean;
}

export const GestionSuscripciones = () => {
  const [filtro, setFiltro] = useState<'todas' | 'activa' | 'cancelada' | 'pausada' | 'trial'>('todas');

  // Datos mockeados
  const suscripciones: Suscripcion[] = [
    {
      id: '1',
      cliente: 'María García López',
      plan: 'premium',
      estado: 'activa',
      precio: 99.99,
      fechaInicio: '2024-01-15',
      proximoPago: '2025-02-15',
      metodoPago: 'Visa •••• 4242',
      renovacionAutomatica: true
    },
    {
      id: '2',
      cliente: 'Carlos Rodríguez Silva',
      plan: 'pro',
      estado: 'activa',
      precio: 49.99,
      fechaInicio: '2024-03-20',
      proximoPago: '2025-02-20',
      metodoPago: 'Mastercard •••• 5555',
      renovacionAutomatica: true
    },
    {
      id: '3',
      cliente: 'Ana Martínez Torres',
      plan: 'basico',
      estado: 'trial',
      precio: 0,
      fechaInicio: '2025-01-28',
      proximoPago: '2025-02-11',
      metodoPago: 'Sin método',
      renovacionAutomatica: false
    },
    {
      id: '4',
      cliente: 'Juan Pérez González',
      plan: 'enterprise',
      estado: 'activa',
      precio: 299.99,
      fechaInicio: '2023-11-10',
      proximoPago: '2025-02-10',
      metodoPago: 'Transferencia',
      renovacionAutomatica: true
    },
    {
      id: '5',
      cliente: 'Laura Fernández Ruiz',
      plan: 'pro',
      estado: 'pausada',
      precio: 49.99,
      fechaInicio: '2024-05-01',
      proximoPago: '---',
      metodoPago: 'Visa •••• 1234',
      renovacionAutomatica: false
    },
    {
      id: '6',
      cliente: 'Pedro Sánchez Díaz',
      plan: 'premium',
      estado: 'cancelada',
      precio: 99.99,
      fechaInicio: '2024-02-14',
      proximoPago: '---',
      metodoPago: 'PayPal',
      renovacionAutomatica: false
    }
  ];

  const planConfig = {
    basico: {
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      icon: Star,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    pro: {
      color: 'from-purple-500 via-pink-500 to-red-500',
      icon: Zap,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    premium: {
      color: 'from-yellow-500 via-orange-500 to-red-500',
      icon: Crown,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    enterprise: {
      color: 'from-gray-700 via-gray-800 to-black',
      icon: Target,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900'
    }
  };

  const estadoConfig = {
    activa: { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, badge: 'bg-green-500' },
    cancelada: { color: 'text-red-600', bgColor: 'bg-red-50', icon: XCircle, badge: 'bg-red-500' },
    pausada: { color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle, badge: 'bg-orange-500' },
    trial: { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Gift, badge: 'bg-blue-500' }
  };

  const suscripcionesFiltradas = filtro === 'todas'
    ? suscripciones
    : suscripciones.filter(s => s.estado === filtro);

  // Estadísticas por plan
  const statsPorPlan = [
    { plan: 'Básico', count: 342, mrr: '$3,420', icon: Star, color: 'from-blue-500 to-indigo-500' },
    { plan: 'Pro', count: 687, mrr: '$34,350', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { plan: 'Premium', count: 198, mrr: '$19,800', icon: Crown, color: 'from-yellow-500 to-orange-500' },
    { plan: 'Enterprise', count: 20, mrr: '$6,000', icon: Target, color: 'from-gray-700 to-black' }
  ];

  return (
    <div className="space-y-8">
      {/* Estadísticas por Plan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsPorPlan.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
          >
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>

              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.plan}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.count}</p>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">{stat.mrr}/mes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Gestión de Suscripciones</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['todas', 'activa', 'trial', 'pausada', 'cancelada'] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltro(estado)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                filtro === estado
                  ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}s
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {estado === 'todas' ? suscripciones.length : suscripciones.filter(s => s.estado === estado).length}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Lista de Suscripciones */}
      <div className="space-y-4">
        {suscripcionesFiltradas.map((suscripcion, index) => {
          const PlanIcon = planConfig[suscripcion.plan].icon;
          const EstadoIcon = estadoConfig[suscripcion.estado].icon;

          return (
            <motion.div
              key={suscripcion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Badge de estado */}
              <div className="absolute top-4 right-4">
                <div className={`px-4 py-2 rounded-full ${estadoConfig[suscripcion.estado].bgColor} border border-${estadoConfig[suscripcion.estado].badge}/20`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${estadoConfig[suscripcion.estado].badge} animate-pulse`}></div>
                    <span className={`text-sm font-bold ${estadoConfig[suscripcion.estado].color}`}>
                      {suscripcion.estado.charAt(0).toUpperCase() + suscripcion.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                {/* Cliente y Plan */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${planConfig[suscripcion.plan].color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <PlanIcon className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-gray-900 mb-1 truncate">{suscripcion.cliente}</h4>
                      <div className={`inline-block px-3 py-1 rounded-full ${planConfig[suscripcion.plan].bgColor}`}>
                        <span className={`text-sm font-bold ${planConfig[suscripcion.plan].textColor}`}>
                          Plan {suscripcion.plan.charAt(0).toUpperCase() + suscripcion.plan.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precio */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Precio/mes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${suscripcion.precio}
                    <span className="text-sm text-gray-500 font-normal">/mes</span>
                  </p>
                </div>

                {/* Fechas */}
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Inicio</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(suscripcion.fechaInicio).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    {suscripcion.estado === 'activa' && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500">Próximo pago</p>
                          <p className="text-sm font-semibold text-green-600">
                            {new Date(suscripcion.proximoPago).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Método de Pago y Acciones */}
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Método de pago</p>
                    <p className="text-sm font-semibold text-gray-700">{suscripcion.metodoPago}</p>
                  </div>

                  {suscripcion.renovacionAutomatica && (
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-xs font-semibold text-green-600">Renovación automática</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    {suscripcion.estado === 'activa' && (
                      <>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                          Modificar
                        </button>
                        <button className="px-3 py-1.5 bg-orange-100 text-orange-600 text-xs font-semibold rounded-lg hover:bg-orange-200 transition-all duration-300">
                          Pausar
                        </button>
                      </>
                    )}
                    {suscripcion.estado === 'trial' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                        Activar Plan
                      </button>
                    )}
                    {suscripcion.estado === 'pausada' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                        Reactivar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {suscripcionesFiltradas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">No hay suscripciones con este filtro</p>
        </motion.div>
      )}
    </div>
  );
};
