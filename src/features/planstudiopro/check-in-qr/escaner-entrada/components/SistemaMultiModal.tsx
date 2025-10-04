
import React from 'react';
import ReconocimientoFacial from './ReconocimientoFacial';

const SistemaMultiModal: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Sistema MultiModal (QR + Facial + Huella + RFID)</h3>
      <p>Integraci??n de m??ltiples m??todos de autenticaci??n para una seguridad robusta.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-700 p-3 rounded-md">QR Scanner</div>
        <ReconocimientoFacial />
        <div className="bg-gray-700 p-3 rounded-md">Lector de Huella</div>
        <div className="bg-gray-700 p-3 rounded-md">Lector RFID</div>
      </div>
    </div>
  );
};

export default SistemaMultiModal;
