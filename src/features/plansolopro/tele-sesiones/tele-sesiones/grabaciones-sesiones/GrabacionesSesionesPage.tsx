import React, { useState } from 'react';
import VideotecaGrid from './components/VideotecaGrid';
import ReproductorVideo from './components/ReproductorVideo';
import PermisosAcceso from './components/PermisosAcceso';

const GrabacionesSesionesPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);

  const videos = [
    { id: '1', title: 'Sesión 1', thumbnail: 'https://via.placeholder.com/150', date: '2023-01-15', type: 'Consulta', duration: '30:00', size: '50MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '2', title: 'Sesión 2', thumbnail: 'https://via.placeholder.com/150', date: '2023-02-20', type: 'Terapia', duration: '45:00', size: '75MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '3', title: 'Sesión 3', thumbnail: 'https://via.placeholder.com/150', date: '2023-03-10', type: 'Seguimiento', duration: '20:00', size: '30MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ];

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleManagePermissions = () => {
    setShowPermissions(true);
  };

  const handleClosePermissions = () => {
    setShowPermissions(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Grabaciones de Sesiones</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="filterDate" className="mr-2">Filtrar por fecha:</label>
          <input type="date" id="filterDate" className="border p-1 rounded" />
        </div>
        <div>
          <label htmlFor="filterType" className="mr-2">Filtrar por tipo:</label>
          <select id="filterType" className="border p-1 rounded">
            <option value="">Todos</option>
            <option value="Consulta">Consulta</option>
            <option value="Terapia">Terapia</option>
            <option value="Seguimiento">Seguimiento</option>
          </select>
        </div>
        <button onClick={handleManagePermissions} className="bg-blue-500 text-white px-4 py-2 rounded">
          Gestionar Permisos
        </button>
      </div>

      {selectedVideo ? (
        <ReproductorVideo video={selectedVideo} onClose={handleClosePlayer} />
      ) : (
        <VideotecaGrid videos={videos} onVideoSelect={handleVideoSelect} />
      )}

      {showPermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PermisosAcceso onClose={handleClosePermissions} />
        </div>
      )}
    </div>
  );
};

export default GrabacionesSesionesPage;
