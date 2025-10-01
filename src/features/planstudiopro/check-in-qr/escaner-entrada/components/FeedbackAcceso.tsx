import React from 'react';

interface FeedbackAccesoProps {
  estado: 'permitido' | 'denegado' | 'membresia-vencida';
}

const FeedbackAcceso: React.FC<FeedbackAccesoProps> = ({ estado }) => {
  let mensaje = '';
  let estiloClases = '';

  switch (estado) {
    case 'permitido':
      mensaje = '¡Acceso Permitido!';
      estiloClases = 'bg-green-100 text-green-800';
      break;
    case 'denegado':
      mensaje = 'Acceso Denegado.';
      estiloClases = 'bg-red-100 text-red-800';
      break;
    case 'membresia-vencida':
      mensaje = 'Membresía Vencida. Acceso Denegado.';
      estiloClases = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      mensaje = '';
      estiloClases = '';
  }

  if (!mensaje) return null;

  return (
    <div className={`p-4 rounded-md text-center font-semibold mb-6 ${estiloClases}`}>
      {mensaje}
    </div>
  );
};

export default FeedbackAcceso;
