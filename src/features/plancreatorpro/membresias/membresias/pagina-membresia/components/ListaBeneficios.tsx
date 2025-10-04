
import React from 'react';

const ListaBeneficios: React.FC = () => {
  const benefits = [
    "Acceso ilimitado a todos los cursos premium",
    "Entrenamientos exclusivos en vivo con expertos",
    "Soporte prioritario 24/7",
    "Comunidad privada de miembros",
    "Recursos descargables y plantillas",
    "Actualizaciones de contenido constantes",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Lo que obtendrás con tu membresía</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-sm">
              <svg className="h-8 w-8 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-lg text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListaBeneficios;
