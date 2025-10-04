// src/features/historial-asistencias/HistorialAsistenciasPage.tsx
import React, { useState, useEffect } from 'react';
import { TablaEntradas } from './components/TablaEntradas';
import { FiltrosAvanzados } from './components/FiltrosAvanzados';
import { EstadisticasAcceso } from './components/EstadisticasAcceso';
import { getAttendanceEntries, AttendanceEntry } from './historialAsistenciasApi';

// Importar los nuevos componentes de Big Data Analytics
import MLPrediccionAusencias from './components/MLPrediccionAusencias';
import PatronesEstacionales from './components/PatronesEstacionales';
import CorrelacionesExternas from './components/CorrelacionesExternas';
import SegmentacionComportamientos from './components/SegmentacionComportamientos';
import RecomendacionesPersonalizadas from './components/RecomendacionesPersonalizadas';
import AnalisisSentiment from './components/AnalisisSentiment';
import PrediccionChurn from './components/PrediccionChurn';
import OptimizacionHorarios from './components/OptimizacionHorarios';
import ABTestingPoliticas from './components/ABTestingPoliticas';
import DataWarehouse from './components/DataWarehouse';
import DashboardTiempoReal from './components/DashboardTiempoReal';
import VisualizacionesInteractivas from './components/VisualizacionesInteractivas';
import MapasCalorAnimados from './components/MapasCalorAnimados';
import ExportacionBI from './components/ExportacionBI';
import AlertasInteligentes from './components/AlertasInteligentes';
import StorytellingDatos from './components/StorytellingDatos';

const HistorialAsistenciasPage: React.FC = () => {
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<AttendanceEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('all'); // 'all', 'today', 'yesterday', 'week'

  useEffect(() => {
    const fetchedEntries = getAttendanceEntries();
    setEntries(fetchedEntries);
    setFilteredEntries(fetchedEntries);
  }, []);

  useEffect(() => {
    let currentFiltered = entries;

    // Apply date filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday

    if (filterDate === 'today') {
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.hora);
        return entryDate.toDateString() === today.toDateString();
      });
    } else if (filterDate === 'yesterday') {
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.hora);
        return entryDate.toDateString() === yesterday.toDateString();
      });
    } else if (filterDate === 'week') {
      currentFiltered = currentFiltered.filter(entry => {
        const entryDate = new Date(entry.hora);
        return entryDate >= startOfWeek && entryDate <= new Date();
      });
    }

    // Apply search term filter
    if (searchTerm) {
      currentFiltered = currentFiltered.filter(entry =>
        entry.cliente.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEntries(currentFiltered);
  }, [entries, searchTerm, filterDate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Asistencias</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <EstadisticasAcceso entries={filteredEntries} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <FiltrosAvanzados
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <TablaEntradas entries={filteredEntries} />
      </div>

      {/* Sección de Big Data Analytics */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Big Data Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MLPrediccionAusencias />
        <PatronesEstacionales />
        <CorrelacionesExternas />
        <SegmentacionComportamientos />
        <RecomendacionesPersonalizadas />
        <AnalisisSentiment />
        <PrediccionChurn />
        <OptimizacionHorarios />
        <ABTestingPoliticas />
        <DataWarehouse />
        <DashboardTiempoReal />
        <VisualizacionesInteractivas />
        <MapasCalorAnimados />
        <ExportacionBI />
        <AlertasInteligentes />
        <StorytellingDatos />
      </div>
    </div>
  );
};

export default HistorialAsistenciasPage;
