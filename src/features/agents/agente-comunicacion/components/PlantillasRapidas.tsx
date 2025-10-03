
import React, { useState, useEffect } from 'react';
import { agenteComunicacionApi, MessageTemplate } from '../agenteComunicacionApi';

const PlantillasRapidas: React.FC = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const welcome = await agenteComunicacionApi.getTemplate('welcome');
        const sessionReminder = await agenteComunicacionApi.getTemplate('session_reminder');
        const motivational = await agenteComunicacionApi.getTemplate('motivational');
        setTemplates([welcome, sessionReminder, motivational]);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleSelectTemplate = (template: MessageTemplate) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Plantillas Rápidas</h2>
      {loading ? (
        <p>Cargando plantillas...</p>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => handleSelectTemplate(template)}
            >
              <h3 className="font-bold text-lg text-gray-800">{template.name}</h3>
              <p className="text-gray-600 text-sm mt-1">Tono: {template.tone}</p>
              <p className="text-gray-700 mt-2 line-clamp-2">{template.content}</p>
            </div>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
          <h3 className="font-bold">Plantilla Seleccionada: {selectedTemplate.name}</h3>
          <p className="mt-2 whitespace-pre-wrap">{selectedTemplate.content}</p>
          <p className="text-sm text-green-800 mt-2">Puedes copiar y personalizar este contenido.</p>
        </div>
      )}
    </div>
  );
};

export default PlantillasRapidas;
