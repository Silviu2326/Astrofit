import React from 'react';

interface FiltroPeriodoProps {
  periodo: 'hoy' | 'ayer' | 'semana';
  onSelectPeriodo: (periodo: 'hoy' | 'ayer' | 'semana') => void;
}

const FiltroPeriodo: React.FC<FiltroPeriodoProps> = ({ periodo, onSelectPeriodo }) => {
  const buttonClass = (currentPeriodo: 'hoy' | 'ayer' | 'semana') =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      periodo === currentPeriodo
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`;

  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={buttonClass('hoy')}
        onClick={() => onSelectPeriodo('hoy')}
      >
        Hoy
      </button>
      <button
        className={buttonClass('ayer')}
        onClick={() => onSelectPeriodo('ayer')}
      >
        Ayer
      </button>
      <button
        className={buttonClass('semana')}
        onClick={() => onSelectPeriodo('semana')}
      >
        Última Semana
      </button>
    </div>
  );
};

export default FiltroPeriodo;
