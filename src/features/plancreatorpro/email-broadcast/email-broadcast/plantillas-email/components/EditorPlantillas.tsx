
import React, { useState, useEffect } from 'react';
import { EmailTemplate, getEmailTemplateById, updateEmailTemplate } from '../plantillasEmailApi';

const EditorPlantillas: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [content, setContent] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // This would typically come from a selection in GaleriaPlantillas
  useEffect(() => {
    // For demonstration, let's auto-select the first mock template
    setSelectedTemplateId('1');
  }, []);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (selectedTemplateId) {
        setLoading(true);
        setMessage(null);
        try {
          const fetchedTemplate = await getEmailTemplateById(selectedTemplateId);
          if (fetchedTemplate) {
            setTemplate(fetchedTemplate);
            setContent(fetchedTemplate.content);
            setName(fetchedTemplate.name);
            setCategory(fetchedTemplate.category);
          } else {
            setMessage('Plantilla no encontrada.');
          }
        } catch (err) {
          setMessage('Error al cargar la plantilla.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTemplate();
  }, [selectedTemplateId]);

  const handleSave = async () => {
    if (template) {
      setLoading(true);
      setMessage(null);
      try {
        const updatedTemplate = { ...template, content, name, category };
        await updateEmailTemplate(updatedTemplate);
        setMessage('Plantilla guardada exitosamente!');
      } catch (err) {
        setMessage('Error al guardar la plantilla.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Editor de Plantillas</h2>
      {loading && <p>Cargando/Guardando plantilla...</p>}
      {message && <p className="mb-3 text-blue-600">{message}</p>}

      {template ? (
        <div>
          <div className="mb-4">
            <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">Nombre de la Plantilla</label>
            <input
              type="text"
              id="templateName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="templateCategory" className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              id="templateCategory"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="templateContent" className="block text-sm font-medium text-gray-700">Contenido HTML</label>
            <textarea
              id="templateContent"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-64 font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Guardar Cambios
          </button>

          <h3 className="text-lg font-semibold mt-6 mb-2">Vista Previa</h3>
          <div
            className="border p-4 rounded-md bg-gray-50"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        <p>Selecciona una plantilla de la galería para editarla.</p>
      )}
    </div>
  );
};

export default EditorPlantillas;
