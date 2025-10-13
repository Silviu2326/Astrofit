import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageCircle, Bell, Eye, Edit, Star, Heart, Flag,
  Send, Smile, Image, Paperclip, AtSign, Hash, CheckCircle,
  Clock, Globe, Shield, Zap, Activity, TrendingUp, Award,
  UserPlus, UserMinus, UserCheck, UserX, Settings, MoreHorizontal
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface RealTimeCollaborationProps {
  jugadores: Prospecto[];
  currentUser: {
    id: string;
    name: string;
    avatar: string;
    role: 'scout' | 'manager' | 'analyst' | 'admin';
  };
}

interface Comment {
  id: string;
  playerId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: 'comment' | 'note' | 'rating' | 'flag';
  metadata?: {
    rating?: number;
    flagType?: 'urgent' | 'important' | 'follow-up';
    tags?: string[];
  };
}

interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isActive: boolean;
  currentPlayer?: string;
  lastSeen: Date;
}

interface Activity {
  id: string;
  type: 'view' | 'edit' | 'comment' | 'rating' | 'flag';
  userId: string;
  userName: string;
  playerId: string;
  playerName: string;
  timestamp: Date;
  content?: string;
}

const RealTimeCollaboration: React.FC<RealTimeCollaborationProps> = ({
  jugadores,
  currentUser
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [isTyping, setIsTyping] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activities
      if (Math.random() > 0.7) {
        const randomPlayer = jugadores[Math.floor(Math.random() * jugadores.length)];
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        
        if (randomPlayer && randomUser) {
          const newActivity: Activity = {
            id: Date.now().toString(),
            type: ['view', 'edit', 'comment', 'rating'][Math.floor(Math.random() * 4)] as any,
            userId: randomUser.id,
            userName: randomUser.name,
            playerId: randomPlayer.id,
            playerName: randomPlayer.nombre,
            timestamp: new Date(),
            content: Math.random() > 0.5 ? 'Actualizó la información del jugador' : undefined
          };
          
          setActivities(prev => [newActivity, ...prev].slice(0, 50));
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jugadores, onlineUsers]);

  // Initialize mock data
  useEffect(() => {
    // Mock online users
    const mockUsers: OnlineUser[] = [
      {
        id: '1',
        name: 'Juan Pérez',
        avatar: 'https://via.placeholder.com/40',
        role: 'scout',
        isActive: true,
        currentPlayer: jugadores[0]?.id,
        lastSeen: new Date()
      },
      {
        id: '2',
        name: 'María García',
        avatar: 'https://via.placeholder.com/40',
        role: 'manager',
        isActive: true,
        currentPlayer: jugadores[1]?.id,
        lastSeen: new Date()
      },
      {
        id: '3',
        name: 'Carlos López',
        avatar: 'https://via.placeholder.com/40',
        role: 'analyst',
        isActive: false,
        lastSeen: new Date(Date.now() - 5 * 60 * 1000)
      }
    ];
    setOnlineUsers(mockUsers);

    // Mock comments
    const mockComments: Comment[] = [
      {
        id: '1',
        playerId: jugadores[0]?.id || '',
        userId: '1',
        userName: 'Juan Pérez',
        userAvatar: 'https://via.placeholder.com/40',
        content: 'Excelente jugador, muy recomendado para el equipo',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: 'comment',
        metadata: { tags: ['recomendado', 'talento'] }
      },
      {
        id: '2',
        playerId: jugadores[0]?.id || '',
        userId: '2',
        userName: 'María García',
        userAvatar: 'https://via.placeholder.com/40',
        content: 'Necesita seguimiento más detallado',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        type: 'flag',
        metadata: { flagType: 'follow-up' }
      }
    ];
    setComments(mockComments);
  }, [jugadores]);

  const handleSendComment = () => {
    if (!newComment.trim() || !selectedPlayer) return;

    const comment: Comment = {
      id: Date.now().toString(),
      playerId: selectedPlayer,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newComment,
      timestamp: new Date(),
      type: 'comment'
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setIsTyping(null);
    
    // Scroll to bottom
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTyping = (value: string) => {
    setNewComment(value);
    
    if (value.length > 0) {
      setIsTyping(currentUser.id);
      setTypingUsers(prev => new Set([...prev, currentUser.id]));
    } else {
      setIsTyping(null);
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentUser.id);
        return newSet;
      });
    }

    // Clear typing indicator after 3 seconds
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(null);
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentUser.id);
        return newSet;
      });
    }, 3000);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'scout': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-green-100 text-green-800';
      case 'analyst': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'scout': return Eye;
      case 'manager': return Users;
      case 'analyst': return TrendingUp;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const playerComments = selectedPlayer 
    ? comments.filter(c => c.playerId === selectedPlayer)
    : [];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Colaboración en Tiempo Real</h2>
              <p className="text-blue-100 mt-1">
                {onlineUsers.filter(u => u.isActive).length} usuarios activos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {onlineUsers.slice(0, 3).map((user, index) => (
                <div
                  key={user.id}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  style={{ zIndex: 3 - index }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {onlineUsers.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
                  +{onlineUsers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Player Selection */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-gray-900">Seleccionar Jugador:</h3>
              <select
                value={selectedPlayer || ''}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
              >
                <option value="">Seleccionar jugador...</option>
                {jugadores.map(jugador => (
                  <option key={jugador.id} value={jugador.id}>
                    {jugador.nombre} - {jugador.posicion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                Comentarios {selectedPlayer && `(${playerComments.length})`}
              </h3>
              <div className="flex items-center gap-2">
                {typingUsers.size > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>{Array.from(typingUsers).length} escribiendo...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {playerComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={comment.userAvatar} 
                        alt={comment.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.userName}</span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                        {comment.metadata?.tags && (
                          <div className="flex gap-1">
                            {comment.metadata.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Input */}
            {selectedPlayer && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => handleTyping(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                        placeholder="Escribe un comentario..."
                        className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendComment}
                        disabled={!newComment.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 flex flex-col">
          {/* Online Users */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Usuarios Activos</h3>
              <span className="text-sm text-gray-600">{onlineUsers.filter(u => u.isActive).length}</span>
            </div>
            <div className="space-y-2">
              {onlineUsers.map((user) => {
                const Icon = getRoleIcon(user.role);
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {user.isActive && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.isActive ? 'Activo' : formatTimeAgo(user.lastSeen)}
                        </span>
                      </div>
                    </div>
                    <Icon className="w-4 h-4 text-gray-400" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Actividad Reciente</h3>
              <span className="text-sm text-gray-600">{activities.length}</span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activities.slice(0, 10).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.userName}</span>
                      <span className="text-gray-600"> {activity.type === 'view' ? 'vió' : 
                        activity.type === 'edit' ? 'editó' : 
                        activity.type === 'comment' ? 'comentó' : 'calificó'} </span>
                      <span className="font-semibold">{activity.playerName}</span>
                    </div>
                    <div className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;







