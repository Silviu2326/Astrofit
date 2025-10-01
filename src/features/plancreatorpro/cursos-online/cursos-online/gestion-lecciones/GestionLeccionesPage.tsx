import React from 'react';
import EditorModular from './components/EditorModular';
import BloquesContenido from './components/BloquesContenido';
import SubirVideos from './components/SubirVideos';
import EditorTexto from './components/EditorTexto';
import GestorArchivos from './components/GestorArchivos';

const GestionLeccionesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gesti??n de Lecciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Editor de Contenido</h2>
          <EditorModular />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Bloques de Contenido</h2>
          <BloquesContenido />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Subir Videos</h2>
          <SubirVideos />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Editor de Texto</h2>
          <EditorTexto />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Gestor de Archivos</h2>
          <GestorArchivos />
        </div>
      </div>
      {/* TODO: Implementar orden de lecciones drag & drop y preview */}
    </div>
  );
};

export default GestionLeccionesPage;
