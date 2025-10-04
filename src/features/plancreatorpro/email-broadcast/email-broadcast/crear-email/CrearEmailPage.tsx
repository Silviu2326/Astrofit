import React from 'react';
import EditorEmail from './components/EditorEmail';
import BloquesArrastrables from './components/BloquesArrastrables';
import SegmentacionDestinatarios from './components/SegmentacionDestinatarios';
import PreviewNewsletter from './components/PreviewNewsletter';

const CrearEmailPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Email</h1>

      {/* Pruebas A/B de asunto */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Asunto del Email y Pruebas A/B</h2>
        {/* Implementación de input para asunto y lógica de pruebas A/B */}
        <p className="text-gray-600">Aquí se configurará el asunto del email y las opciones para pruebas A/B.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Editor de correos masivos profesional con drag & drop */}
          <EditorEmail />
        </div>
        <div className="lg:col-span-1">
          {/* Bloques arrastrables */}
          <BloquesArrastrables />
        </div>
      </div>

      {/* Segmentación de destinatarios */}
      <div className="mt-6">
        <SegmentacionDestinatarios />
      </div>

      {/* Preview tipo newsletter y live preview en tiempo real */}
      <div className="mt-6">
        <PreviewNewsletter />
      </div>

      {/* Programación de envío */}
      <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Programación de Envío</h2>
        {/* Implementación de selector de fecha/hora y lógica de programación */}
        <p className="text-gray-600">Define cuándo se enviará este email.</p>
      </div>
    </div>
  );
};

export default CrearEmailPage;
