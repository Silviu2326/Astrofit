import React from 'react';

interface WaitlistItem {
  classId: string;
  className: string;
  userId: string;
  userName: string;
  position: number;
}

interface WaitlistAutomaticoProps {
  waitlists: WaitlistItem[];
  onJoinWaitlist: (classId: string, userId: string) => void;
  onLeaveWaitlist: (classId: string, userId: string) => void;
}

const WaitlistAutomatico: React.FC<WaitlistAutomaticoProps> = ({ waitlists, onJoinWaitlist, onLeaveWaitlist }) => {
  return (
    <div className="waitlist-automatico">
      <h3>Sistema de Waitlist Automático</h3>
      {waitlists.length === 0 ? (
        <p>No hay listas de espera activas.</p>
      ) : (
        <ul>
          {waitlists.map((item, index) => (
            <li key={`${item.classId}-${item.userId}`}>
              Clase: {item.className} - Usuario: {item.userName} - Posición: {item.position}
              <button onClick={() => onLeaveWaitlist(item.classId, item.userId)}>Salir de la lista</button>
            </li>
          ))}
        </ul>
      )}
      <p>Sistema de waitlist automático por clase.</p>
    </div>
  );
};

export default WaitlistAutomatico;
