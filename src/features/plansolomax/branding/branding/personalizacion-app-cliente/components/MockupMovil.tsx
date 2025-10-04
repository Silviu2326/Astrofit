import React from 'react';
import { PlaceholderImages } from '../../../../../../utils/placeholderImages';

const MockupMovil: React.FC = () => {
  // This component would display a realistic mobile mockup
  // and show a preview of the app with the customized branding.
  // It would likely receive props for logo, splash screen, colors, etc.
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl flex items-center justify-center h-full">
      <div className="relative w-64 h-128 bg-black rounded-3xl shadow-2xl overflow-hidden">
        {/* Screen */}
        <div className="absolute inset-0 m-2 bg-white rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <img src={PlaceholderImages.logo(100)} alt="App Logo" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-600">Mi App Personalizada</h3>
            <p className="text-gray-600">¡Bienvenido a nuestra app!</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Preview iOS / Android</p>
            </div>
          </div>
        </div>
        {/* Notch/Camera */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl"></div>
        {/* Home button/bottom bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full mb-2"></div>
      </div>
    </div>
  );
};

export default MockupMovil;