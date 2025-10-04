import React, { useState } from 'react';
import EmojisSelector from './EmojisSelector';

interface InputMensajeProps {
  onSendMessage: (message: string) => void;
}

const InputMensaje: React.FC<InputMensajeProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojis(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          😊
        </button>
        {showEmojis && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojisSelector onSelectEmoji={handleEmojiSelect} />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Enviar
      </button>
    </form>
  );
};

export default InputMensaje;
