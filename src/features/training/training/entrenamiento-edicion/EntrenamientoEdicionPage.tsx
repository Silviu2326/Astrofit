import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, X, Shuffle } from 'lucide-react';
import { HeaderBar } from './components/HeaderBar';
import { CatalogoPanel } from './components/CatalogoPanel';
import { GridSemana } from './components/GridSemana';
import { TotalesPanel } from './components/TotalesPanel';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: string;
  descripcion: string;
  tiempo: number;
  intensidad: number;
  calorias: number;
  series?: number;
  repeticiones?: string;
  peso?: number;
  descanso?: number;
  completado?: boolean;
  orden?: number;
  notas?: string;
}

interface Sesion {
  id: string;
  nombre: string;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';
  ejercicios: Ejercicio[];
  ubicacion: string;
  entrenador: string;
  notas: string;
}

import { BatchTrainingModal } from './components/BatchTrainingModal';
import { FitCoachModal } from './components/FitCoachModal';
import { ExcelModal } from './components/ExcelModal';
import { SistemaNotasModal } from './components/SistemaNotasModal';
import { PlantillasModal } from './components/PlantillasModal';
import { SustitucionesModal } from './components/SustitucionesModal';
// import { PlantillasInteligentesModal } from './components/PlantillasInteligentesModal';
// import { MacroBrushModal } from './components/MacroBrushModal';
// import { VisualExerciseGallery } from './components/VisualExerciseGallery';
// import { MetricsDashboard, useMetricsData } from './components/MetricsDashboard';
// import { CalendarView } from './components/CalendarView';
// import { NotesSystem } from './components/NotesSystem';
// import { SmartSearch } from './components/SmartSearch';
import { 
  ConfettiEffect, 
  Toast, 
  useToast 
} from './components/MicroInteractions';
import { getEntrenamiento } from '../entrenamientos-listado/entrenamientosListadoApi';
import {
  ClienteEntrenamiento,
  EstadoLiveSync,
  ObjetivosEntrenamiento,
  MetricasEntrenamiento,
  AlertaLinter,
  Ejercicio,
  AccionHistorial
} from './types';

