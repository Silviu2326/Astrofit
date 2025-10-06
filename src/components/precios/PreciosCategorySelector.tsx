import React from 'react';
import { Users, Rocket, Dumbbell, Trophy } from 'lucide-react';

interface PreciosCategorySelectorProps {
  selectedCategory: 'solo' | 'creator' | 'studio' | 'teams';
  onCategoryChange: (category: 'solo' | 'creator' | 'studio' | 'teams') => void;
}

export const PreciosCategorySelector: React.FC<PreciosCategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Qué eres tú?</h2>
        <p className="text-gray-400">Selecciona tu perfil y te mostramos TUS planes en 30 segundos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => onCategoryChange('solo')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            selectedCategory === 'solo'
              ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
          }`}
        >
          <Users className="w-10 h-10 mx-auto mb-3 text-blue-400 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
          <h3 className="font-bold text-lg mb-2">Entrenador Personal</h3>
          <p className="text-sm text-gray-400">1 persona, múltiples clientes</p>
        </button>

        <button
          onClick={() => onCategoryChange('creator')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            selectedCategory === 'creator'
              ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
          }`}
        >
          <Rocket className="w-10 h-10 mx-auto mb-3 text-purple-400 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
          <h3 className="font-bold text-lg mb-2">Creador / Influencer</h3>
          <p className="text-sm text-gray-400">Cursos, comunidades, contenido</p>
        </button>

        <button
          onClick={() => onCategoryChange('studio')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            selectedCategory === 'studio'
              ? 'border-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
          }`}
        >
          <Dumbbell className="w-10 h-10 mx-auto mb-3 text-orange-400 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
          <h3 className="font-bold text-lg mb-2">Gimnasio / Box</h3>
          <p className="text-sm text-gray-400">Clases, check-in, múltiples coaches</p>
        </button>

        <button
          onClick={() => onCategoryChange('teams')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            selectedCategory === 'teams'
              ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
          }`}
        >
          <Trophy className="w-10 h-10 mx-auto mb-3 text-green-400 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
          <h3 className="font-bold text-lg mb-2">Equipo Deportivo</h3>
          <p className="text-sm text-gray-400">Alto rendimiento, analytics, scouting</p>
        </button>
      </div>
    </section>
  );
};
