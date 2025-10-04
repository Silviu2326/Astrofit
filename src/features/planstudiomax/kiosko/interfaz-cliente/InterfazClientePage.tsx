import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PantallaKiosko from './components/PantallaKiosko';
import EscanerQR from './components/EscanerQR';
import BienvenidaPersonalizada from './components/BienvenidaPersonalizada';
import ProtectorPantalla from './components/ProtectorPantalla';
import FeedbackVisualSonoro from './components/FeedbackVisualSonoro';
import ModoAccesibilidad from './components/ModoAccesibilidad';
import SistemaAyuda from './components/SistemaAyuda';
import DetectorMembresia from './components/DetectorMembresia';
import RegistroEntrada from './components/RegistroEntrada';
import { checkInAdvanced } from './interfazClienteApi'; // Import the new API function

const InterfazClientePage: React.FC = () => {
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'scanning' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [showProtectorPantalla, setShowProtectorPantalla] = useState<boolean>(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    setInactivityTimer(setTimeout(() => {
      setShowProtectorPantalla(true);
    }, 30000)); // 30 segundos de inactividad para mostrar el protector
  };

  useEffect(() => {
    resetInactivityTimer();
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keydown', resetInactivityTimer);
      document.removeEventListener('click', resetInactivityTimer);
    };
  }, []);

  const handleUserActivity = () => {
    if (showProtectorPantalla) {
      setShowProtectorPantalla(false);
    }
    resetInactivityTimer();
  };

  const handleCheckIn = async (memberId: string) => {
    setCheckInStatus('processing');
    setMessage('');
    setMemberName('');

    try {
      const response = await checkInAdvanced(memberId);

      if (response.success) {
        setCheckInStatus('success');
        setMessage(response.message);
        setMemberName(response.memberInfo?.name || 'Cliente');
      } else {
        setCheckInStatus('error');
        setMessage(response.message);
      }
    } catch (error) {
      setCheckInStatus('error');
      setMessage('Ocurrió un error durante el check-in avanzado.');
      console.error('Check-in avanzado error:', error);
    }
  };

  if (showProtectorPantalla) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" onClick={handleUserActivity}>
        <ProtectorPantalla />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" onClick={handleUserActivity}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img src="/path/to/your/gym-logo.png" alt="Gym Logo" className="mx-auto mb-6 h-24" />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kiosko Auto Check-in Avanzado</h1>

        {checkInStatus === 'idle' && (
          <>
            <EscanerQR />
            <PantallaKiosko onCheckIn={handleCheckIn} />
            <DetectorMembresia />
          </>
        )}

        {checkInStatus === 'processing' && (
          <p>Procesando check-in...</p>
        )}

        {checkInStatus === 'success' && (
          <>
            <BienvenidaPersonalizada nombre={memberName} mensaje="¡Nos alegra verte de nuevo!" />
            <RegistroEntrada />
            <FeedbackVisualSonoro exito={true} mensaje={message} />
          </>
        )}

        {checkInStatus === 'error' && (
          <>
            <FeedbackVisualSonoro exito={false} mensaje={message} />
            <p className="mt-4 text-red-600">Por favor, intente de nuevo o contacte a un miembro del personal.</p>
          </>
        )}

        <div className="mt-8 space-y-4">
          <ModoAccesibilidad />
          <SistemaAyuda />
          <Link to="/" className="text-blue-600 hover:underline block">Volver a la página principal</Link>
        </div>
      </div>
    </div>
  );
};

export default InterfazClientePage;