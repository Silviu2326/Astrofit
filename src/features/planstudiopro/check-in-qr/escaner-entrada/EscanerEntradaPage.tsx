import React, { useState } from 'react';
import LectorQR from './components/LectorQR';
import FeedbackAcceso from './components/FeedbackAcceso';
import InfoCliente from './components/InfoCliente';
import { simularEscaneoQR } from './escanerEntradaApi';

interface ClienteInfo {
  nombre: string;
  membresia: string;
  estado: 'activo' | 'vencida';
}

const EscanerEntradaPage: React.FC = () => {
  const [accesoEstado, setAccesoEstado] = useState<'permitido' | 'denegado' | 'membresia-vencida' | null>(null);
  const [clienteInfo, setClienteInfo] = useState<ClienteInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSimularQR = async () => {
    setLoading(true);
    setAccesoEstado(null);
    setClienteInfo(null);

    try {
      const resultado = await simularEscaneoQR();
      if (resultado.acceso === 'permitido') {
        setAccesoEstado('permitido');
        setClienteInfo(resultado.clienteInfo);
      } else if (resultado.acceso === 'membresia-vencida') {
        setAccesoEstado('membresia-vencida');
        setClienteInfo(resultado.clienteInfo);
      } else {
        setAccesoEstado('denegado');
      }
    } catch (error) {
      console.error("Error al simular QR:", error);
      setAccesoEstado('denegado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Escáner de Entrada</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <LectorQR onSimularQR={handleSimularQR} loading={loading} />

        {accesoEstado && (
          <FeedbackAcceso estado={accesoEstado} />
        )}

        {clienteInfo && (accesoEstado === 'permitido' || accesoEstado === 'membresia-vencida') && (
          <InfoCliente cliente={clienteInfo} />
        )}
      </div>
    </div>
  );
};

export default EscanerEntradaPage;
