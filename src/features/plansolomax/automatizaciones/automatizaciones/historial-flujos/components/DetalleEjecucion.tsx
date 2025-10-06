
import React from 'react';
import IconosEstado from './IconosEstado';

interface EjecucionFlujo {
  id: string;
  fechaHora: string;
  resultado: 'exito' | 'error';
  detalles: string;
  clienteAfectado: string;
  nombreFlujo: string;
}

interface DetalleEjecucionProps {
  ejecucion: EjecucionFlujo;
  onClose: () => void;
}

const DetalleEjecucion: React.FC<DetalleEjecucionProps> = ({ ejecucion, onClose }) => {
  if (!ejecucion) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Detalles de Ejecución</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-left">
              <strong>ID:</strong> {ejecucion.id}
            </p>
            <p className="text-sm text-gray-500 text-left">
              <strong>Flujo:</strong> {ejecucion.nombreFlujo}
            </p>
            <p className="text-sm text-gray-500 text-left">
              <strong>Fecha/Hora:</strong> {ejecucion.fechaHora}
            </p>
            <p className="text-sm text-gray-500 text-left flex items-center">
              <strong>Resultado:</strong> <IconosEstado estado={ejecucion.resultado} className="ml-2" />
            </p>
            <p className="text-sm text-gray-500 text-left">
              <strong>Cliente Afectado:</strong> {ejecucion.clienteAfectado}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Detalles:</strong>
            </p>
            <p className="text-sm text-gray-500 text-left whitespace-pre-wrap">
              {ejecucion.detalles}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleEjecucion;
