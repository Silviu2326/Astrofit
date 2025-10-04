import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Dumbbell className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">TrainerPro</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/producto')} className="hidden md:block hover:text-blue-400 transition-colors">Producto</button>
          <button onClick={() => navigate('/precios')} className="hidden md:block hover:text-blue-400 transition-colors">Precios</button>
          <a href="#comparativa" className="hidden md:block hover:text-blue-400 transition-colors">vs Competencia</a>
          <a href="#proof" className="hidden md:block hover:text-blue-400 transition-colors">Testimonios</a>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            Acceder
          </button>
        </div>
      </div>
    </header>
  );
};
