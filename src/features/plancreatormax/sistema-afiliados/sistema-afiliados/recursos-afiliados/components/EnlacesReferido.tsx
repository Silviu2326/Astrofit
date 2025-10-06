import React, { useState } from 'react';
import { generateReferralLink } from '../recursosAfiliadosApi';

const EnlacesReferido: React.FC = () => {
  const [referralLink, setReferralLink] = useState<string>('');
  const [campaign, setCampaign] = useState<string>('default');

  const handleGenerateLink = async () => {
    // In a real app, userId would come from auth context
    const userId = 'user123';
    const link = await generateReferralLink(userId, campaign);
    setReferralLink(link as string);
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Enlaces de Referido Personalizados</h3>
      <p className="text-gray-700 mb-4">
        Genera enlaces únicos para tus campañas y realiza un seguimiento de tus referencias.
      </p>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Nombre de la campaña (ej: verano2025)"
          className="border rounded-l-lg p-2 flex-grow"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
        />
        <button
          onClick={handleGenerateLink}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Generar Enlace
        </button>
      </div>
      {referralLink && (
        <div className="bg-gray-100 p-3 rounded-lg break-all">
          <p className="font-medium">Tu enlace de referido:</p>
          <a href={referralLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {referralLink}
          </a>
        </div>
      )}
    </section>
  );
};

export default EnlacesReferido;
