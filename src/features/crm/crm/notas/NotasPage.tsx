import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Plus, Filter, Grid3x3, List, TrendingUp, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Nota, getNotas, createNota, updateNota, deleteNota } from './notasApi';
import NotasList from './components/NotasList';
import NotaForm from './components/NotaForm';
import NotasFilters, { NotasFilter } from './components/NotasFilters';

const NotasPage: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editingNota, setEditingNota] = useState<Nota | undefined>(undefined);
  const [preselectedClientId, setPreselectedClientId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<NotasFilter>({
    searchText: '',
    clientId: '',
    tag: '',
    author: '',
    assignedTo: '',
    priority: 'all',
    dateRange: 'all',
  });

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      setLoading(true);
      const data = await getNotas();
      setNotas(data);
    } catch (err) {
      setError('Error al cargar las notas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateNota = async (notaData: Omit<Nota, 'id' | 'timestamp'> | Nota) => {
    try {
      if ('id' in notaData) {
        await updateNota(notaData as Nota);
      } else {
        await createNota(notaData);
      }
      fetchNotas();
      handleCloseFormModal();
    } catch (err) {
      setError('Error al guardar la nota.');
      console.error(err);
    }
  };

  const handleDeleteNota = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      try {
        await deleteNota(id);
        fetchNotas();
      } catch (err) {
        setError('Error al eliminar la nota.');
        console.error(err);
      }
    }
  };

  const handleEditNota = (nota: Nota) => {
    setEditingNota(nota);
    setShowFormModal(true);
  };

  const handleOpenCreateNota = (clientId?: string) => {
    setEditingNota(undefined);
    setPreselectedClientId(clientId);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingNota(undefined);
    setPreselectedClientId(undefined);
  };

  const handleFilterChange = (newFilters: Partial<NotasFilter>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredNotas = useMemo(() => {
    let filtered = notas;

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(
        (nota) =>
          nota.title.toLowerCase().includes(searchLower) ||
          nota.content.toLowerCase().includes(searchLower)
      );
    }

    if (filters.clientId) {
      filtered = filtered.filter((nota) => nota.clientId === filters.clientId);
    }

    if (filters.tag) {
      const tagLower = filters.tag.toLowerCase();
      filtered = filtered.filter((nota) =>
        nota.tags.some((tag) => tag.toLowerCase().includes(tagLower))
      );
    }

    if (filters.author) {
      filtered = filtered.filter((nota) => nota.author === filters.author);
    }

    if (filters.assignedTo) {
      filtered = filtered.filter((nota) => nota.assignedTo === filters.assignedTo);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter((nota) => nota.priority === filters.priority);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter((nota) => {
        const noteDate = new Date(nota.timestamp);
        switch (filters.dateRange) {
          case 'today':
            return (
              noteDate.getDate() === now.getDate() &&
              noteDate.getMonth() === now.getMonth() &&
              noteDate.getFullYear() === now.getFullYear()
            );
          case 'last7days':
            const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
            return noteDate >= sevenDaysAgo;
          case 'last30days':
            const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
            return noteDate >= thirtyDaysAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [notas, filters]);

  const stats = useMemo(() => {
    return {
      total: notas.length,
      high: notas.filter(n => n.priority === 'high').length,
      medium: notas.filter(n => n.priority === 'medium').length,
      low: notas.filter(n => n.priority === 'low').length,
    };
  }, [notas]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Cargando notas...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">😕</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error al cargar notas</h3>
            <p className="text-gray-600">{error}</p>
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
                  <StickyNote className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Notas</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Organiza información importante con <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">notas inteligentes</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </motion.button>

              <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenCreateNota()}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Nueva Nota</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-indigo-50 rounded-lg">
                <StickyNote className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Total Notas</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Alta Prioridad</p>
            <p className="text-3xl font-bold text-red-600">{stats.high}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Media Prioridad</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.medium}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Baja Prioridad</p>
            <p className="text-3xl font-bold text-green-600">{stats.low}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        {/* Filtros */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <NotasFilters filters={filters} onFilterChange={handleFilterChange} />
          </motion.div>
        )}

        {/* Lista de Notas */}
        <NotasList
          notas={filteredNotas}
          onEdit={handleEditNota}
          onDelete={handleDeleteNota}
          viewMode={viewMode}
        />
      </div>

      {/* Modal de Formulario */}
      {showFormModal && (
        <NotaForm
          nota={editingNota}
          onSubmit={handleCreateOrUpdateNota}
          onClose={handleCloseFormModal}
          preselectedClientId={preselectedClientId}
        />
      )}
    </div>
  );
};

export default NotasPage;
