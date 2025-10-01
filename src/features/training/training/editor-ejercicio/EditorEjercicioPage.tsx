import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Copy,
  X,
  Eye,
  History,
  ChevronRight,
  Star,
  Upload,
  Trash2,
  Plus,
  GripVertical,
  Monitor,
  Smartphone,
  AlertCircle,
  Check,
  Clock,
  Users,
  TrendingUp,
  Edit3,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Settings,
  Target,
  Dumbbell,
  Activity,
  Info,
} from 'lucide-react';

// Types
interface Ejercicio {
  id: string;
  nombre: string;
  nombreAlternativo?: string;
  descripcion: string;
  grupoMuscular: string;
  musculosSecundarios: string[];
  tipoMovimiento: string;
  dificultad: number;
  equipamiento: string[];
  equipamientoAlternativo?: string[];
  instrucciones: string[];
  tips: string;
  erroresComunes: string[];
  precauciones: string;
  imagenes: Array<{ id: string; url: string; esPrincipal: boolean }>;
  videoUrl?: string;
  variaciones: Array<{ nombre: string; descripcion: string; dificultad: number }>;
  alternativas: string[];
  progresiones: string[];
  regresiones: string[];
  tags: string[];
  categorias: string[];
  esFavorito: boolean;
  estado: 'activo' | 'inactivo' | 'borrador';
  visibilidad: 'publico' | 'privado';
  notasPrivadas: string;
  fechaCreacion: string;
  ultimaModificacion: string;
  version: number;
}

interface VersionHistorial {
  id: string;
  version: number;
  fecha: string;
  usuario: string;
  cambios: string;
  esCambioMayor: boolean;
}

interface EjercicioStats {
  vecesUsado: number;
  clientesQueLoUsan: number;
  entrenamientosActivos: number;
  primeraVezUsado: string;
  ultimaVezUsado: string;
  ratingPromedio: number;
}

const EditorEjercicioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('basico');
  const [ejercicio, setEjercicio] = useState<Ejercicio>(mockEjercicio);
  const [originalEjercicio] = useState<Ejercicio>(mockEjercicio);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showHistorial, setShowHistorial] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (hasChanges) {
        console.log('Auto-guardando borrador...');
        setLastSaved(new Date());
      }
    }, 30000);
    return () => clearInterval(autoSave);
  }, [hasChanges]);

  // Detect changes
  useEffect(() => {
    const changed = JSON.stringify(ejercicio) !== JSON.stringify(originalEjercicio);
    setHasChanges(changed);
  }, [ejercicio, originalEjercicio]);

  const handleSave = async (notaVersion: string, esCambioMayor: boolean) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Guardando cambios...', { notaVersion, esCambioMayor });
    setIsSaving(false);
    setShowSaveModal(false);
    setHasChanges(false);
    setLastSaved(new Date());
  };

  const handleSaveAsNew = () => {
    console.log('Guardar como nuevo ejercicio');
  };

  const handleDiscard = () => {
    if (confirm('¿Descartar todos los cambios?')) {
      setEjercicio(originalEjercicio);
      setHasChanges(false);
    }
  };

  const completionPercentage = calculateCompletion(ejercicio);
  const warnings = getWarnings(ejercicio);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* HERO SECTION - Editor */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-b-3xl shadow-2xl mb-8"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 py-8 md:py-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-emerald-100 mb-4">
            <span className="hover:text-white cursor-pointer transition-colors">Biblioteca</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">{ejercicio.id ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}</span>
          </div>

          <div className="flex items-center justify-between gap-6 flex-wrap">
            {/* Title & Icon */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-yellow-300 rounded-2xl blur-lg opacity-30"></div>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                  {ejercicio.id ? 'Editar' : 'Crear'} <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejercicio</span>
                </h1>
                <p className="text-lg text-emerald-100">
                  {ejercicio.nombre || 'Nuevo ejercicio de entrenamiento'}
                </p>
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="flex items-center gap-3">
              {isSaving ? (
                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-semibold text-white">Guardando...</span>
                </div>
              ) : hasChanges ? (
                <div className="px-4 py-2 bg-orange-500/90 backdrop-blur-md rounded-full border border-orange-400/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">Cambios sin guardar</span>
                </div>
              ) : (
                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">Guardado {formatTimeAgo(lastSaved)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-white/90 mb-2">
              <span className="font-semibold">Progreso de completitud</span>
              <span className="font-bold text-lg">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistorial(true)}
              className="px-4 py-2 bg-white/80 backdrop-blur-xl hover:bg-white border border-gray-200 hover:border-emerald-300 text-slate-700 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Historial</span>
            </button>
            <button
              onClick={() => setShowCompareMode(!showCompareMode)}
              className="px-4 py-2 bg-white/80 backdrop-blur-xl hover:bg-white border border-gray-200 hover:border-emerald-300 text-slate-700 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{showCompareMode ? 'Ocultar' : 'Comparar'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscard}
              disabled={!hasChanges}
              className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Cancelar</span>
            </button>
            <button
              onClick={handleSaveAsNew}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Guardar y Crear Otro</span>
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              disabled={!hasChanges}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Save className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Guardar</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Editor */}
          <div className="flex-1 min-w-0">
            {/* Main Card with Glassmorphism */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
              {/* Decoración de fondo */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

              {/* Tabs */}
              <div className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-emerald-50/30 backdrop-blur-sm">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-all duration-300 border-b-3 relative ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600 bg-white/80 font-semibold'
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/40'
                      }`}
                    >
                      <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-600' : ''}`} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'basico' && (
                      <TabBasico ejercicio={ejercicio} setEjercicio={setEjercicio} />
                    )}
                    {activeTab === 'equipamiento' && (
                      <TabEquipamiento ejercicio={ejercicio} setEjercicio={setEjercicio} />
                    )}
                    {activeTab === 'multimedia' && (
                      <TabMultimedia ejercicio={ejercicio} setEjercicio={setEjercicio} />
                    )}
                    {activeTab === 'variaciones' && (
                      <TabVariaciones ejercicio={ejercicio} setEjercicio={setEjercicio} />
                    )}
                    {activeTab === 'avanzado' && (
                      <TabAvanzado ejercicio={ejercicio} setEjercicio={setEjercicio} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Warnings - Redesigned */}
            {warnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                      Advertencias de Validación
                      <span className="px-2 py-0.5 bg-orange-200 text-orange-800 text-xs rounded-full font-bold">
                        {warnings.length}
                      </span>
                    </h3>
                    <ul className="space-y-2">
                      {warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-orange-700">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Preview & Stats */}
          <div className="lg:w-96 space-y-6">
            {/* Preview - Redesigned */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 sticky top-6"
            >
              <div className="p-5 border-b border-slate-200/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    Vista Previa en Vivo
                  </h3>
                  <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() => setIsPreviewMode('desktop')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isPreviewMode === 'desktop'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsPreviewMode('mobile')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isPreviewMode === 'mobile'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Actualización en tiempo real</p>
              </div>

              <div className={`p-5 ${isPreviewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
                <PreviewCard ejercicio={ejercicio} />
              </div>
            </motion.div>

            {/* Stats - Redesigned */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
              >
                <div className="p-5 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-b border-slate-200/50">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Estadísticas de Uso
                  </h3>
                </div>
                <StatsPanel />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showSaveModal && (
          <SaveModal
            onClose={() => setShowSaveModal(false)}
            onSave={handleSave}
            isSaving={isSaving}
          />
        )}
        {showHistorial && (
          <HistorialModal onClose={() => setShowHistorial(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Tab Components
const TabBasico: React.FC<{
  ejercicio: Ejercicio;
  setEjercicio: (e: Ejercicio) => void;
}> = ({ ejercicio, setEjercicio }) => (
  <div className="space-y-8">
    {/* Nombre del Ejercicio */}
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs">REQUERIDO</span>
        Nombre del Ejercicio
      </label>
      <input
        type="text"
        value={ejercicio.nombre}
        onChange={(e) => setEjercicio({ ...ejercicio, nombre: e.target.value })}
        className="w-full px-6 py-4 text-lg font-semibold border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white hover:border-emerald-300"
        placeholder="Ej: Press de banca con barra"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nombre Alternativo */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          Nombre Alternativo
        </label>
        <input
          type="text"
          value={ejercicio.nombreAlternativo || ''}
          onChange={(e) => setEjercicio({ ...ejercicio, nombreAlternativo: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white"
          placeholder="Ej: Bench press"
        />
      </div>

      {/* Dificultad */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nivel de Dificultad *
        </label>
        <div className="flex items-center gap-2 bg-slate-50 rounded-2xl p-3 border-2 border-slate-200">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setEjercicio({ ...ejercicio, dificultad: level })}
              className="transition-transform hover:scale-125 active:scale-95"
            >
              <Star
                className={`w-7 h-7 transition-all ${
                  level <= ejercicio.dificultad
                    ? 'fill-yellow-400 text-yellow-400 drop-shadow-md'
                    : 'text-slate-300 hover:text-slate-400'
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-bold text-slate-700 px-3 py-1 bg-white rounded-full">
            {['Muy Fácil', 'Fácil', 'Intermedio', 'Difícil', 'Muy Difícil'][ejercicio.dificultad - 1]}
          </span>
        </div>
      </div>
    </div>

    {/* Descripción */}
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs">REQUERIDO</span>
        Descripción Detallada
      </label>
      <textarea
        value={ejercicio.descripcion}
        onChange={(e) => setEjercicio({ ...ejercicio, descripcion: e.target.value })}
        rows={5}
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white resize-none"
        placeholder="Describe el ejercicio en detalle, incluyendo su propósito y beneficios..."
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-slate-500">Mínimo 50 caracteres recomendados</span>
        <span className={`text-xs font-semibold ${ejercicio.descripcion.length >= 50 ? 'text-emerald-600' : 'text-slate-500'}`}>
          {ejercicio.descripcion.length} caracteres
        </span>
      </div>
    </div>

    {/* Categorías */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" />
          Grupo Muscular Principal *
        </label>
        <select
          value={ejercicio.grupoMuscular}
          onChange={(e) => setEjercicio({ ...ejercicio, grupoMuscular: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold appearance-none cursor-pointer"
        >
          <option>Pecho</option>
          <option>Espalda</option>
          <option>Hombros</option>
          <option>Bíceps</option>
          <option>Tríceps</option>
          <option>Piernas</option>
          <option>Core</option>
          <option>Glúteos</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          Tipo de Movimiento
        </label>
        <select
          value={ejercicio.tipoMovimiento}
          onChange={(e) => setEjercicio({ ...ejercicio, tipoMovimiento: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold appearance-none cursor-pointer"
        >
          <option>Empuje</option>
          <option>Tracción</option>
          <option>Aislamiento</option>
          <option>Compuesto</option>
          <option>Isométrico</option>
        </select>
      </div>
    </div>

    {/* Músculos Secundarios */}
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 text-emerald-600" />
        Músculos Secundarios Involucrados
      </label>
      <div className="flex flex-wrap gap-3">
        {['Tríceps', 'Hombros', 'Core', 'Antebrazos', 'Serratos', 'Dorsales', 'Trapecio', 'Cuádriceps'].map((musculo) => {
          const isSelected = ejercicio.musculosSecundarios.includes(musculo);
          return (
            <motion.button
              key={musculo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newMusculos = isSelected
                  ? ejercicio.musculosSecundarios.filter((m) => m !== musculo)
                  : [...ejercicio.musculosSecundarios, musculo];
                setEjercicio({ ...ejercicio, musculosSecundarios: newMusculos });
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {musculo}
              {isSelected && <Check className="inline-block w-4 h-4 ml-1" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  </div>
);

const TabEquipamiento: React.FC<{
  ejercicio: Ejercicio;
  setEjercicio: (e: Ejercicio) => void;
}> = ({ ejercicio, setEjercicio }) => {
  const [newStep, setNewStep] = useState('');

  const addStep = () => {
    if (newStep.trim()) {
      setEjercicio({
        ...ejercicio,
        instrucciones: [...ejercicio.instrucciones, newStep.trim()],
      });
      setNewStep('');
    }
  };

  const removeStep = (index: number) => {
    setEjercicio({
      ...ejercicio,
      instrucciones: ejercicio.instrucciones.filter((_, i) => i !== index),
    });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newInstrucciones = [...ejercicio.instrucciones];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newInstrucciones[index], newInstrucciones[targetIndex]] = [
      newInstrucciones[targetIndex],
      newInstrucciones[index],
    ];
    setEjercicio({ ...ejercicio, instrucciones: newInstrucciones });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Equipamiento Necesario *
        </label>
        <div className="flex flex-wrap gap-2">
          {['Barra', 'Mancuernas', 'Banco', 'Máquina', 'Poleas', 'Bandas', 'Peso corporal', 'Kettlebell'].map(
            (equip) => {
              const isSelected = ejercicio.equipamiento.includes(equip);
              return (
                <button
                  key={equip}
                  onClick={() => {
                    const newEquip = isSelected
                      ? ejercicio.equipamiento.filter((e) => e !== equip)
                      : [...ejercicio.equipamiento, equip];
                    setEjercicio({ ...ejercicio, equipamiento: newEquip });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Dumbbell className="w-4 h-4" />
                  {equip}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Instrucciones Paso a Paso *
        </label>
        <div className="space-y-2 mb-3">
          {ejercicio.instrucciones.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg group"
            >
              <div className="flex flex-col gap-1 mt-1">
                <button
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm text-slate-700">{step}</p>
                </div>
              </div>
              <button
                onClick={() => removeStep(index)}
                className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addStep()}
            placeholder="Agregar nuevo paso..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addStep}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Tips y Consejos
        </label>
        <textarea
          value={ejercicio.tips}
          onChange={(e) => setEjercicio({ ...ejercicio, tips: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Consejos para mejorar la ejecución..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Errores Comunes
        </label>
        <div className="space-y-2">
          {ejercicio.erroresComunes.map((error, index) => (
            <div key={index} className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="flex-1 text-sm text-slate-700">{error}</span>
              <button
                onClick={() => {
                  setEjercicio({
                    ...ejercicio,
                    erroresComunes: ejercicio.erroresComunes.filter((_, i) => i !== index),
                  });
                }}
                className="text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Precauciones y Contraindicaciones
        </label>
        <textarea
          value={ejercicio.precauciones}
          onChange={(e) => setEjercicio({ ...ejercicio, precauciones: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Advertencias y precauciones importantes..."
        />
      </div>
    </div>
  );
};

const TabMultimedia: React.FC<{
  ejercicio: Ejercicio;
  setEjercicio: (e: Ejercicio) => void;
}> = ({ ejercicio, setEjercicio }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Galería de Imágenes
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {ejercicio.imagenes.map((img) => (
            <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-100">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {img.esPrincipal && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                  Principal
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                  <Star className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
          <button className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600">
            <Upload className="w-6 h-6" />
            <span className="text-sm">Subir imagen</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Video URL
        </label>
        <input
          type="url"
          value={ejercicio.videoUrl || ''}
          onChange={(e) => setEjercicio({ ...ejercicio, videoUrl: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://youtube.com/..."
        />
        {ejercicio.videoUrl && (
          <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-slate-900">
            <div className="w-full h-full flex items-center justify-center text-white">
              <VideoIcon className="w-12 h-12" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabVariaciones: React.FC<{
  ejercicio: Ejercicio;
  setEjercicio: (e: Ejercicio) => void;
}> = ({ ejercicio, setEjercicio }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Variaciones
        </label>
        <div className="space-y-3 mb-3">
          {ejercicio.variaciones.map((variacion, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900">{variacion.nombre}</h4>
                <button className="text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-2">{variacion.descripcion}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Dificultad:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Star
                      key={level}
                      className={`w-4 h-4 ${
                        level <= variacion.dificultad
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full px-4 py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600">
          <Plus className="w-4 h-4" />
          Agregar Variación
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Progresiones (de fácil a difícil)
        </label>
        <div className="space-y-2">
          {ejercicio.progresiones.map((prog, index) => (
            <div key={index} className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="flex-1 text-sm text-slate-700">{prog}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Regresiones (simplificaciones)
        </label>
        <div className="space-y-2">
          {ejercicio.regresiones.map((reg, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="flex-1 text-sm text-slate-700">{reg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TabAvanzado: React.FC<{
  ejercicio: Ejercicio;
  setEjercicio: (e: Ejercicio) => void;
}> = ({ ejercicio, setEjercicio }) => {
  const [newTag, setNewTag] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Tags Personalizados
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {ejercicio.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => {
                  setEjercicio({
                    ...ejercicio,
                    tags: ejercicio.tags.filter((_, i) => i !== index),
                  });
                }}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newTag.trim()) {
                setEjercicio({ ...ejercicio, tags: [...ejercicio.tags, newTag.trim()] });
                setNewTag('');
              }
            }}
            placeholder="Agregar tag..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Estado
          </label>
          <select
            value={ejercicio.estado}
            onChange={(e) =>
              setEjercicio({
                ...ejercicio,
                estado: e.target.value as 'activo' | 'inactivo' | 'borrador',
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Visibilidad
          </label>
          <select
            value={ejercicio.visibilidad}
            onChange={(e) =>
              setEjercicio({
                ...ejercicio,
                visibilidad: e.target.value as 'publico' | 'privado',
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ejercicio.esFavorito}
            onChange={(e) => setEjercicio({ ...ejercicio, esFavorito: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-slate-700">Marcar como favorito</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Notas Privadas del Entrenador
        </label>
        <textarea
          value={ejercicio.notasPrivadas}
          onChange={(e) => setEjercicio({ ...ejercicio, notasPrivadas: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Notas privadas visibles solo para ti..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Fecha de Creación
          </label>
          <div className="text-sm text-slate-700">{new Date(ejercicio.fechaCreacion).toLocaleDateString()}</div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Última Modificación
          </label>
          <div className="text-sm text-slate-700">{new Date(ejercicio.ultimaModificacion).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

// Preview Card Component
const PreviewCard: React.FC<{ ejercicio: Ejercicio }> = ({ ejercicio }) => {
  const [showInstrucciones, setShowInstrucciones] = useState(false);

  return (
    <div className="space-y-4">
      {/* Image */}
      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        {ejercicio.imagenes[0] ? (
          <img src={ejercicio.imagenes[0].url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{ejercicio.nombre}</h3>
        {ejercicio.nombreAlternativo && (
          <p className="text-sm text-slate-500 mb-2">{ejercicio.nombreAlternativo}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {ejercicio.grupoMuscular}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            {ejercicio.tipoMovimiento}
          </span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {ejercicio.dificultad}/5
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-3 line-clamp-3">{ejercicio.descripcion}</p>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span>{ejercicio.equipamiento.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{ejercicio.musculosSecundarios.join(', ')}</span>
          </div>
        </div>

        <button
          onClick={() => setShowInstrucciones(!showInstrucciones)}
          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
        >
          {showInstrucciones ? 'Ocultar' : 'Ver'} instrucciones
          <ChevronRight
            className={`w-4 h-4 transition-transform ${showInstrucciones ? 'rotate-90' : ''}`}
          />
        </button>

        <AnimatePresence>
          {showInstrucciones && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              {ejercicio.instrucciones.map((step, index) => (
                <div key={index} className="flex gap-2 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Stats Panel Component
const StatsPanel: React.FC = () => {
  const stats = mockStats;

  return (
    <div className="p-4">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Estadísticas de Uso
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Veces usado</span>
          <span className="font-semibold text-slate-900">{stats.vecesUsado}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 flex items-center gap-1">
            <Users className="w-4 h-4" />
            Clientes
          </span>
          <span className="font-semibold text-slate-900">{stats.clientesQueLoUsan}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Entrenamientos activos</span>
          <span className="font-semibold text-slate-900">{stats.entrenamientosActivos}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Rating promedio
          </span>
          <span className="font-semibold text-slate-900">{stats.ratingPromedio}/5</span>
        </div>
        <div className="pt-3 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            <div>Primera vez: {new Date(stats.primeraVezUsado).toLocaleDateString()}</div>
            <div>Última vez: {new Date(stats.ultimaVezUsado).toLocaleDateString()}</div>
          </div>
        </div>
        <button className="w-full mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm">
          Ver entrenamientos que lo usan
        </button>
      </div>
    </div>
  );
};

// Save Modal Component
const SaveModal: React.FC<{
  onClose: () => void;
  onSave: (nota: string, esCambioMayor: boolean) => void;
  isSaving: boolean;
}> = ({ onClose, onSave, isSaving }) => {
  const [nota, setNota] = useState('');
  const [esCambioMayor, setEsCambioMayor] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Guardar Cambios</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Describe los cambios realizados
            </label>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Actualicé las instrucciones y agregué nuevas imágenes..."
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={esCambioMayor}
              onChange={(e) => setEsCambioMayor(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">
              Cambio mayor <span className="text-slate-500">(incrementa versión)</span>
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(nota, esCambioMayor)}
              disabled={isSaving || !nota.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Historial Modal Component
const HistorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Historial de Cambios</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {mockHistorial.map((version) => (
              <div key={version.id} className="relative pl-8 pb-8 border-l-2 border-slate-200 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[9px]" />
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">Versión {version.version}</span>
                        {version.esCambioMayor && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                            Mayor
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-600">{version.usuario}</div>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(version.fecha).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{version.cambios}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded text-sm border border-slate-200">
                      Ver detalles
                    </button>
                    <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm">
                      Restaurar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Utility Functions
const calculateCompletion = (ejercicio: Ejercicio): number => {
  let completed = 0;
  const total = 10;

  if (ejercicio.nombre) completed++;
  if (ejercicio.descripcion && ejercicio.descripcion.length > 50) completed++;
  if (ejercicio.grupoMuscular) completed++;
  if (ejercicio.musculosSecundarios.length > 0) completed++;
  if (ejercicio.dificultad > 0) completed++;
  if (ejercicio.equipamiento.length > 0) completed++;
  if (ejercicio.instrucciones.length >= 3) completed++;
  if (ejercicio.imagenes.length > 0) completed++;
  if (ejercicio.variaciones.length > 0) completed++;
  if (ejercicio.tags.length > 0) completed++;

  return Math.round((completed / total) * 100);
};

const getWarnings = (ejercicio: Ejercicio): string[] => {
  const warnings: string[] = [];

  if (!ejercicio.descripcion || ejercicio.descripcion.length < 50) {
    warnings.push('Falta descripción detallada');
  }
  if (ejercicio.imagenes.length === 0) {
    warnings.push('No hay imágenes');
  }
  if (ejercicio.instrucciones.length < 3) {
    warnings.push('Faltan instrucciones paso a paso');
  }
  if (!ejercicio.videoUrl) {
    warnings.push('No hay video de demostración');
  }
  if (ejercicio.variaciones.length === 0) {
    warnings.push('Considera agregar variaciones');
  }

  return warnings;
};

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'ahora';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `hace ${hours}h`;
};

// Constants
const tabs = [
  { id: 'basico', label: 'Información Básica', icon: FileText },
  { id: 'equipamiento', label: 'Equipamiento y Ejecución', icon: Dumbbell },
  { id: 'multimedia', label: 'Multimedia', icon: ImageIcon },
  { id: 'variaciones', label: 'Variaciones', icon: Activity },
  { id: 'avanzado', label: 'Configuración Avanzada', icon: Settings },
];

// Mock Data
const mockEjercicio: Ejercicio = {
  id: '1',
  nombre: 'Press de Banca con Barra',
  nombreAlternativo: 'Bench Press',
  descripcion:
    'El press de banca es un ejercicio fundamental para el desarrollo del pecho, trabajando también los tríceps y hombros anteriores. Es uno de los ejercicios más populares en el entrenamiento de fuerza.',
  grupoMuscular: 'Pecho',
  musculosSecundarios: ['Tríceps', 'Hombros', 'Core'],
  tipoMovimiento: 'Empuje',
  dificultad: 3,
  equipamiento: ['Barra', 'Banco', 'Discos'],
  equipamientoAlternativo: ['Mancuernas', 'Máquina de press'],
  instrucciones: [
    'Acuéstate en el banco con los pies firmemente apoyados en el suelo',
    'Agarra la barra con las manos ligeramente más anchas que el ancho de hombros',
    'Desciende la barra de forma controlada hacia el pecho',
    'Empuja la barra hacia arriba hasta la extensión completa de los brazos',
  ],
  tips: 'Mantén los omóplatos retraídos y el pecho hacia afuera durante todo el movimiento. Respira correctamente: inhala al descender, exhala al empujar.',
  erroresComunes: [
    'Arquear demasiado la espalda baja',
    'Rebotar la barra en el pecho',
    'No bajar la barra hasta el pecho',
    'Levantar los glúteos del banco',
  ],
  precauciones:
    'No recomendado para personas con lesiones de hombro o pecho. Siempre usa un spotter cuando trabajes con pesos pesados.',
  imagenes: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
      esPrincipal: true,
    },
    { id: '2', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', esPrincipal: false },
  ],
  videoUrl: 'https://youtube.com/watch?v=example',
  variaciones: [
    {
      nombre: 'Press de banca inclinado',
      descripcion: 'Variación con el banco inclinado para enfatizar pecho superior',
      dificultad: 3,
    },
    {
      nombre: 'Press de banca declinado',
      descripcion: 'Variación con el banco declinado para enfatizar pecho inferior',
      dificultad: 3,
    },
  ],
  alternativas: ['Press con mancuernas', 'Fondos en paralelas', 'Press en máquina'],
  progresiones: ['Push-ups', 'Press con barra vacía', 'Press con peso ligero', 'Press de banca estándar'],
  regresiones: ['Push-ups en pared', 'Push-ups de rodillas', 'Press con barra vacía'],
  tags: ['pecho', 'fuerza', 'hipertrofia', 'compuesto'],
  categorias: ['Empuje superior', 'Básico'],
  esFavorito: true,
  estado: 'activo',
  visibilidad: 'publico',
  notasPrivadas: 'Mis clientes principiantes deben comenzar con la barra vacía.',
  fechaCreacion: '2024-01-15',
  ultimaModificacion: '2024-09-28',
  version: 3,
};

const mockHistorial: VersionHistorial[] = [
  {
    id: '3',
    version: 3,
    fecha: '2024-09-28T10:30:00',
    usuario: 'Juan Pérez',
    cambios: 'Actualicé las imágenes y agregué nuevas variaciones',
    esCambioMayor: false,
  },
  {
    id: '2',
    version: 2,
    fecha: '2024-08-15T14:20:00',
    usuario: 'Juan Pérez',
    cambios: 'Mejoré las instrucciones paso a paso y agregué más errores comunes',
    esCambioMayor: true,
  },
  {
    id: '1',
    version: 1,
    fecha: '2024-01-15T09:00:00',
    usuario: 'Juan Pérez',
    cambios: 'Creación inicial del ejercicio',
    esCambioMayor: true,
  },
];

const mockStats: EjercicioStats = {
  vecesUsado: 127,
  clientesQueLoUsan: 34,
  entrenamientosActivos: 12,
  primeraVezUsado: '2024-01-20',
  ultimaVezUsado: '2024-09-29',
  ratingPromedio: 4.7,
};

export default EditorEjercicioPage;