import React from 'react';

const PanelVideo: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center text-white text-2xl">
      {/* Main video feed - simulate with a placeholder */}
      <p>Video del Entrenador</p>
      {/* Potentially add small video feeds for other participants here */}
    </div>
  );
};

export default PanelVideo;
