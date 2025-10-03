import React from 'react';

const PersonalizacionEstilosPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Personalización de Estilos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aquí se renderizarán los componentes de edición */}
        <div className="bg-white p-4 rounded-lg shadow">Editor Visual</div>
        <div className="bg-white p-4 rounded-lg shadow">Selector de Colores</div>
        <div className="bg-white p-4 rounded-lg shadow">Selector de Tipografías</div>
        <div className="bg-white p-4 rounded-lg shadow">Uploader de Logo</div>
        <div className="bg-white p-4 rounded-lg shadow col-span-full">Preview en Tiempo Real</div>
      </div>
    </div>
  );
};

export default PersonalizacionEstilosPage;
