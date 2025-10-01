import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Send, Search, Filter, MoreVertical, 
  Phone, Video, Mail, Paperclip, Smile, Clock,
  Check, CheckCheck, User, Users, Archive, Star
} from 'lucide-react';
import { ConversationList } from './components/ConversationList';
import { ConversationView } from './components/ConversationView';
import { MessageComposer } from './components/MessageComposer';
import { messagingApi } from './messagingApi';

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

const MensajeriaPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived' | 'unread'>('all');
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    const data = await messagingApi.getConversations();
    setConversations(data);
  };

  const loadMessages = async (conversationId: string) => {
    const data = await messagingApi.getMessages(conversationId);
    setMessages(data);
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!selectedConversation || !content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: 'trainer',
      senderName: 'Entrenador',
      content: content.trim(),
      timestamp: new Date(),
      type,
      status: 'sent',
      isFromClient: false
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: content, lastMessageTime: new Date() }
        : conv
    ));

    // Send to API
    await messagingApi.sendMessage(selectedConversation.id, content, type);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unreadCount > 0) ||
                         conv.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mensajería</h1>
              <p className="text-gray-600">Comunícate con tus clientes en tiempo real</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {totalUnread > 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {totalUnread} sin leer
              </div>
            )}
            <button
              onClick={() => setIsComposing(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Nuevo Mensaje
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar - Lista de conversaciones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-1/3 bg-white border-r border-gray-200 flex flex-col"
        >
          {/* Filtros y búsqueda */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Todas', count: conversations.length },
                { key: 'unread', label: 'Sin leer', count: conversations.filter(c => c.unreadCount > 0).length },
                { key: 'active', label: 'Activas', count: conversations.filter(c => c.status === 'active').length },
                { key: 'archived', label: 'Archivadas', count: conversations.filter(c => c.status === 'archived').length }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === filter.key
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>

          {/* Lista de conversaciones */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={filteredConversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </div>
        </motion.div>

        {/* Área principal - Conversación */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 flex flex-col bg-gray-50"
        >
          {selectedConversation ? (
            <>
              {/* Header de la conversación */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {selectedConversation.clientName.charAt(0)}
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.clientName}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.isOnline ? 'En línea' : 'Última vez hace 2 horas'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4">
                <ConversationView
                  messages={messages}
                  conversation={selectedConversation}
                />
              </div>

              {/* Composer */}
              <div className="bg-white border-t border-gray-200 p-4">
                <MessageComposer
                  onSendMessage={sendMessage}
                  disabled={!selectedConversation}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Selecciona una conversación</h3>
                <p className="text-gray-400">Elige una conversación para comenzar a chatear</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MensajeriaPage;
