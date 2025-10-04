
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Users, Heart, Star, TrendingUp, Plus, Sparkles, X } from 'lucide-react';
import PlantillasGrid from './components/PlantillasGrid';
import PlantillasFilters from './components/PlantillasFilters';
import PlantillaPreview from './components/PlantillaPreview';
import { plantillasDietasApi, PlantillaDieta } from './plantillasDietasApi';

const PlantillasDietasPage: React.FC = () => {
  const [plantillas, setPlantillas] = useState<PlantillaDieta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaDieta | null>(null);
  const [activeTab, setActiveTab] = useState<'todas' | 'mis-plantillas' | 'favoritas' | 'publicas' | 'por-objetivo'>('todas');
  const [showNewDietModal, setShowNewDietModal] = useState(false);
  const [filters, setFilters] = useState({
    objective: '',
    dietType: '',
    time_level: '',
    culinary_experience: '',
    caloriesMin: '',
    caloriesMax: '',
    restrictions: [] as string[],
    search: '',
  });
  const [stats, setStats] = useState({
    total: 0,
    miasPlantillas: 0,
    usadas: 0,
    favoritas: 0,
  });

  useEffect(() => {
    loadPlantillas();
  }, [activeTab, filters]);

  const loadPlantillas = async () => {
    try {
      setLoading(true);
      const apiFilters: any = {
        incluirPublicas: 'true',
        q: filters.search || undefined,
        objective: filters.objective || undefined,
        dietType: filters.dietType || undefined,
        time_level: filters.time_level || undefined,
        culinary_experience: filters.culinary_experience || undefined,
        caloriesMin: filters.caloriesMin || undefined,
        caloriesMax: filters.caloriesMax || undefined,
      };

      if (activeTab === 'favoritas') {
        apiFilters.is_favorite = 'true';
      } else if (activeTab === 'publicas') {
        apiFilters.is_public = 'true';
      } else if (activeTab === 'mis-plantillas') {
        apiFilters.is_public = 'false';
      }

      const response = await plantillasDietasApi.getPlantillas(apiFilters);
      setPlantillas(response.data || []);

      if (response.stats) {
        setStats({
          total: response.stats.total || 0,
          miasPlantillas: (response.stats.total || 0) - (response.stats.publicas || 0),
          usadas: response.stats.totalUsos || 0,
          favoritas: response.stats.favoritas || 0,
        });
      }
    } catch (error) {
      console.error('Error loading plantillas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <UtensilsCrossed className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Plantillas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Dietas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed mb-6">
            Marketplace de plantillas nutricionales. Crea, comparte y encuentra el plan perfecto para tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">objetivos</span>
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{stats.total} Plantillas Disponibles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{stats.usadas.toLocaleString()} Usos Totales</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="text-sm font-semibold text-white">{stats.favoritas} Favoritas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: UtensilsCrossed, title: 'Plantillas Disponibles', value: stats.total, color: 'from-green-500 to-emerald-600', change: '+12' },
          { icon: Users, title: 'Tus Plantillas Creadas', value: stats.miasPlantillas, color: 'from-blue-500 to-indigo-600', change: '+3' },
          { icon: TrendingUp, title: 'Plantillas Usadas', value: stats.usadas.toLocaleString(), color: 'from-purple-500 to-pink-600', change: '+847' },
          { icon: Heart, title: 'Plantillas Compartidas', value: stats.favoritas, color: 'from-orange-500 to-red-600', change: '+2' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
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
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">este mes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navegación por Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50 inline-flex gap-2">
          {[
            { id: 'todas', label: 'Todas las Plantillas', icon: UtensilsCrossed },
            { id: 'mis-plantillas', label: 'Mis Plantillas', icon: Users },
            { id: 'favoritas', label: 'Favoritas', icon: Heart },
            { id: 'publicas', label: 'Públicas', icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contenido Principal: Filtros + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <PlantillasFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <PlantillasGrid
              plantillas={plantillas}
              onSelectPlantilla={setSelectedPlantilla}
            />
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPlantilla && (
        <PlantillaPreview
          plantilla={selectedPlantilla}
          onClose={() => setSelectedPlantilla(null)}
        />
      )}

      {/* Botón flotante Nueva Plantilla */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNewDietModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-green-500/50 transition-all duration-300 z-50 group"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      {/* MODAL NUEVA DIETA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        onClick={() => setShowNewDietModal(false)}
        style={{ display: showNewDietModal ? 'flex' : 'none' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header del modal */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Nueva Plantilla de Dieta</h2>
                <p className="text-green-100 text-sm mt-1">
                  Crea una nueva plantilla nutricional personalizada
                </p>
              </div>
              <button
                onClick={() => setShowNewDietModal(false)}
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
                  placeholder="Ej: Dieta Keto para Principiantes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Objetivo *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Seleccionar objetivo</option>
                  <option value="perdida_peso">Pérdida de Peso</option>
                  <option value="ganancia_muscular">Ganancia Muscular</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="definicion">Definición</option>
                  <option value="volumen_limpio">Volumen Limpio</option>
                  <option value="rendimiento">Rendimiento</option>
                  <option value="salud_general">Salud General</option>
                  <option value="recomposicion">Recomposición</option>
                </select>
              </div>

              {/* Tipo de dieta */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Dieta *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Seleccionar tipo</option>
                  <option value="mediterranea">Mediterránea</option>
                  <option value="keto">Keto</option>
                  <option value="vegana">Vegana</option>
                  <option value="vegetariana">Vegetariana</option>
                  <option value="paleo">Paleo</option>
                  <option value="flexible">Flexible</option>
                  <option value="intermitente">Ayuno Intermitente</option>
                  <option value="baja_carbos">Baja en Carbohidratos</option>
                  <option value="alta_proteina">Alta en Proteína</option>
                </select>
              </div>

              {/* Nivel de tiempo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nivel de Tiempo *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Seleccionar nivel</option>
                  <option value="quick">Rápido (15-30 min)</option>
                  <option value="advanced">Avanzado (30-60 min)</option>
                  <option value="no_cook">Sin Cocinar</option>
                </select>
              </div>

              {/* Experiencia culinaria */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experiencia Culinaria *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Seleccionar nivel</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="expert">Experto</option>
                </select>
              </div>

              {/* Calorías */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calorías Diarias *
                </label>
                <input
                  type="number"
                  placeholder="Ej: 2000"
                  min="800"
                  max="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Duración en semanas */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duración (semanas)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 8"
                  min="1"
                  max="52"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Proteína */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Proteína (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 120"
                  min="0"
                  max="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Carbohidratos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Carbohidratos (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 200"
                  min="0"
                  max="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Grasas */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grasas (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 80"
                  min="0"
                  max="300"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Visibilidad */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Visibilidad
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="privada">Privada (solo tú)</option>
                  <option value="publica">Pública (todos los usuarios)</option>
                  <option value="equipo">Solo mi equipo</option>
                </select>
              </div>
            </div>

            {/* Restricciones */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Restricciones Alimentarias (opcional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sin gluten', 'Sin lácteos', 'Sin azúcar', 'Baja en sodio', 'Sin frutos secos', 'Sin soja'].map((restriction) => (
                  <label key={restriction} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowNewDietModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aquí iría la lógica para crear la plantilla
                  console.log('Crear nueva plantilla de dieta');
                  setShowNewDietModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Crear Plantilla
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlantillasDietasPage;