export const EntrenamientoEdicionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados principales
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState<ClienteEntrenamiento | null>(null);
  const [semanaActual, setSemanaActual] = useState(1);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<Ejercicio | undefined>();
  const [sesionesSemana, setSesionesSemana] = useState<{ [key: string]: Sesion[] }>({});

  // Calcular totales en tiempo real
  const calcularTotales = () => {
    const todasLasSesiones = Object.values(sesionesSemana).flat();
    const hoy = new Date().getDay(); // 0 = domingo, 1 = lunes, etc.
    const sesionesHoy = sesionesSemana[hoy.toString()] || [];
    
    // Totales del día
    const totalesDia = {
      sesiones: sesionesHoy.length,
      ejercicios: sesionesHoy.reduce((sum, s) => sum + s.ejercicios.length, 0),
      duracion: sesionesHoy.reduce((sum, s) => sum + s.duracion, 0),
      calorias: sesionesHoy.reduce((sum, s) => 
        sum + s.ejercicios.reduce((ejSum, ej) => ejSum + ej.calorias, 0), 0
      ),
      peso: 0, // No aplicable para entrenamiento
      series: sesionesHoy.reduce((sum, s) => 
        sum + s.ejercicios.reduce((ejSum, ej) => ejSum + (ej.series || 0), 0), 0
      ),
      repeticiones: 0 // No aplicable
    };
    
    // Totales de la semana
    const totalesSemana = {
      sesiones: todasLasSesiones.length,
      ejercicios: todasLasSesiones.reduce((sum, s) => sum + s.ejercicios.length, 0),
      duracion: todasLasSesiones.reduce((sum, s) => sum + s.duracion, 0),
      calorias: todasLasSesiones.reduce((sum, s) => 
        sum + s.ejercicios.reduce((ejSum, ej) => ejSum + ej.calorias, 0), 0
      ),
      peso: 0, // No aplicable para entrenamiento
      series: todasLasSesiones.reduce((sum, s) => 
        sum + s.ejercicios.reduce((ejSum, ej) => ejSum + (ej.series || 0), 0), 0
      ),
      repeticiones: 0 // No aplicable
    };
    
    return { totalesDia, totalesSemana };
  };

  const { totalesDia, totalesSemana } = calcularTotales();
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showMetricsDashboard, setShowMetricsDashboard] = useState(false);
  const [showVisualGallery, setShowVisualGallery] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [showNotesSystem, setShowNotesSystem] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [showFitCoach, setShowFitCoach] = useState(false);
  const [showExcel, setShowExcel] = useState(false);
  const [showPlantillas, setShowPlantillas] = useState(false);
  const [showSustituciones, setShowSustituciones] = useState(false);
  const [notasCoach, setNotasCoach] = useState('');
  const [isTotalesPanelVisible, setIsTotalesPanelVisible] = useState(true);
  
  // Micro-interacciones
  const { toasts, addToast, removeToast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  // const metricsData = useMetricsData();

  // Estado de auto-guardado y live sync
  const [liveSyncState, setLiveSyncState] = useState<EstadoLiveSync>({
    estado: 'guardado',
    visibleEnApp: true
  });

  // Historial para undo/redo
  const [historial, setHistorial] = useState<AccionHistorial[]>([]);
  const [historialIndex, setHistorialIndex] = useState(-1);

  // Objetivos
  const [objetivos, setObjetivos] = useState<ObjetivosEntrenamiento>({
    volumen: 20,
    intensidad: 7,
    frecuencia: 4,
    duracion: 60,
    calorias: 400,
    adherencia: 85
  });

  // Totales calculados dinámicamente desde calcularTotales()

  // Alertas del linter
  const [alertas, setAlertas] = useState<AlertaLinter[]>([
    {
      id: '1',
      tipo: 'volumen_alto',
      severidad: 'warn',
      mensaje: 'Volumen alto en la sesión de hoy',
      sesionId: 'sesion-1',
      fix: {
        label: 'Reducir series',
        action: () => console.log('Fix volumen')
      }
    }
  ]);

  // Fechas de la semana actual
  const getFechas = () => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    
    // Calcular el inicio de la semana (lunes)
    const diaSemana = hoy.getDay();
    const diasHastaLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
    inicioSemana.setDate(hoy.getDate() + diasHastaLunes);
    
    // Ajustar para la semana seleccionada
    inicioSemana.setDate(inicioSemana.getDate() + (semanaActual - 1) * 7);
    
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    
    return {
      inicio: inicioSemana.toISOString(),
      fin: finSemana.toISOString()
    };
  };

  const { inicio: fechaInicio, fin: fechaFin } = getFechas();

  // Cargar entrenamiento inicial
  useEffect(() => {
    const loadEntrenamiento = async () => {
      if (!id) return;

      try {
        const data = await getEntrenamiento(id);
        if (data) {
          setCliente({
            id: id,
            nombre: data.cliente?.nombre || 'Cliente',
            avatar: data.cliente?.avatar || '',
            restricciones: data.restricciones || [],
            lesiones: [],
            preferencias: [],
            nivel: data.nivel || 'intermedio',
            objetivos: [data.objetivo || 'general']
          });

          setObjetivos({
            volumen: 20,
            intensidad: 7,
            frecuencia: data.diasPorSemana || 4,
            duracion: 60,
            calorias: 400,
            adherencia: 85
          });
        }
      } catch (error) {
        console.error('Error al cargar entrenamiento:', error);
    } finally {
      setLoading(false);
    }
  };

    loadEntrenamiento();
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
  const handleEjercicioMove = useCallback((ejercicioId: string, fromSlot: string, toSlot: string) => {
    console.log('Moving ejercicio:', ejercicioId, 'from', fromSlot, 'to', toSlot);
    addToast('success', 'Ejercicio movido exitosamente');
  }, [addToast]);

  const handleEjercicioAdd = useCallback((ejercicio: Ejercicio, toSlot: string) => {
    console.log('Adding ejercicio:', ejercicio.nombre, 'to', toSlot);
    addToast('success', `Ejercicio "${ejercicio.nombre}" añadido`);
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

  const handleAplicarPlantilla = (plantilla: any) => {
    console.log('Aplicando plantilla:', plantilla);
    // Aquí se implementaría la lógica para aplicar la plantilla
    addToast('success', `Plantilla "${plantilla.nombre}" aplicada exitosamente`);
  };

  const handleAplicarSustitucion = (ejercicioOriginal: any, sustitucion: any) => {
    console.log('Aplicando sustitucion:', ejercicioOriginal.nombre, '->', sustitucion.nombre);
    // Aquí se implementaría la lógica para aplicar la sustitución
    addToast('success', `Ejercicio "${ejercicioOriginal.nombre}" sustituido por "${sustitucion.nombre}"`);
  };

  const handleEjercicioSelect = (ejercicio: Ejercicio) => {
    setEjercicioSeleccionado(ejercicio);
  };

  const handleSlotClick = (dia: number, sesion: string) => {
    console.log('Slot clicked:', dia, sesion);
  };

  const handleEjercicioAddToSession = (dia: number, sesion: string, ejercicio: Ejercicio) => {
    console.log('Añadir ejercicio:', ejercicio.nombre, 'a', dia, sesion);
    
    const diaKey = dia.toString();
    const sesionesDelDia = sesionesSemana[diaKey] || [];
    
    // Buscar si ya existe una sesión para este slot
    const sesionExistente = sesionesDelDia.find(s => s.nombre.includes(sesion));
    
    if (sesionExistente) {
      // Añadir ejercicio a sesión existente
      const sesionActualizada = {
        ...sesionExistente,
        ejercicios: [...sesionExistente.ejercicios, ejercicio]
      };
      
      setSesionesSemana(prev => ({
        ...prev,
        [diaKey]: sesionesDelDia.map(s => s.id === sesionExistente.id ? sesionActualizada : s)
      }));
    } else {
      // Crear nueva sesión
      const nuevaSesion: Sesion = {
        id: `sesion-${dia}-${sesion}-${Date.now()}`,
        nombre: `${sesion} - ${ejercicio.categoria}`,
        hora: '09:00',
        duracion: ejercicio.tiempo,
        estado: 'pendiente',
        ejercicios: [ejercicio],
        ubicacion: 'Gimnasio Principal',
        entrenador: 'Entrenador',
        notas: ''
      };
      
      setSesionesSemana(prev => ({
        ...prev,
        [diaKey]: [...sesionesDelDia, nuevaSesion]
      }));
    }
    
    setEjercicioSeleccionado(undefined);
  };

  const handlePlantillaAddToSession = (dia: number, sesion: string, plantilla: any) => {
    console.log('Añadir plantilla:', plantilla.nombre, 'a', dia, sesion);
    
    const diaKey = dia.toString();
    const sesionesDelDia = sesionesSemana[diaKey] || [];
    
    // Crear ejercicios mock basados en la plantilla
    const ejerciciosPlantilla: Ejercicio[] = Array.from({ length: plantilla.ejercicios }, (_, i) => ({
      id: `ej-${plantilla.id}-${i}`,
      nombre: `Ejercicio ${i + 1} de ${plantilla.nombre}`,
      categoria: plantilla.categoria,
      musculos: ['Músculos principales'],
      equipamiento: ['Equipamiento básico'],
      dificultad: plantilla.dificultad,
      descripcion: `Ejercicio de la plantilla ${plantilla.nombre}`,
      tiempo: Math.floor(plantilla.duracion / plantilla.ejercicios),
      intensidad: 7,
      calorias: Math.floor(plantilla.duracion * 5 / plantilla.ejercicios),
      series: 3,
      repeticiones: '8-12',
      peso: 0,
      descanso: 60,
      completado: false,
      orden: i + 1
    }));
    
    // Crear nueva sesión con la plantilla
    const nuevaSesion: Sesion = {
      id: `sesion-${dia}-${sesion}-${Date.now()}`,
      nombre: `${sesion} - ${plantilla.nombre}`,
      hora: '09:00',
      duracion: plantilla.duracion,
      estado: 'pendiente',
      ejercicios: ejerciciosPlantilla,
      ubicacion: 'Gimnasio Principal',
      entrenador: 'Entrenador',
      notas: `Plantilla: ${plantilla.descripcion}`
    };
    
    setSesionesSemana(prev => ({
      ...prev,
      [diaKey]: [...sesionesDelDia, nuevaSesion]
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'ejercicio' && overData?.dia !== undefined) {
      handleEjercicioAddToSession(overData.dia, overData.sesion, activeData.ejercicio);
    } else if (activeData?.type === 'plantilla' && overData?.dia !== undefined) {
      handlePlantillaAddToSession(overData.dia, overData.sesion, activeData.plantilla);
    }
  };

  const handleEjercicioEdit = (slotId: string) => {
    console.log('Editar slot:', slotId);
  };

  const handleEjercicioDelete = (slotId: string) => {
    console.log('Eliminar slot:', slotId);
  };

  const handleFixAlerta = (alerta: AlertaLinter) => {
    if (alerta.fix) {
      alerta.fix.action();
    }
  };

  const handleSugerirAjuste = (tipo: 'volumen' | 'intensidad') => {
    console.log('Sugerir ajuste de:', tipo);
    // Lógica para sugerir ejercicios más apropiados
  };

  const handleMinimizeTotalesPanel = () => {
    setIsTotalesPanelVisible(false);
    addToast('info', 'Panel de resumen minimizado');
  };

  const handleRestoreTotalesPanel = () => {
    setIsTotalesPanelVisible(true);
    addToast('success', 'Panel de resumen restaurado');
  };

  const handleBatchConfirm = (sesion: any, distribuciones: any[]) => {
    console.log('Sesión batch confirmada:', sesion, distribuciones);
    setShowBatchModal(false);
  };

  const handleApplyBatchChanges = (changes: any[]) => {
    console.log('Aplicando cambios batch:', changes);
    
    // Aquí implementarías la lógica para aplicar los cambios a las sesiones
    changes.forEach(change => {
      console.log(`Aplicando ${change.type} a sesiones:`, change.sessions);
      // Lógica para modificar las sesiones según el tipo de cambio
    });
    
    // Mostrar confirmación
    setShowBatchModal(false);
    
    // Aquí podrías agregar una notificación de éxito
    console.log('Cambios batch aplicados exitosamente');
  };

  // Mock: ejercicios disponibles para batch training
  const ejerciciosDisponibles: Ejercicio[] = [
    {
      id: '1',
      nombre: 'Sentadilla',
      categoria: 'Piernas',
      musculos: ['cuádriceps', 'glúteos', 'isquiotibiales'],
      dificultad: 'intermedio',
      equipamiento: ['barra', 'discos'],
      metrica: 'repeticiones'
    },
    {
      id: '2',
      nombre: 'Press de banca',
      categoria: 'Pecho',
      musculos: ['pectorales', 'deltoides anterior', 'tríceps'],
      dificultad: 'intermedio',
      equipamiento: ['barra', 'banco'],
      metrica: 'repeticiones'
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
          // Abrir pincel de volumen/intensidad
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
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-orange-500 border-t-transparent"
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
          <p className="text-gray-600 mb-6">No se pudo cargar el entrenamiento</p>
          <button
            onClick={() => navigate('/dashboard/entrenamientos-listado')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Header con acciones principales */}
        <HeaderBar
          cliente={cliente}
          semanaActual={semanaActual}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          onOpenPlantillas={() => setShowPlantillas(true)}
          onOpenNotes={() => setShowNotesSystem(true)}
          onOpenExcel={() => setShowExcel(true)}
          onOpenFitCoach={() => setShowFitCoach(true)}
          canUndo={historialIndex > 0}
          canRedo={historialIndex < historial.length - 1}
          liveSyncState={liveSyncState}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onDuplicateWeek={handleDuplicateWeek}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onGoToToday={handleGoToToday}
          isTotalesPanelVisible={isTotalesPanelVisible}
          onRestoreTotalesPanel={handleRestoreTotalesPanel}
        />

        {/* Layout principal: 3 paneles */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panel izquierdo: Catálogo */}
          <CatalogoPanel
            onEjercicioSelect={handleEjercicioSelect}
            onEjercicioAdd={handleEjercicioAdd}
            onPlantillaSelect={(plantilla) => console.log('Plantilla seleccionada:', plantilla)}
            onPlantillaAdd={(plantilla) => console.log('Plantilla añadida:', plantilla)}
          />

          {/* Panel central: Grid de semana */}
          <GridSemana
            sesionesSemana={sesionesSemana}
            onSesionClick={handleSlotClick}
            onEjercicioAdd={(ejercicio: Ejercicio) => handleEjercicioAddToSession(ejercicio, 'lunes')}
            onEjercicioEdit={handleEjercicioEdit}
            onEjercicioDelete={handleEjercicioDelete}
            ejercicioSeleccionado={ejercicioSeleccionado}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            semanaActual={semanaActual}
            onSemanaChange={setSemanaActual}
            onNuevaSesion={(dia) => console.log('Nueva sesión para día:', dia)}
            onCambiarVista={(vista) => console.log('Cambiar vista:', vista)}
            onPlantillaAdd={handlePlantillaAddToSession}
          />

          {/* Panel derecho: Totales y alertas */}
          {isTotalesPanelVisible && (
            <TotalesPanel
              totalesDia={totalesDia}
              totalesSemana={totalesSemana}
              objetivosDia={{
                sesionesPorSemana: 1,
                duracionSesion: 60,
                intensidad: 7,
                objetivo: 'Fuerza',
                nivel: 'Intermedio'
              }}
              objetivosSemana={{
                sesionesPorSemana: 3,
                duracionSesion: 60,
                intensidad: 7,
                objetivo: 'Fuerza',
                nivel: 'Intermedio'
              }}
              alertas={alertas}
              tiempoTotal={totalesSemana.duracion}
              tiempoDia={totalesDia.duracion}
              costeTotal={0}
              costeDia={0}
              objetivoCoste={0}
              objetivoTiempo={objetivos.duracion * objetivos.frecuencia}
              onFixAlerta={handleFixAlerta}
              onSugerirAjuste={handleSugerirAjuste}
              notasCoach={notasCoach}
              onNotasChange={setNotasCoach}
              onMinimize={handleMinimizeTotalesPanel}
            />
          )}
              </div>

        {/* Floating Action Buttons para herramientas avanzadas */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSustituciones(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
            title="Plan B - Sustituciones"
          >
            <Shuffle className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBatchModal(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
            title="Planificar Batch Training"
          >
            <Dumbbell className="w-6 h-6" />
          </motion.button>
                    </div>

        {/* Modal de Batch Training */}
        <BatchTrainingModal
          isOpen={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          sesionesSemana={sesionesSemana}
          onApplyChanges={handleApplyBatchChanges}
        />

        {/* Modal de FitCoach AI */}
        <FitCoachModal
          isOpen={showFitCoach}
          onClose={() => setShowFitCoach(false)}
          cliente={cliente!}
          sesionesSemana={sesionesSemana}
        />

        {/* Modal de Excel */}
              <ExcelModal
                isOpen={showExcel}
                onClose={() => setShowExcel(false)}
                sesionesSemana={sesionesSemana}
                cliente={cliente!}
                onSessionsUpdate={setSesionesSemana}
              />

        {/* Modal de Plantillas Inteligentes */}
        {/* <PlantillasInteligentesModal
          isOpen={showPlantillasModal}
          onClose={() => setShowPlantillasModal(false)}
          onApply={(plantilla, semana) => {
            console.log('Aplicar plantilla:', plantilla.nombre, 'Semana:', semana);
            setShowPlantillasModal(false);
          }}
          clienteObjetivo="fuerza"
        /> */}



        {/* Floating Action Buttons eliminados - ahora están en HeaderBar */}

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
                {/* <MetricsDashboard data={metricsData} /> */}
                <p>Métricas en desarrollo...</p>
              </div>
            </motion.div>
          </div>
          )}

        {/* Galería Visual de Ejercicios */}
        {showVisualGallery && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Galería Visual de Ejercicios</h2>
                <button
                  onClick={() => setShowVisualGallery(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* <VisualExerciseGallery
                  exercises={ejerciciosDisponibles}
                  onExerciseSelect={handleEjercicioSelect}
                  onExerciseAdd={(exercise) => {
                    handleEjercicioAdd(exercise, 'manual');
                    setShowVisualGallery(false);
                  }}
                /> */}
                <p>Galería visual en desarrollo...</p>
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
                <h2 className="text-2xl font-bold text-gray-900">Calendario de Entrenamientos</h2>
                                            <button
                  onClick={() => setShowCalendarView(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                  <X className="w-6 h-6" />
                                            </button>
                                      </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* <CalendarView
                  events={[]}
                  onEventClick={(event) => console.log('Event clicked:', event)}
                  onDateClick={(date) => console.log('Date clicked:', date)}
                  onAddEvent={(date, type) => console.log('Add event:', date, type)}
                /> */}
                <p>Calendario en desarrollo...</p>
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
                {/* <NotesSystem
                  notes={[]}
                  onNoteCreate={(note) => console.log('Create note:', note)}
                  onNoteUpdate={(id, updates) => console.log('Update note:', id, updates)}
                  onNoteDelete={(id) => console.log('Delete note:', id)}
                  onNoteShare={(id, users) => console.log('Share note:', id, users)}
                /> */}
                <p>Sistema de notas en desarrollo...</p>
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
                {/* <SmartSearch
                  onResultSelect={(result) => {
                    console.log('Result selected:', result);
                    setShowSmartSearch(false);
                  }}
                  onSearch={(query, filters) => console.log('Search:', query, filters)}
                /> */}
                <p>Búsqueda inteligente en desarrollo...</p>
              </div>
            </motion.div>
            </div>
        )}

        {/* Sistema de Notas */}
        <SistemaNotasModal
          isOpen={showNotesSystem}
          onClose={() => setShowNotesSystem(false)}
          cliente={cliente}
          sesionesSemana={sesionesSemana}
        />

        {/* Modal de Plantillas */}
        <PlantillasModal
          isOpen={showPlantillas}
          onClose={() => setShowPlantillas(false)}
          onAplicarPlantilla={handleAplicarPlantilla}
          cliente={cliente}
        />

        {/* Modal de Sustituciones */}
        <SustitucionesModal
          isOpen={showSustituciones}
          onClose={() => setShowSustituciones(false)}
          sesionesSemana={sesionesSemana}
          onAplicarSustitucion={handleAplicarSustitucion}
        />

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
    </DndContext>
  );
};

export default EntrenamientoEdicionPage;