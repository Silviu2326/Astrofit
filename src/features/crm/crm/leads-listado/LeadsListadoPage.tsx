import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Plus, Download, Upload, TrendingUp, Sparkles } from 'lucide-react';
import LeadsKanban from './components/LeadsKanban';
import LeadsStats from './components/LeadsStats';
import LeadsFilters from './components/LeadsFilters';
import { useLeads } from './leadsListadoApi';

const LeadsListadoPage: React.FC = () => {
  const { leads, loading, error } = useLeads();
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [filters, setFilters] = useState({});

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Cargando leads...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error al cargar leads</h3>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-8 p-8 md:p-12"
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

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Pipeline de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Leads</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Gestiona y convierte tus leads con <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">tablero Kanban</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                <span>Importar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Lead</span>
              </motion.button>
            </div>
          </div>

          {/* Filters y View Toggle */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <LeadsFilters onApplyFilters={setFilters} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center bg-white/20 backdrop-blur-md p-1 rounded-xl border border-white/20"
            >
              <button
                onClick={() => setView('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  view === 'kanban'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  view === 'list'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Lista</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          <LeadsStats leads={leads} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <AnimatePresence mode="wait">
          {view === 'kanban' ? (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LeadsKanban leads={leads} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
            >
              <div className="text-center py-12">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <List className="w-10 h-10 text-indigo-600" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Vista de Lista</h3>
                <p className="text-gray-600">Esta vista estará disponible próximamente</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeadsListadoPage;
