import React from 'react';
import './VistaDiaria.css'; // Assuming a CSS file for styling

interface ClassEvent {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  coach: string;
}

interface VistaDiariaProps {
  date: Date;
  events: ClassEvent[];
}

const VistaDiaria: React.FC<VistaDiariaProps> = ({ date, events }) => {
  // Simple timeline representation
  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':').map(Number);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="vista-diaria">
      <h3>Vista Diaria - {date.toLocaleDateString()}</h3>
      <div className="timeline">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className="timeline-hour">
            <span className="hour-label">{formatTime(`${hour}:00`)}</span>
            <div className="hour-events">
              {events
                .filter(event => parseInt(event.startTime.split(':')[0]) === hour)
                .map(event => (
                  <div key={event.id} className="timeline-event">
                    {event.name} ({event.coach})
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p>Modo vista diaria con timeline detallado.</p>
    </div>
  );
};

export default VistaDiaria;
