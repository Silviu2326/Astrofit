import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2, Eye, Calendar, User, Tag, Clock } from 'lucide-react';
import { Article } from '../mockData';
import toast from 'react-hot-toast';

interface VerArticuloModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const VerArticuloModal: React.FC<VerArticuloModalProps> = ({ isOpen, onClose, article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  if (!article) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Like removido' : '¡Artículo marcado como favorito!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado al portapapeles');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Por favor, escribe un comentario');
      return;
    }
    toast.success('Comentario agregado exitosamente');
    setNewComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl my-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[80vh]">
              {/* Article Image */}
              {article.imageUrl && (
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Article Meta */}
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {article.readTime} min de lectura
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {article.views} vistas
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

                {/* Categories */}
                <div className="flex items-center gap-2 mb-4">
                  {article.categories.map(category => (
                    <span
                      key={category}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="prose max-w-none mb-8">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Attachments */}
                {article.attachments && article.attachments.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Documentos Adjuntos</h3>
                    <div className="space-y-2">
                      {article.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Comentarios ({article.comments.length})
                  </h3>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="mb-6">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Comentar
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {article.comments.length > 0 ? (
                      article.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-indigo-600">
                                {comment.memberName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{comment.memberName}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VerArticuloModal;
