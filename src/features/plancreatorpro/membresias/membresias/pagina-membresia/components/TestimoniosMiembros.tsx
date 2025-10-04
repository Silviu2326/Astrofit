
import React from 'react';

const TestimoniosMiembros: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ana G.',
      feedback: '¡Increíble valor! He aprendido muchísimo y la comunidad es fantástica.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Carlos R.',
      feedback: 'La mejor inversión para mi desarrollo profesional. Los entrenamientos son de primera.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 3,
      name: 'María P.',
      feedback: 'Contenido súper relevante y actualizado. ¡Totalmente recomendado!',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Lo que dicen nuestros miembros</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-purple-200" />
              <p className="text-lg italic text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <p className="font-semibold text-purple-700">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosMiembros;
