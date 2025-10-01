import React from 'react';

interface ComprobantePagoProps {
  pago: {
    id: string;
    afiliadoNombre: string;
    monto: number;
    fecha: string;
    metodo: string;
    transaccionId?: string;
  };
}

const ComprobantePago: React.FC<ComprobantePagoProps> = ({ pago }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Comprobante de Pago</h2>
        <p className="text-sm text-gray-500">Fecha de Emisión: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-700"><strong>ID de Pago:</strong> {pago.id}</p>
        <p className="text-gray-700"><strong>Afiliado:</strong> {pago.afiliadoNombre}</p>
        <p className="text-gray-700"><strong>Fecha del Pago:</strong> {new Date(pago.fecha).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Método de Pago:</strong> {pago.metodo}</p>
        {pago.transaccionId && <p className="text-gray-700"><strong>ID de Transacción:</strong> {pago.transaccionId}</p>}
      </div>

      <div className="text-center mb-6 p-4 bg-gray-50 rounded-md">
        <p className="text-lg text-gray-800"><strong>Monto Pagado:</strong></p>
        <p className="text-4xl font-extrabold text-green-600">${pago.monto.toFixed(2)}</p>
      </div>

      <div className="text-sm text-gray-600 border-t pt-4 mt-4">
        <p>Este es un comprobante de pago generado automáticamente. Por favor, consérvelo para sus registros fiscales.</p>
        <p className="mt-2">Para cualquier consulta, contacte con nuestro soporte.</p>
      </div>
    </div>
  );
};

export default ComprobantePago;
