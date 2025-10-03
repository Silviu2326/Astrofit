import React, { useState, useEffect } from 'react';
import DashboardIngresos from './components/DashboardIngresos';
import GraficoMediosPago from './components/GraficoMediosPago';
import ProcesoCierre from './components/ProcesoCierre';
import TradingSimulator from './components/TradingSimulator';
import AnalisisMargenesProducto from './components/AnalisisMargenesProducto';
import OptimizacionPreciosIA from './components/OptimizacionPreciosIA';
import BudgetsForecasting from './components/BudgetsForecasting';
import AnalisisCompetencia from './components/AnalisisCompetencia';
import ROICalculator from './components/ROICalculator';
import AlertasFinancieras from './components/AlertasFinancieras';
import IntegracionMercados from './components/IntegracionMercados';
import MultiCurrency from './components/MultiCurrency';
import BlockchainTransparencia from './components/BlockchainTransparencia';
import CommandCenterNASA from './components/CommandCenterNASA';
import GraficosFinancierosReal from './components/GraficosFinancierosReal';
import AlertasCriticas from './components/AlertasCriticas';
import ModoCEO from './components/ModoCEO';
import AssistantVoz from './components/AssistantVoz';
import RealidadVirtualDatos from './components/RealidadVirtualDatos';
import { getCajaDiariaData, CajaDiariaData } from './cajaDiariaApi';

const CajaDiariaPage: React.FC = () => {
  const [data, setData] = useState<CajaDiariaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCajaDiariaData();
        setData(result);
      } catch (err) {
        setError('Error al cargar los datos de la caja diaria.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando datos...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!data) return <div className="text-center p-4">No hay datos disponibles.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Caja Diaria - Dashboard de Ingresos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DashboardIngresos
            totalIngresos={data.totalIngresos}
            desgloseClases={data.desgloseClases}
            desgloseProductos={data.desgloseProductos}
          />
        </div>
        <div>
          <GraficoMediosPago mediosPago={data.mediosPago} />
        </div>
      </div>

      <div className="mt-8">
        <ProcesoCierre />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6">Financial Command Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TradingSimulator />
        <AnalisisMargenesProducto />
        <OptimizacionPreciosIA />
        <BudgetsForecasting />
        <AnalisisCompetencia />
        <ROICalculator />
        <AlertasFinancieras />
        <IntegracionMercados />
        <MultiCurrency />
        <BlockchainTransparencia />
        <CommandCenterNASA />
        <GraficosFinancierosReal />
        <AlertasCriticas />
        <ModoCEO />
        <AssistantVoz />
        <RealidadVirtualDatos />
      </div>
    </div>
  );
};

export default CajaDiariaPage;
