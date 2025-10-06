import React from 'react';

interface MockupInteractivoProps {
  children: React.ReactNode;
  platform: 'iOS' | 'Android';
}

const MockupInteractivo: React.FC<MockupInteractivoProps> = ({ children, platform }) => {
  const isIOS = platform === 'iOS';
  const mockupClasses = isIOS
    ? 'relative w-80 h-[600px] bg-black rounded-[40px] shadow-xl flex items-center justify-center overflow-hidden'
    : 'relative w-80 h-[600px] bg-black rounded-2xl shadow-xl flex items-center justify-center overflow-hidden';

  const screenClasses = isIOS
    ? 'w-[92%] h-[96%] rounded-[30px] bg-white overflow-hidden'
    : 'w-[95%] h-[97%] rounded-lg bg-white overflow-hidden';

  return (
    <div className={`mt-8 ${mockupClasses}`}>
      {/* Simulate notch for iOS */}
      {isIOS && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-6 bg-black rounded-b-xl z-10"></div>
      )}
      {/* Simulate home button for older iOS or navigation for Android */}
      {isIOS && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 border-2 border-gray-700 rounded-full z-10"></div>
      )}
      {!isIOS && (
        <div className="absolute bottom-0 w-full h-10 bg-gray-800 flex justify-around items-center z-10">
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <div className="w-10 h-6 bg-gray-600 rounded"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-sm"></div>
        </div>
      )}
      <div className={screenClasses}>
        {children}
      </div>
    </div>
  );
};

export default MockupInteractivo;
