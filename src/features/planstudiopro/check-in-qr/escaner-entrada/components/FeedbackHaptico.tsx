
import React, { useState } from 'react';

const FeedbackHaptico: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  const triggerHapticFeedback = (type: 'success' | 'error' | 'warning') => {
    // Simulaci??n de feedback h??ptico
    if (navigator.vibrate) {
      switch (type) {
        case 'success':
          navigator.vibrate(200); // Vibraci??n corta para ??xito
          setFeedback('Vibraci??n de ??xito simulada.');
          break;
        case 'error':
          navigator.vibrate([100, 50, 100]); // Doble vibraci??n para error
          setFeedback('Vibraci??n de error simulada.');
          break;
        case 'warning':
          navigator.vibrate(500); // Vibraci??n m??s larga para advertencia
          setFeedback('Vibraci??n de advertencia simulada.');
          break;
        default:
          break;
      }
    } else {
      setFeedback('La API de vibraci??n no est?? soportada en este navegador.');
    }
    setTimeout(() => setFeedback(''), 2000); // Limpiar mensaje despu??s de 2 segundos
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Feedback H??ptico (Vibraciones Simuladas)</h3>
      <p>Respuestas t??ctiles para mejorar la experiencia del usuario y la confirmaci??n de eventos.</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => triggerHapticFeedback('success')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          ??xito
        </button>
        <button
          onClick={() => triggerHapticFeedback('error')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Error
        </button>
        <button
          onClick={() => triggerHapticFeedback('warning')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
        >
          Advertencia
        </button>
      </div>
      {feedback && <p className="mt-3 text-sm text-gray-300">{feedback}</p>}
    </div>
  );
};

export default FeedbackHaptico;
