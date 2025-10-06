import React, { useEffect, useState } from 'react';
import { fetchSedes, Sede } from './listadoSedesApi';
import { TarjetasSedes } from './components/TarjetasSedes';
import MapaUbicaciones from './components/MapaUbicaciones';
import IndicadoresEstado from './components/IndicadoresEstado';
import MetricasConsolidadas from './components/MetricasConsolidadas';
import BotonesGestionRapida from './components/BotonesGestionRapida';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import EnlacesGestion from './components/EnlacesGestion';
import SistemaAlertas from './components/SistemaAlertas';
import VistaSatelital from './components/VistaSatelital';

const ListadoSedesPage: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSedes = async () => {
      try {
        const data = await fetchSedes();
        setSedes(data);
      } catch (err) {
        setError('Error al cargar las sedes.');
      } finally {
        setLoading(false);
      }
    };
    getSedes();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando sedes...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Listado de Sedes</h1>

      {/* Sección de Gestión Avanzada Multi-Centro */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Gestión Avanzada de Sedes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FiltrosAvanzados />
          <BotonesGestionRapida />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <IndicadoresEstado />
          <SistemaAlertas />
        </div>
        <MetricasConsolidadas />
        <EnlacesGestion />
      </div>

      {/* Sección de Visualización de Ubicaciones */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Visualización de Ubicaciones</h2>
        <MapaUbicaciones />
        <VistaSatelital />
      </div>

      {/* Listado de Sedes Existente */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Sedes Registradas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sedes.map((sede) => (
          <TarjetasSedes key={sede.id} sede={sede} />
        ))}
      </div>
    </div>
  );
};

export default ListadoSedesPage;
