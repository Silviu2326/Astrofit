import React from 'react';

interface LectorQRProps {
  onSimularQR: () => void;
  loading: boolean;
}

const LectorQR: React.FC<LectorQRProps> = ({ onSimularQR, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md mb-6">
      <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full mb-4">
        <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      </div>
      <p className="text-gray-600 mb-4">Apunte la cámara al código QR</p>
      <button
        onClick={onSimularQR}
        disabled={loading}
        className={`px-6 py-3 rounded-md text-white font-semibold transition-colors duration-300
          ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Simulando...' : 'Simular Escaneo QR'}
      </button>
    </div>
  );
};

export default LectorQR;
