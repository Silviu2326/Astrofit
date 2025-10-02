import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import FormularioHabito from './components/FormularioHabito';
import SelectorFrecuencia from './components/SelectorFrecuencia';
import ConfiguracionRecordatorios from './components/ConfiguracionRecordatorios';
import VistaPrevia from './components/VistaPrevia';

interface HabitData {
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  categoria: string;
  frecuencia: 'diario' | 'semanal' | 'mensual' | 'personalizado';
  diasSemana: number[];
  vecesAlDia: number;
  horarios: string[];
  meta: string;
  motivacion: string;
}

const CrearHabitoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [habitData, setHabitData] = useState<HabitData>({
    nombre: '',
    descripcion: '',
    icono: '💪',
    color: '#3b82f6',
    categoria: '',
    frecuencia: 'diario',
    diasSemana: [],
    vecesAlDia: 1,
    horarios: [],
    meta: '',
    motivacion: ''
  });

  const steps = [
    { number: 1, title: 'Información Básica', icon: PlusCircle },
    { number: 2, title: 'Frecuencia y Horarios', icon: Sparkles },
    { number: 3, title: 'Recordatorios', icon: CheckCircle2 },
    { number: 4, title: 'Meta y Motivación', icon: CheckCircle2 }
  ];

  const updateHabitData = (data: Partial<HabitData>) => {
    setHabitData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting habit:', habitData);
    // TODO: API integration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <PlusCircle className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Crear Nuevo <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Hábito</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Define tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">rutina perfecta</span> y comienza tu transformación
          </p>
        </div>
      </motion.div>

      {/* Stepper - Progreso */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl scale-110'
                          : isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <p className={`text-sm font-semibold text-center transition-colors duration-300 ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: isCompleted ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario - 2/3 del espacio */}
        <div className="lg:col-span-2">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentStep === 1 && (
              <FormularioHabito
                data={habitData}
                onUpdate={updateHabitData}
              />
            )}
            {currentStep === 2 && (
              <SelectorFrecuencia
                data={habitData}
                onUpdate={updateHabitData}
              />
            )}
            {currentStep === 3 && (
              <ConfiguracionRecordatorios
                data={habitData}
                onUpdate={updateHabitData}
              />
            )}
            {currentStep === 4 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                  Meta y Motivación
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ¿Cuál es tu meta con este hábito?
                    </label>
                    <textarea
                      value={habitData.meta}
                      onChange={(e) => updateHabitData({ meta: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                      placeholder="Ej: Mantener una vida saludable y activa"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ¿Qué te motiva a crear este hábito?
                    </label>
                    <textarea
                      value={habitData.motivacion}
                      onChange={(e) => updateHabitData({ motivacion: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                      placeholder="Ej: Quiero sentirme con más energía cada día"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Botones de navegación */}
          <div className="flex justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50 shadow-md hover:shadow-xl'
              }`}
            >
              ← Anterior
            </motion.button>

            {currentStep < steps.length ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Siguiente →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Crear Hábito
              </motion.button>
            )}
          </div>
        </div>

        {/* Vista Previa - 1/3 del espacio */}
        <div className="lg:col-span-1">
          <VistaPrevia data={habitData} />
        </div>
      </div>
    </div>
  );
};

export default CrearHabitoPage;
