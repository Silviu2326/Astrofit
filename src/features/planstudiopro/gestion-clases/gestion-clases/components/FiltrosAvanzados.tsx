import React, { useState } from 'react';

interface FiltrosAvanzadosProps {
  onFilterChange: (filters: { instructor?: string; intensity?: string; schedule?: string }) => void;
  instructors: string[];
  intensities: string[];
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({ onFilterChange, instructors, intensities }) => {
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const handleFilter = () => {
    onFilterChange({
      instructor: selectedInstructor || undefined,
      intensity: selectedIntensity || undefined,
      schedule: selectedSchedule || undefined,
    });
  };

  return (
    <div className="filtros-avanzados">
      <h3>Filtros Avanzados</h3>
      <select value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
        <option value="">Todos los Instructores</option>
        {instructors.map(instructor => (
          <option key={instructor} value={instructor}>{instructor}</option>
        ))}
      </select>
      <select value={selectedIntensity} onChange={(e) => setSelectedIntensity(e.target.value)}>
        <option value="">Todas las Intensidades</option>
        {intensities.map(intensity => (
          <option key={intensity} value={intensity}>{intensity}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Horario (ej. '09:00')"
        value={selectedSchedule}
        onChange={(e) => setSelectedSchedule(e.target.value)}
      />
      <button onClick={handleFilter}>Aplicar Filtros</button>
      <p>Filtros por instructor, horario, nivel de intensidad.</p>
    </div>
  );
};

export default FiltrosAvanzados;
