import React from 'react';

interface EmojisSelectorProps {
  onSelectEmoji: (emoji: string) => void;
}

const emojis = ['😀', '😁', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌'];

const EmojisSelector: React.FC<EmojisSelectorProps> = ({ onSelectEmoji }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg grid grid-cols-5 gap-1">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelectEmoji(emoji)}
          className="p-1 hover:bg-gray-200 rounded-md text-xl"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojisSelector;
