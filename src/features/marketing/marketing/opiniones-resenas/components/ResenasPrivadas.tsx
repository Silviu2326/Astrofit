import React, { useEffect, useState } from 'react';
import { fetchReviews, Review } from '../opinionesResenasApi';

const ResenasPrivadas: React.FC = () => {
  const [privateReviews, setPrivateReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrivateReviews = async () => {
      setLoading(true);
      const reviews = await fetchReviews({ status: 'approved' });
      setPrivateReviews(reviews);
      setLoading(false);
    };
    fetchPrivateReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando reseñas privadas...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Reseñas Privadas (Feedback Interno)</h2>
      {privateReviews.length === 0 ? (
        <p className="text-gray-600">No hay reseñas privadas disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {privateReviews.map((review) => (
            <li key={review.id} className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
              <p className="font-medium text-gray-800">{review.clientName} - <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></p>
              <p className="text-gray-700 mt-1">"{review.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">Fecha: {review.date}</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                review.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {review.status === 'pending' ? 'Pendiente' : review.status === 'approved' ? 'Aprobada' : 'Rechazada'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResenasPrivadas;
