import React, { useState } from 'react';
import GraficosProgresion from './components/GraficosProgresion';
import ModeloPredictivo from './components/ModeloPredictivo';
import AnalisisCorrelaciones from './components/AnalisisCorrelaciones';
import BenchmarkingElite from './components/BenchmarkingElite';
import VentanasDesarrollo from './components/VentanasDesarrollo';
import ImpactoLesiones from './components/ImpactoLesiones';
import AlertasDesviacion from './components/AlertasDesviacion';
import OptimizacionCargas from './components/OptimizacionCargas';
import ReportesEvolucion from './components/ReportesEvolucion';

const HistorialRendimientoPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Rendimiento - Datos Longitudinales</h1>

      <div className="mb-4">
        <label htmlFor="timeframe-select" className="mr-2">Vista Temporal:</label>
        <select
          id="timeframe-select"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
          className="p-2 border rounded"
        >
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>
      </div>

      <GraficosProgresion timeframe={timeframe} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <ModeloPredictivo />
        <AnalisisCorrelaciones />
        <BenchmarkingElite />
        <VentanasDesarrollo />
        <ImpactoLesiones />
        <AlertasDesviacion />
        <OptimizacionCargas />
        <ReportesEvolucion />
      </div>
    </div>
  );
};

export default HistorialRendimientoPage;
