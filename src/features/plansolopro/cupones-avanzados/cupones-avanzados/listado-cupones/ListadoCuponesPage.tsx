import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket, TrendingUp, DollarSign, Target,
  Copy, QrCode, Calendar, Users, Filter,
  Plus, Search, Download
} from 'lucide-react';
import { TablaCupones } from './components/TablaCupones';
import { FiltrosCupones } from './components/FiltrosCupones';

const ListadoCuponesPage: React.FC = () => {
  const [filterEstado, setFilterEstado] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const cupones = [
    {
      id: '1',
      codigo: 'VERANO20',
      tipo: 'porcentaje',
      valor: 20,
      fechaInicio: '2023-06-01',
      fechaFin: '2023-08-31',
      usosActuales: 150,
      limiteUsos: 500,
      estado: 'activo',
    },
    {
      id: '2',
      codigo: 'ENVIOFREE',
      tipo: 'fijo',
      valor: 5,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      usosActuales: 1000,
      limiteUsos: 1000,
      estado: 'agotado',
    },
    {
      id: '3',
      codigo: 'NAVIDAD10',
      tipo: 'porcentaje',
      valor: 10,
      fechaInicio: '2022-12-01',
      fechaFin: '2022-12-25',
      usosActuales: 300,
      limiteUsos: 300,
      estado: 'caducado',
    },
    {
      id: '4',
      codigo: 'NUEVOCLIENTE',
      tipo: 'porcentaje',
      valor: 15,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      usosActuales: 50,
      limiteUsos: 200,
      estado: 'activo',
    },
  ];

  // Estadísticas calculadas
  const cuponesActivos = cupones.filter(c => c.estado === 'activo').length;
  const usosMes = cupones.reduce((sum, c) => sum + c.usosActuales, 0);
  const descuentoTotal = cupones.reduce((sum, c) => {
    if (c.tipo === 'fijo') return sum + (c.valor * c.usosActuales);
    return sum + (c.usosActuales * 10); // Estimado para porcentaje
  }, 0);
  const tasaConversion = ((usosMes / (cupones.reduce((sum, c) => sum + c.limiteUsos, 0))) * 100).toFixed(1);

  const stats = [
    {
      title: 'Cupones Activos',
      value: cuponesActivos,
      icon: Ticket,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      change: '+8.2',
      progress: 75
    },
    {
      title: 'Usos Este Mes',
      value: usosMes.toLocaleString(),
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10',
      change: '+15.3',
      progress: 60
    },
    {
      title: 'Descuento Total',
      value: `$${descuentoTotal.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/10 to-pink-600/10',
      change: '+22.1',
      progress: 85
    },
    {
      title: 'Tasa Conversión',
      value: `${tasaConversion}%`,
      icon: Target,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10',
      change: '+5.7',
      progress: 45
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Ticket className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Cupones</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Crea <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">ofertas irresistibles</span> y maximiza tus conversiones
          </p>

          {/* Botón crear cupón */}
          <div className="mt-8">
            <button className="group relative overflow-hidden bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-2xl px-6 py-3 border border-white/30 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-2 relative z-10">
                <Plus className="w-5 h-5 text-white" />
                <span className="text-white font-bold">Crear Nuevo Cupón</span>
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
            </button>
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
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
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

      {/* FILTROS Y BÚSQUEDA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Filtros y Búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cupón..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>

            <FiltrosCupones
              filterEstado={filterEstado}
              setFilterEstado={setFilterEstado}
              filterTipo={filterTipo}
              setFilterTipo={setFilterTipo}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 text-orange-700 font-semibold hover:shadow-lg transition-all duration-300">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </motion.div>

      {/* TABLA DE CUPONES */}
      <TablaCupones
        cupones={cupones}
        searchTerm={searchTerm}
        filterEstado={filterEstado}
        filterTipo={filterTipo}
      />
    </div>
  );
};

export default ListadoCuponesPage;