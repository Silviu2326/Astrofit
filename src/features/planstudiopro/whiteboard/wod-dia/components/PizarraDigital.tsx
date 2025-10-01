import React from 'react';
import { Wod } from '../wodDiaApi';

interface PizarraDigitalProps {
  wod: Wod | null;
}

const PizarraDigital: React.FC<PizarraDigitalProps> = ({ wod }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 h-full flex flex-col justify-center items-center border-4 border-gray-700" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/chalkboard.png")', backgroundSize: 'cover' }}>
      <h2 className="text-5xl font-extrabold text-yellow-300 mb-6 text-center uppercase tracking-wide">WOD del Día</h2>
      {wod ? (
        <div className="text-center">
          <p className="text-3xl font-semibold text-green-400 mb-4">{wod.type}</p>
          <pre className="text-2xl text-white whitespace-pre-wrap font-mono leading-relaxed">
            {wod.description}
          </pre>
        </div>
      ) : (
        <p className="text-2xl text-gray-400">Cargando WOD...</p>
      )}
    </div>
  );
};

export default PizarraDigital;
