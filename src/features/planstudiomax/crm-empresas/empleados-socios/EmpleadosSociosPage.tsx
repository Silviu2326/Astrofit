
import React, { useState, useEffect } from 'react';
import TablaBeneficiarios from './components/TablaBeneficiarios';
import FiltrosEmpresa from './components/FiltrosEmpresa';
import GestorEstadosB2B from './components/GestorEstadosB2B';
import AnalisisUtilizacion from './components/AnalisisUtilizacion';
import ValidacionRRHH from './components/ValidacionRRHH';
import ReportesUsoAgregados from './components/ReportesUsoAgregados';
import DashboardAdopcion from './components/DashboardAdopcion';
import AlertasInactivos from './components/AlertasInactivos';
import IntegracionRRHH from './components/IntegracionRRHH';
import { fetchBeneficiarios, Beneficiario, getUniqueEmpresas } from './empleadosSociosApi';

const EmpleadosSociosPage: React.FC = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterEmpresa, setFilterEmpresa] = useState<string>('');
  const [empresas, setEmpresas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBeneficiarios = async () => {
      setLoading(true);
      const data = await fetchBeneficiarios(searchQuery, filterEmpresa);
      setBeneficiarios(data);
      setLoading(false);
    };

    loadBeneficiarios();
  }, [searchQuery, filterEmpresa]);

  useEffect(() => {
    setEmpresas(getUniqueEmpresas());
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Beneficiarios</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o empresa..."
          className="p-2 border border-gray-300 rounded-md flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterEmpresa}
          onChange={(e) => setFilterEmpresa(e.target.value)}
        >
          <option value="">Todas las Empresas</option>
          {empresas.map((empresa) => (
            <option key={empresa} value={empresa}>{empresa}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Cargando beneficiarios...</p>
      ) : (
        <TablaBeneficiarios beneficiarios={beneficiarios} />
      )}

      <div className="mt-8 p-4 border rounded-md bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Herramientas Avanzadas de Gestión</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FiltrosEmpresa />
          <GestorEstadosB2B />
          <AnalisisUtilizacion />
          <ValidacionRRHH />
          <ReportesUsoAgregados />
          <DashboardAdopcion />
          <AlertasInactivos />
          <IntegracionRRHH />
        </div>
      </div>
    </div>
  );
};

export default EmpleadosSociosPage;
