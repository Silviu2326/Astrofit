
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../components/ui/modal';

const PrecioSuscripcion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChoosePlan = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSubscription = () => {
    setIsModalOpen(false);
    toast.success('¡Suscripción iniciada! Redirigiendo al pago...', {
      duration: 3000,
    });
    // Aquí se podría agregar la lógica para procesar el pago
  };

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Elige tu Plan de Membresía</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Membresía Anual</h3>
          <p className="text-6xl font-extrabold text-purple-700 mb-4">$299<span className="text-xl font-medium text-gray-600">/año</span></p>
          <p className="text-lg text-gray-600 mb-6">Ahorra un 20% con el plan anual.</p>
          <ul className="text-left text-gray-700 mb-8 space-y-2">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Acceso ilimitado a todos los cursos
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Entrenamientos exclusivos
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Soporte prioritario
            </li>
          </ul>
          <button 
            onClick={handleChoosePlan}
            className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-700 transition duration-300 w-full"
          >
            Elegir Plan Anual
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar Suscripción"
        size="md"
      >
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Membresía Anual</h3>
            <p className="text-3xl font-bold text-purple-600 mb-4">$299/año</p>
            <p className="text-gray-600 mb-6">
              ¿Estás listo para desbloquear todo el contenido premium y unirte a nuestra comunidad?
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Incluye:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acceso ilimitado a todos los cursos</li>
              <li>• Entrenamientos exclusivos</li>
              <li>• Soporte prioritario</li>
              <li>• Comunidad privada</li>
              <li>• Recursos descargables</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmSubscription}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default PrecioSuscripcion;
