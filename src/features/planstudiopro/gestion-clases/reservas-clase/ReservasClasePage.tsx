import React, { useState, useEffect } from 'react';
import TablaReservas from './components/TablaReservas';
import GestorAforo from './components/GestorAforo';
import ListaEspera from './components/ListaEspera';
import CheckinGeolocalizacion from './components/CheckinGeolocalizacion';
import SistemaPenalizaciones from './components/SistemaPenalizaciones';
import ReservasAutomaticas from './components/ReservasAutomaticas';
import NotificacionesMulticanal from './components/NotificacionesMulticanal';
import SistemaCreditosDebitos from './components/SistemaCreditosDebitos';
import IntegracionCalendarios from './components/IntegracionCalendarios';
import ReservasFamiliares from './components/ReservasFamiliares';
import ReviewsPostClase from './components/ReviewsPostClase';
import PrediccionDemanda from './components/PrediccionDemanda';
import PoliticasCancelacion from './components/PoliticasCancelacion';
import { getReservas, Reserva } from './reservasClaseApi';

const ReservasClasePage: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [capacidadMaxima, setCapacidadMaxima] = useState<number>(20); // Ejemplo
  const [aforoActual, setAforoActual] = useState<number>(0);

  useEffect(() => {
    const fetchedReservas = getReservas();
    setReservas(fetchedReservas);
    setAforoActual(fetchedReservas.filter(r => r.estado === 'confirmado').length);
  }, []);

  const reservasConfirmadas = reservas.filter(r => r.estado === 'confirmado');
  const reservasEnEspera = reservas.filter(r => r.estado === 'espera');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Reservas de Clase</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <GestorAforo aforoActual={aforoActual} capacidadMaxima={capacidadMaxima} />
        </div>
        <div>
          <ListaEspera reservas={reservasEnEspera} />
        </div>
      </div>

      <TablaReservas reservas={reservasConfirmadas} />

      <h2 className="text-xl font-bold mt-8 mb-4">Funcionalidades Inteligentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CheckinGeolocalizacion />
        <SistemaPenalizaciones />
        <ReservasAutomaticas />
        <NotificacionesMulticanal />
        <SistemaCreditosDebitos />
        <IntegracionCalendarios />
        <ReservasFamiliares />
        <ReviewsPostClase />
        <PrediccionDemanda />
        <PoliticasCancelacion />
      </div>
    </div>
  );
};

export default ReservasClasePage;
