import React from 'react';
import { downloadKit } from '../recursosAfiliadosApi';

const KitMarketing: React.FC = () => {
  const handleDownloadKit = async () => {
    // In a real app, kitId might be dynamic
    const kitId = 'full_kit_2025';
    const response = await downloadKit(kitId);
    alert(response.message);
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Kit Completo de Marketing por Afiliado</h3>
      <p className="text-gray-700 mb-4">
        Descarga el kit completo con todos los recursos necesarios para tu estrategia de marketing.
      </p>
      <button
        onClick={handleDownloadKit}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 text-lg"
      >
        Descargar Kit Completo
      </button>
    </section>
  );
};

export default KitMarketing;
