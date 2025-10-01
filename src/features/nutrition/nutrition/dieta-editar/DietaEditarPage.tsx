import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, Clock, ChevronRight, AlertCircle, Send } from 'lucide-react';
import DietaEditor from './components/DietaEditor';
import ComidasEditor from './components/ComidasEditor';
import MacrosAdjuster from './components/MacrosAdjuster';
import VersionHistory from './components/VersionHistory';
import ProgressTracking from './components/ProgressTracking';

const DietaEditarPage: React.FC = () => {
  const [currentDiet, setCurrentDiet] = useState<any>({
    id: 'diet-1',
    name: 'Dieta de Volumen - Fase 1',
    clientName: 'Carlos Martínez',
    meals: [
      { id: 'meal-1', name: 'Desayuno', recipes: [{ id: 'rec-1', name: 'Tortilla de avena', quantity: '1 unidad' }] },
      { id: 'meal-2', name: 'Almuerzo', recipes: [{ id: 'rec-2', name: 'Arroz con pollo', quantity: '200g' }] },
    ],
    macros: { protein: 180, carbs: 300, fats: 70, calories: 2500 },
    version: 1,
    notes: [],
  });

  const [activeTab, setActiveTab] = useState<'comidas' | 'macros' | 'historial' | 'progreso'>('comidas');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      const timer = setTimeout(() => {
        handleSave();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentDiet, hasUnsavedChanges, autoSaveEnabled]);

  const handleDietChange = (updatedDiet: any) => {
    setCurrentDiet(updatedDiet);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Diet saved:', currentDiet);
    setHasUnsavedChanges(false);
    setLastSaved(new Date());
  };

  const handleSendToClient = () => {
    console.log('Sending diet to client...');
    alert('Dieta enviada al cliente');
  };

  const tabs = [
    { id: 'comidas', label: 'Editar Comidas', icon: Edit3 },
    { id: 'macros', label: 'Ajustar Macros', icon: Save },
    { id: 'historial', label: 'Historial', icon: Clock },
    { id: 'progreso', label: 'Progreso', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-orange-100">
            <span className="text-sm font-medium">Dietas</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-medium">{currentDiet.clientName}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-bold text-white">Editar</span>
          </div>

          {/* Título */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Edit3 className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Editar Dieta
              </h1>
              <p className="text-xl text-yellow-100 mt-2">
                {currentDiet.name}
              </p>
            </div>
          </div>

          {/* Indicador de guardado */}
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${
              hasUnsavedChanges
                ? 'bg-red-500/20 border-red-300/30'
                : 'bg-green-500/20 border-green-300/30'
            }`}>
              <div className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? 'bg-red-300' : 'bg-green-300'} animate-pulse`}></div>
              <span className="text-sm font-semibold text-white">
                {hasUnsavedChanges ? 'Cambios sin guardar' : 'Todo guardado'}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Último guardado: {lastSaved.toLocaleTimeString()}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <span className="text-sm font-semibold text-white">
                Versión {currentDiet.version}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TABS */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white border border-white/50 shadow-lg hover:shadow-xl'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* LAYOUT PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMNA PRINCIPAL */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'comidas' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ComidasEditor diet={currentDiet} onDietChange={handleDietChange} />
            </motion.div>
          )}

          {activeTab === 'macros' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MacrosAdjuster diet={currentDiet} onDietChange={handleDietChange} />
            </motion.div>
          )}

          {activeTab === 'historial' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VersionHistory dietId={currentDiet.id} currentVersion={currentDiet.version} />
            </motion.div>
          )}

          {activeTab === 'progreso' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressTracking clientId="client-1" />
            </motion.div>
          )}
        </div>

        {/* SIDEBAR - ESTADÍSTICAS Y ALERTAS */}
        <div className="space-y-6">
          {/* Panel de Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Resumen Actual</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Calorías Objetivo</p>
                  <p className="text-3xl font-bold text-orange-700">{currentDiet.macros.calories}</p>
                  <p className="text-xs text-orange-600 mt-1">kcal/día</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-bold text-blue-600 mb-1">Proteínas</p>
                    <p className="text-lg font-bold text-blue-700">{currentDiet.macros.protein}g</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-600 mb-1">Carbos</p>
                    <p className="text-lg font-bold text-green-700">{currentDiet.macros.carbs}g</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs font-bold text-purple-600 mb-1">Grasas</p>
                    <p className="text-lg font-bold text-purple-700">{currentDiet.macros.fats}g</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Adherencia Promedio</span>
                    <span className="text-sm font-bold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alertas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Alertas
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-blue-700">Revisión programada</p>
                <p className="text-xs text-blue-600 mt-1">En 3 días</p>
              </div>

              <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm font-semibold text-green-700">Cliente activo</p>
                <p className="text-xs text-green-600 mt-1">Última comida registrada: Hoy</p>
              </div>
            </div>
          </motion.div>

          {/* Acciones Finales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-3"
          >
            <button
              onClick={handleSave}
              className="w-full relative overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white text-left group border border-white/20"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-3">
                <Save className="w-5 h-5" />
                <span className="font-bold">Guardar Cambios</span>
              </div>
            </button>

            <button
              onClick={handleSendToClient}
              className="w-full px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar al Cliente
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DietaEditarPage;
