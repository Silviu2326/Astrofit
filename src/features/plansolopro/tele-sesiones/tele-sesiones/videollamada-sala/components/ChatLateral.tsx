import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Smile, Paperclip } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

const mockChatMessages: ChatMessage[] = [
  { id: '1', sender: 'Ana García', message: 'Hola a todos!', timestamp: '10:00 AM', isOwn: false },
  { id: '2', sender: 'Juan Pérez', message: 'Bienvenidos a la sesión.', timestamp: '10:01 AM', isOwn: false },
  { id: '3', sender: 'Tú', message: 'Gracias por la invitación', timestamp: '10:02 AM', isOwn: true },
  { id: '4', sender: 'Luis Martínez', message: '¿Qué tal estáis?', timestamp: '10:02 AM', isOwn: false },
];

const ChatLateral: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'Tú',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-4 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Chat en Vivo</h3>
            <p className="text-xs text-blue-100">{messages.length} mensajes</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.isOwn
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-bold mb-1 opacity-80">{msg.sender}</p>
                  )}
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>

                {/* Timestamp */}
                <div className={`flex items-center gap-1 mt-1 px-2 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
              </div>

              {/* Avatar */}
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold ml-2 order-2 flex-shrink-0">
                  {msg.sender.charAt(0)}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/60 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center gap-2">
          {/* Emoji Button */}
          <button
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 flex-shrink-0"
            title="Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none text-white placeholder-gray-400"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white transition-all duration-300 shadow-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            title="Enviar"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-2">
          <button className="text-xs text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
            <Paperclip className="w-3 h-3" />
            <span>Adjuntar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLateral;
