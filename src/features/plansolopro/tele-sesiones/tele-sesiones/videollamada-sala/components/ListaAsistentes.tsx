import React from 'react';

interface Attendee {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

const mockAttendees: Attendee[] = [
  { id: '1', name: 'Ana García', isMuted: false, isVideoOff: false },
  { id: '2', name: 'Luis Martínez', isMuted: true, isVideoOff: false },
  { id: '3', name: 'María López', isMuted: false, isVideoOff: true },
  { id: '4', name: 'Carlos Ruiz', isMuted: false, isVideoOff: false },
];

const ListaAsistentes: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-1/2 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Asistentes ({mockAttendees.length})</h2>
      <ul>
        {mockAttendees.map((attendee) => (
          <li key={attendee.id} className="flex items-center mb-2">
            <span className="mr-2">
              {attendee.isVideoOff ? '📹 Off' : '📹 On'}
            </span>
            <span className="mr-2">
              {attendee.isMuted ? '🔇' : '🔊'}
            </span>
            <span>{attendee.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaAsistentes;
