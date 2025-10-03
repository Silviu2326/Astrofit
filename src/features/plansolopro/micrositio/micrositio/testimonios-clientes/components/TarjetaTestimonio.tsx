import React from 'react';
import { Testimonio } from '../../testimoniosClientesApi';

interface TarjetaTestimonioProps {
  testimonio: Testimonio;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const TarjetaTestimonio: React.FC<TarjetaTestimonioProps> = ({ testimonio }) => {
  const commentSizeClass = testimonio.highlighted ? 'text-lg md:text-xl' : 'text-base';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={testimonio.photo}
        alt={testimonio.author}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{testimonio.author}</h3>
      <StarRating rating={testimonio.rating} />
      <p className={`text-gray-600 italic mb-4 ${commentSizeClass}`}>
        "{testimonio.comment}"
      </p>
      <p className="text-sm text-gray-500">Servicio: {testimonio.serviceType}</p>
    </div>
  );
};
