import React, { useState } from 'react';
import EditorContrato from './components/EditorContrato';
import PlantillasContrato from './components/PlantillasContrato';
import FirmaDigital from './components/FirmaDigital';
import IAClausulasPersonalizadas from './components/IAClausulasPersonalizadas';
import ESignaturesLegales from './components/ESignaturesLegales';
import BlockchainInmutabilidad from './components/BlockchainInmutabilidad';
import AnalisisRiesgosLegales from './components/AnalisisRiesgosLegales';
import IntegracionBasesLegales from './components/IntegracionBasesLegales';
import VersioningInteligente from './components/VersioningInteligente';
import TraduccionMultiidioma from './components/TraduccionMultiidioma';
import ComplianceRegulaciones from './components/ComplianceRegulaciones';
import MediacionDisputas from './components/MediacionDisputas';
import APILegal from './components/APILegal';
import EditorColaborativo from './components/EditorColaborativo';
import ComentariosSugerencias from './components/ComentariosSugerencias';
import TemplatesInteligentes from './components/TemplatesInteligentes';
import Preview3DContratos from './components/Preview3DContratos';
import VaultDigital from './components/VaultDigital';
import NegotiationTracker from './components/NegotiationTracker';
import { getPlantilla } from '../crear-contrato/crearContratoApi';

const CrearContratoPage: React.FC = () => {
  const [contratoContent, setContratoContent] = useState<string>('');
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const [documentoCliente, setDocumentoCliente] = useState<string>('');

  const handleSelectPlantilla = (tipo: 'mensual' | 'trimestral' | 'anual') => {
    const plantilla = getPlantilla(tipo, nombreCliente, documentoCliente);
    setContratoContent(plantilla);
  };

  const handleSaveContrato = () => {
    console.log('Contrato guardado:', contratoContent);
    alert('Contrato guardado (simulado). Revisa la consola para ver el contenido.');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Crear Nuevo Contrato</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Datos del Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombreCliente" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              type="text"
              id="nombreCliente"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label htmlFor="documentoCliente" className="block text-sm font-medium text-gray-700">Documento (DNI/NIE)</label>
            <input
              type="text"
              id="documentoCliente"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={documentoCliente}
              onChange={(e) => setDocumentoCliente(e.target.value)}
              placeholder="Ej: 12345678A"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Seleccionar Plantilla</h2>
        <PlantillasContrato onSelectPlantilla={handleSelectPlantilla} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Editor de Contrato</h2>
        <EditorContrato content={contratoContent} onContentChange={setContratoContent} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Firma Digital</h2>
        <FirmaDigital />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">LegalTech Avanzado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IAClausulasPersonalizadas />
          <ESignaturesLegales />
          <BlockchainInmutabilidad />
          <AnalisisRiesgosLegales />
          <IntegracionBasesLegales />
          <VersioningInteligente />
          <TraduccionMultiidioma />
          <ComplianceRegulaciones />
          <MediacionDisputas />
          <APILegal />
          <EditorColaborativo />
          <ComentariosSugerencias />
          <TemplatesInteligentes />
          <Preview3DContratos />
          <VaultDigital />
          <NegotiationTracker />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveContrato}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Contrato
        </button>
      </div>
    </div>
  );
};

export default CrearContratoPage;
