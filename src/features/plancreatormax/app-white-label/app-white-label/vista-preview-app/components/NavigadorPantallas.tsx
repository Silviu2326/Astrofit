import React from 'react';

interface NavigadorPantallasProps {
  screens: string[];
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const NavigadorPantallas: React.FC<NavigadorPantallasProps> = ({ screens, currentScreen, onScreenChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {screens.map((screen) => (
        <button
          key={screen}
          onClick={() => onScreenChange(screen)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${currentScreen === screen
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {screen.charAt(0).toUpperCase() + screen.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default NavigadorPantallas;
