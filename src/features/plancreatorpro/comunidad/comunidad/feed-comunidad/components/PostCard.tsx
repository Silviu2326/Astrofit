import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Heart, MessageCircle, Share2, Bookmark, Edit, Trash2, Flag, Eye, EyeOff, Clock, Globe, Users, Lock, Award } from 'lucide-react';
import { Post, User, Comment, PollOption } from '../../feed-comunidad/types';
import InteraccionesSociales from './InteraccionesSociales';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const currentUser: User = {
    id: 'user1',
    name: 'Entrenador Juan',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Entrenador'
  };

  const handleLikeToggle = async () => {
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 600);

    await feedComunidadApi.toggleLike(currentPost.id, currentUser.id);
    setCurrentPost(prev => ({
      ...prev,
      likes: prev.likes.includes(currentUser.id)
        ? prev.likes.filter(id => id !== currentUser.id)
        : [...prev.likes, currentUser.id],
    }));
  };

  const handleSaveToggle = () => {
    setCurrentPost(prev => ({
      ...prev,
      saves: prev.saves?.includes(currentUser.id)
        ? prev.saves.filter(id => id !== currentUser.id)
        : [...(prev.saves || []), currentUser.id],
    }));
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Ahora';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`;
    return `Hace ${Math.floor(seconds / 86400)}d`;
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'Admin': return 'from-red-500 to-orange-500';
      case 'Moderador': return 'from-purple-500 to-pink-500';
      case 'Entrenador': return 'from-blue-500 to-indigo-500';
      case 'Nutricionista': return 'from-green-500 to-emerald-500';
      case 'Atleta': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPrivacyIcon = () => {
    switch (currentPost.privacy) {
      case 'Amigos': return <Users className="w-3 h-3" />;
      case 'Solo yo': return <Lock className="w-3 h-3" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  const isLiked = currentPost.likes.includes(currentUser.id);
  const isSaved = currentPost.saves?.includes(currentUser.id);
  const contentLimit = 300;

  const handleAddComment = async (commentContent: string) => {
    const newComment: Omit<Comment, 'id' | 'timestamp'> = {
      author: currentUser,
      content: commentContent,
    };
    const addedComment = await feedComunidadApi.addComment(currentPost.id, newComment);
    if (addedComment) {
      setCurrentPost(prev => ({
        ...prev,
        comments: [...prev.comments, addedComment],
      }));
    }
  };

  const handleShare = async () => {
    await feedComunidadApi.sharePost(currentPost.id);
    setCurrentPost(prev => ({ ...prev, shares: prev.shares + 1 }));
  };

  const handleVote = async (optionId: string) => {
    await feedComunidadApi.voteOnPoll(currentPost.id, optionId, currentUser.id);
    setCurrentPost(prev => ({
      ...prev,
      pollOptions: prev.pollOptions?.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));
  };

  const totalVotes = currentPost.pollOptions?.reduce((sum, opt) => sum + opt.votes, 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-6 group hover:shadow-2xl transition-all duration-300"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      {/* Achievement badge (si aplica) */}
      {currentPost.achievement && (
        <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center gap-2 shadow-lg">
          <Award className="w-4 h-4 text-white" />
          <span className="text-xs font-bold text-white">Logro</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Header del post */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Avatar */}
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={currentPost.author.avatar}
              alt={currentPost.author.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0 cursor-pointer"
            />

            {/* Info del autor */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900 hover:text-pink-600 cursor-pointer transition-colors">
                  {currentPost.author.name}
                </h3>
                {currentPost.author.role && (
                  <span className={`px-3 py-1 bg-gradient-to-r ${getRoleBadgeColor(currentPost.author.role)} text-white text-xs font-bold rounded-full shadow-sm`}>
                    {currentPost.author.role}
                  </span>
                )}
                {currentPost.isEdited && (
                  <span className="text-xs text-gray-500">(editado)</span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{getTimeAgo(currentPost.timestamp)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {getPrivacyIcon()}
                  <span>{currentPost.privacy || 'Público'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menú de acciones */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl p-2 min-w-[180px] border border-gray-200 z-50"
                >
                  {currentPost.author.id === currentUser.id ? (
                    <>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl transition-colors text-left">
                        <Edit className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">Editar</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-left">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-gray-700">Eliminar</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left">
                        <EyeOff className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">Ocultar post</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-left">
                        <Flag className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-gray-700">Reportar</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contenido del post */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {currentPost.content.length > contentLimit && !showAllContent
              ? currentPost.content.substring(0, contentLimit) + '...'
              : currentPost.content}
          </p>
          {currentPost.content.length > contentLimit && (
            <button
              onClick={() => setShowAllContent(!showAllContent)}
              className="text-pink-600 hover:text-pink-700 font-semibold text-sm mt-2"
            >
              {showAllContent ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>

        {/* Achievement card */}
        {currentPost.achievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200"
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">{currentPost.achievement.icon}</div>
              <div>
                <h4 className="font-bold text-gray-800">{currentPost.achievement.title}</h4>
                <p className="text-sm text-gray-600">{currentPost.achievement.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Galería de medios */}
        {currentPost.media.length > 0 && (
          <div className={`mb-4 grid gap-2 ${currentPost.media.length === 1 ? 'grid-cols-1' : currentPost.media.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
            {currentPost.media.map((mediaItem, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                {mediaItem.type === 'image' ? (
                  <img
                    src={mediaItem.url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover max-h-96"
                  />
                ) : (
                  <video src={mediaItem.url} controls className="w-full max-h-96 rounded-2xl" />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Link preview card */}
        {currentPost.link && (
          <motion.a
            href={currentPost.link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="block mb-4 border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-pink-300 transition-colors"
          >
            {currentPost.link.image && (
              <img src={currentPost.link.image} alt={currentPost.link.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <h4 className="font-bold text-gray-800 mb-1">{currentPost.link.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{currentPost.link.description}</p>
              <p className="text-xs text-gray-500 mt-2">{new URL(currentPost.link.url).hostname}</p>
            </div>
          </motion.a>
        )}

        {/* Poll (Encuesta) */}
        {currentPost.type === 'poll' && currentPost.pollOptions && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Encuesta
            </h4>
            <div className="space-y-3">
              {currentPost.pollOptions.map((option) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                const hasVoted = option.votedBy?.includes(currentUser.id);

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                      hasVoted
                        ? 'border-purple-500 bg-purple-100'
                        : 'border-purple-200 hover:border-purple-400 bg-white'
                    }`}
                  >
                    {/* Barra de progreso */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-30"
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{option.text}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-purple-600">{Math.round(percentage)}%</span>
                        <span className="text-sm text-gray-500">({option.votes})</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'} totales
            </p>
          </div>
        )}

        {/* Stats bar */}
        <div className="flex items-center justify-between py-3 border-t border-b border-gray-200 mb-3">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-pink-600 transition-colors">
              <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
              <span className="font-semibold">{currentPost.likes.length}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold">{currentPost.comments.length}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="font-semibold">{currentPost.shares}</span>
            </button>
          </div>
          {isSaved && (
            <span className="text-xs text-pink-600 font-semibold">Guardado</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLikeToggle}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              isLiked
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${likeAnimation ? 'animate-ping' : ''}`} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline text-sm">Me gusta</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComments(!showComments)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Comentar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Compartir</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveToggle}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              isSaved
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700'
            }`}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Sección de comentarios */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <InteraccionesSociales
                likes={currentPost.likes}
                comments={currentPost.comments}
                shares={currentPost.shares}
                onLikeToggle={handleLikeToggle}
                onAddComment={handleAddComment}
                onShare={handleShare}
                currentUser={currentUser}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostCard;
