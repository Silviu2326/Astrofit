import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Download, Upload, Plus, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import ClientesTable from './components/ClientesTable';
import ClientesFilters from './components/ClientesFilters';
import ClientesActions from './components/ClientesActions';
import VistasPersonalizadas from './components/VistasPersonalizadas';
import ClientesStats from './components/ClientesStats';
import { useClientes, SortBy, SortDir, ClientesFilters as Filtros } from './clientesListadoApi';

const ClientesListadoPage: React.FC = () => {
  const [filters, setFilters] = useState<Partial<Filtros>>({});
  const [sortBy, setSortBy] = useState<SortBy>('ultimaActividad');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data = [], total = 0, pages = 1, stats = { total: 0, activos: 0, inactivos: 0, premium: 0, online: 0 }, isLoading, error } = useClientes({
    ...filters,
    sortBy,
    sortDir,
    page,
    pageSize,
  });

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const onToggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onToggleSelectAll = () => {
    const ids = data.map(d => d.id);
    const allSelected = ids.every(id => selected.has(id));
    setSelected(prev => {
      const next = new Set(prev);
      if (allSelected) {
        ids.forEach(id => next.delete(id));
      } else {
        ids.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const onSort = (key: SortBy) => {
    if (key === sortBy) setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleViewSelect = (viewFilters: any) => {
    setFilters(prev => ({ ...prev, ...viewFilters }));
    setPage(1);
  };

  const handleAddCliente = () => alert('Nuevo cliente (demo)');
  const handleExport = () => alert('Exportar clientes (demo)');
  const handleImport = () => alert('Importar clientes (demo)');
  const handleAddTags = () => alert(`Añadir etiquetas a ${selected.size} clientes (demo)`);
  const handleSendForms = () => alert(`Enviar formularios a ${selected.size} clientes (demo)`);
  const handleDeleteSelected = () => {
    if (selected.size > 0) alert(`Eliminar ${selected.size} clientes (demo)`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Cargando clientes...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">😕</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error al cargar clientes</h3>
            <p className="text-gray-600">{(error as any).message}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Header - Se mantiene igual */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl mb-8 p-8 md:p-12"
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
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Clientes</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Administra tu base de clientes con <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">filtros avanzados</span> y acciones masivas
                </p>
              </div>
            </div>

            <ClientesActions
              selectedCount={selected.size}
              onAddCliente={handleAddCliente}
              onExport={handleExport}
              onImport={handleImport}
              onAddTags={handleAddTags}
              onSendForms={handleSendForms}
              onDeleteSelected={handleDeleteSelected}
            />
          </div>

          {/* Filters y Vistas */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <ClientesFilters onFilterChange={handleFilterChange} />
            </div>
            <VistasPersonalizadas onSelectView={handleViewSelect} />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <ClientesStats stats={stats} />
        </motion.div>

        {/* Table */}
        <div className="space-y-3">
          <ClientesTable
            clientes={data}
            sortBy={sortBy}
            sortDir={sortDir}
            onSort={onSort}
            selected={selected}
            onToggleSelect={onToggleSelect}
            onToggleSelectAll={onToggleSelectAll}
            onView={(id) => alert(`Ver cliente ${id} (demo)`)}
          />

          {/* Pagination - Minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-4 border border-gray-200"
          >
            <div className="text-sm text-gray-600">
              {total > 0 ? (
                <span>
                  Mostrando <span className="font-semibold text-gray-900">{(page - 1) * pageSize + 1}</span>–
                  <span className="font-semibold text-gray-900">{Math.min(page * pageSize, total)}</span> de <span className="font-semibold text-gray-900">{total}</span> clientes
                </span>
              ) : (
                <span>Sin registros</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700">
                Página {page} de {pages}
              </span>
              <button
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                disabled={page >= pages}
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientesListadoPage;

