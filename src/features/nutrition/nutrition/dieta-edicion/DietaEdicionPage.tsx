import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Paintbrush, Shuffle, ChefHat, BarChart3, Calendar, StickyNote, Search, X } from 'lucide-react';
import { HeaderBar } from './components/HeaderBar';
import { CatalogoPanel } from './components/CatalogoPanel';
import { GridSemana } from './components/GridSemana';
import { TotalesPanel } from './components/TotalesPanel';
import { BatchCookingModal } from './components/BatchCookingModal';
import { PlantillasInteligentesModal } from './components/PlantillasInteligentesModal';
import { MacroBrushModal } from './components/MacroBrushModal';
import { DragDropProvider } from './components/DragDropProvider';
import { VisualRecipeGallery } from './components/VisualRecipeGallery';
import { MetricsDashboard, useMetricsData } from './components/MetricsDashboard';
import { CalendarView } from './components/CalendarView';
import { NotesSystem } from './components/NotesSystem';
import { SmartSearch } from './components/SmartSearch';
import { 
  ConfettiEffect, 
  Toast, 
  InteractiveButton, 
  FloatingActionButton,
  useToast 
} from './components/MicroInteractions';
import { getDieta } from '../dietas-listado/dietasListadoApi';
import {
  ClienteDieta,
  EstadoLiveSync,
  ObjetivosDieta,
  Macros,
  AlertaLinter,
  Receta,
  Comida,
  AccionHistorial,
  SesionBatch
} from './types';

