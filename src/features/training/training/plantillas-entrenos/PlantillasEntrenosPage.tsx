import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  FileText,
  Layers,
  Star,
  Calendar,
  TrendingUp,
  Filter,
  Heart,
  Eye,
  Copy,
  Share2,
  Clock,
  Target,
  Dumbbell,
  Users,
  X,
  Flame,
  Zap,
  Activity,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import PlantillasFilters from './components/PlantillasFilters';
import PlantillasGrid from './components/PlantillasGrid';
import PlantillaPreview from './components/PlantillaPreview';
import { getTrainingTemplates, TrainingTemplate, Objective, Level, Modality } from './plantillasEntrenosApi';

type TabType = 'todas' | 'mis-plantillas' | 'favoritas' | 'publicas' | 'privadas';

const PlantillasEntrenosPage: React.FC = () => {
  const [templates, setTemplates] = useState<TrainingTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TrainingTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('todas');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    objective: '' as Objective | '',
    level: '' as Level | '',
    modality: '' as Modality | '',
    showFavorites: false,
    showMyTemplates: false,
  });

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      const data = await getTrainingTemplates();
      setTemplates(data);
      setLoading(false);
    };
    loadTemplates();
  }, []);

  // Statistics
  const stats = useMemo(() => {
    const total = templates.length;
    const myTemplates = templates.filter(t => !t.isSystemTemplate).length;
    const favorites = templates.filter(t => t.isFavorite).length;
    const publicTemplates = templates.filter(t => t.isSystemTemplate).length;

    return { total, myTemplates, favorites, publicTemplates };
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      // Search filter
      if (filters.search && !template.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !template.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Tab filter
      if (activeTab === 'mis-plantillas' && template.isSystemTemplate) return false;
      if (activeTab === 'favoritas' && !template.isFavorite) return false;
      if (activeTab === 'publicas' && !template.isSystemTemplate) return false;
      if (activeTab === 'privadas' && template.isSystemTemplate) return false;

      // Other filters
      if (filters.objective && template.objective !== filters.objective) return false;
      if (filters.level && template.level !== filters.level) return false;
      if (filters.modality && template.modality !== filters.modality) return false;
      if (filters.showFavorites && !template.isFavorite) return false;
      if (filters.showMyTemplates && template.isSystemTemplate) return false;

      return true;
    });
  }, [templates, filters, activeTab]);

  // Handlers
  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setShowPreview(true);
    }
  };

  const handleToggleFavorite = (templateId: string) => {
    setTemplates(prev => prev.map(t =>
      t.id === templateId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const handleUseAsBase = (templateId: string) => {
    alert(`Usando plantilla ${templateId} como base para nuevo entrenamiento`);
    setShowPreview(false);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                Plantillas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Entrenamiento</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed mb-6">
              Crea, personaliza y comparte <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">plantillas reutilizables</span> para tus entrenamientos
            </p>

            {/* Métricas pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <BookOpen className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">{stats.total} Plantillas Disponibles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{stats.publicTemplates} Plantillas Públicas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Heart className="w-5 h-5 text-pink-300" />
                <span className="text-sm font-semibold text-white">{stats.favorites} Favoritas</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Plantillas Disponibles', value: stats.total, icon: Layers, color: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-500/5 to-cyan-500/5' },
            { title: 'Tus Plantillas Creadas', value: stats.myTemplates, icon: FileText, color: 'from-purple-500 to-pink-500', bgGradient: 'from-purple-500/5 to-pink-500/5' },
            { title: 'Plantillas Favoritas', value: stats.favorites, icon: Heart, color: 'from-pink-500 to-rose-500', bgGradient: 'from-pink-500/5 to-rose-500/5' },
            { title: 'Plantillas Públicas', value: stats.publicTemplates, icon: Users, color: 'from-emerald-500 to-teal-500', bgGradient: 'from-emerald-500/5 to-teal-500/5' },
          ].map((stat, index) => (
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  {stat.value}
                </p>

                {/* Barra decorativa */}
                <div className={`mt-4 w-full h-1 bg-gradient-to-r ${stat.bgGradient} rounded-full overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NAVEGACIÓN POR CATEGORÍAS (TABS) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { id: 'todas', label: 'Todas las Plantillas', icon: Layers },
              { id: 'mis-plantillas', label: 'Mis Plantillas', icon: FileText },
              { id: 'favoritas', label: 'Favoritas', icon: Heart },
              { id: 'publicas', label: 'Públicas', icon: Users },
              { id: 'privadas', label: 'Privadas', icon: Target },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* FILTROS */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-all duration-300"
            >
              <Filter size={20} />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6">
                    <PlantillasFilters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* BOTÓN CREAR PLANTILLA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewTemplateModal(true)}
          className="fixed bottom-8 right-8 z-40 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 font-bold text-lg"
        >
          <Plus size={24} />
          Nueva Plantilla
        </motion.button>

        {/* GRID DE PLANTILLAS */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : (
          <PlantillasGrid
            templates={filteredTemplates}
            onViewDetails={handleViewDetails}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* PREVIEW MODAL */}
        <AnimatePresence>
          {showPreview && selectedTemplate && (
            <PlantillaPreview
              template={selectedTemplate}
              onClose={handleClosePreview}
              onUseAsBase={handleUseAsBase}
            />
          )}
        </AnimatePresence>

        {/* MODAL NUEVA PLANTILLA */}
        <AnimatePresence>
          {showNewTemplateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowNewTemplateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header del modal */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Nueva Plantilla de Entrenamiento</h2>
                      <p className="text-purple-100 text-sm mt-1">
                        Crea una nueva plantilla personalizada
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewTemplateModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Formulario */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre de la plantilla */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre de la Plantilla *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Entrenamiento de Fuerza para Principiantes"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Descripción */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        placeholder="Describe el objetivo y características de esta plantilla..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Objetivo */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Objetivo *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="">Seleccionar objetivo</option>
                        <option value="perdida-peso">Pérdida de Peso</option>
                        <option value="ganancia-musculo">Ganancia de Músculo</option>
                        <option value="fuerza">Fuerza</option>
                        <option value="resistencia">Resistencia</option>
                        <option value="flexibilidad">Flexibilidad</option>
                        <option value="rehabilitacion">Rehabilitación</option>
                        <option value="mantenimiento">Mantenimiento</option>
                      </select>
                    </div>

                    {/* Nivel */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nivel *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="">Seleccionar nivel</option>
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        <option value="experto">Experto</option>
                      </select>
                    </div>

                    {/* Modalidad */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Modalidad *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="">Seleccionar modalidad</option>
                        <option value="gym">Gimnasio</option>
                        <option value="casa">En Casa</option>
                        <option value="exterior">Exterior</option>
                        <option value="funcional">Funcional</option>
                        <option value="crossfit">CrossFit</option>
                        <option value="yoga">Yoga</option>
                        <option value="pilates">Pilates</option>
                      </select>
                    </div>

                    {/* Duración estimada */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duración Estimada (semanas)
                      </label>
                      <input
                        type="number"
                        placeholder="Ej: 8"
                        min="1"
                        max="52"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Días por semana */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Días por Semana
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="">Seleccionar frecuencia</option>
                        <option value="1">1 día</option>
                        <option value="2">2 días</option>
                        <option value="3">3 días</option>
                        <option value="4">4 días</option>
                        <option value="5">5 días</option>
                        <option value="6">6 días</option>
                        <option value="7">7 días</option>
                      </select>
                    </div>

                    {/* Duración por sesión */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duración por Sesión (minutos)
                      </label>
                      <input
                        type="number"
                        placeholder="Ej: 60"
                        min="15"
                        max="180"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Visibilidad */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Visibilidad
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="privada">Privada (solo tú)</option>
                        <option value="publica">Pública (todos los usuarios)</option>
                        <option value="equipo">Solo mi equipo</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Etiquetas (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: fuerza, principiantes, gimnasio (separadas por comas)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowNewTemplateModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para crear la plantilla
                        console.log('Crear nueva plantilla');
                        setShowNewTemplateModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                      Crear Plantilla
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlantillasEntrenosPage;
