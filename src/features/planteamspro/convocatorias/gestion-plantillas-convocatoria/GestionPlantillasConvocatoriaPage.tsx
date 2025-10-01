import React from 'react';
import TableroTactico from './components/TableroTactico';
import AnalizadorTactico from './components/AnalizadorTactico';
import SimuladorFormaciones from './components/SimuladorFormaciones';
import OptimizadorAlineacion from './components/OptimizadorAlineacion';
import CompatibilidadJugadores from './components/CompatibilidadJugadores';
import FormacionesDinamicas from './components/FormacionesDinamicas';
import IntegracionVideo from './components/IntegracionVideo';
import BibliotecaFormaciones from './components/BibliotecaFormaciones';
import PrediccionResultado from './components/PrediccionResultado';

const GestionPlantillasConvocatoriaPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gesti??n de Plantillas de Convocatoria</h1>
      <p className="mb-4">Aqu?? podr??s gestionar las alineaciones t??cticas para diferentes deportes.</p>
      <TableroTactico />

      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">An??lisis T??ctico Avanzado</h2>
        <AnalizadorTactico />
        <SimuladorFormaciones />
        <OptimizadorAlineacion />
        <CompatibilidadJugadores />
        <FormacionesDinamicas />
        <IntegracionVideo />
        <BibliotecaFormaciones />
        <PrediccionResultado />
      </div>
    </div>
  );
};

export default GestionPlantillasConvocatoriaPage;
