import React, { useMemo, useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info, ExternalLink } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  actionRequired: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onViewDetails?: (notification: Notification) => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, onViewDetails }) => {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(() => notifications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getIconColors = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
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

  const selectedNotification = useMemo(() => localNotifications.find(n => n.id === selectedId) || null, [localNotifications, selectedId]);

  const unreadCount = useMemo(() => localNotifications.filter(n => !n.read).length, [localNotifications]);
  const actionRequiredCount = useMemo(() => localNotifications.filter(n => n.actionRequired && !n.read).length, [localNotifications]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Notificaciones</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            {unreadCount} nuevas
          </span>
          {actionRequiredCount > 0 && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
              {actionRequiredCount} requieren acción
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {localNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border-l-4 transition-colors ${
                getNotificationColors(notification.type)
              } ${!notification.read ? 'ring-1 ring-blue-200' : 'opacity-75'} ${selectedId === notification.id ? 'ring-2 ring-indigo-300' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getIconColors(notification.type)}`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium text-sm ${
                      !notification.read ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {notification.actionRequired && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                          Acción requerida
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    !notification.read ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {notification.message}
                  </p>

                  {notification.actionRequired && !notification.read && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          if (onViewDetails) {
                            onViewDetails(notification);
                          } else {
                            setSelectedId(notification.id);
                          }
                        }}
                        className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <span>Ver detalles</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => setLocalNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n))}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Marcar como leída
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {localNotifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No hay notificaciones</p>
        </div>
      )}

      {!onViewDetails && selectedNotification && (
        <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedNotification.type === 'success' ? 'bg-green-100 text-green-700' :
                  selectedNotification.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  selectedNotification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {selectedNotification.type}
                </span>
                <span className="text-xs text-gray-500">{formatTimeAgo(selectedNotification.timestamp)}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{selectedNotification.title}</h4>
              <p className="text-gray-700 whitespace-pre-line">{selectedNotification.message}</p>
            </div>
            <div className="flex items-center gap-2">
              {!selectedNotification.read && (
                <button
                  onClick={() => setLocalNotifications(prev => prev.map(n => n.id === selectedNotification.id ? { ...n, read: true } : n))}
                  className="px-3 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
                >
                  Marcar como leída
                </button>
              )}
              <button
                onClick={() => setSelectedId(null)}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
          {selectedNotification.actionRequired && (
            <div className="mt-3">
              <button
                onClick={() => {
                  // Acción simulada
                  setLocalNotifications(prev => prev.map(n => n.id === selectedNotification.id ? { ...n, read: true } : n));
                }}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ExternalLink className="h-4 w-4" /> Ir a la sección relacionada
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};