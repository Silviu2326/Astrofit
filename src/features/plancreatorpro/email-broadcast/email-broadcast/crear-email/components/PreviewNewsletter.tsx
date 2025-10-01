import React from 'react';

const PreviewNewsletter: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Previsualización del Email (Newsletter)</h2>
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        {/* Aquí se mostrará la live preview en tiempo real del email */}
        <p className="text-gray-500 mb-3">Así se verá tu email en diferentes dispositivos.</p>
        <div className="flex justify-center space-x-4 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Vista Escritorio</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Vista Móvil</button>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4 min-h-[300px] overflow-auto">
          {/* Contenido del email renderizado para previsualización */}
          <h3 className="text-2xl font-bold mb-2">Título de tu Newsletter</h3>
          <p className="text-gray-700 mb-4">Este es un párrafo de ejemplo para la previsualización de tu newsletter. Aquí verás cómo se renderiza el contenido que has arrastrado y soltado en el editor.</p>
          <img src="https://via.placeholder.com/400x150" alt="Placeholder" className="max-w-full h-auto mb-4 rounded-md" />
          <p className="text-gray-700 mb-4">Puedes ver cómo las imágenes y los textos se adaptan al diseño responsive.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold">¡Haz clic aquí!</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewNewsletter;
