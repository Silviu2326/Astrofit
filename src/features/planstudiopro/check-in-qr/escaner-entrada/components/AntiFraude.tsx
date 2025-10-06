
import React from 'react';

const AntiFraude: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Sistema Anti-Fraude (Machine Learning)</h3>
      <p>An??lisis de patrones para detectar y prevenir intentos de fraude en tiempo real.</p>
      {/* Aqu?? ir??a la l??gica de simulaci??n de ML anti-fraude */}
      <div className="mt-4 bg-green-600 text-white p-3 rounded-md text-center">
        <p>Estado: <span className="font-bold">Activo - Sin Amenazas Detectadas</span></p>
      </div>
    </div>
  );
};

export default AntiFraude;
