import React from 'react';
import TablaResultados from '../components/TablaResultados';
import MedallasDigitales from '../components/MedallasDigitales';
import FiltrosCompetencia from '../components/FiltrosCompetencia';
import { useLeaderboardData } from '../leaderboardApi';

// Importar los nuevos componentes
import LigasDivisiones from './components/LigasDivisiones';
import CompetenciasInterGyms from './components/CompetenciasInterGyms';
import SistemaHandicap from './components/SistemaHandicap';
import TorneosBracket from './components/TorneosBracket';
import StreamingVivo from './components/StreamingVivo';
import ApuestasVirtuales from './components/ApuestasVirtuales';
import RankingsHistoricos from './components/RankingsHistoricos';
import CompetenciasGrupales from './components/CompetenciasGrupales';
import IntegracionFederaciones from './components/IntegracionFederaciones';
import APIPublica from './components/APIPublica';
import EfectosCelebracion from './components/EfectosCelebracion';
import ComentariosTiempoReal from './components/ComentariosTiempoReal';
import PerfilesAtletas from './components/PerfilesAtletas';
import GaleriaFotos from './components/GaleriaFotos';
import SistemaFans from './components/SistemaFans';
import TransmisionMultiCamara from './components/TransmisionMultiCamara';

const LeaderboardPage: React.FC = () => {
  const { data, loading, error } = useLeaderboardData();

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard de Competencia Global</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <FiltrosCompetencia />
        <MedallasDigitales />
        <LigasDivisiones />
        <CompetenciasInterGyms />
        <SistemaHandicap />
        <TorneosBracket />
        <StreamingVivo />
        <ApuestasVirtuales />
        <RankingsHistoricos />
        <CompetenciasGrupales />
        <IntegracionFederaciones />
        <APIPublica />
        <EfectosCelebracion />
        <ComentariosTiempoReal />
        <PerfilesAtletas />
        <GaleriaFotos />
        <SistemaFans />
        <TransmisionMultiCamara />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Resultados Generales</h2>
      <TablaResultados results={data} />
    </div>
  );
};

export default LeaderboardPage;