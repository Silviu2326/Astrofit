import React from 'react';
import { PlaceholderImages } from '../../../../../../utils/placeholderImages';

interface ReproductorIntegradoProps {
  videoUrl: string;
  title: string;
}

const ReproductorIntegrado: React.FC<ReproductorIntegradoProps> = ({ videoUrl, title }) => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <video controls className="w-full h-auto" poster={PlaceholderImages.video()}>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta la reproducci??n de videos.
      </video>
      {title && <p className="text-white p-2 text-center text-lg font-medium">{title}</p>}
    </div>
  );
};

export default ReproductorIntegrado;
