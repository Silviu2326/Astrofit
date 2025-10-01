import React from 'react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const ComentariosUtiles: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();

  if (isLoading) return <div className="p-4 bg-white rounded-lg shadow">Cargando comentarios...</div>;

  const promoters = feedback?.filter((f) => f.type === 'promoter') || [];
  const passives = feedback?.filter((f) => f.type === 'passive') || [];
  const detractors = feedback?.filter((f) => f.type === 'detractor') || [];

  const FeedbackCard: React.FC<{ type: 'promoter' | 'passive' | 'detractor'; comment: string; score: number }> = ({
    type,
    comment,
    score,
  }) => {
    let bgColor = '';
    let borderColor = '';
    let textColor = '';
    switch (type) {
      case 'promoter':
        bgColor = 'bg-green-50';
        borderColor = 'border-green-400';
        textColor = 'text-green-800';
        break;
      case 'passive':
        bgColor = 'bg-yellow-50';
        borderColor = 'border-yellow-400';
        textColor = 'text-yellow-800';
        break;
      case 'detractor':
        bgColor = 'bg-red-50';
        borderColor = 'border-red-400';
        textColor = 'text-red-800';
        break;
    }

    return (
      <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-md shadow-sm mb-3`}>
        <p className={`font-semibold ${textColor} mb-1`}>
          {type === 'promoter' ? 'Promotor' : type === 'passive' ? 'Pasivo' : 'Detractor'} (Puntuación: {score})
        </p>
        <p className="text-gray-700 text-sm italic">"{comment}"</p>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Comentarios Útiles</h2>
      <p className="text-gray-600 mb-4">
        Recopila y categoriza automáticamente el feedback de los clientes para identificar áreas de mejora.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-medium text-green-700 mb-3">Promotores ({promoters.length})</h3>
          {promoters.length > 0 ? (
            promoters.map((f) => <FeedbackCard key={f.id} {...f} />)
          ) : (
            <p className="text-gray-500 text-sm">No hay comentarios de promotores.</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-medium text-yellow-700 mb-3">Pasivos ({passives.length})</h3>
          {passives.length > 0 ? (
            passives.map((f) => <FeedbackCard key={f.id} {...f} />)
          ) : (
            <p className="text-gray-500 text-sm">No hay comentarios de pasivos.</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-medium text-red-700 mb-3">Detractores ({detractors.length})</h3>
          {detractors.length > 0 ? (
            detractors.map((f) => <FeedbackCard key={f.id} {...f} />)
          ) : (
            <p className="text-gray-500 text-sm">No hay comentarios de detractores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComentariosUtiles;