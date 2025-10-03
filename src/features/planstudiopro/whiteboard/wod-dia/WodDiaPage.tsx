import React, { useState } from 'react';
import PizarraDigital from './components/PizarraDigital';
import EditorWod from './components/EditorWod';
import VistaPrevia from './components/VistaPrevia';
import IASugerencias from './components/IASugerencias';
import BibliotecaEjercicios from './components/BibliotecaEjercicios';
import EscalamientoAutomatico from './components/EscalamientoAutomatico';
import ComentariosRatings from './components/ComentariosRatings';
import IntegracionWearables from './components/IntegracionWearables';
import ChallengesSemanales from './components/ChallengesSemanales';
import ProgresionDificultad from './components/ProgresionDificultad';
import WODsColaborativos from './components/WODsColaborativos';
import SistemaBadges from './components/SistemaBadges';
import AnalisisPatrones from './components/AnalisisPatrones';
import EditorDragDrop from './components/EditorDragDrop';
import Vista3D from './components/Vista3D';
import TimerMotivacional from './components/TimerMotivacional';
import CompartirSocial from './components/CompartirSocial';
import ModoCoach from './components/ModoCoach';
import RealidadAumentada from './components/RealidadAumentada';
import { Wod, getMockWod } from './wodDiaApi';

const WodDiaPage: React.FC = () => {
  const [wodContent, setWodContent] = useState<string>('');
  const [currentWod, setCurrentWod] = useState<Wod | null>(null);

  React.useEffect(() => {
    // Load a mock WOD on initial render
    setCurrentWod(getMockWod());
  }, []);

  const handleSaveWod = (content: string) => {
    setWodContent(content);
    // In a real application, you would save this to a backend
    // For now, we'll just update the preview
    setCurrentWod({
      id: 'preview-wod',
      type: 'Custom',
      description: content,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">WOD del Día</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Pizarra Digital */}
        <div className="md:col-span-2">
          <PizarraDigital wod={currentWod} />
        </div>

        {/* Editor y Vista Previa */}
        <div className="space-y-8">
          <EditorWod onSave={handleSaveWod} />
          <VistaPrevia wodContent={wodContent} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center my-8 text-yellow-400">Funcionalidades Avanzadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <IASugerencias />
        <BibliotecaEjercicios />
        <EscalamientoAutomatico />
        <ComentariosRatings />
        <IntegracionWearables />
        <ChallengesSemanales />
        <ProgresionDificultad />
        <WODsColaborativos />
        <SistemaBadges />
        <AnalisisPatrones />
        <EditorDragDrop />
        <Vista3D />
        <TimerMotivacional />
        <CompartirSocial />
        <ModoCoach />
        <RealidadAumentada />
      </div>
    </div>
  );
};

export default WodDiaPage;
