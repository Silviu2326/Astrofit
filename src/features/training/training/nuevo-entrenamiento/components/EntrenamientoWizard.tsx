
import React, { useState } from 'react';

const EntrenamientoWizard: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Asistente de Entrenamiento - Paso {step}</h2>
      {/* Renderizar componentes de paso aqu?? */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
            Anterior
          </button>
        )}
        {step < 5 && (
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
            Siguiente
          </button>
        )}
        {step === 5 && (
          <button onClick={() => alert('Guardar entrenamiento')} className="bg-green-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        )}
      </div>
    </div>
  );
};

export default EntrenamientoWizard;
