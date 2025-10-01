import React, { useState, useEffect } from 'react';
import { fetchAccesosKiosko, AccesoKiosko, ResultadoAcceso } from '../historialKioskoApi';
import { TablaAccesos } from './components/TablaAccesos';
import DetectorIncidencias from './components/DetectorIncidencias';
import EstadisticasUso from './components/EstadisticasUso';
import AlertasPersonal from './components/AlertasPersonal';
import ReportesUtilizacion from './components/ReportesUtilizacion';
import SeguimientoResolucion from './components/SeguimientoResolucion';
import DashboardEficiencia from './components/DashboardEficiencia';
import NotificacionesPush from './components/NotificacionesPush';

// Asumiendo una función de analytics global o importada
const trackPageView = (pageName: string) => {
  console.log(`Analytics: Page view for ${pageName}`);
  // Aquí se integraría la llamada real a tu servicio de analytics (ej: Google Analytics, Mixpanel, etc.)
};

const HistorialKioskoPage: React.FC = () => {
  const [accesos, setAccesos] = useState<AccesoKiosko[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fechaFiltro, setFechaFiltro] = useState<string>('');
  const [estadoFiltro, setEstadoFiltro] = useState<ResultadoAcceso | ''>( '');

  useEffect(() => {
    trackPageView('HistorialKioskoPage'); // Integración de analytics

    const getAccesos = async () => {
      setLoading(true);
      const data = await fetchAccesosKiosko(fechaFiltro, estadoFiltro === '' ? undefined : estadoFiltro);
      setAccesos(data);
      setLoading(false);
    };
    getAccesos();
  }, [fechaFiltro, estadoFiltro]);

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaFiltro(e.target.value);
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoFiltro(e.target.value as ResultadoAcceso | '' );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial Kiosko - Registro de Autoservicio
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={fechaFiltro}
              onChange={handleFechaChange}
            />
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado
            </label>
            <select
              id="estado"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={estadoFiltro}
              onChange={handleEstadoChange}
            >
              <option value="">Todos</option>
              <option value="valido">Válido</option>
              <option value="no_valido">No Válido</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Registros de Acceso</h2>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Cargando accesos...</p>
        ) : (
          <TablaAccesos accesos={accesos} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DetectorIncidencias />
        <EstadisticasUso />
        <AlertasPersonal />
        <ReportesUtilizacion />
        <SeguimientoResolucion />
        <DashboardEficiencia />
        <NotificacionesPush />
      </div>
    </div>
  );
};

export default HistorialKioskoPage;
