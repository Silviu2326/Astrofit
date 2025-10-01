import React, { useState } from 'react';
import { Mail, User, CreditCard, AlertCircle, Reply, Archive, Star } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  type: 'client' | 'system' | 'payment';
}

interface MessageCenterProps {
  messages: Message[];
}

export const MessageCenter: React.FC<MessageCenterProps> = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'client': return User;
      case 'payment': return CreditCard;
      case 'system': return AlertCircle;
      default: return Mail;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `hace ${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `hace ${days}d`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
      {/* Lista de mensajes */}
      <div className="lg:col-span-1 border-r border-gray-200 pr-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Mensajes</h3>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            {messages.filter(m => !m.read).length} nuevos
          </span>
        </div>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {messages.map((message) => {
            const Icon = getMessageIcon(message.type);
            
            return (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  getPriorityColor(message.priority)
                } ${!message.read ? 'bg-blue-50' : 'bg-white'} ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm ${!message.read ? 'font-semibold' : 'font-medium'} text-gray-800 truncate`}>
                        {message.sender}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(message.timestamp)}
                      </span>
                    </div>
                    <p className={`text-sm ${!message.read ? 'font-medium' : ''} text-gray-600 truncate`}>
                      {message.subject}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vista del mensaje seleccionado */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedMessage.subject}</h3>
                <p className="text-sm text-gray-600">De: {selectedMessage.sender}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                  <Reply className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50">
                  <Star className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                  <Archive className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-line">{selectedMessage.content}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  selectedMessage.priority === 'high' 
                    ? 'bg-red-100 text-red-700'
                    : selectedMessage.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}>
                  Prioridad {selectedMessage.priority === 'high' ? 'Alta' : selectedMessage.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(selectedMessage.timestamp)}
                </span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                Responder
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Selecciona un mensaje para ver su contenido</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};