import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Users,
  Zap,
  Gift,
  Shield,
  Sparkles,
  Save
} from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import ConfirmationModal from '../../../../../components/ui/confirmation-modal';

interface Beneficio {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'contenido' | 'comunidad' | 'herramientas' | 'soporte';
  activo: boolean;
  nivel: 'bronce' | 'plata' | 'oro' | 'premium';
}

const BeneficiosMembresiPage: React.FC = () => {
  const [beneficios, setBeneficios] = useState<Beneficio[]>([
    {
      id: '1',
      nombre: 'Directo semanal exclusivo',
      descripcion: 'Sesión en vivo cada semana con contenido premium',
      categoria: 'contenido',
      activo: true,
      nivel: 'oro'
    },
    {
      id: '2',
      nombre: 'Recetas exclusivas',
      descripcion: 'Acceso a base de datos de recetas premium',
      categoria: 'contenido',
      activo: true,
      nivel: 'plata'
    },
    {
      id: '3',
      nombre: 'Comunidad privada',
      descripcion: 'Acceso a grupo exclusivo de miembros',
      categoria: 'comunidad',
      activo: true,
      nivel: 'bronce'
    },
    {
      id: '4',
      nombre: 'Herramientas avanzadas',
      descripcion: 'Planes de entrenamiento personalizados',
      categoria: 'herramientas',
      activo: false,
      nivel: 'premium'
    },
    {
      id: '5',
      nombre: 'Soporte prioritario',
      descripcion: 'Atención al cliente 24/7',
      categoria: 'soporte',
      activo: true,
      nivel: 'premium'
    }
  ]);

  const [nivelFiltro, setNivelFiltro] = useState<string>('todos');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todos');
  
  // Estados para modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBeneficio, setSelectedBeneficio] = useState<Beneficio | null>(null);
  
  // Estados para formularios
  const [formData, setFormData] = useState<Omit<Beneficio, 'id'>>({
    nombre: '',
    descripcion: '',
    categoria: 'contenido',
    activo: true,
    nivel: 'bronce'
  });

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'contenido': return <Star className="w-5 h-5" />;
      case 'comunidad': return <Users className="w-5 h-5" />;
      case 'herramientas': return <Zap className="w-5 h-5" />;
      case 'soporte': return <Shield className="w-5 h-5" />;
      default: return <Gift className="w-5 h-5" />;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'contenido': return 'from-yellow-500 to-orange-500';
      case 'comunidad': return 'from-blue-500 to-indigo-500';
      case 'herramientas': return 'from-purple-500 to-pink-500';
      case 'soporte': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'bronce': return 'from-amber-500 to-orange-600';
      case 'plata': return 'from-gray-400 to-gray-600';
      case 'oro': return 'from-yellow-400 to-yellow-600';
      case 'premium': return 'from-purple-500 to-pink-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const toggleBeneficio = (id: string) => {
    setBeneficios(prev => prev.map(beneficio => 
      beneficio.id === id ? { ...beneficio, activo: !beneficio.activo } : beneficio
    ));
    toast.success('Estado del beneficio actualizado');
  };

  // Funciones para manejar modales
  const openAddModal = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      categoria: 'contenido',
      activo: true,
      nivel: 'bronce'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (beneficio: Beneficio) => {
    setSelectedBeneficio(beneficio);
    setFormData({
      nombre: beneficio.nombre,
      descripcion: beneficio.descripcion,
      categoria: beneficio.categoria,
      activo: beneficio.activo,
      nivel: beneficio.nivel
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (beneficio: Beneficio) => {
    setSelectedBeneficio(beneficio);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (beneficio: Beneficio) => {
    setSelectedBeneficio(beneficio);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBeneficio(null);
  };

  // Funciones para manejar formularios
  const handleFormChange = (field: keyof Omit<Beneficio, 'id'>, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddBeneficio = () => {
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const newBeneficio: Beneficio = {
      id: Date.now().toString(),
      ...formData
    };

    setBeneficios(prev => [...prev, newBeneficio]);
    closeModals();
    toast.success('Beneficio agregado exitosamente');
  };

  const handleEditBeneficio = () => {
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!selectedBeneficio) return;

    setBeneficios(prev => prev.map(beneficio => 
      beneficio.id === selectedBeneficio.id 
        ? { ...beneficio, ...formData }
        : beneficio
    ));
    closeModals();
    toast.success('Beneficio actualizado exitosamente');
  };

  const handleDeleteBeneficio = () => {
    if (!selectedBeneficio) return;

    setBeneficios(prev => prev.filter(beneficio => beneficio.id !== selectedBeneficio.id));
    closeModals();
    toast.success('Beneficio eliminado exitosamente');
  };

  const beneficiosFiltrados = beneficios.filter(beneficio => {
    const nivelMatch = nivelFiltro === 'todos' || beneficio.nivel === nivelFiltro;
    const categoriaMatch = categoriaFiltro === 'todos' || beneficio.categoria === categoriaFiltro;
    return nivelMatch && categoriaMatch;
  });

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
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Beneficios</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Configura y personaliza los <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">beneficios exclusivos</span> para cada nivel de membresía
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Nivel:</span>
              <select 
                value={nivelFiltro} 
                onChange={(e) => setNivelFiltro(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="todos">Todos</option>
                <option value="bronce">Bronce</option>
                <option value="plata">Plata</option>
                <option value="oro">Oro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Categoría:</span>
              <select 
                value={categoriaFiltro} 
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              >
                <option value="todos">Todas</option>
                <option value="contenido">Contenido</option>
                <option value="comunidad">Comunidad</option>
                <option value="herramientas">Herramientas</option>
                <option value="soporte">Soporte</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar Beneficio
            </motion.button>
          </div>
        </motion.div>

        {/* Lista de Beneficios */}
        <div className="space-y-4">
          {beneficiosFiltrados.map((beneficio, index) => (
            <motion.div
              key={beneficio.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${getCategoriaColor(beneficio.categoria)} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Icono de categoría */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoriaColor(beneficio.categoria)} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {getCategoriaIcon(beneficio.categoria)}
                  </div>

                  {/* Información del beneficio */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{beneficio.nombre}</h3>
                      <div className={`px-3 py-1 bg-gradient-to-r ${getNivelColor(beneficio.nivel)} text-white text-xs font-bold rounded-full`}>
                        {beneficio.nivel.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{beneficio.descripcion}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {beneficio.categoria}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-3">
                  {/* Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleBeneficio(beneficio.id)}
                    className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${
                      beneficio.activo ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: beneficio.activo ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openViewModal(beneficio)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-300"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openEditModal(beneficio)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors duration-300"
                      title="Editar beneficio"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDeleteModal(beneficio)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-300"
                      title="Eliminar beneficio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vista Previa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Vista Previa</h2>
          </div>
          <p className="text-gray-600">
            Aquí se mostrará una vista previa en tiempo real de cómo se verán los beneficios en la página de membresía.
          </p>
        </motion.div>
      </div>

      {/* Modal para Agregar Beneficio */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeModals}
        title="Agregar Nuevo Beneficio"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Beneficio *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleFormChange('nombre', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              placeholder="Ej: Directo semanal exclusivo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => handleFormChange('descripcion', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none resize-none"
              placeholder="Describe el beneficio para los miembros..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleFormChange('categoria', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              >
                <option value="contenido">Contenido</option>
                <option value="comunidad">Comunidad</option>
                <option value="herramientas">Herramientas</option>
                <option value="soporte">Soporte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nivel de Membresía
              </label>
              <select
                value={formData.nivel}
                onChange={(e) => handleFormChange('nivel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              >
                <option value="bronce">Bronce</option>
                <option value="plata">Plata</option>
                <option value="oro">Oro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo"
              checked={formData.activo}
              onChange={(e) => handleFormChange('activo', e.target.checked)}
              className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="activo" className="text-sm font-semibold text-gray-700">
              Beneficio activo
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={closeModals}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddBeneficio}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Agregar Beneficio
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para Editar Beneficio */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        title="Editar Beneficio"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Beneficio *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleFormChange('nombre', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              placeholder="Ej: Directo semanal exclusivo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => handleFormChange('descripcion', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none resize-none"
              placeholder="Describe el beneficio para los miembros..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleFormChange('categoria', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              >
                <option value="contenido">Contenido</option>
                <option value="comunidad">Comunidad</option>
                <option value="herramientas">Herramientas</option>
                <option value="soporte">Soporte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nivel de Membresía
              </label>
              <select
                value={formData.nivel}
                onChange={(e) => handleFormChange('nivel', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              >
                <option value="bronce">Bronce</option>
                <option value="plata">Plata</option>
                <option value="oro">Oro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo-edit"
              checked={formData.activo}
              onChange={(e) => handleFormChange('activo', e.target.checked)}
              className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="activo-edit" className="text-sm font-semibold text-gray-700">
              Beneficio activo
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={closeModals}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleEditBeneficio}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para Ver Beneficio */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        title="Detalles del Beneficio"
        size="md"
      >
        {selectedBeneficio && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoriaColor(selectedBeneficio.categoria)} flex items-center justify-center text-white shadow-xl`}>
                {getCategoriaIcon(selectedBeneficio.categoria)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedBeneficio.nombre}</h3>
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getNivelColor(selectedBeneficio.nivel)} text-white text-xs font-bold rounded-full`}>
                  {selectedBeneficio.nivel.toUpperCase()}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h4>
              <p className="text-gray-600 leading-relaxed">{selectedBeneficio.descripcion}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Categoría</h4>
                <span className="text-gray-600 capitalize">{selectedBeneficio.categoria}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Estado</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedBeneficio.activo 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedBeneficio.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={closeModals}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmación para Eliminar */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDeleteBeneficio}
        title="Eliminar Beneficio"
        message={`¿Estás seguro de que deseas eliminar el beneficio "${selectedBeneficio?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default BeneficiosMembresiPage;
