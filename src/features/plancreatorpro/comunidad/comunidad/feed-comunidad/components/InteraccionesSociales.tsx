import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ThumbsUp, Send, Smile, MoreVertical, Reply, Clock } from 'lucide-react';
import { Comment, User } from '../../feed-comunidad/types';

interface InteraccionesSocialesProps {
  likes: string[];
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
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      onAddComment(newCommentText);
      setNewCommentText('');
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Ahora';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);
  const hasMoreComments = comments.length > 3;

  return (
    <div>
      {/* Lista de comentarios */}
      {comments.length > 0 && (
        <div className="space-y-4 mb-4">
          <AnimatePresence>
            {displayedComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 group"
              >
                {/* Avatar del comentarista */}
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
                />

                {/* Contenido del comentario */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-3 relative">
                    {/* Menú de opciones del comentario */}
                    <button className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-white rounded-full transition-all duration-300">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-gray-900">
                          {comment.author.name}
                        </h4>
                        {comment.author.role && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-full">
                            {comment.author.role}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>

                  {/* Acciones del comentario */}
                  <div className="flex items-center gap-4 mt-2 px-3">
                    <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-pink-600 transition-colors">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes?.length || 0}</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Reply className="w-3 h-3" />
                      <span>Responder</span>
                    </button>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(comment.timestamp)}</span>
                    </div>
                  </div>

                  {/* Respuestas (threading) */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 ml-4 pl-4 border-l-2 border-gray-200 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          />
                          <div className="flex-1">
                            <div className="bg-white rounded-xl p-2 border border-gray-200">
                              <h5 className="font-bold text-xs text-gray-900">{reply.author.name}</h5>
                              <p className="text-xs text-gray-700">{reply.content}</p>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{getTimeAgo(reply.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input para responder */}
                  <AnimatePresence>
                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 ml-4"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          />
                          <input
                            type="text"
                            placeholder="Escribe una respuesta..."
                            className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none text-sm"
                            autoFocus
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            <Send className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Botón "Ver todos los comentarios" */}
          {hasMoreComments && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors ml-13"
            >
              Ver todos los {comments.length} comentarios
            </button>
          )}
        </div>
      )}

      {/* Input para nuevo comentario */}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
        />
        <div className="flex-1 flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-2 border-2 border-gray-200 focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-100 transition-all duration-300">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            type="button"
            className="p-1 hover:bg-white rounded-full transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!newCommentText.trim()}
          className={`p-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
            newCommentText.trim()
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default InteraccionesSociales;
