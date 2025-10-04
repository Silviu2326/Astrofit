import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check, Calendar, Clock, Users, TrendingUp,
  Sparkles, CheckCircle2, Bell
} from 'lucide-react';
import FormularioReserva from './components/FormularioReserva';
import SeleccionServicio from './components/SeleccionServicio';
import SeleccionHorario from './components/SeleccionHorario';
import DatosCliente from './components/DatosCliente';
import PagoStripe from './components/PagoStripe';
import ConfirmacionCita from './components/ConfirmacionCita';

const steps = ['Servicio', 'Horario', 'Datos Cliente', 'Pago', 'Confirmación'];

// Componente Stepper personalizado moderno
const CustomStepper: React.FC<{ activeStep: number; steps: string[] }> = ({ activeStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Línea de progreso de fondo */}
        <div className="absolute top-6 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-100 hidden md:block rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </motion.div>
        </div>

        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Círculo del paso */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
                index < activeStep
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                  : index === activeStep
                    ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white'
                    : 'bg-white/80 backdrop-blur-xl border-2 border-gray-300 text-gray-500'
              }`}
            >
              {index < activeStep ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                index + 1
              )}
            </motion.div>

            {/* Etiqueta del paso */}
            <span className={`mt-3 text-xs md:text-sm font-semibold text-center px-2 transition-all duration-300 ${
              index <= activeStep ? 'text-emerald-600' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PaginaReservaPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SeleccionServicio onNext={handleNext} onDataChange={setFormData} />;
      case 1:
        return <SeleccionHorario onNext={handleNext} onBack={handleBack} onDataChange={setFormData} />;
      case 2:
        return <DatosCliente onNext={handleNext} onBack={handleBack} onDataChange={setFormData} />;
      case 3:
        return <PagoStripe onNext={handleNext} onBack={handleBack} onDataChange={setFormData} />;
      case 4:
        return <ConfirmacionCita formData={formData} />;
      default:
        return 'Paso desconocido';
    }
  };

  // Estadísticas simuladas
  const stats = [
    {
      icon: Calendar,
      title: 'Sesiones Disponibles',
      value: '24',
      subtitle: 'Esta Semana',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    {
      icon: Clock,
      title: 'Reservas Pendientes',
      value: '8',
      subtitle: 'En Proceso',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'from-cyan-50 to-blue-50'
    },
    {
      icon: Users,
      title: 'Horarios Populares',
      value: '10-12',
      subtitle: 'AM & 2-4 PM',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'from-teal-50 to-emerald-50'
    },
    {
      icon: TrendingUp,
      title: 'Tasa de Ocupación',
      value: '78%',
      subtitle: 'Esta Semana',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-8">

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Calendar className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Reserva tu <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sesión</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed">
              Agenda tu cita en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">segundos</span>
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white">Confirmación Instantánea</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Bell className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">Recordatorios Automáticos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgColor} rounded-full blur-2xl opacity-50`}></div>

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
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
                  {stat.value}
                </p>

                {/* Subtítulo */}
                <p className="text-xs text-gray-500 font-medium">
                  {stat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONTENEDOR PRINCIPAL DEL FORMULARIO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
        >
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              Proceso de Reserva
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <CustomStepper activeStep={activeStep} steps={steps} />

            <div>
              {activeStep === steps.length ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
                    ¡Reserva Completada!
                  </h2>
                  <p className="text-gray-600 mb-6">Tu cita ha sido confirmada exitosamente</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(0)}
                    className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 text-white font-semibold"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">Hacer otra reserva</span>
                  </motion.button>
                </motion.div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaginaReservaPage;