export const DietaEdicionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados principales
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState<ClienteDieta | null>(null);
  const [semanaActual, setSemanaActual] = useState(1);
  const [batchModeActive, setBatchModeActive] = useState(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | undefined>();
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showPlantillasModal, setShowPlantillasModal] = useState(false);
  const [showMacroBrushModal, setShowMacroBrushModal] = useState(false);
  const [showMetricsDashboard, setShowMetricsDashboard] = useState(false);
  const [showVisualGallery, setShowVisualGallery] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [showNotesSystem, setShowNotesSystem] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [notasCoach, setNotasCoach] = useState('');
  
  // Micro-interacciones
  const { toasts, addToast, removeToast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const metricsData = useMetricsData();

  // Estado de auto-guardado y live sync
  const [liveSyncState, setLiveSyncState] = useState<EstadoLiveSync>({
    estado: 'guardado',
    visibleEnApp: true
  });

  // Historial para undo/redo
  const [historial, setHistorial] = useState<AccionHistorial[]>([]);
  const [historialIndex, setHistorialIndex] = useState(-1);

  // Objetivos
  const [objetivos, setObjetivos] = useState<ObjetivosDieta>({
    calorias: 2000,
    proteinas: 150,
    carbohidratos: 200,
    grasas: 70,
    fibra: 30,
    presupuesto: 25,
    tiempoMaximo: 120
  });

  const [totalesDia, setTotalesDia] = useState<Macros>({
    calorias: 1850,
    proteinas: 145,
    carbohidratos: 185,
    grasas: 65,
    fibra: 28,
    azucar: 35,
    sal: 4.2
  });

  const [totalesSemana, setTotalesSemana] = useState<Macros>({
    calorias: 14000,
    proteinas: 1050,
    carbohidratos: 1400,
    grasas: 490,
    fibra: 210,
    azucar: 280,
    sal: 32
  });

  // Alertas del linter
  const [alertas, setAlertas] = useState<AlertaLinter[]>([
    {
      id: '1',
      tipo: 'fibra_baja',
      severidad: 'warn',
      mensaje: 'Fibra baja en el día de hoy',
      diaComida: { dia: 0, comida: 'comida' },
      fix: {
        label: 'Añadir verduras',
        action: () => console.log('Fix fibra')
      }
    }
  ]);

  // Fechas de la semana actual
  const getFechas = () => {
    const inicio = new Date();
    inicio.setDate(inicio.getDate() + (semanaActual - 1) * 7);
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 6);
    return {
      inicio: inicio.toISOString(),
      fin: fin.toISOString()
    };
  };

  const { inicio: fechaInicio, fin: fechaFin } = getFechas();

  // Cargar dieta inicial
  useEffect(() => {
    const loadDieta = async () => {
      if (!id) return;

      try {
        const data = await getDieta(id);
        if (data) {
          setCliente({
            id: id,
            nombre: data.cliente.nombre,
            avatar: data.cliente.avatar,
            restricciones: data.restricciones || [],
            alergenos: [],
            preferencias: []
          });

          setObjetivos({
            calorias: data.calorias.objetivo,
            proteinas: data.macros.proteinas.objetivo,
            carbohidratos: data.macros.carbohidratos.objetivo,
            grasas: data.macros.grasas.objetivo,
            fibra: 30,
            presupuesto: 25,
            tiempoMaximo: 120
          });
        }
      } catch (error) {
        console.error('Error al cargar dieta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDieta();
  }, [id]);

  // Auto-save con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (historialIndex >= 0) {
        setLiveSyncState({ estado: 'guardando', visibleEnApp: false });

        // Simular guardado
        setTimeout(() => {
          setLiveSyncState({
            estado: 'guardado',
            visibleEnApp: true,
            ultimoCambio: new Date()
          });
        }, 800);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [historialIndex]);

  // Handlers
  const handleUndo = () => {
    if (historialIndex > 0) {
      const accion = historial[historialIndex];
      accion.deshacer();
      setHistorialIndex(historialIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historialIndex < historial.length - 1) {
      const accion = historial[historialIndex + 1];
      accion.rehacer();
      setHistorialIndex(historialIndex + 1);
    }
  };

  const handleDuplicateWeek = () => {
    console.log('Duplicar semana');
    // Lógica para duplicar la semana actual
  };

  const handleBatchToggle = () => {
    setBatchModeActive(!batchModeActive);
  };

  const handlePrevWeek = () => {
    setSemanaActual(Math.max(1, semanaActual - 1));
  };

  const handleNextWeek = () => {
    setSemanaActual(semanaActual + 1);
  };

  const handleGoToToday = () => {
    setSemanaActual(1); // Volver a la semana actual
  };

  // Funciones para drag & drop
  const handleRecipeMove = useCallback((recipeId: string, fromSlot: string, toSlot: string) => {
    console.log('Moving recipe:', recipeId, 'from', fromSlot, 'to', toSlot);
    addToast('success', 'Receta movida exitosamente');
  }, [addToast]);

  const handleRecipeAdd = useCallback((recipe: Receta, toSlot: string) => {
    console.log('Adding recipe:', recipe.nombre, 'to', toSlot);
    addToast('success', `Receta "${recipe.nombre}" añadida`);
    setShowConfetti(true);
  }, [addToast]);

  // Funciones para micro-interacciones
  const handleSuccessAction = useCallback(() => {
    addToast('success', '¡Acción completada exitosamente!');
    setShowConfetti(true);
  }, [addToast]);

  const handleErrorAction = useCallback(() => {
    addToast('error', 'Hubo un error al procesar la acción');
  }, [addToast]);

  const handleRecetaSelect = (receta: Receta) => {
    setRecetaSeleccionada(receta);
  };

  const handleAlimentoSelect = (alimento: any) => {
    console.log('Alimento seleccionado:', alimento);
  };

  const handleSlotClick = (dia: number, comida: Comida) => {
    console.log('Slot clicked:', dia, comida);
  };

  const handleRecetaAdd = (dia: number, comida: Comida, receta: Receta) => {
    console.log('Añadir receta:', receta.nombre, 'a', dia, comida);
    // Aquí iría la lógica para añadir la receta al slot
    setRecetaSeleccionada(undefined);
  };

  const handleRecetaEdit = (slotId: string) => {
    console.log('Editar slot:', slotId);
  };

  const handleRecetaDelete = (slotId: string) => {
    console.log('Eliminar slot:', slotId);
  };

  const handleFixAlerta = (alerta: AlertaLinter) => {
    if (alerta.fix) {
      alerta.fix.action();
    }
  };

  const handleSugerirRecorte = (tipo: 'coste' | 'tiempo') => {
    console.log('Sugerir recorte de:', tipo);
    // Lógica para sugerir recetas más económicas o rápidas
  };

  const handleBatchConfirm = (sesion: SesionBatch, distribuciones: any[]) => {
    console.log('Sesión batch confirmada:', sesion, distribuciones);
    setShowBatchModal(false);
  };

  // Mock: recetas disponibles para batch cooking
  const recetasDisponibles: Receta[] = [
    {
      id: '1',
      nombre: 'Pollo al horno con verduras',
      imagen: '',
      macros: { calorias: 420, proteinas: 35, carbohidratos: 25, grasas: 18 },
      tiempo: 45,
      coste: 6.5,
      alergenos: [],
      saciedad: 4,
      sabor: ['salado'],
      textura: ['jugoso'],
      equipo: ['horno'],
      batchFriendly: true,
      congelable: true,
      requiereFrio: false,
      ingredientes: []
    },
    {
      id: '2',
      nombre: 'Guiso de lentejas',
      imagen: '',
      macros: { calorias: 380, proteinas: 22, carbohidratos: 55, grasas: 8 },
      tiempo: 60,
      coste: 4.0,
      alergenos: [],
      saciedad: 5,
      sabor: ['salado'],
      textura: ['cremoso'],
      equipo: ['horno'],
      batchFriendly: true,
      congelable: true,
      requiereFrio: false,
      ingredientes: []
    }
  ];

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
        } else if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
        } else if (e.key === 'b') {
          e.preventDefault();
          // Abrir pincel de macros
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historialIndex, historial]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-lime-500 border-t-transparent"
          />
          <p className="text-lg font-semibold text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">No se pudo cargar la dieta</p>
          <button
            onClick={() => navigate('/dashboard/nutrition/dietas-listado')}
            className="px-6 py-3 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <DragDropProvider
      onRecipeMove={handleRecipeMove}
      onRecipeAdd={handleRecipeAdd}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header con acciones principales */}
        <HeaderBar
          cliente={cliente}
          semanaActual={semanaActual}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          onOpenPlantillas={() => setShowPlantillasModal(true)}
          onOpenMacroBrush={() => setShowMacroBrushModal(true)}
          canUndo={historialIndex > 0}
          canRedo={historialIndex < historial.length - 1}
          liveSyncState={liveSyncState}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onDuplicateWeek={handleDuplicateWeek}
          onBatchToggle={handleBatchToggle}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onGoToToday={handleGoToToday}
          batchModeActive={batchModeActive}
        />

      {/* Layout principal: 3 paneles */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel izquierdo: Catálogo */}
        <CatalogoPanel
          onRecetaSelect={handleRecetaSelect}
          onAlimentoSelect={handleAlimentoSelect}
        />

        {/* Panel central: Grid de semana */}
        <GridSemana
          onSlotClick={handleSlotClick}
          onRecetaAdd={handleRecetaAdd}
          onRecetaEdit={handleRecetaEdit}
          onRecetaDelete={handleRecetaDelete}
          recetaSeleccionada={recetaSeleccionada}
        />

        {/* Panel derecho: Totales y alertas */}
        <TotalesPanel
          totalesDia={totalesDia}
          totalesSemana={totalesSemana}
          objetivosDia={objetivos}
          objetivosSemana={{
            calorias: objetivos.calorias * 7,
            proteinas: objetivos.proteinas * 7,
            carbohidratos: objetivos.carbohidratos * 7,
            grasas: objetivos.grasas * 7,
            fibra: objetivos.fibra * 7,
            presupuesto: objetivos.presupuesto * 7,
            tiempoMaximo: objetivos.tiempoMaximo * 7
          }}
          alertas={alertas}
          tiempoTotal={560}
          tiempoDia={80}
          costeTotal={130}
          costeDia={18.5}
          objetivoCoste={objetivos.presupuesto}
          objetivoTiempo={objetivos.tiempoMaximo}
          onFixAlerta={handleFixAlerta}
          onSugerirRecorte={handleSugerirRecorte}
          notasCoach={notasCoach}
          onNotasChange={setNotasCoach}
        />
      </div>

      {/* Floating Action Buttons para herramientas avanzadas */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
          title="Pincel de Macros (B)"
        >
          <Paintbrush className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
          title="Plan B - Sustituciones"
        >
          <Shuffle className="w-6 h-6" />
        </motion.button>

        {batchModeActive && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBatchModal(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
            title="Planificar Batch Cooking"
          >
            <ChefHat className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Modal de Batch Cooking */}
      <BatchCookingModal
        isOpen={showBatchModal}
        onClose={() => setShowBatchModal(false)}
        recetasDisponibles={recetasDisponibles}
        onConfirmar={handleBatchConfirm}
      />

      {/* Modal de Plantillas Inteligentes */}
      <PlantillasInteligentesModal
        isOpen={showPlantillasModal}
        onClose={() => setShowPlantillasModal(false)}
        onApply={(plantilla, semana) => {
          console.log('Aplicar plantilla:', plantilla.nombre, 'Semana:', semana);
          // TODO: Implementar la lógica para generar la semana basada en la plantilla
          setShowPlantillasModal(false);
        }}
            clienteObjetivo="perdida_peso"
      />

      {/* Modal de Ajuste de Macros */}
      <MacroBrushModal
        isOpen={showMacroBrushModal}
        onClose={() => setShowMacroBrushModal(false)}
        objetivos={{
          calorias: objetivos.calorias,
          proteinas: objetivos.proteinas,
          carbohidratos: objetivos.carbohidratos,
          grasas: objetivos.grasas
        }}
        totalesActuales={totalesDia}
        onApply={(cambios) => {
          console.log('Aplicar cambios de macros:', cambios);
          // TODO: Implementar la lógica para ajustar las recetas
          setShowMacroBrushModal(false);
        }}
      />

      {/* Botón para volver */}
      <button
        onClick={() => navigate('/dashboard/nutrition/dietas-listado')}
        className="fixed top-20 left-4 px-4 py-2 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        onClick={() => setShowMetricsDashboard(true)}
        icon={<BarChart3 className="w-6 h-6" />}
        label="Ver Métricas"
        position="bottom-left"
        color="blue"
      />
      
      <FloatingActionButton
        onClick={() => setShowVisualGallery(true)}
        icon={<ChefHat className="w-6 h-6" />}
        label="Galería Visual"
        position="bottom-right"
        color="purple"
      />

      <FloatingActionButton
        onClick={() => setShowCalendarView(true)}
        icon={<Calendar className="w-6 h-6" />}
        label="Vista Calendario"
        position="bottom-left"
        color="green"
      />

      <FloatingActionButton
        onClick={() => setShowNotesSystem(true)}
        icon={<StickyNote className="w-6 h-6" />}
        label="Sistema de Notas"
        position="top-right"
        color="orange"
      />

      <FloatingActionButton
        onClick={() => setShowSmartSearch(true)}
        icon={<Search className="w-6 h-6" />}
        label="Búsqueda Inteligente"
        position="top-left"
        color="indigo"
      />

      {/* Dashboard de Métricas */}
      {showMetricsDashboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Métricas de Seguimiento</h2>
              <button
                onClick={() => setShowMetricsDashboard(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <MetricsDashboard data={metricsData} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Galería Visual de Recetas */}
      {showVisualGallery && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Galería Visual de Recetas</h2>
              <button
                onClick={() => setShowVisualGallery(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <VisualRecipeGallery
                recipes={recetasDisponibles}
                onRecipeSelect={handleRecetaSelect}
                onRecipeAdd={(recipe) => {
                  handleRecipeAdd(recipe, 'manual');
                  setShowVisualGallery(false);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Micro-interacciones */}
      <ConfettiEffect 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Vista de Calendario */}
      {showCalendarView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Calendario Nutricional</h2>
              <button
                onClick={() => setShowCalendarView(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <CalendarView
                events={[]}
                onEventClick={(event) => console.log('Event clicked:', event)}
                onDateClick={(date) => console.log('Date clicked:', date)}
                onAddEvent={(date, type) => console.log('Add event:', date, type)}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Sistema de Notas */}
      {showNotesSystem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Sistema de Notas</h2>
              <button
                onClick={() => setShowNotesSystem(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <NotesSystem
                notes={[]}
                onNoteCreate={(note) => console.log('Create note:', note)}
                onNoteUpdate={(id, updates) => console.log('Update note:', id, updates)}
                onNoteDelete={(id) => console.log('Delete note:', id)}
                onNoteShare={(id, users) => console.log('Share note:', id, users)}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Búsqueda Inteligente */}
      {showSmartSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Búsqueda Inteligente</h2>
              <button
                onClick={() => setShowSmartSearch(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <SmartSearch
                onResultSelect={(result) => {
                  console.log('Result selected:', result);
                  setShowSmartSearch(false);
                }}
                onSearch={(query, filters) => console.log('Search:', query, filters)}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
    </DragDropProvider>
  );
};

export default DietaEdicionPage;
