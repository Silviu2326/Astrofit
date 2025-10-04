import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Users, 
  Search, 
  Plus, 
  Star, 
  Lock, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Calendar,
  Grid3X3,
  Shield,
  X
} from 'lucide-react';
import Modal from '../../../../../../src/components/ui/modal';
import ConfirmationModal from '../../../../../../src/components/ui/confirmation-modal';

const GruposComunidadPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Estados para modales
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para crear grupo
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    category: 'fitness',
    isPrivate: false
  });

  // Mock data para grupos
  const grupos = [
    {
      id: 1,
      name: 'Fitness Enthusiasts',
      description: 'Comunidad dedicada al fitness y entrenamiento',
      members: 1250,
      posts: 89,
      isPrivate: false,
      category: 'fitness',
      image: '🏋️‍♂️',
      trending: true,
      lastActivity: '2 horas'
    },
    {
      id: 2,
      name: 'Nutrition Experts',
      description: 'Comparte recetas y consejos nutricionales',
      members: 890,
      posts: 156,
      isPrivate: false,
      category: 'nutrition',
      image: '🥗',
      trending: false,
      lastActivity: '5 horas'
    },
    {
      id: 3,
      name: 'Mindfulness & Wellness',
      description: 'Espacio para meditación y bienestar mental',
      members: 2100,
      posts: 234,
      isPrivate: true,
      category: 'wellness',
      image: '🧘‍♀️',
      trending: true,
      lastActivity: '1 hora'
    },
    {
      id: 4,
      name: 'Recipe Sharing',
      description: 'Comparte tus mejores recetas saludables',
      members: 675,
      posts: 445,
      isPrivate: false,
      category: 'nutrition',
      image: '👨‍🍳',
      trending: false,
      lastActivity: '3 horas'
    },
    {
      id: 5,
      name: 'Workout Buddies',
      description: 'Encuentra compañeros de entrenamiento',
      members: 1500,
      posts: 78,
      isPrivate: false,
      category: 'fitness',
      image: '🤝',
      trending: true,
      lastActivity: '30 min'
    },
    {
      id: 6,
      name: 'Mental Health Support',
      description: 'Grupo de apoyo para bienestar mental',
      members: 3200,
      posts: 567,
      isPrivate: true,
      category: 'wellness',
      image: '💚',
      trending: false,
      lastActivity: '4 horas'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos', icon: Grid3X3 },
    { value: 'fitness', label: 'Fitness', icon: TrendingUp },
    { value: 'nutrition', label: 'Nutrición', icon: Heart },
    { value: 'wellness', label: 'Bienestar', icon: Star }
  ];

  const filteredGrupos = grupos.filter(grupo => {
    const matchesSearch = grupo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grupo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || grupo.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Funciones para manejar acciones
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      toast.success(`Buscando: "${term}"`, {
        icon: '🔍',
        duration: 2000,
      });
    }
  };

  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
    const categoryName = categories.find(c => c.value === category)?.label || 'Todos';
    toast.success(`Filtro aplicado: ${categoryName}`, {
      icon: '🏷️',
      duration: 2000,
    });
  };

  const handleJoinGroup = (grupo: any) => {
    setSelectedGroup(grupo);
    setShowJoinConfirmation(true);
  };

  const confirmJoinGroup = async () => {
    if (!selectedGroup) return;
    
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`¡Te has unido a "${selectedGroup.name}"!`, {
      icon: '🎉',
      duration: 4000,
    });
    
    setIsLoading(false);
    setShowJoinConfirmation(false);
    setSelectedGroup(null);
  };

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const confirmCreateGroup = async () => {
    if (!newGroupData.name.trim() || !newGroupData.description.trim()) {
      toast.error('Por favor completa todos los campos', {
        icon: '⚠️',
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`¡Grupo "${newGroupData.name}" creado exitosamente!`, {
      icon: '✨',
      duration: 4000,
    });
    
    // Reset form
    setNewGroupData({
      name: '',
      description: '',
      category: 'fitness',
      isPrivate: false
    });
    
    setIsLoading(false);
    setShowCreateGroupModal(false);
  };

  const resetSearch = () => {
    setSearchTerm('');
    toast.success('Búsqueda limpiada', {
      icon: '🧹',
      duration: 1500,
    });
  };

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
              <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Grupos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Comunidad</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Únete a comunidades especializadas y conecta con personas que comparten tus intereses
          </p>

          {/* Estadísticas */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{grupos.length} Grupos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MessageCircle className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Comunidad Activa</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">En Crecimiento</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Barra de búsqueda y filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar grupos..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={resetSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filtros de categoría */}
              <div className="flex gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = filterCategory === category.value;
                  
                  return (
                    <motion.button
                      key={category.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange(category.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-semibold text-sm">{category.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Botón crear grupo */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateGroup}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Crear Grupo</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Grid de grupos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredGrupos.map((grupo, index) => (
            <motion.div
              key={grupo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Header del grupo */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                      {grupo.image}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{grupo.name}</h3>
                        {grupo.isPrivate && (
                          <div className="p-1 bg-orange-100 rounded-lg">
                            <Lock className="w-4 h-4 text-orange-600" />
                          </div>
                        )}
                        {grupo.trending && (
                          <div className="p-1 bg-red-100 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{grupo.description}</p>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">{grupo.members.toLocaleString()}</p>
                      <p className="text-xs text-blue-600">miembros</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">{grupo.posts}</p>
                      <p className="text-xs text-green-600">posts</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Activo hace {grupo.lastActivity}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleJoinGroup(grupo)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Unirse
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mensaje si no hay resultados */}
        {filteredGrupos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron grupos</h3>
              <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de confirmación para unirse a grupo */}
      <ConfirmationModal
        isOpen={showJoinConfirmation}
        onClose={() => setShowJoinConfirmation(false)}
        onConfirm={confirmJoinGroup}
        title="Unirse al Grupo"
        message={`¿Estás seguro de que quieres unirte al grupo "${selectedGroup?.name}"?`}
        confirmText="Unirse"
        cancelText="Cancelar"
        type="info"
        isLoading={isLoading}
      />

      {/* Modal para crear grupo */}
      <Modal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        title="Crear Nuevo Grupo"
        size="lg"
      >
        <div className="space-y-6">
          {/* Nombre del grupo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Grupo
            </label>
            <input
              type="text"
              value={newGroupData.name}
              onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
              placeholder="Ej: Fitness Enthusiasts"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={newGroupData.description}
              onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
              placeholder="Describe el propósito y objetivos del grupo..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none resize-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={newGroupData.category}
              onChange={(e) => setNewGroupData({...newGroupData, category: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
            >
              <option value="fitness">Fitness</option>
              <option value="nutrition">Nutrición</option>
              <option value="wellness">Bienestar</option>
            </select>
          </div>

          {/* Privacidad */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPrivate"
              checked={newGroupData.isPrivate}
              onChange={(e) => setNewGroupData({...newGroupData, isPrivate: e.target.checked})}
              className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label htmlFor="isPrivate" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Shield className="w-4 h-4" />
              Grupo privado (requiere aprobación para unirse)
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowCreateGroupModal(false)}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={confirmCreateGroup}
              disabled={isLoading || !newGroupData.name.trim() || !newGroupData.description.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              Crear Grupo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GruposComunidadPage;
