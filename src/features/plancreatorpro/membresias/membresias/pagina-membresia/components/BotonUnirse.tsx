
import React from 'react';
import toast from 'react-hot-toast';

const BotonUnirse: React.FC = () => {
  const handleJoinNow = () => {
    toast.success('¡Excelente decisión! Redirigiendo al proceso de suscripción...', {
      duration: 3000,
    });
    // Aquí se podría agregar la lógica para redirigir al proceso de suscripción
    // Por ejemplo: window.location.href = '/subscription';
  };

  return (
    <section className="py-16 bg-purple-700 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu futuro?</h2>
        <p className="text-xl mb-8">Únete a miles de profesionales que ya están alcanzando sus metas.</p>
        <button 
          onClick={handleJoinNow}
          className="bg-white text-purple-700 font-bold py-4 px-12 rounded-full text-xl hover:bg-gray-200 transition duration-300 shadow-lg"
        >
          ¡Quiero Unirme Ahora!
        </button>
      </div>
    </section>
  );
};

export default BotonUnirse;
