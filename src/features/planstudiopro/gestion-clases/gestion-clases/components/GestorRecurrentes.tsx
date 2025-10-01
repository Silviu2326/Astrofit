import React, { useState } from 'react';

interface RecurrentClass {
  id: string;
  name: string;
  dayOfWeek: number; // 0-6 for Sunday-Saturday
  startTime: string;
  endTime: string;
  coach: string;
}

interface GestorRecurrentesProps {
  recurrentClasses: RecurrentClass[];
  onAddRecurrentClass: (newClass: Omit<RecurrentClass, 'id'>) => void;
  onUpdateRecurrentClass: (id: string, updatedClass: Partial<RecurrentClass>) => void;
  onDeleteRecurrentClass: (id: string) => void;
}

const GestorRecurrentes: React.FC<GestorRecurrentesProps> = ({
  recurrentClasses,
  onAddRecurrentClass,
  onUpdateRecurrentClass,
  onDeleteRecurrentClass,
}) => {
  const [newClassName, setNewClassName] = useState('');
  const [newClassDay, setNewClassDay] = useState(0);
  const [newClassStartTime, setNewClassStartTime] = useState('09:00');
  const [newClassEndTime, setNewClassEndTime] = useState('10:00');
  const [newClassCoach, setNewClassCoach] = useState('');

  const handleAddClass = () => {
    onAddRecurrentClass({
      name: newClassName,
      dayOfWeek: newClassDay,
      startTime: newClassStartTime,
      endTime: newClassEndTime,
      coach: newClassCoach,
    });
    setNewClassName('');
    setNewClassCoach('');
  };

  return (
    <div className="gestor-recurrentes">
      <h3>Gestor de Clases Recurrentes</h3>
      <div>
        <h4>Añadir Clase Recurrente</h4>
        <input
          type="text"
          placeholder="Nombre de la clase"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <select value={newClassDay} onChange={(e) => setNewClassDay(Number(e.target.value))}>
          {[ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, index) => (
            <option key={day} value={index}>{day}</option>
          ))}
        </select>
        <input
          type="time"
          value={newClassStartTime}
          onChange={(e) => setNewClassStartTime(e.target.value)}
        />
        <input
          type="time"
          value={newClassEndTime}
          onChange={(e) => setNewClassEndTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Coach"
          value={newClassCoach}
          onChange={(e) => setNewClassCoach(e.target.value)}
        />
        <button onClick={handleAddClass}>Añadir</button>
      </div>

      <h4>Clases Recurrentes Existentes</h4>
      <ul>
        {recurrentClasses.map(rClass => (
          <li key={rClass.id}>
            {rClass.name} - {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][rClass.dayOfWeek]} {rClass.startTime}-{rClass.endTime} ({rClass.coach})
            <button onClick={() => onDeleteRecurrentClass(rClass.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Gestión de clases recurrentes y excepciones.</p>
    </div>
  );
};

export default GestorRecurrentes;
