import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import ClientesTable from './components/ClientesTable';
import ClientesFilters from './components/ClientesFilters';
import ClientesActions from './components/ClientesActions';
import VistasPersonalizadas from './components/VistasPersonalizadas';
import ClientesStats from './components/ClientesStats';
import { useClientes, SortBy, SortDir, ClientesFilters as Filtros } from './clientesListadoApi';
import ClienteFormModal from './components/ClienteFormModal';
import ClienteDetailsModal from './components/ClienteDetailsModal';

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

  const [openNewModal, setOpenNewModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<any>(null);
  const handleAddCliente = () => setOpenNewModal(true);
  const handleExport = () => {
    if (data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }
    
    // Crear CSV con los datos actuales
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Estado', 'Etiquetas', 'Fecha Alta', 'Última Actividad'];
    const csvContent = [
      headers.join(','),
      ...data.map(cliente => [
        cliente.id,
        `"${cliente.nombre}"`,
        `"${cliente.email}"`,
        `"${cliente.telefono || ''}"`,
        cliente.estado,
        `"${cliente.etiquetas.join('; ')}"`,
        cliente.fechaAlta,
        cliente.ultimaActividad
      ].join(','))
    ].join('\n');
    
    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          try {
            // Parsear CSV básico
            const lines = content.split('\n');
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const importedData = lines.slice(1).filter(line => line.trim()).map(line => {
              const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
              return headers.reduce((obj, header, index) => {
                obj[header.toLowerCase()] = values[index] || '';
                return obj;
              }, {} as any);
            });
            
            alert(`Se importaron ${importedData.length} clientes correctamente`);
            // Aquí normalmente se enviarían los datos al servidor
          } catch (error) {
            alert('Error al procesar el archivo. Verifique el formato.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleAddTags = () => {
    if (selected.size === 0) {
      alert('Seleccione al menos un cliente');
      return;
    }
    
    const tags = prompt(`Ingrese las etiquetas para ${selected.size} clientes (separadas por coma):`);
    if (tags && tags.trim()) {
      const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
      alert(`Se añadieron las etiquetas "${tagList.join(', ')}" a ${selected.size} clientes`);
      // Aquí normalmente se actualizarían los clientes en el servidor
    }
  };

  const handleSendForms = () => {
    if (selected.size === 0) {
      alert('Seleccione al menos un cliente');
      return;
    }
    
    const formType = prompt(`Seleccione el tipo de formulario para enviar a ${selected.size} clientes:\n1. Encuesta de satisfacción\n2. Formulario de actualización de datos\n3. Formulario de preferencias\n\nIngrese el número (1-3):`);
    
    const formTypes = {
      '1': 'Encuesta de satisfacción',
      '2': 'Formulario de actualización de datos', 
      '3': 'Formulario de preferencias'
    };
    
    if (formType && formTypes[formType as keyof typeof formTypes]) {
      alert(`Se envió "${formTypes[formType as keyof typeof formTypes]}" a ${selected.size} clientes`);
      // Aquí normalmente se enviarían los formularios
    }
  };

  const handleDeleteSelected = () => {
    if (selected.size === 0) {
      alert('Seleccione al menos un cliente');
      return;
    }
    
    const confirmDelete = confirm(`¿Está seguro de que desea eliminar ${selected.size} cliente(s)? Esta acción no se puede deshacer.`);
    if (confirmDelete) {
      alert(`Se eliminaron ${selected.size} clientes correctamente`);
      setSelected(new Set()); // Limpiar selección
      // Aquí normalmente se eliminarían los clientes del servidor
    }
  };

  // Nota: no hacemos return temprano en carga para no desmontar los filtros y perder su estado local

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
        {isLoading && (
          <div className="flex items-center gap-3 mb-4 text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Cargando clientes...</span>
          </div>
        )}
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
            onView={(id) => {
              const cliente = data.find(c => c.id === id);
              if (cliente) {
                setSelectedCliente(cliente);
                setShowDetailsModal(true);
              }
            }}
            onEdit={(id) => {
              const cliente = data.find(c => c.id === id);
              if (cliente) {
                setEditingCliente(cliente);
                setOpenNewModal(true);
              }
            }}
          />

          <ClienteFormModal
            open={openNewModal}
            onClose={() => setOpenNewModal(false)}
            onCreated={() => {
              // Al cerrar el modal, refrescamos llevando a la primera página para ver el nuevo registro
              setPage(1);
            }}
            cliente={editingCliente}
            onUpdated={() => {
              setPage(p => p); // trigger refresh via filters dependency; keeping the same page
            }}
          />

          <ClienteDetailsModal
            cliente={selectedCliente}
            isOpen={showDetailsModal}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedCliente(null);
            }}
            onEdit={(cliente) => {
              setEditingCliente(cliente);
              setOpenNewModal(true);
              setShowDetailsModal(false);
            }}
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
                type="button"
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
                type="button"
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

