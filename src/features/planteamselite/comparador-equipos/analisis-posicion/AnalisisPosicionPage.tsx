
import React from 'react';
import TablasPosicionales from './components/TablasPosicionales';

const AnalisisPosicionPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Análisis por Posición - Desglose Posicional</h1>
      <p className="mb-4">Página principal con análisis detallado por posiciones.</p>
      import MapaCalorPosicional from './components/MapaCalorPosicional';
import AnalisisRotaciones from './components/AnalisisRotaciones';
import OptimizadorPosicional from './components/OptimizadorPosicional';
import CompatibilidadJugadores from './components/CompatibilidadJugadores';
import BenchmarkingLigas from './components/BenchmarkingLigas';
import IdentificacionGaps from './components/IdentificacionGaps';
import AnalisisPredictivo from './components/AnalisisPredictivo';
import RecomendacionesFichajes from './components/RecomendacionesFichajes';

      <TablasPosicionales />
      <MapaCalorPosicional />
      <AnalisisRotaciones />
      <OptimizadorPosicional />
      <CompatibilidadJugadores />
      <BenchmarkingLigas />
      <IdentificacionGaps />
      <AnalisisPredictivo />
      <RecomendacionesFichajes />
      {/* Aquí se integrarían los gráficos de barras y otras métricas */}
    </div>
  );
};

export default AnalisisPosicionPage;
