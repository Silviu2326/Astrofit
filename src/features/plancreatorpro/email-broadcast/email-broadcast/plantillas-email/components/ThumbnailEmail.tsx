
import React from 'react';
import { EmailTemplate } from '../plantillasEmailApi';

interface ThumbnailEmailProps {
  template: EmailTemplate;
}

const ThumbnailEmail: React.FC<ThumbnailEmailProps> = ({ template }) => {
  return (
    <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <img src={template.thumbnail} alt={template.name} className="w-full h-32 object-cover rounded-md mb-2" />
      <h3 className="font-medium text-lg">{template.name}</h3>
      <p className="text-sm text-gray-600">{template.category}</p>
      {template.isFavorite && (
        <span className="text-yellow-500 text-sm">⭐ Favorito</span>
      )}
    </div>
  );
};

export default ThumbnailEmail;
