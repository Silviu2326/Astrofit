import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'self' | 'other';
  timestamp: string;
}

interface BurbujasMensajeProps {
  message: Message;
}

const BurbujasMensaje: React.FC<BurbujasMensajeProps> = ({ message }) => {
  const isSelf = message.sender === 'self';
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${isSelf
          ? 'bg-blue-500 text-white'
          : 'bg-gray-300 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className={`text-xs mt-1 block ${isSelf ? 'text-blue-100' : 'text-gray-600'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default BurbujasMensaje;
