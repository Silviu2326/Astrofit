import React, { useState } from 'react';
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
      setMensaje('Por favor, complete todos los campos.');
      return;
    }

    setMensaje('Procesando pago...');
    try {
      const pagoData = {
        afiliadoId: afiliadoSeleccionado.id,
        monto,
        metodoPagoId,
        fecha: new Date().toISOString(),
        estado: 'procesado', // O 'pendiente' si requiere aprobación
      };
      await pagosAfiliadosApi.registrarPago(pagoData);
      setMensaje('Pago procesado con éxito.');
      // Aquí podrías actualizar el saldo pendiente del afiliado o recargar el historial de pagos
    } catch (error) {
      setMensaje('Error al procesar el pago.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Enviar Nuevo Pago</h3>
      <form onSubmit={handleSubmitPago} className="space-y-4">
        <div>
          <label htmlFor="afiliado" className="block text-sm font-medium text-gray-700">Seleccionar Afiliado</label>
          <select
            id="afiliado"
            name="afiliado"
            onChange={handleAfiliadoChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Monto a Pagar</label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={monto}
                onChange={handleMontoChange}
                min="0.01"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">Método de Pago</label>
              <select
                id="metodoPago"
                name="metodoPago"
                value={metodoPagoId}
                onChange={handleMetodoPagoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Procesar Pago
            </button>
          </>
        )}
        {mensaje && <p className="mt-4 text-sm text-center text-gray-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default ProcesadorPagos;
