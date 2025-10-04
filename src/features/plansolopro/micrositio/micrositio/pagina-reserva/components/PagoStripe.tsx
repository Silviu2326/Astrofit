import React, { useState } from 'react';
import { CreditCard, Loader2, AlertCircle } from 'lucide-react';

// Funciones simuladas de API - reemplazar con las reales cuando estén disponibles
const submitBooking = async (bookingData: any) => {
  // Simulación de llamada API
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { bookingId: 'booking_' + Date.now(), success: true };
};

const sendConfirmationEmail = async (bookingId: string) => {
  // Simulación de envío de email
  await new Promise(resolve => setTimeout(resolve, 500));
  return { sent: true };
};

interface PagoStripeProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: any) => void;
  formData?: any; // Assuming full form data is passed for booking submission
}

const PagoStripe: React.FC<PagoStripeProps> = ({ onNext, onBack, onDataChange, formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate Stripe payment processing
      // In a real application, you would integrate Stripe Elements here
      // and get a payment token.
      const stripeToken = 'tok_visa'; // Placeholder token

      const bookingData = {
        serviceId: formData?.service?.id,
        selectedTime: formData?.selectedTime,
        clientName: formData?.clientName,
        clientEmail: formData?.clientEmail,
        clientPhone: formData?.clientPhone,
        stripeToken: stripeToken,
      };

      const bookingResponse = await submitBooking(bookingData);
      console.log('Booking successful:', bookingResponse);

      // Simulate sending confirmation email
      await sendConfirmationEmail(bookingResponse.bookingId); // Assuming bookingResponse has a bookingId

      setPaymentSuccess(true);
      onDataChange({ bookingConfirmation: bookingResponse });
      onNext();
    } catch (err) {
      setError('Error al procesar el pago o la reserva.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Pago con Stripe</h2>

      {/* Simulación del formulario de Stripe */}
      <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CreditCard className="h-6 w-6 text-blue-600" />
          <span className="font-medium text-gray-700">Pago Seguro</span>
        </div>
        <p className="text-center text-gray-600 mb-2">
          Aquí se integraría el formulario de pago de Stripe.
        </p>
        <p className="text-center text-gray-600 text-sm">
          Simulando pago exitoso...
        </p>

        {/* Simulación de campos de tarjeta */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de tarjeta
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-400">
              •••• •••• •••• ••••
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MM/AA
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-400">
                ••/••
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-400">
                •••
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen del pago */}
      {formData?.service && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Resumen del pago</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">{formData.service.name}</span>
            <span className="font-semibold text-gray-900">{formData.service.price}€</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Atrás
        </button>
        <button
          onClick={handlePayment}
          disabled={loading || paymentSuccess}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{loading ? 'Procesando...' : 'Pagar y Confirmar'}</span>
        </button>
      </div>
    </div>
  );
};

export default PagoStripe;
