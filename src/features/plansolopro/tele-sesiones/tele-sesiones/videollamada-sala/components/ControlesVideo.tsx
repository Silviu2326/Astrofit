import React from 'react';

const ControlesVideo: React.FC = () => {
  return (
    <div className="bg-gray-700 p-3 rounded-full shadow-lg flex items-center space-x-4">
      <button className="text-white p-2 rounded-full bg-gray-600 hover:bg-gray-500">
        {/* Icon for Mute/Unmute */}
        <span>🎤</span>
      </button>
      <button className="text-white p-2 rounded-full bg-gray-600 hover:bg-gray-500">
        {/* Icon for Video On/Off */}
        <span>📹</span>
      </button>
      <button className="text-white p-2 rounded-full bg-gray-600 hover:bg-gray-500">
        {/* Icon for Share Screen */}
        <span>🖥️</span>
      </button>
      <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
        Salir
      </button>
    </div>
  );
};

export default ControlesVideo;
