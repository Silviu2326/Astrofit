import React from 'react';

interface ReproductorIntegradoProps {
  videoUrl: string;
  title: string;
}

const ReproductorIntegrado: React.FC<ReproductorIntegradoProps> = ({ videoUrl, title }) => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <video controls className="w-full h-auto" poster="https://via.placeholder.com/640x360.png?text=Cargando+Video">
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta la reproducci??n de videos.
      </video>
      {title && <p className="text-white p-2 text-center text-lg font-medium">{title}</p>}
    </div>
  );
};

export default ReproductorIntegrado;
