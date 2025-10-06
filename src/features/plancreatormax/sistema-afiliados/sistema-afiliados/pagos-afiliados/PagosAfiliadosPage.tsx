import React from 'react';
import HistorialPagos from './components/HistorialPagos';
import MetodosPago from './components/MetodosPago';
import ProcesadorPagos from './components/ProcesadorPagos';

const PagosAfiliadosPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Pagos de Afiliados</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Procesar Pagos</h2>
        <ProcesadorPagos />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Historial de Pagos</h2>
        <HistorialPagos />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>
        <MetodosPago />
      </section>
    </div>
  );
};

export default PagosAfiliadosPage;
