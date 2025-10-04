
import React from 'react';

const PrecioSuscripcion: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Elige tu Plan de Membresía</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Membresía Anual</h3>
          <p className="text-6xl font-extrabold text-purple-700 mb-4">$299<span className="text-xl font-medium text-gray-600">/año</span></p>
          <p className="text-lg text-gray-600 mb-6">Ahorra un 20% con el plan anual.</p>
          <ul className="text-left text-gray-700 mb-8 space-y-2">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Acceso ilimitado a todos los cursos
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Entrenamientos exclusivos
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Soporte prioritario
            </li>
          </ul>
          <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-700 transition duration-300 w-full">
            Elegir Plan Anual
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrecioSuscripcion;
