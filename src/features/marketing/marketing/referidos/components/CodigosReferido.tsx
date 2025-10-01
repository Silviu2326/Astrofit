
// src/features/referidos/components/CodigosReferido.tsx

import React, { useState, useEffect } from 'react';
import { getReferralCodes, generateNewReferralCode, ReferralCode } from '../referidosApi';

interface CodigosReferidoProps {
  currentUserId: string;
}

const CodigosReferido: React.FC<CodigosReferidoProps> = ({ currentUserId }) => {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const data = await getReferralCodes();
        setCodes(data.filter(code => code.referrerId === currentUserId));
      } catch (err) {
        setError('Error al cargar los códigos de referido.');
      } finally {
        setLoading(false);
      }
    };
    fetchCodes();
  }, [currentUserId]);

  const handleGenerateNewCode = async () => {
    setLoading(true);
    try {
      const newCode = await generateNewReferralCode(currentUserId);
      setCodes((prevCodes) => [...prevCodes, newCode]);
    } catch (err) {
      setError('Error al generar un nuevo código.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Cargando códigos de referido...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tus Códigos de Referido</h2>
      <p className="text-gray-600 mb-4">Crea y comparte códigos únicos para invitar a tus amigos y ganar beneficios.</p>
      
      {codes.length === 0 ? (
        <p className="text-gray-500 mb-4">Aún no tienes códigos de referido. ¡Genera uno ahora!</p>
      ) : (
        <ul className="space-y-3 mb-6">
          {codes.map((code) => (
            <li key={code.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
              <span className="font-mono text-lg text-indigo-600">{code.code}</span>
              <span className="text-sm text-gray-500">Expira: {code.expiresAt}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleGenerateNewCode}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50"
      >
        {loading ? 'Generando...' : 'Generar Nuevo Código'}
      </button>
    </div>
  );
};

export default CodigosReferido;
