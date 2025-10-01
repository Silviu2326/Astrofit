
import React, { useEffect, useState } from 'react';
import ThumbnailEmail from './ThumbnailEmail';
import { getEmailTemplates, EmailTemplate } from '../plantillasEmailApi';

const GaleriaPlantillas: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getEmailTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Error al cargar las plantillas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  if (loading) return <p>Cargando plantillas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Galería de Plantillas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <ThumbnailEmail key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default GaleriaPlantillas;
