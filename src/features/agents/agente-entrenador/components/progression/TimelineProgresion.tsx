import React from 'react';

const TimelineProgresion: React.FC = () => {
  return (
    <div className="timeline-progresion">
      <h2>Progreso del Atleta</h2>
      {/* Timeline visual de progresión con hitos importantes */}
      <p>Aquí se mostrará una línea de tiempo visual con los hitos de progresión del atleta.</p>
      {/* Ejemplo de hito */}
      <div className="milestone">
        <h3>Hito: Nuevo PR en Sentadilla</h3>
        <p>Fecha: 2025-09-15</p>
        <p>Detalles: Levantó 150kg por 1 repetición.</p>
      </div>
      {/* Más hitos... */}
    </div>
  );
};

export default TimelineProgresion;
