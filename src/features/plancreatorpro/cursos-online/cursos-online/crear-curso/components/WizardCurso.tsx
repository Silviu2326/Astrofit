
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import PasoConfiguracion from './PasoConfiguracion';
import PasoContenido from './PasoContenido';
import PasoPublicacion from './PasoPublicacion';
import PreviewCurso from './PreviewCurso';

interface WizardCursoProps {
  isEditMode?: boolean;
  cursoData?: any;
  isLoading?: boolean;
  onShowConfirmModal?: (cursoData: any) => void;
  isPublishing?: boolean;
}

const WizardCurso: React.FC<WizardCursoProps> = ({ 
  isEditMode = false, 
  cursoData: initialData, 
  isLoading: externalLoading = false,
  onShowConfirmModal,
  isPublishing = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cursoData, setCursoData] = useState({
    titulo: '',
    descripcion: '',
    portada: null as File | null,
    modulos: [],
    precio: 0,
    esPublico: true,
    // ... otros campos del curso
  });

  // Load initial data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setCursoData(prevData => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [isEditMode, initialData]);

  const steps = [
    { name: 'Configuración', component: PasoConfiguracion },
    { name: 'Contenido', component: PasoContenido },
    { name: 'Publicación', component: PasoPublicacion },
    { name: 'Previsualización', component: PreviewCurso },
  ];

  const handleNext = (data: any) => {
    setCursoData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    toast.success(`Paso ${currentStep + 1} completado correctamente`);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    toast.success('Volviendo al paso anterior');
  };

  const handleSubmit = async () => {
    if (onShowConfirmModal) {
      onShowConfirmModal(cursoData);
    }
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </motion.button>
        )}
        {currentStep < steps.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { /* La lógica de next se maneja dentro de cada paso */ }}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            form={`step-form-${currentStep}`}
            type="submit"
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
        {currentStep === steps.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isPublishing}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Publicar Curso
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default WizardCurso;
