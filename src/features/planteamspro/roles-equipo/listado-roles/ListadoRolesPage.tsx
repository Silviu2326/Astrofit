import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Search, Sparkles, UserCog } from 'lucide-react';
import { TablaEquipo } from './components/TablaEquipo';
import { useEquipo, RolPrincipal } from './listadoRolesApi';
import EditorRoles from './components/EditorRoles';
import HistorialCambios from './components/HistorialCambios';
import JerarquiaVisual from './components/JerarquiaVisual';
import BotonesAccionRapida from './components/BotonesAccionRapida';
import SistemaNotificaciones from './components/SistemaNotificaciones';
import ValidacionesRoles from './components/ValidacionesRoles';
import RolesTemporales from './components/RolesTemporales';
import IntegracionCalendario from './components/IntegracionCalendario';

const ListadoRolesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { equipo, loading, error } = useEquipo();

  const filteredEquipo = equipo.filter(member =>
    member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.rolPrincipal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar por rol para estadísticas
  const rolesStats = useMemo(() => {
    const stats: Record<string, number> = {};
    equipo.forEach(member => {
      stats[member.rolPrincipal] = (stats[member.rolPrincipal] || 0) + 1;
    });
    return stats;
  }, [equipo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Cargando equipo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 max-w-md">
          <p className="text-center text-red-600 font-semibold">Error al cargar el equipo: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      <div className="container mx-auto p-4 md:p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Equipo</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
              Administra roles, permisos y responsabilidades del equipo
            </p>

            {/* Indicadores pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{equipo.length} Miembros</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Shield className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">{Object.keys(rolesStats).length} Roles Activos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Buscador moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o rol..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm shadow-xl text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Cards de Roles con Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
        >
          {Object.entries(rolesStats).map(([rol, count], index) => (
            <motion.div
              key={rol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50 relative overflow-hidden group cursor-pointer"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <UserCog className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600 text-center mb-1 uppercase tracking-wide">{rol}</p>
                <div className="flex items-center justify-center">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full">
                    {count}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabla de Equipo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <TablaEquipo equipo={filteredEquipo} />
        </motion.div>

        {/* Componentes adicionales en grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <EditorRoles />
          <HistorialCambios />
          <JerarquiaVisual />
          <BotonesAccionRapida />
          <SistemaNotificaciones />
          <ValidacionesRoles />
          <RolesTemporales />
          <IntegracionCalendario />
        </motion.div>
      </div>
    </div>
  );
};

export default ListadoRolesPage;
