import React, { useEffect, useState } from 'react';
import { fetchReviews, Review } from '../opinionesResenasApi';

const TestimoniosPublicos: React.FC = () => {
  const [publicTestimonials, setPublicTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPublicTestimonials = async () => {
      setLoading(true);
      const reviews = await fetchReviews({ status: 'approved' });
      setPublicTestimonials(reviews);
      setLoading(false);
    };
    fetchPublicTestimonials();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando testimonios públicos...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Testimonios Públicos</h2>
      {publicTestimonials.length === 0 ? (
        <p className="text-gray-600">No hay testimonios públicos aprobados disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {publicTestimonials.map((testimonial) => (
            <li key={testimonial.id} className="bg-green-50 p-4 rounded-md shadow-sm border border-green-200">
              <p className="font-medium text-gray-800">{testimonial.clientName} - <span className="text-yellow-500">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</span></p>
              <p className="text-gray-700 mt-1">"{testimonial.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">Publicado: {testimonial.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestimoniosPublicos;
