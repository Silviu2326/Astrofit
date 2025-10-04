
import React, { useState } from 'react';
import PasoConfiguracion from './PasoConfiguracion';
import PasoContenido from './PasoContenido';
import PasoPublicacion from './PasoPublicacion';
import PreviewCurso from './PreviewCurso';

interface WizardCursoProps {}

const WizardCurso: React.FC<WizardCursoProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cursoData, setCursoData] = useState({
    titulo: '',
    descripcion: '',
    portada: null as File | null,
    modulos: [],
    precio: 0,
    // ... otros campos del curso
  });

  const steps = [
    { name: 'Configuración', component: PasoConfiguracion },
    { name: 'Contenido', component: PasoContenido },
    { name: 'Publicación', component: PasoPublicacion },
    { name: 'Previsualización', component: PreviewCurso },
  ];

  const handleNext = (data: any) => {
    setCursoData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Aquí se manejaría la lógica final de publicación del curso
    console.log('Curso finalizado y listo para publicar:', cursoData);
    alert('Curso creado y listo para publicar!');
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          {steps.map((step, index) => (
            <span
              key={step.name}
              className={`font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[300px]">
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          initialData={cursoData}
          isLastStep={currentStep === steps.length - 1}
          isFirstStep={currentStep === 0}
        />
      </div>

      {/* Navegación del wizard (botones) */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={() => { /* La lógica de next se maneja dentro de cada paso */ }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            form={`step-form-${currentStep}`}
            type="submit"
          >
            Siguiente
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Publicar Curso
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardCurso;
