import React, { useState, useEffect, useCallback } from 'react';
import CalendarioSemanal from './components/CalendarioSemanal';
import FiltroCategorias from './components/FiltroCategorias';
import DragDropCalendario from './components/DragDropCalendario';
import VistaResponsive from './components/VistaResponsive';
import EstadosAvanzados from './components/EstadosAvanzados';
import WebSocketManager from './components/WebSocketManager';
import SistemaNotificaciones from './components/SistemaNotificaciones';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import VistaDiaria from './components/VistaDiaria';
import GestorRecurrentes from './components/GestorRecurrentes';
import WaitlistAutomatico from './components/WaitlistAutomatico';
import MetricasTiempoReal from './components/MetricasTiempoReal';
import { getClases, Clase, getInstructors, getIntensities, getRecurrentClasses, addRecurrentClass, updateRecurrentClass, deleteRecurrentClass, getWaitlist, joinWaitlist, leaveWaitlist, getMetrics } from './calendarioClasesApi';

const CalendarioClasesPage: React.FC = () => {
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<{ instructor?: string; intensity?: string; schedule?: string }>({});
  const [recurrentClasses, setRecurrentClasses] = useState(getRecurrentClasses());
  const [waitlist, setWaitlist] = useState(getWaitlist());
  const [wsMessage, setWsMessage] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const clases = getClases();
  const instructors = getInstructors();
  const intensities = getIntensities();

  const clasesFiltradas = clases.filter(clase => {
    const categoryMatch = filtroCategoria ? clase.categoria === filtroCategoria : true;
    const instructorMatch = advancedFilters.instructor ? clase.coach === advancedFilters.instructor : true;
    const intensityMatch = advancedFilters.intensity ? clase.intensity === advancedFilters.intensity : true;
    const scheduleMatch = advancedFilters.schedule ? clase.time.startsWith(advancedFilters.schedule) : true;
    return categoryMatch && instructorMatch && intensityMatch && scheduleMatch;
  });

  const handleEventDrop = (id: string, newTime: string, newCoach: string) => {
    console.log(`Event ${id} dropped to ${newTime} with coach ${newCoach}`);
    // Here you would call an API to update the class
  };

  const handleWebSocketMessage = useCallback((message: any) => {
    setWsMessage(message);
    // Example: if a class slot opens up, update waitlist or notify
    if (message.type === 'SLOT_AVAILABLE' && message.classId) {
      // Logic to update waitlist or trigger notification
      console.log(`Slot available for class ${message.classId}`);
    }
  }, []);

  const handleAddRecurrentClass = (newClass: Omit<any, 'id'>) => {
    addRecurrentClass(newClass);
    setRecurrentClasses(getRecurrentClasses());
  };

  const handleUpdateRecurrentClass = (id: string, updatedClass: Partial<any>) => {
    updateRecurrentClass(id, updatedClass);
    setRecurrentClasses(getRecurrentClasses());
  };

  const handleDeleteRecurrentClass = (id: string) => {
    deleteRecurrentClass(id);
    setRecurrentClasses(getRecurrentClasses());
  };

  const handleJoinWaitlist = (classId: string, userId: string) => {
    joinWaitlist(classId, userId);
    setWaitlist(getWaitlist());
  };

  const handleLeaveWaitlist = (classId: string, userId: string) => {
    leaveWaitlist(classId, userId);
    setWaitlist(getWaitlist());
  };

  const fetchRealtimeMetrics = useCallback(async () => {
    return getMetrics();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Clases Premium</h1>

      {/* UX/UI Improvements */}
      {/* <div className="loading-skeleton"></div> */}
      {/* <div className="tooltip">Información</div> */}
      {/* <button onClick={() => toggleTheme()}>Toggle Theme</button> */}
      {/* Keyboard shortcuts can be implemented with global event listeners */}
      {/* Export to PDF/iCal functionality */}

      <div className="flex space-x-4 mb-4">
        <button onClick={() => setCurrentView('weekly')} className={currentView === 'weekly' ? 'font-bold' : ''}>Vista Semanal</button>
        <button onClick={() => setCurrentView('daily')} className={currentView === 'daily' ? 'font-bold' : ''}>Vista Diaria</button>
      </div>

      <FiltroCategorias onSelectCategory={setFiltroCategoria} />
      <FiltrosAvanzados onFilterChange={setAdvancedFilters} instructors={instructors} intensities={intensities} />

      <WebSocketManager onMessage={handleWebSocketMessage} />
      <SistemaNotificaciones message={wsMessage ? `Clase ${wsMessage.classId} tiene un cupo disponible!` : null} />

      {currentView === 'weekly' ? (
        <DragDropCalendario events={clasesFiltradas.map(c => ({ ...c, status: 'available' }))} onEventDrop={handleEventDrop} />
      ) : (
        <VistaDiaria date={selectedDate} events={clasesFiltradas.map(c => ({ ...c, startTime: c.time, endTime: '10:00' }))} /> // Placeholder endTime
      )}

      <VistaResponsive>
        {/* Content for responsive view, e.g., a simplified class list */}
        <p>Contenido de la vista responsive aquí.</p>
        {clasesFiltradas.map(clase => (
          <div key={clase.id} className="border p-2 mb-2">
            <p>{clase.nombre} - {clase.coach}</p>
            <EstadosAvanzados status="available" /> {/* Example status */}
          </div>
        ))}
      </VistaResponsive>

      <GestorRecurrentes
        recurrentClasses={recurrentClasses}
        onAddRecurrentClass={handleAddRecurrentClass}
        onUpdateRecurrentClass={handleUpdateRecurrentClass}
        onDeleteRecurrentClass={handleDeleteRecurrentClass}
      />

      <WaitlistAutomatico
        waitlists={waitlist}
        onJoinWaitlist={handleJoinWaitlist}
        onLeaveWaitlist={handleLeaveWaitlist}
      />

      <MetricasTiempoReal fetchMetrics={fetchRealtimeMetrics} />

      {/* Example usage of EstadosAvanzados */}
      <div className="mt-4">
        <p>Ejemplo de estados:</p>
        <EstadosAvanzados status="full" /> <br />
        <EstadosAvanzados status="available" /> <br />
        <EstadosAvanzados status="cancelled" />
      </div>
    </div>
  );
};

export default CalendarioClasesPage;
