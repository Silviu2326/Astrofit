import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip, Image as ImageIcon, Video, AlertCircle, CheckCircle2, MessageSquare, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'trainer' | 'client';
  text: string;
  timestamp: string;
  attachments?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }[];
  exerciseRef?: string; // Referencia a ejercicio específico
  painReport?: {
    location: string;
    severity: 1 | 2 | 3 | 4 | 5;
    description: string;
  };
}

interface ClientCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientId: string;
}

const ClientCommunicationModal: React.FC<ClientCommunicationModalProps> = ({
  isOpen,
  onClose,
  clientName,
  clientId
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'client',
      text: 'Hola! Tengo una duda sobre el press de banca de hoy',
      timestamp: '10:30',
      exerciseRef: 'Press de Banca'
    },
    {
      id: '2',
      sender: 'trainer',
      text: 'Claro! Dime, ¿qué necesitas?',
      timestamp: '10:32'
    },
    {
      id: '3',
      sender: 'client',
      text: 'Siento molestia en el hombro derecho al bajar la barra. ¿Es normal?',
      timestamp: '10:35',
      painReport: {
        location: 'Hombro derecho',
        severity: 3,
        description: 'Molestia al bajar la barra'
      }
    },
    {
      id: '4',
      sender: 'trainer',
      text: 'No deberías sentir dolor. Prueba a reducir el rango de movimiento (no bajar tanto la barra) y bajar el peso un 20%. Si persiste, suspende el ejercicio.',
      timestamp: '10:37'
    },
    {
      id: '5',
      sender: 'client',
      text: 'Te mando un vídeo de cómo lo estoy haciendo',
      timestamp: '10:40',
      attachments: [{
        type: 'video',
        url: '#',
        thumbnail: 'https://via.placeholder.com/150'
      }]
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showPainReport, setShowPainReport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'trainer',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col border border-blue-500/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between border-b border-blue-400/30 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{clientName}</h2>
              <p className="text-blue-100 text-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Activo ahora
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'trainer' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'trainer' ? 'order-2' : 'order-1'}`}>
                  {/* Exercise Reference */}
                  {message.exerciseRef && (
                    <div className="mb-1 text-xs text-blue-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Referencia: {message.exerciseRef}
                    </div>
                  )}

                  {/* Pain Report Alert */}
                  {message.painReport && (
                    <div className="mb-2 bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-red-300 mb-1">
                            Reporte de Molestia/Dolor
                          </div>
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>📍 Ubicación: {message.painReport.location}</div>
                            <div className="flex items-center gap-2">
                              <span>⚠️ Severidad:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-3 h-3 rounded-full ${
                                      level <= message.painReport!.severity ? 'bg-red-500' : 'bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>💬 {message.painReport.description}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-3 ${
                      message.sender === 'trainer'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((att, idx) => (
                          <div key={idx} className="relative">
                            {att.type === 'video' && (
                              <div className="relative rounded-lg overflow-hidden bg-black/50">
                                <img
                                  src={att.thumbnail}
                                  alt="Video thumbnail"
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Video className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              </div>
                            )}
                            {att.type === 'image' && (
                              <img
                                src={att.url}
                                alt="Attachment"
                                className="rounded-lg max-h-48 object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'trainer' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700">
          <div className="flex gap-2 text-xs">
            <button className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
              📋 Plantillas de respuesta
            </button>
            <button className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
              🎯 Ejercicios alternativos
            </button>
            <button className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors">
              ✅ Marcar como resuelto
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 rounded-b-2xl">
          <div className="flex items-end gap-2">
            {/* Attachment Buttons */}
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-purple-400">
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPainReport(!showPainReport)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                rows={2}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Pain Report Form */}
          <AnimatePresence>
            {showPainReport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <div className="text-sm font-semibold text-red-300 mb-2">
                  Formulario de Molestia/Dolor (Vista Cliente)
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>El cliente puede reportar:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Ubicación del dolor/molestia</li>
                    <li>Severidad (1-5)</li>
                    <li>Descripción detallada</li>
                    <li>Adjuntar vídeo de ejecución</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientCommunicationModal;
