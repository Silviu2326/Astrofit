import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import TarjetasMembresia from './components/TarjetasMembresia';
import EstadisticasMembresia from './components/EstadisticasMembresia';
import CrearMembresia from './components/CrearMembresia';
import Modal from '../../../../../components/ui/modal';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';
import { Membresia, getMembresias, updateMembresia, deleteMembresia } from './listadoMembresiasApi';

// Componente para el modal de edición
const EditMembresiaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  membresia: Membresia;
  onSave: (updatedMembresia: Membresia) => void;
}> = ({ isOpen, onClose, membresia, onSave }) => {
  const [formData, setFormData] = useState({
    nivel: membresia.nivel,
    miembrosActivos: membresia.miembrosActivos,
    ingresosGenerados: membresia.ingresosGenerados,
    estado: membresia.estado,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loadingToast = toast.loading('Actualizando membresía...');
    
    try {
      const updatedMembresia = await updateMembresia(membresia.id, formData);
      toast.success('¡Membresía actualizada exitosamente!', { id: loadingToast });
      onSave(updatedMembresia);
      onClose();
    } catch (error) {
      toast.error('Error al actualizar la membresía. Inténtalo de nuevo.', { id: loadingToast });
      console.error('Error updating membership:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Membresía" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="edit-nivel" className="block text-sm font-semibold text-gray-700 mb-2">
            Nivel de Membresía
          </label>
          <select
            id="edit-nivel"
            value={formData.nivel}
            onChange={(e) => setFormData({ ...formData, nivel: e.target.value as Membresia['nivel'] })}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="Bronce">Bronce</option>
            <option value="Plata">Plata</option>
            <option value="Oro">Oro</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div>
          <label htmlFor="edit-miembros" className="block text-sm font-semibold text-gray-700 mb-2">
            Miembros Activos
          </label>
          <input
            type="number"
            id="edit-miembros"
            value={formData.miembrosActivos}
            onChange={(e) => setFormData({ ...formData, miembrosActivos: Number(e.target.value) })}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="edit-ingresos" className="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos Generados ($)
          </label>
          <input
            type="number"
            id="edit-ingresos"
            value={formData.ingresosGenerados}
            onChange={(e) => setFormData({ ...formData, ingresosGenerados: Number(e.target.value) })}
            disabled={isLoading}
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="edit-estado" className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <select
            id="edit-estado"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value as Membresia['estado'] })}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="activo">Activo</option>
            <option value="pausado">Pausado</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Cambios'
            )}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

const ListadoMembresiasPage: React.FC = () => {
  const [membresias, setMembresias] = useState<Membresia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMembresia, setSelectedMembresia] = useState<Membresia | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cargar membresías al montar el componente
  useEffect(() => {
    const loadMembresias = async () => {
      try {
        const data = await getMembresias();
        setMembresias(data);
      } catch (error) {
        toast.error('Error al cargar las membresías');
        console.error('Error loading memberships:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembresias();
  }, []);

  const handleEditMembresia = (membresia: Membresia) => {
    setSelectedMembresia(membresia);
    setIsEditModalOpen(true);
  };

  const handleDeleteMembresia = (membresia: Membresia) => {
    setSelectedMembresia(membresia);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateMembresia = (updatedMembresia: Membresia) => {
    setMembresias(prev => 
      prev.map(m => m.id === updatedMembresia.id ? updatedMembresia : m)
    );
  };

  const handleConfirmDelete = async () => {
    if (!selectedMembresia) return;
    
    setIsDeleting(true);
    
    const loadingToast = toast.loading('Eliminando membresía...');
    
    try {
      await deleteMembresia(selectedMembresia.id);
      toast.success('¡Membresía eliminada exitosamente!', { id: loadingToast });
      setMembresias(prev => prev.filter(m => m.id !== selectedMembresia.id));
      setIsDeleteModalOpen(false);
      setSelectedMembresia(null);
    } catch (error) {
      toast.error('Error al eliminar la membresía. Inténtalo de nuevo.', { id: loadingToast });
      console.error('Error deleting membership:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateMembresia = (nuevaMembresia: Membresia) => {
    setMembresias(prev => [...prev, nuevaMembresia]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Cargando membresías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
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
              <Crown className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Membresías</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Administra y supervisa todas las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">membresías premium</span> de tu plataforma
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">240 Miembros</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <DollarSign className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">$8,800 Ingresos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">87.5% Activos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <EstadisticasMembresia />
      </div>

      {/* Sección Crear Membresía */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <CrearMembresia onMembresiaCreated={handleCreateMembresia} />
      </motion.div>

      {/* Grid de Tarjetas de Membresías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <TarjetasMembresia 
          membresias={membresias}
          onEdit={handleEditMembresia}
          onDelete={handleDeleteMembresia}
        />
      </motion.div>

      {/* Modales */}
      {selectedMembresia && (
        <>
          <EditMembresiaModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedMembresia(null);
            }}
            membresia={selectedMembresia}
            onSave={handleUpdateMembresia}
          />
          
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedMembresia(null);
            }}
            onConfirm={handleConfirmDelete}
            title="Eliminar Membresía"
            message={`¿Estás seguro de que quieres eliminar la membresía ${selectedMembresia.nivel}? Esta acción no se puede deshacer.`}
            confirmText="Eliminar"
            cancelText="Cancelar"
            type="danger"
            isLoading={isDeleting}
          />
        </>
      )}
    </div>
  );
};

export default ListadoMembresiasPage;
