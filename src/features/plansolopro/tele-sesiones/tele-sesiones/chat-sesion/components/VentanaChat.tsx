import React from 'react';
import BurbujasMensaje from './BurbujasMensaje';
import InputMensaje from './InputMensaje';

interface Message {
  id: number;
  text: string;
  sender: 'self' | 'other';
  timestamp: string;
}

interface VentanaChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const VentanaChat: React.FC<VentanaChatProps> = ({ messages, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <BurbujasMensaje key={message.id} message={message} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <InputMensaje onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default VentanaChat;
