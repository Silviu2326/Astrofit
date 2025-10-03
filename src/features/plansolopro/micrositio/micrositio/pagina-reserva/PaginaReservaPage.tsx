import React, { useState } from 'react';
import { Check } from 'lucide-react';
import FormularioReserva from './components/FormularioReserva';
import SeleccionServicio from './components/SeleccionServicio';
import SeleccionHorario from './components/SeleccionHorario';
import DatosCliente from './components/DatosCliente';
import PagoStripe from './components/PagoStripe';
import ConfirmacionCita from './components/ConfirmacionCita';

const steps = ['Servicio', 'Horario', 'Datos Cliente', 'Pago', 'Confirmación'];

// Componente Stepper personalizado
const CustomStepper: React.FC<{ activeStep: number; steps: string[] }> = ({ activeStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Línea de progreso de fondo */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300 hidden md:block">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            {/* Círculo del paso */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2 ${
              index < activeStep
                ? 'bg-green-600 border-green-600 text-white'
                : index === activeStep
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-500'
            }`}>
              {index < activeStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>

            {/* Etiqueta del paso */}
            <span className={`mt-3 text-xs md:text-sm font-medium text-center px-2 transition-all duration-300 ${
              index <= activeStep ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Reserva tu Cita
        </h1>

        <CustomStepper activeStep={activeStep} steps={steps} />

        <div>
          {activeStep === steps.length ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                ¡Reserva Completada!
              </h2>
              <button
                onClick={() => setActiveStep(0)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaReservaPage;
