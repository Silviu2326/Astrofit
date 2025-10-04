import React, { useEffect, useState } from 'react';
import { fetchReviews, Review } from '../opinionesResenasApi';

const WidgetResenas: React.FC = () => {
  const [publicReviews, setPublicReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPublicReviews = async () => {
      setLoading(true);
      const reviews = await fetchReviews({ status: 'approved' });
      setPublicReviews(reviews);
      setLoading(false);
    };
    fetchPublicReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando widget de reseñas...</p>;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Lo que dicen nuestros clientes</h2>
      {publicReviews.length === 0 ? (
        <p className="text-center text-lg">Sé el primero en dejar una reseña.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicReviews.slice(0, 3).map((review) => ( // Displaying up to 3 reviews for the widget
            <div key={review.id} className="bg-white text-gray-800 p-5 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl mr-1">{'★'.repeat(review.rating)}</span>
                  <span className="text-gray-600 text-sm">({review.rating}/5)</span>
                </div>
                <p className="italic text-lg mb-3">"{review.comment}"</p>
              </div>
              <p className="font-semibold text-right text-purple-700">- {review.clientName}</p>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
        <button className="bg-white text-purple-700 hover:bg-purple-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Ver todas las reseñas
        </button>
      </div>
    </div>
  );
};

export default WidgetResenas;
