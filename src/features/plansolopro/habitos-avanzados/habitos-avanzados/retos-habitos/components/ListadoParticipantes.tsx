import React, { useEffect, useState } from 'react';
import { getParticipantesReto } from '../retosHabitosApi';

interface ListadoParticipantesProps {
  retoId?: string; // Opcional, si se quiere listar participantes de un reto específico
}

const ListadoParticipantes: React.FC<ListadoParticipantesProps> = ({ retoId = 'reto-ejemplo-123' }) => {
  const [participantes, setParticipantes] = useState<any[]>([]); // Usar el tipo Participante de retosHabitosApi.ts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        setLoading(true);
        const data = await getParticipantesReto(retoId);
        setParticipantes(data);
      } catch (err) {
        setError('Error al cargar los participantes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [retoId]);

  if (loading) return <div className="text-center p-4">Cargando participantes...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Participantes</h3>
      {participantes.length === 0 ? (
        <p className="text-gray-600">No hay participantes inscritos en este reto aún.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {participantes.map((participante) => (
            <li key={participante.id} className="py-3 flex justify-between items-center">
              <span className="text-gray-800 font-medium">{participante.nombreUsuario || `Usuario ${participante.usuarioId.substring(0, 8)}` }</span>
              <span className="text-gray-500 text-sm">Progreso: {participante.progreso}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoParticipantes;
