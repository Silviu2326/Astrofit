import React, { useEffect, useState } from 'react';
import { fetchConvocatorias, Convocatoria } from './listaConvocatoriasApi';
import { TablaEventos } from './components/TablaEventos';
import GeneradorConvocatorias from './components/GeneradorConvocatorias';
import AnalisisRival from './components/AnalisisRival';
import LogisticaEvento from './components/LogisticaEvento';
import ComunicacionMulticanal from './components/ComunicacionMulticanal';
import TrackingConfirmaciones from './components/TrackingConfirmaciones';
import IntegracionCalendarios from './components/IntegracionCalendarios';
import GestionDocumentacion from './components/GestionDocumentacion';
import SistemaBackup from './components/SistemaBackup';

const ListaConvocatoriasPage: React.FC = () => {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getConvocatorias = async () => {
      try {
        const data = await fetchConvocatorias();
        setConvocatorias(data);
      } catch (err) {
        setError('Error al cargar las convocatorias.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getConvocatorias();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando convocatorias...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Convocatorias y Eventos</h1>
      {convocatorias.length > 0 ? (
        <TablaEventos convocatorias={convocatorias} />
      ) : (
        <div className="text-center p-4">No hay convocatorias próximas.</div>
      )}

      <div className="mt-8 p-4 border-t-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Gestión Avanzada de Competencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GeneradorConvocatorias />
          <AnalisisRival />
          <LogisticaEvento />
          <ComunicacionMulticanal />
          <TrackingConfirmaciones />
          <IntegracionCalendarios />
          <GestionDocumentacion />
          <SistemaBackup />
        </div>
      </div>
    </div>
  );
};

export default ListaConvocatoriasPage;
