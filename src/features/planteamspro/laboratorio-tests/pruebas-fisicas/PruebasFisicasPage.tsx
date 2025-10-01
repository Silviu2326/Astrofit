import React, { useEffect, useState } from 'react';
import { getPruebasFisicas, addPruebaFisica, getAtletas, PruebaFisica, Atleta } from '../pruebasFisicasApi';
import TablaPruebas from './components/TablaPruebas';
import ProtocolosCientificos from './components/ProtocolosCientificos';
import RegistroTiempoReal from './components/RegistroTiempoReal';
import AnalizadorBiomecanico from './components/AnalizadorBiomecanico';
import IntegracionDispositivos from './components/IntegracionDispositivos';
import CalculosPercentiles from './components/CalculosPercentiles';
import AlertasAnomalias from './components/AlertasAnomalias';
import ExportacionCientifica from './components/ExportacionCientifica';
import BaseDatosNormativa from './components/BaseDatosNormativa';

const PruebasFisicasPage: React.FC = () => {
  const [pruebas, setPruebas] = useState<PruebaFisica[]>([]);
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newTestType, setNewTestType] = useState<'vertical jump' | 'velocidad' | 'resistencia' | '1RM' | 'VO2'>('vertical jump');
  const [newTestDate, setNewTestDate] = useState<string>('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPruebas = await getPruebasFisicas();
        const fetchedAtletas = await getAtletas();
        setPruebas(fetchedPruebas);
        setAtletas(fetchedAtletas);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddPrueba = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestDate || selectedAthletes.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const atletasConvocados = atletas.filter(atleta => selectedAthletes.includes(atleta.id));

    const nuevaPrueba = {
      tipo: newTestType,
      fecha: newTestDate,
      atletasParticipantes: atletasConvocados,
    };

    try {
      const addedPrueba = await addPruebaFisica(nuevaPrueba);
      setPruebas(prev => [...prev, addedPrueba]);
      setNewTestDate('');
      setSelectedAthletes([]);
      alert('Prueba programada con éxito!');
    } catch (err) {
      setError('Error al programar la prueba.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-4">Cargando pruebas físicas...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Laboratorio de Tests Físicos</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Programar Nueva Prueba</h2>
        <form onSubmit={handleAddPrueba} className="space-y-4">
          <div>
            <label htmlFor="testType" className="block text-sm font-medium text-gray-700">Tipo de Prueba</label>
            <select
              id="testType"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={newTestType}
              onChange={(e) => setNewTestType(e.target.value as any)}
            >
              <option value="vertical jump">Salto Vertical</option>
              <option value="velocidad">Velocidad</option>
              <option value="resistencia">Resistencia</option>
              <option value="1RM">1RM</option>
              <option value="VO2">VO2 Máx</option>
            </select>
          </div>
          <div>
            <label htmlFor="testDate" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              id="testDate"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={newTestDate}
              onChange={(e) => setNewTestDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="athletes" className="block text-sm font-medium text-gray-700">Atletas Convocados</label>
            <select
              id="athletes"
              multiple
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-32"
              value={selectedAthletes}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions);
                setSelectedAthletes(options.map(option => option.value));
              }}
            >
              {atletas.map(atleta => (
                <option key={atleta.id} value={atleta.id}>{atleta.nombre}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Programar Prueba
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Laboratorio Científico Avanzado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProtocolosCientificos />
          <RegistroTiempoReal />
          <AnalizadorBiomecanico />
          <IntegracionDispositivos />
          <CalculosPercentiles />
          <AlertasAnomalias />
          <ExportacionCientifica />
          <BaseDatosNormativa />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pruebas Físicas Programadas</h2>
        <TablaPruebas pruebas={pruebas} />
      </div>
    </div>
  );
};

export default PruebasFisicasPage;
