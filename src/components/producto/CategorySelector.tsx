import React from 'react';
import { Users, Rocket, Building2, Trophy } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: 'solo' | 'creator' | 'studio' | 'teams';
  onCategoryChange: (category: 'solo' | 'creator' | 'studio' | 'teams') => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Elige tu categoría</h2>
        <p className="text-gray-400 text-lg">Diferentes negocios, diferentes módulos disponibles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => onCategoryChange('solo')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedCategory === 'solo'
              ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-xl shadow-blue-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10'
          }`}
        >
          <Users className="w-10 h-10 mx-auto mb-3 text-blue-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
          <h3 className="font-black text-lg mb-2">SOLO</h3>
          <p className="text-sm text-gray-400">Entrenador Personal</p>
        </button>

        <button
          onClick={() => onCategoryChange('creator')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedCategory === 'creator'
              ? 'border-purple-500 bg-purple-500/20 scale-105 shadow-xl shadow-purple-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10'
          }`}
        >
          <Rocket className="w-10 h-10 mx-auto mb-3 text-purple-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
          <h3 className="font-black text-lg mb-2">CREATOR</h3>
          <p className="text-sm text-gray-400">Influencer / Creador</p>
        </button>

        <button
          onClick={() => onCategoryChange('studio')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedCategory === 'studio'
              ? 'border-orange-500 bg-orange-500/20 scale-105 shadow-xl shadow-orange-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10'
          }`}
        >
          <Building2 className="w-10 h-10 mx-auto mb-3 text-orange-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
          <h3 className="font-black text-lg mb-2">STUDIO</h3>
          <p className="text-sm text-gray-400">Gimnasio / Box</p>
        </button>

        <button
          onClick={() => onCategoryChange('teams')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedCategory === 'teams'
              ? 'border-green-500 bg-green-500/20 scale-105 shadow-xl shadow-green-500/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-green-500/50 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10'
          }`}
        >
          <Trophy className="w-10 h-10 mx-auto mb-3 text-green-400 hover:scale-110 hover:rotate-6 transition-transform duration-300" />
          <h3 className="font-black text-lg mb-2">TEAMS</h3>
          <p className="text-sm text-gray-400">Equipo Deportivo</p>
        </button>
      </div>
    </section>
  );
};
