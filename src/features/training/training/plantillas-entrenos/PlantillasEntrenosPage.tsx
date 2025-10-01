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
      </div>
    </div>
  );
};

export default PlantillasEntrenosPage;
