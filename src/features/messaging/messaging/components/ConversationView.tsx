import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, Paperclip, Image, File } from 'lucide-react';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sent' | 'delivered' | 'read';
  isFromClient: boolean;
}

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

interface ConversationViewProps {
  messages: Message[];
  conversation: Conversation;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  messages,
  conversation
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read': return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'file': return <File className="w-4 h-4" />;
      default: return null;
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Inicia la conversación</h3>
          <p className="text-gray-400">Envía el primer mensaje a {conversation.clientName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
        <div key={dateKey}>
          {/* Separador de fecha */}
          <div className="flex items-center justify-center my-6">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-600">
                {formatDate(new Date(dateKey))}
              </span>
            </div>
          </div>

          {/* Mensajes del día */}
          <div className="space-y-3">
            {dayMessages.map((message, index) => {
              const isFromClient = message.isFromClient;
              const showAvatar = index === 0 || dayMessages[index - 1].isFromClient !== isFromClient;
              const isLastInGroup = index === dayMessages.length - 1 || dayMessages[index + 1].isFromClient !== isFromClient;

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${isFromClient ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Avatar (solo para mensajes del cliente) */}
                  {isFromClient && (
                    <div className="flex-shrink-0">
                      {showAvatar ? (
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {message.senderName.charAt(0)}
                        </div>
                      ) : (
                        <div className="w-8 h-8"></div>
                      )}
                    </div>
                  )}

                  {/* Mensaje */}
                  <div className={`flex flex-col max-w-[70%] ${isFromClient ? 'items-start' : 'items-end'}`}>
                    {/* Nombre del remitente (solo para mensajes del cliente y si es el primero del grupo) */}
                    {isFromClient && showAvatar && (
                      <span className="text-xs font-medium text-gray-600 mb-1 px-1">
                        {message.senderName}
                      </span>
                    )}

                    {/* Burbuja del mensaje */}
                    <div
                      className={`
                        relative px-4 py-3 rounded-2xl shadow-sm
                        ${isFromClient
                          ? 'bg-white border border-gray-200 text-gray-900'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        }
                        ${isLastInGroup ? 'rounded-br-md' : 'rounded-br-2xl'}
                        ${showAvatar && isFromClient ? 'rounded-tl-md' : 'rounded-tl-2xl'}
                      `}
                    >
                      {/* Contenido del mensaje */}
                      <div className="flex items-center gap-2">
                        {getMessageIcon(message.type)}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>

                      {/* Indicador de estado y hora */}
                      <div className={`
                        flex items-center gap-1 mt-2 text-xs
                        ${isFromClient ? 'text-gray-500' : 'text-indigo-100'}
                      `}>
                        <span>{formatTime(message.timestamp)}</span>
                        {!isFromClient && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>

                  {/* Espacio para alineación cuando es mensaje del entrenador */}
                  {!isFromClient && <div className="w-8 h-8 flex-shrink-0"></div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Referencia para scroll automático */}
      <div ref={messagesEndRef} />
    </div>
  );
};
