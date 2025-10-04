import React, { useEffect, useState } from 'react';
import { getReviews, updateReviewStatus, Review } from '../opinionesResenasApi';

const ModeracionContenido: React.FC = () => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPendingReviews = async () => {
      setLoading(true);
      const reviews = await getReviews(undefined, 'pending');
      setPendingReviews(reviews);
      setLoading(false);
    };
    fetchPendingReviews();
  }, []);

  const handleModerate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateReviewStatus(id, status);
      setPendingReviews(prevReviews => prevReviews.filter(review => review.id !== id));
      alert(`Reseña ${status === 'approved' ? 'aprobada' : 'rechazada'} con éxito.`);
    } catch (error) {
      console.error('Error al moderar la reseña:', error);
      alert('Hubo un error al moderar la reseña.');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando reseñas pendientes de moderación...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Moderación de Contenido</h2>
      {pendingReviews.length === 0 ? (
        <p className="text-gray-600">No hay reseñas pendientes de moderación.</p>
      ) : (
        <ul className="space-y-4">
          {pendingReviews.map((review) => (
            <li key={review.id} className="bg-yellow-50 p-4 rounded-md shadow-sm border border-yellow-200">
              <p className="font-medium text-gray-800">{review.clientName} - <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></p>
              <p className="text-gray-700 mt-1">"{review.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">Tipo: {review.type === 'private' ? 'Privada' : 'Pública'}</p>
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => handleModerate(review.id, 'approved')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleModerate(review.id, 'rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModeracionContenido;
