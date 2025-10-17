import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Post, User, Comment } from '../../feed-comunidad/types';
import InteraccionesSociales from './InteraccionesSociales';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const currentUser: User = { id: 'user1', name: 'Entrenador Juan', avatar: '🏋️‍♂️' }; // Simulaci??n de usuario actual

  const handleLikeToggle = async () => {
    try {
      await feedComunidadApi.toggleLike(currentPost.id, currentUser.id);
      const wasLiked = currentPost.likes.includes(currentUser.id);
      setCurrentPost(prev => ({
        ...prev,
        likes: wasLiked
          ? prev.likes.filter(id => id !== currentUser.id)
          : [...prev.likes, currentUser.id],
      }));
      toast.success(wasLiked ? 'Like removido' : '¡Te gusta este post!');
    } catch (error) {
      toast.error('Error al actualizar like');
    }
  };

  const handleAddComment = async (commentContent: string) => {
    try {
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
    } catch (error) {
      throw error; // Re-throw to be handled by InteraccionesSociales
    }
  };

  const handleShare = async () => {
    try {
      await feedComunidadApi.sharePost(currentPost.id);
      setCurrentPost(prev => ({ ...prev, shares: prev.shares + 1 }));
      toast.success('Post compartido');
    } catch (error) {
      toast.error('Error al compartir post');
    }
  };

  const handleVote = async (optionId: string) => {
    try {
      await feedComunidadApi.voteOnPoll(currentPost.id, optionId, currentUser.id);
      setCurrentPost(prev => ({
        ...prev,
        pollOptions: prev.pollOptions?.map(opt =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      }));
      toast.success('Voto registrado');
    } catch (error) {
      toast.error('Error al votar');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full mr-3 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg">
          {currentPost.author.avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{currentPost.author.name}</p>
          <p className="text-sm text-gray-500">{currentPost.timestamp.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{currentPost.content}</p>

      {currentPost.media.length > 0 && (
        <div className="mb-4">
          {currentPost.media.map((mediaItem, index) => (
            mediaItem.type === 'image' ? (
              <img key={index} src={mediaItem.url} alt="Post media" className="rounded-lg w-full" />
            ) : (
              <video key={index} src={mediaItem.url} controls className="rounded-lg w-full"></video>
            )
          ))}
        </div>
      )}

      {currentPost.type === 'poll' && currentPost.pollOptions && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="font-semibold mb-2">Encuesta:</p>
          {currentPost.pollOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between mb-2">
              <span className="text-gray-700">{option.text}</span>
              <button
                onClick={() => handleVote(option.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
              >
                Votar ({option.votes})
              </button>
            </div>
          ))}
        </div>
      )}

      <InteraccionesSociales
        likes={currentPost.likes}
        comments={currentPost.comments}
        shares={currentPost.shares}
        onLikeToggle={handleLikeToggle}
        onAddComment={handleAddComment}
        onShare={handleShare}
        currentUser={currentUser}
      />
    </div>
  );
};

export default PostCard;
