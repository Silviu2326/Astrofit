import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Link,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Pin,
  Trash2,
  Edit,
} from 'lucide-react';
import { CommunityGroup, GroupPost } from '../types';

interface GroupFeedProps {
  group: CommunityGroup;
}

const GroupFeed: React.FC<GroupFeedProps> = ({ group }) => {
  const [newPost, setNewPost] = useState('');

  // Mock posts data
  const mockPosts: GroupPost[] = [
    {
      id: '1',
      groupId: group.id,
      authorId: 'user1',
      authorName: 'Ana García',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      content: '¡Hola a todos! Acabo de lanzar mi nuevo proyecto web. Me encantaría recibir feedback de la comunidad. Está construido con React y TypeScript.',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'],
      likes: 45,
      comments: 12,
      shares: 3,
      isPinned: true,
      isLiked: false,
      createdAt: new Date('2024-10-01T10:30:00'),
    },
    {
      id: '2',
      groupId: group.id,
      authorId: 'user2',
      authorName: 'Carlos Ruiz',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      content: '¿Alguien ha probado las nuevas características de Next.js 14? Me gustaría saber sus opiniones sobre el App Router.',
      likes: 28,
      comments: 8,
      shares: 1,
      isPinned: false,
      isLiked: true,
      createdAt: new Date('2024-10-01T14:15:00'),
    },
    {
      id: '3',
      groupId: group.id,
      authorId: 'user3',
      authorName: 'María López',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      content: 'Compartiendo un tutorial que hice sobre hooks personalizados en React. Espero que les sea útil 🚀',
      images: [
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      ],
      likes: 67,
      comments: 15,
      shares: 9,
      isPinned: false,
      isLiked: true,
      createdAt: new Date('2024-10-01T16:45:00'),
    },
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return 'Hace un momento';
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      {group.isJoined && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué quieres compartir con el grupo?"
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  title="Añadir imagen"
                >
                  <ImageIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  title="Añadir video"
                >
                  <Video className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  title="Añadir enlace"
                >
                  <Link className="w-5 h-5 text-white" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Publicar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20"
          >
            {/* Pinned Badge */}
            {post.isPinned && (
              <div className="px-6 py-2 bg-yellow-500/20 border-b border-white/10 flex items-center gap-2">
                <Pin className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">
                  Publicación fijada
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Author */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-12 h-12 rounded-full bg-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{post.authorName}</h4>
                    <p className="text-white/60 text-sm">{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Content */}
              <p className="text-white/90 mb-4 leading-relaxed">{post.content}</p>

              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src={post.images[0]}
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 py-3 border-t border-b border-white/10 mb-3">
                <span className="text-white/60 text-sm">{post.likes} me gusta</span>
                <span className="text-white/60 text-sm">{post.comments} comentarios</span>
                <span className="text-white/60 text-sm">{post.shares} compartidos</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                    post.isLiked
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  Me gusta
                </button>
                <button className="flex-1 py-3 rounded-xl font-semibold bg-white/5 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Comentar
                </button>
                <button className="flex-1 py-3 rounded-xl font-semibold bg-white/5 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold transition-colors border border-white/20">
        Cargar más publicaciones
      </button>
    </div>
  );
};

export default GroupFeed;
