import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, CheckCheck, Archive, Star } from 'lucide-react';

interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  status: 'active' | 'archived' | 'blocked';
  tags: string[];
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read': return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Archive className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No hay conversaciones</h3>
          <p className="text-gray-400">Las conversaciones aparecerán aquí cuando los clientes te escriban</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.map((conversation, index) => (
        <motion.div
          key={conversation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          onClick={() => onSelectConversation(conversation)}
          className={`
            relative p-4 rounded-xl cursor-pointer transition-all duration-200 group
            ${selectedConversation?.id === conversation.id
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-md'
              : 'hover:bg-gray-50 border-2 border-transparent hover:border-gray-100'
            }
            ${conversation.status === 'archived' ? 'opacity-60' : ''}
          `}
        >
          {/* Indicador de estado */}
          {conversation.status === 'blocked' && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                ${conversation.status === 'blocked' 
                  ? 'bg-gray-400' 
                  : 'bg-gradient-to-br from-indigo-400 to-purple-500'
                }
              `}>
                {conversation.clientName.charAt(0)}
              </div>
              
              {/* Indicador online */}
              {conversation.isOnline && conversation.status !== 'blocked' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`
                  font-semibold truncate
                  ${conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}
                  ${conversation.status === 'blocked' ? 'line-through' : ''}
                `}>
                  {conversation.clientName}
                </h4>
                <div className="flex items-center gap-1">
                  {getStatusIcon('read')}
                  <span className="text-xs text-gray-500 font-medium">
                    {formatTime(conversation.lastMessageTime)}
                  </span>
                </div>
              </div>

              <p className={`
                text-sm truncate mb-2
                ${conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'}
              `}>
                {conversation.lastMessage}
              </p>

              {/* Tags y contador */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {conversation.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {conversation.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{conversation.tags.length - 2}
                    </span>
                  )}
                </div>

                {conversation.unreadCount > 0 && (
                  <div className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Efecto hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
        </motion.div>
      ))}
    </div>
  );
};
