import React from 'react';

const CreadorNotificaciones: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <h2 className="text-xl font-semibold mb-3">Crear Nueva Notificación Push</h2>
      {/* Formulario para crear notificaciones: título, mensaje, etc. */}
      <p>Editor de notificaciones push (ej: "Nuevo reto disponible", "Sesión mañana").</p>
    </div>
  );
};

export default CreadorNotificaciones;
