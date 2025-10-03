import React, { useState } from 'react';
import { Post, User, Comment, PollOption } from '../../feed-comunidad/types';
import InteraccionesSociales from './InteraccionesSociales';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const currentUser: User = { id: 'user1', name: 'Entrenador Juan', avatar: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=EJ' }; // Simulaci??n de usuario actual

  const handleLikeToggle = async () => {
    await feedComunidadApi.toggleLike(currentPost.id, currentUser.id);
    setCurrentPost(prev => ({
      ...prev,
      likes: prev.likes.includes(currentUser.id)
        ? prev.likes.filter(id => id !== currentUser.id)
        : [...prev.likes, currentUser.id],
    }));
  };

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

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img src={currentPost.author.avatar} alt={currentPost.author.name} className="w-10 h-10 rounded-full mr-3" />
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
