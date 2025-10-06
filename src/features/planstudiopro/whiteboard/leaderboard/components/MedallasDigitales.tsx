import React from 'react';

const MedallasDigitales: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <span className="text-yellow-500 text-2xl mr-2">🥇</span>
        <span className="text-gray-700">Oro</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-400 text-2xl mr-2">🥈</span>
        <span className="text-gray-700">Plata</span>
      </div>
      <div className="flex items-center">
        <span className="text-amber-700 text-2xl mr-2">🥉</span>
        <span className="text-gray-700">Bronce</span>
      </div>
    </div>
  );
};

export default MedallasDigitales;