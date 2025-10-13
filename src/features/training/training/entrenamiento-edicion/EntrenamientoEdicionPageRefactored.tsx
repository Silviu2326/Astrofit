import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DropResult } from '@hello-pangea/dnd';
import {
  ArrowLeft, Edit2, Save, Plus, Calculator, AlertTriangle,
  BarChart, CalendarDays, Clock, Link2, Settings
} from 'lucide-react';

// Types & Constants
import { ExerciseGroupType } from './types/training.types';
import { MOCK_CLIENTS, MOCK_EXERCISES, EXERCISE_BLOCKS, DAYS_OF_WEEK } from './constants/trainingData';

// Hooks & Utils
import { useTrainingPlan } from './hooks/useTrainingPlan';
import { getVolumeAlerts } from './utils/trainingCalculations';

// Components
import DaySelector from './components/DaySelector/DaySelector';
import ExerciseList from './components/ExerciseList/ExerciseList';
import RMCalculator from './components/RMCalculator/RMCalculator';
import BlocksModal from './components/modals/BlocksModal';
import TemplatesModal from './components/modals/TemplatesModal';
import AddDayModal from './components/modals/AddDayModal';
import PeriodizationTimeline from './components/PeriodizationTimeline';
import CompactTableView from './components/CompactTableView';
import ProgressComparator from './components/ProgressComparator';

const EntrenamientoEdicionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Custom hook para manejo del plan
  const {
    isLoading,
    plan,
    setPlan,
    lastSaved,
    sessionTemplates,
    handleSave,
    handleUpdatePlanInfo,
    handleUpdateExercise,
    handleAddExercise,
    handleRemoveExercise,
    handleDuplicateExercise,
    handleApplyProgression,
    handleAddDay,
    handleRemoveDay,
    handleDuplicateSession,
    handleSaveAsTemplate,
    handleApplyTemplate,
    handleAddBlock,
    handleCreateSuperset,
  } = useTrainingPlan(id);

  // UI State
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);
  const [showAddDayModal, setShowAddDayModal] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table' | 'timeline' | 'progress'>('card');

  // Exercise Management State
  const [searchExercise, setSearchExercise] = useState('');
  const [selectedExerciseForHistory, setSelectedExerciseForHistory] = useState<string | null>(null);
  const [groupingMode, setGroupingMode] = useState<ExerciseGroupType>('normal');
  const [selectedExercisesForGroup, setSelectedExercisesForGroup] = useState<number[]>([]);

  // Autosave
  useEffect(() => {
    if (!isEditMode) return;
    const interval = setInterval(() => handleSave(), 30000);
    return () => clearInterval(interval);
  }, [isEditMode, handleSave]);

  // Handlers
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !plan || !isEditMode) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (sourceIndex === destIndex) return;

    const newPlan = { ...plan };
    const exercises = Array.from(newPlan.trainingDays[selectedDayIndex].exercises);
    const [removed] = exercises.splice(sourceIndex, 1);
    exercises.splice(destIndex, 0, removed);
    newPlan.trainingDays[selectedDayIndex].exercises = exercises;
    setPlan(newPlan);
  };

  const toggleExerciseSelection = (index: number) => {
    if (selectedExercisesForGroup.includes(index)) {
      setSelectedExercisesForGroup(selectedExercisesForGroup.filter(i => i !== index));
    } else {
      setSelectedExercisesForGroup([...selectedExercisesForGroup, index]);
    }
  };

  const getClient = () => MOCK_CLIENTS.find(c => c.id === plan?.clientId);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando entrenamiento...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No se pudo cargar el entrenamiento</p>
          <button
            onClick={() => navigate('/dashboard/entrenamientos-listado')}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  const client = getClient();
  const volumeAlerts = getVolumeAlerts(plan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className={showCalculator ? 'col-span-9' : 'col-span-12'}>
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/dashboard/entrenamientos-listado')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al listado
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">
                    {isEditMode ? 'Editando Entrenamiento' : 'Ver Entrenamiento'}
                  </h1>
                  <p className="text-gray-600">{plan.name}</p>
                </div>

                <div className="flex items-center gap-4">
                  {isEditMode && (
                    <div className="text-sm text-gray-500">
                      Último guardado: {lastSaved.toLocaleTimeString()}
                    </div>
                  )}

                  <button
                    onClick={() => setShowStats(!showStats)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-bold ${
                      showStats ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-600'
                    }`}
                  >
                    <BarChart className="w-5 h-5" />
                    Estadísticas
                  </button>

                  <button
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-bold ${
                      showAnalytics ? 'bg-red-600 text-white' : 'bg-white text-red-600 border-2 border-red-600'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Análisis {volumeAlerts.length > 0 && `(${volumeAlerts.length})`}
                  </button>

                  {!isEditMode ? (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                    >
                      <Edit2 className="w-5 h-5" />
                      Modo Edición
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          handleSave();
                          setIsEditMode(false);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                      >
                        <Save className="w-5 h-5" />
                        Guardar Cambios
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{client?.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{client?.name}</h3>
                  <p className="text-sm text-gray-500">Nivel: {client?.level}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {plan.duration} semanas · {plan.daysPerWeek.length} días/semana
                </div>
              </div>
            </div>

            {/* Days & Exercises */}
            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar - Days */}
              <div className="col-span-3">
                <DaySelector
                  trainingDays={plan.trainingDays}
                  selectedDayIndex={selectedDayIndex}
                  isEditMode={isEditMode}
                  onSelectDay={setSelectedDayIndex}
                  onDuplicateSession={handleDuplicateSession}
                  onSaveAsTemplate={handleSaveAsTemplate}
                  onRemoveDay={(index) => handleRemoveDay(index, selectedDayIndex, setSelectedDayIndex)}
                  onShowTemplates={() => setShowTemplates(true)}
                  onShowBlocks={() => setShowBlocks(true)}
                />
              </div>

              {/* Main Content - Exercises */}
              <div className="col-span-9">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <input
                        type="text"
                        value={plan.trainingDays[selectedDayIndex].name}
                        onChange={(e) => {
                          if (!isEditMode) return;
                          const newPlan = { ...plan };
                          newPlan.trainingDays[selectedDayIndex].name = e.target.value;
                          setPlan(newPlan);
                        }}
                        disabled={!isEditMode}
                        className={`text-2xl font-bold text-gray-900 ${
                          isEditMode ? 'border-b-2 border-orange-300 px-2' : 'border-none'
                        }`}
                      />
                    </div>

                    {/* Grouping Controls */}
                    {isEditMode && selectedExercisesForGroup.length >= 2 && (
                      <div className="flex items-center gap-2">
                        <select
                          value={groupingMode}
                          onChange={(e) => setGroupingMode(e.target.value as ExerciseGroupType)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="normal">Normal</option>
                          <option value="superset">Superserie</option>
                          <option value="circuit">Circuito</option>
                          <option value="cluster">Cluster</option>
                        </select>
                        <button
                          onClick={() => {
                            handleCreateSuperset(selectedDayIndex, selectedExercisesForGroup, groupingMode);
                            setSelectedExercisesForGroup([]);
                            setGroupingMode('normal');
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-bold"
                        >
                          <Link2 className="w-4 h-4" />
                          Agrupar ({selectedExercisesForGroup.length})
                        </button>
                      </div>
                    )}
                  </div>

                  <ExerciseList
                    exercises={plan.trainingDays[selectedDayIndex].exercises}
                    exerciseLibrary={MOCK_EXERCISES}
                    isEditMode={isEditMode}
                    selectedExercisesForGroup={selectedExercisesForGroup}
                    selectedExerciseForHistory={selectedExerciseForHistory}
                    searchExercise={searchExercise}
                    progressionRate={plan.progressionRate}
                    onDragEnd={handleDragEnd}
                    onToggleSelection={toggleExerciseSelection}
                    onToggleHistory={setSelectedExerciseForHistory}
                    onUpdate={(index, field, value) => handleUpdateExercise(selectedDayIndex, index, field, value)}
                    onDuplicate={(index) => handleDuplicateExercise(selectedDayIndex, index)}
                    onRemove={(index) => handleRemoveExercise(selectedDayIndex, index)}
                    onApplyProgression={(index) => handleApplyProgression(selectedDayIndex, index)}
                    onAddExercise={(exerciseId) => handleAddExercise(selectedDayIndex, exerciseId)}
                    onSearchChange={setSearchExercise}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Calculator */}
          <RMCalculator show={showCalculator} onClose={() => setShowCalculator(false)} />

          {!showCalculator && (
            <button
              onClick={() => setShowCalculator(true)}
              className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all"
              title="Abrir calculadora"
            >
              <Calculator className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      <BlocksModal
        show={showBlocks}
        blocks={EXERCISE_BLOCKS}
        onClose={() => setShowBlocks(false)}
        onAddBlock={(blockId) => {
          handleAddBlock(blockId, selectedDayIndex);
          setShowBlocks(false);
        }}
      />

      <TemplatesModal
        show={showTemplates}
        templates={sessionTemplates}
        onClose={() => setShowTemplates(false)}
        onApplyTemplate={(templateId) => {
          handleApplyTemplate(templateId, selectedDayIndex);
          setShowTemplates(false);
        }}
      />

      <AddDayModal
        show={showAddDayModal}
        currentDays={plan.daysPerWeek}
        onClose={() => setShowAddDayModal(false)}
        onAddDay={handleAddDay}
      />
    </div>
  );
};

export default EntrenamientoEdicionPage;
