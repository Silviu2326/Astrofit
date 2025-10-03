import React from 'react';
import DashboardPostSesion from './components/DashboardPostSesion';
import HeatmapsMovimiento from './components/HeatmapsMovimiento';
import CurvasIntensidad from './components/CurvasIntensidad';
import AnalisisAsimetrias from './components/AnalisisAsimetrias';
import CorrelacionCargaInterna from './components/CorrelacionCargaInterna';
import ModeloFatiga from './components/ModeloFatiga';
import BenchmarkingNormativo from './components/BenchmarkingNormativo';
import ReportesCientificos from './components/ReportesCientificos';
import IntegracionAnalisisVideo from './components/IntegracionAnalisisVideo';

const InformesSensoresPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Análisis Post-Sesión de Sensores</h1>
      <p className="text-gray-600 mb-6">Página principal con análisis completo post-entrenamiento.</p>
      <DashboardPostSesion />
      <HeatmapsMovimiento />
      <CurvasIntensidad />
      <AnalisisAsimetrias />
      <CorrelacionCargaInterna />
      <ModeloFatiga />
      <BenchmarkingNormativo />
      <ReportesCientificos />
      <IntegracionAnalisisVideo />
    </div>
  );
};

export default InformesSensoresPage;
