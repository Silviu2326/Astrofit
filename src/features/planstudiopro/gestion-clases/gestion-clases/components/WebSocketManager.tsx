import React, { useEffect, useState } from 'react';

interface WebSocketManagerProps {
  onMessage: (message: any) => void;
}

const WebSocketManager: React.FC<WebSocketManagerProps> = ({ onMessage }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws'); // Simulated WebSocket URL
    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };
    socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [onMessage]);

  return (
    <div className="websocket-manager">
      <h3>Conexión en Tiempo Real</h3>
      <p>Estado: {isConnected ? 'Conectado' : 'Desconectado'}</p>
      <p>Integración en tiempo real con WebSocket simulado.</p>
    </div>
  );
};

export default WebSocketManager;
