import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, Paperclip, Smile, Image as ImageIcon,
  File, Download, CheckCheck, Clock, ArrowDown, X, User
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

const ChatSesionPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Bienvenido a la sesión',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '2',
      text: 'Hola, gracias por recibirme',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read'
    },
    {
      id: '3',
      text: '¿Cómo puedo ayudarte hoy?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages([...messages, message]);
      setNewMessage('');

      // Simular respuesta
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const response: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Gracias por tu mensaje. ¿Hay algo más en lo que pueda ayudarte?',
            sender: 'other',
            timestamp: new Date(),
            status: 'sent'
          };
          setMessages(prev => [...prev, response]);
        }, 2000);
      }, 500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <MessageCircle className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Chat de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sesión</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Comparte <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">mensajes</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">archivos</span> en tiempo real
          </p>

          {/* Indicadores pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">En línea</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCheck className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-white">Cifrado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
        style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="relative z-10 h-full overflow-y-auto p-6 space-y-4"
          style={{ paddingBottom: '120px' }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-600'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col gap-1">
                    <div className={`rounded-3xl px-5 py-3 shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className={`flex items-center gap-2 p-2 rounded-xl ${
                              message.sender === 'user' ? 'bg-white/20' : 'bg-gray-50'
                            }`}>
                              {attachment.type === 'image' ? (
                                <ImageIcon className="w-4 h-4" />
                              ) : (
                                <File className="w-4 h-4" />
                              )}
                              <span className="text-xs font-medium truncate">{attachment.name}</span>
                              <Download className="w-4 h-4 ml-auto cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp and Status */}
                    <div className={`flex items-center gap-1.5 px-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-gray-500 font-medium">{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <>
                          {message.status === 'sent' && <Clock className="w-3 h-3 text-gray-400" />}
                          {message.status === 'delivered' && <CheckCheck className="w-3 h-3 text-gray-400" />}
                          {message.status === 'read' && <CheckCheck className="w-3 h-3 text-cyan-500" />}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-end gap-2"
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <User className="w-5 h-5" />
                </div>
                <div className="bg-white rounded-3xl rounded-bl-md px-5 py-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to Bottom Button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToBottom}
              className="absolute bottom-32 right-6 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform z-20"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 z-20">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>

            {/* Message Input */}
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Escribe un mensaje..."
                rows={1}
                className="w-full px-5 py-3 pr-12 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white resize-none"
                style={{ maxHeight: '120px' }}
              />

              {/* Emoji Button */}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all ${
                newMessage.trim()
                  ? 'bg-gradient-to-br from-teal-500 to-cyan-600 hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200 hover:border-cyan-300 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-semibold text-cyan-700">Imagen</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <File className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">Archivo</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatSesionPage;
