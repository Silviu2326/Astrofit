import React from 'react';
import VideotecaPrivada from './components/VideotecaPrivada';
import GaleriaVideos from './components/GaleriaVideos';
import EtiquetasVideo from './components/EtiquetasVideo';

const ContenidosVideoPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Biblioteca de Contenidos - Videos</h1>
      
      <div className="mb-8">
        <EtiquetasVideo />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GaleriaVideos />
        </div>
        <div className="md:col-span-1">
          <VideotecaPrivada />
        </div>
      </div>
    </div>
  );
};

export default ContenidosVideoPage;
