import React, { useState } from 'react';
import { Comment, User } from '../../feed-comunidad/types';

interface InteraccionesSocialesProps {
  likes: string[]; // IDs de usuarios que dieron like
  comments: Comment[];
  shares: number;
  onLikeToggle: () => void;
  onAddComment: (commentContent: string) => void;
  onShare: () => void;
  currentUser: User;
}

const InteraccionesSociales: React.FC<InteraccionesSocialesProps> = ({
  likes,
  comments,
  shares,
  onLikeToggle,
  onAddComment,
  onShare,
  currentUser,
}) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');

  const hasLiked = likes.includes(currentUser.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      onAddComment(newCommentText);
      setNewCommentText('');
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <div className="flex justify-around items-center text-gray-600 mb-4">
        <button onClick={onLikeToggle} className="flex items-center space-x-1 hover:text-blue-600 transition duration-150">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${hasLiked ? 'text-red-500' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>{likes.length} Likes</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 hover:text-blue-600 transition duration-150">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.516 12.274 2 11.104 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9H7v2h2V9z" clipRule="evenodd" />
          </svg>
          <span>{comments.length} Comentarios</span>
        </button>
        <button onClick={onShare} className="flex items-center space-x-1 hover:text-blue-600 transition duration-150">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span>{shares} Compartir</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <div className="space-y-3 mb-4">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">S?? el primero en comentar.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <img src={comment.author.avatar} alt={comment.author.name} className="w-7 h-7 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{comment.author.name}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <p className="text-xs text-gray-500">{comment.timestamp.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InteraccionesSociales;
