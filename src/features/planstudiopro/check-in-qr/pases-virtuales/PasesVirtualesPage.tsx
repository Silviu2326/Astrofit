import React, { useState, useEffect } from 'react';
import TarjetasDigitales from './components/TarjetasDigitales';
import ContadorSesiones from './components/ContadorSesiones';
import AlertasBonos from './components/AlertasBonos';
import MembresiasNFT from './components/MembresiasNFT';
import IntercambioP2P from './components/IntercambioP2P';
import TokensLealtad from './components/TokensLealtad';
import SmartContracts from './components/SmartContracts';
import MarketplacePremium from './components/MarketplacePremium';
import ReferidosCripto from './components/ReferidosCripto';
import MembresiasCompartidas from './components/MembresiasCompartidas';
import SegurosCancelacion from './components/SegurosCancelacion';
import HerenciasMembresias from './components/HerenciasMembresias';
import WalletsDigitales from './components/WalletsDigitales';
import WalletIntegrado from './components/WalletIntegrado';
import Visualizaciones3D from './components/Visualizaciones3D';
import TradingSimulator from './components/TradingSimulator';
import ColeccionablesDigitales from './components/ColeccionablesDigitales';
import RealidadAumentadaBeneficios from './components/RealidadAumentadaBeneficios';
import SocialTrading from './components/SocialTrading';
import { fetchBonos, Bono } from './pasesVirtualesApi';

const PasesVirtualesPage: React.FC = () => {
  const [bonos, setBonos] = useState<Bono[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBonos = async () => {
      try {
        const data = await fetchBonos();
        setBonos(data);
      } catch (err) {
        setError('Error al cargar los bonos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBonos();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando bonos...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Pases Virtuales</h1>

      <div className="mb-8">
        <AlertasBonos bonos={bonos} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonos.map((bono) => (
          <div key={bono.id} className="bg-white rounded-lg shadow-lg p-6">
            <TarjetasDigitales bono={bono} />
            <div className="mt-4">
              <ContadorSesiones sesionesRestantes={bono.sesionesRestantes} totalSesiones={bono.totalSesiones} />
            </div>
          </div>
        ))}
      </div>

      {bonos.length === 0 && (
        <div className="text-center p-8 text-gray-600">
          No tienes pases virtuales activos en este momento.
        </div>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">Funcionalidades Blockchain y NFT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6"><MembresiasNFT /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><IntercambioP2P /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><TokensLealtad /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><SmartContracts /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><MarketplacePremium /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><ReferidosCripto /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><MembresiasCompartidas /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><SegurosCancelacion /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><HerenciasMembresias /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><WalletsDigitales /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><WalletIntegrado /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><Visualizaciones3D /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><TradingSimulator /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><ColeccionablesDigitales /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><RealidadAumentadaBeneficios /></div>
        <div className="bg-white rounded-lg shadow-lg p-6"><SocialTrading /></div>
      </div>
    </div>
  );
};

export default PasesVirtualesPage;
