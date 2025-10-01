import React, { useState } from 'react';
import { useGetSurveyTemplatesQuery, useSendSurveyMutation } from '../encuestasNpsApi';

const EncuestasRapidas: React.FC = () => {
  const { data: templates, isLoading } = useGetSurveyTemplatesQuery();
  const [sendSurvey, { isLoading: isSending }] = useSendSurveyMutation();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [responses, setResponses] = useState<{ [key: string]: string | number }>({});

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(e.target.value);
    setResponses({}); // Reset responses when template changes
  };

  const handleResponseChange = (question: string, value: string | number) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedTemplate || Object.keys(responses).length === 0) {
      alert('Por favor, selecciona una plantilla y responde al menos una pregunta.');
      return;
    }

    const currentTemplate = templates?.find(t => t.id === selectedTemplate);
    if (!currentTemplate) return;

    const formattedResponses = currentTemplate.questions.map(q => ({
      question: q,
      answer: responses[q] || '',
    }));

    try {
      await sendSurvey({ templateId: selectedTemplate, responses: formattedResponses }).unwrap();
      alert('Encuesta enviada con éxito!');
      setSelectedTemplate('');
      setResponses({});
    } catch (error) {
      alert('Error al enviar la encuesta.');
    }
  };

  if (isLoading) return <div className="p-4 bg-white rounded-lg shadow">Cargando plantillas...</div>;

  const currentTemplate = templates?.find(t => t.id === selectedTemplate);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enviar Encuestas Rápidas</h2>
      <p className="text-gray-600 mb-4">Envía encuestas personalizables para medir la satisfacción del cliente.</p>

      <div className="mb-4">
        <label htmlFor="survey-template" className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona una plantilla de encuesta:
        </label>
        <select
          id="survey-template"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          <option value="">-- Selecciona --</option>
          {templates?.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {currentTemplate && (
        <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-800 mb-3">{currentTemplate.name}</h3>
          {currentTemplate.questions.map((question, index) => (
            <div key={index} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">{question}</label>
              {question.includes('recomiendes') ? (
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={responses[question] || 0}
                  onChange={(e) => handleResponseChange(question, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              ) : (
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={responses[question] || ''}
                  onChange={(e) => handleResponseChange(question, e.target.value)}
                ></textarea>
              )}
              {question.includes('recomiendes') && (
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0 (Nada probable)</span>
                  <span>{responses[question] || 0}</span>
                  <span>10 (Muy probable)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSending || !selectedTemplate || Object.keys(responses).length === 0}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSending ? 'Enviando...' : 'Enviar Encuesta'}
      </button>
    </div>
  );
};

export default EncuestasRapidas;