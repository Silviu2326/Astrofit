import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Sparkles, CheckCircle, Calendar, Send, Save, ChevronLeft } from 'lucide-react';
import ClienteSelector from './components/ClienteSelector';
import ObjetivoConfig from './components/ObjetivoConfig';
import MacrosCalculator from './components/MacrosCalculator';
import DietaWizard from './components/DietaWizard';

const DietaNuevaPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [dietaData, setDietaData] = useState<any>({});

  const handleNext = (data: any) => {
    setDietaData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSaveDraft = () => {
    console.log('Guardando borrador:', dietaData);
    alert('¡Dieta guardada como borrador!');
  };

  const handleSubmit = () => {
    console.log('Dieta final:', dietaData);
    alert('¡Dieta creada exitosamente!');
    // Aquí iría la lógica para guardar la dieta final
  };

  const stepLabels = [
    'Cliente',
    'Objetivo',
    'Macros',
    'Revisión'
  ];

  const steps = [
    {
      name: 'Seleccionar Cliente',
      component: <ClienteSelector onNext={handleNext} initialData={dietaData} />,
    },
    {
      name: 'Configurar Objetivo',
      component: <ObjetivoConfig onNext={handleNext} onBack={handleBack} initialData={dietaData} />,
    },
    {
      name: 'Calcular Macros',
      component: <MacrosCalculator onNext={handleNext} onBack={handleBack} initialData={dietaData} />,
    },
    {
      name: 'Revisión Final',
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Card de revisión */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Revisión Final</h2>
                <p className="text-gray-600">Verifica todos los datos antes de crear la dieta</p>
              </div>
            </div>

            {/* Resumen del cliente */}
            {dietaData.cliente && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <div className="text-3xl">{dietaData.cliente.avatar}</div>
                  Cliente Seleccionado
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">Nombre</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.cliente.nombre} {dietaData.cliente.apellido}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">Edad</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.cliente.edad} años</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">Peso</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.cliente.peso} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-semibold mb-1">Altura</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.cliente.altura} cm</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resumen del objetivo */}
            {dietaData.objetivo && (
              <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Objetivo y Configuración</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-amber-700 font-semibold mb-1">Objetivo</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.objetivo.icono} {dietaData.objetivo.nombre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-semibold mb-1">Nivel de Actividad</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.nivelActividad}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-semibold mb-1">Velocidad</p>
                    <p className="text-sm font-bold text-gray-900">{dietaData.velocidadProgreso}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resumen de macros */}
            {dietaData.calorias && (
              <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-4">Calorías y Macronutrientes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-purple-200">
                    <p className="text-xs text-purple-700 font-semibold mb-1">Calorías Diarias</p>
                    <p className="text-2xl font-bold text-purple-600">{dietaData.calorias}</p>
                    <p className="text-xs text-gray-600">kcal/día</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-blue-200">
                    <p className="text-xs text-blue-700 font-semibold mb-1">Proteínas</p>
                    <p className="text-2xl font-bold text-blue-600">{dietaData.proteinasGramos}g</p>
                    <p className="text-xs text-gray-600">{dietaData.proteinas}%</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-green-200">
                    <p className="text-xs text-green-700 font-semibold mb-1">Carbohidratos</p>
                    <p className="text-2xl font-bold text-green-600">{dietaData.carbohidratosGramos}g</p>
                    <p className="text-xs text-gray-600">{dietaData.carbohidratos}%</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-amber-200">
                    <p className="text-xs text-amber-700 font-semibold mb-1">Grasas</p>
                    <p className="text-2xl font-bold text-amber-600">{dietaData.grasasGramos}g</p>
                    <p className="text-xs text-gray-600">{dietaData.grasas}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist de validación */}
            <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-4">Checklist de Validación</h3>
              <div className="space-y-2">
                {[
                  { label: 'Cliente asignado', completed: !!dietaData.cliente },
                  { label: 'Objetivo configurado', completed: !!dietaData.objetivo },
                  { label: 'Macros calculados', completed: !!dietaData.calorias }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`font-semibold ${item.completed ? 'text-green-900' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opciones finales */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                  <div>
                    <p className="font-bold text-gray-900">Enviar al cliente por email</p>
                    <p className="text-xs text-gray-600">Se enviará una copia de la dieta al email del cliente</p>
                  </div>
                </label>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block font-bold text-gray-900 mb-2">Fecha de inicio (opcional)</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block font-bold text-gray-900 mb-2">Notas adicionales (opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Agrega notas o instrucciones especiales..."
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Botones finales */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={handleSaveDraft}
              className="px-6 py-3 rounded-2xl border-2 border-amber-500 text-amber-700 font-semibold hover:bg-amber-50 transition-all duration-300 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar Borrador
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 py-4 rounded-2xl font-bold text-white text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <Send className="w-5 h-5" />
              Crear Dieta
            </button>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Utensils className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Crear Nueva <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Dieta</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Utiliza nuestro wizard interactivo para crear <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">planes alimenticios personalizados</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Wizard Intuitivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Cálculo Automático</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Validación Completa</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wizard Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <DietaWizard currentStep={step} totalSteps={steps.length} stepLabels={stepLabels} />
      </motion.div>

      {/* Contenido del paso actual */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        {steps[step].component}
      </motion.div>

      {/* Botón guardar borrador flotante */}
      {step > 0 && step < steps.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSaveDraft}
          className="fixed bottom-8 right-8 px-6 py-3 bg-white/90 backdrop-blur-xl border-2 border-amber-500 text-amber-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 z-50"
        >
          <Save className="w-5 h-5" />
          Guardar Borrador
        </motion.button>
      )}
    </div>
  );
};

export default DietaNuevaPage;
