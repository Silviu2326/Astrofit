import React, { useEffect, useState } from 'react';

interface SistemaNotificacionesProps {
  message: string | null;
}

const SistemaNotificaciones: React.FC<SistemaNotificacionesProps> = ({ message }) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (message) {
      setNotifications(prev => [...prev, message]);
      // Simulate push notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nueva Notificación de Clase', { body: message });
      } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Nueva Notificación de Clase', { body: message });
          }
        });
      }
    }
  }, [message]);

  return (
    <div className="sistema-notificaciones">
      <h3>Sistema de Notificaciones Push</h3>
      {notifications.length > 0 && (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      )}
      <p>Notificaciones push cuando se liberan cupos.</p>
    </div>
  );
};

export default SistemaNotificaciones;
