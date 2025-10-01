
import React, { useState } from 'react';
import HistorialEntradas from './components/HistorialEntradas';
import { useAccessReports } from './reportesAccesosApi';
import GraficoPicos from './components/GraficoPicos';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import DetectorPatrones from './components/DetectorPatrones';
import AlertasAccesosSospechosos from './components/AlertasAccesosSospechosos';
import ExportadorReportes from './components/ExportadorReportes';
import ComparativasSedes from './components/ComparativasSedes';
import MetricasPermanencia from './components/MetricasPermanencia';
import DashboardKPIs from './components/DashboardKPIs';

const ReportesAccesosPage: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  // New state for advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({});

  const { data, loading, error } = useAccessReports({
    dateFilter,
    searchTerm,
    page: currentPage,
    limit: 10, // Assuming 10 items per page
    ...advancedFilters, // Integrate advanced filters
  });

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAdvancedFiltersChange = (newFilters: any) => {
    setAdvancedFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  if (loading) return <div className="text-center py-4">Cargando reportes...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar los reportes: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reportes de Accesos - Analytics de Entrada</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <FiltrosAvanzados onFilterChange={handleAdvancedFiltersChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardKPIs />
        <GraficoPicos />
        <MetricasPermanencia />
        <ComparativasSedes />
        <DetectorPatrones />
        <AlertasAccesosSospechosos />
      </div>

      <HistorialEntradas
        accessEntries={data?.entries || []}
        totalEntries={data?.total || 0}
        currentPage={currentPage}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />

      <div className="mt-6">
        <ExportadorReportes />
      </div>
    </div>
  );
};

export default ReportesAccesosPage;
