import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CreditCard, User, DollarSign } from 'lucide-react';
import { pagosAfiliadosApi } from '../pagosAfiliadosApi';

interface Afiliado {
  id: string;
  nombre: string;
  saldoPendiente: number;
  metodosPago: { id: string; nombre: string; tipo: string; detalles: string }[];
}

const ProcesadorPagos: React.FC = () => {
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState<Afiliado | null>(null);
  const [monto, setMonto] = useState<number>(0);
  const [metodoPagoId, setMetodoPagoId] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Simulación de una lista de afiliados
  const afiliados: Afiliado[] = [
    {
      id: 'aff1',
      nombre: 'Afiliado Uno',
      saldoPendiente: 150.75,
      metodosPago: [
        { id: 'mp1', nombre: 'Transferencia Bancaria', tipo: 'transferencia', detalles: 'ES12...' },
        { id: 'mp2', nombre: 'PayPal', tipo: 'paypal', detalles: 'aff1@paypal.com' },
      ],
    },
    {
      id: 'aff2',
      nombre: 'Afiliado Dos',
      saldoPendiente: 230.00,
      metodosPago: [
        { id: 'mp3', nombre: 'Stripe', tipo: 'stripe', detalles: 'card_xxxx' },
      ],
    },
  ];

  const handleAfiliadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const afiliado = afiliados.find(a => a.id === selectedId);
    setAfiliadoSeleccionado(afiliado || null);
    setMonto(afiliado ? afiliado.saldoPendiente : 0);
    setMetodoPagoId(afiliado && afiliado.metodosPago.length > 0 ? afiliado.metodosPago[0].id : '');
    setMensaje('');
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonto(parseFloat(e.target.value));
  };

  const handleMetodoPagoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMetodoPagoId(e.target.value);
  };

  const handleSubmitPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!afiliadoSeleccionado || monto <= 0 || !metodoPagoId) {
      toast.error('Por favor, completa todos los campos correctamente');
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading('Procesando pago...');
    try {
      const pagoData = {
        afiliadoId: afiliadoSeleccionado.id,
        monto,
        metodoPagoId,
        fecha: new Date().toISOString(),
        estado: 'procesado', // O 'pendiente' si requiere aprobación
      };
      await pagosAfiliadosApi.registrarPago(pagoData);
      toast.dismiss(loadingToast);
      toast.success(`Pago de $${monto.toFixed(2)} procesado exitosamente para ${afiliadoSeleccionado.nombre}`);
      
      // Reset form
      setAfiliadoSeleccionado(null);
      setMonto(0);
      setMetodoPagoId('');
      setMensaje('');
      
      // Aquí podrías actualizar el saldo pendiente del afiliado o recargar el historial de pagos
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error al procesar el pago. Por favor, inténtalo de nuevo');
      console.error('Error al procesar pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Procesar Pagos
            </h3>
            <p className="text-sm text-gray-500">Envía pagos a tus afiliados de forma segura</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-slate-200/50">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Enviar Nuevo Pago</h4>
          <form onSubmit={handleSubmitPago} className="space-y-4">
            <div>
              <label htmlFor="afiliado" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Seleccionar Afiliado
              </label>
              <select
                id="afiliado"
                name="afiliado"
                onChange={handleAfiliadoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                defaultValue=""
                required
              >
                <option value="" disabled>Selecciona un afiliado</option>
                {afiliados.map((afiliado) => (
                  <option key={afiliado.id} value={afiliado.id}>
                    {afiliado.nombre} (Saldo: ${afiliado.saldoPendiente.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

        {afiliadoSeleccionado && (
          <>
            <div>
              <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Monto a Pagar
              </label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={monto}
                onChange={handleMontoChange}
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline w-4 h-4 mr-1" />
                Método de Pago
              </label>
              <select
                id="metodoPago"
                name="metodoPago"
                value={metodoPagoId}
                onChange={handleMetodoPagoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                required
              >
                <option value="" disabled>Selecciona un método de pago</option>
                {afiliadoSeleccionado.metodosPago.map((metodo) => (
                  <option key={metodo.id} value={metodo.id}>
                    {metodo.nombre} ({metodo.tipo.charAt(0).toUpperCase() + metodo.tipo.slice(1)})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <CreditCard className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-pulse' : ''}`} />
              {isProcessing ? 'Procesando...' : 'Procesar Pago'}
            </button>
          </>
        )}
        {mensaje && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">{mensaje}</p>
          </div>
        )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcesadorPagos;
