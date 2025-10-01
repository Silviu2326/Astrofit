import React from 'react';

interface MockupNotificacionProps {
  title: string;
  message: string;
  platform: 'ios' | 'android';
}

const MockupNotificacion: React.FC<MockupNotificacionProps> = ({ title, message, platform }) => {
  const platformStyles = platform === 'ios' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white';

  return (
    <div className={`p-3 rounded-lg shadow-md w-64 ${platformStyles}`}>
      <p className="font-bold text-sm">{title}</p>
      <p className="text-xs">{message}</p>
      <p className="text-right text-xs mt-1">{platform === 'ios' ? 'Ahora' : 'just now'}</p>
    </div>
  );
};

export default MockupNotificacion;
