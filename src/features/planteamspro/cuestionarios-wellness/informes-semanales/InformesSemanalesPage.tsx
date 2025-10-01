
import React from 'react';
import DashboardWellness from './components/DashboardWellness';
import AnalizadorPatrones from './components/AnalizadorPatrones';
import ComparadorPeriodos from './components/ComparadorPeriodos';
import PrediccionRendimiento from './components/PrediccionRendimiento';
import AnalisisCorrelacion from './components/AnalisisCorrelacion';
import DetectorOvertraining from './components/DetectorOvertraining';
import ReportesAutomaticos from './components/ReportesAutomaticos';
import BenchmarkingEquipos from './components/BenchmarkingEquipos';
import RecomendacionesCarga from './components/RecomendacionesCarga';

const InformesSemanalesPage: React.FC = () => {
  return (
    <div className="InformesSemanalesPage">
      <h1>Informes Semanales y Análisis Avanzado</h1>
      <DashboardWellness />
      <AnalizadorPatrones />
      <ComparadorPeriodos />
      <PrediccionRendimiento />
      <AnalisisCorrelacion />
      <DetectorOvertraining />
      <ReportesAutomaticos />
      <BenchmarkingEquipos />
      <RecomendacionesCarga />
    </div>
  );
};

export default InformesSemanalesPage;
