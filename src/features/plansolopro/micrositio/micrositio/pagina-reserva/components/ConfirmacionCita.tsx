import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmacionCitaProps {
  formData: any; // All collected form data for display
}

const ConfirmacionCita: React.FC<ConfirmacionCitaProps> = ({ formData }) => {
  const { service, selectedTime, selectedDate, clientName, clientEmail, clientPhone } = formData;

  return (
    <div className="space-y-6 text-center">
      <CheckCircle className="text-green-500 mx-auto w-16 h-16" />
      <h2 className="text-2xl font-bold text-green-700">
        ¡Cita Confirmada!
      </h2>
      <p className="text-gray-700 text-lg">
        Gracias por tu reserva, {clientName}. Se ha enviado un email de confirmación a {clientEmail}.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg text-left border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Detalles de tu Cita:</h3>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Servicio:</strong> {service?.name} ({service?.price}€)</p>
          <p className="text-gray-700"><strong>Fecha:</strong> {selectedDate}</p>
          <p className="text-gray-700"><strong>Hora:</strong> {selectedTime}</p>
          <p className="text-gray-700"><strong>Cliente:</strong> {clientName}</p>
          <p className="text-gray-700"><strong>Email:</strong> {clientEmail}</p>
          <p className="text-gray-700"><strong>Teléfono:</strong> {clientPhone}</p>
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Hacer otra reserva
      </button>
    </div>
  );
};

export default ConfirmacionCita;
