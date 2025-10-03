import React, { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

const mockChatMessages: ChatMessage[] = [
  { id: '1', sender: 'Ana García', message: 'Hola a todos!', timestamp: '10:00 AM' },
  { id: '2', sender: 'Juan Pérez', message: 'Bienvenidos a la sesión.', timestamp: '10:01 AM' },
  { id: '3', sender: 'Luis Martínez', message: 'Qué tal estáis?', timestamp: '10:02 AM' },
];

const ChatLateral: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Simulate sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-1/2">
      <h2 className="text-lg font-semibold mb-3">Chat en Tiempo Real</h2>
      <div className="flex-1 overflow-y-auto mb-4 border-b pb-4">
        {mockChatMessages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="text-sm font-medium">{msg.sender} <span className="text-gray-500 text-xs">({msg.timestamp})</span></p>
            <p className="text-gray-700">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatLateral;
