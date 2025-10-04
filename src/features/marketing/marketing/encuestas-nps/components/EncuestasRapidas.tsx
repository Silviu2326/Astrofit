import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Mail, MessageSquare, Smartphone,
  Eye, Send, Clock, CheckCircle, ChevronRight
} from 'lucide-react';
import { useGetSurveyTemplatesQuery, useSendSurveyMutation } from '../encuestasNpsApi';

const EncuestasRapidas: React.FC = () => {
  const { data: templates, isLoading } = useGetSurveyTemplatesQuery();
  const [sendSurvey, { isLoading: isSending }] = useSendSurveyMutation();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [responses, setResponses] = useState<{ [key: string]: string | number }>({});
  const [selectedChannel, setSelectedChannel] = useState<'email' | 'sms' | 'app'>('email');

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setResponses({});
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

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const currentTemplate = templates?.find(t => t.id === selectedTemplate);

  const channels = [
    { id: 'email', name: 'Email', icon: Mail, color: 'from-blue-500 to-indigo-600' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'from-green-500 to-emerald-600' },
    { id: 'app', name: 'In-app', icon: Smartphone, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <FileText className="w-6 h-6" />
          </div>
          Encuestas Rápidas
        </h3>
        <p className="text-blue-100 text-sm mt-2 relative z-10">
          Constructor visual de encuestas con templates predefinidas
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Templates de encuestas */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Templates Predefinidas
          </label>
          <div className="grid grid-cols-1 gap-3">
            {templates?.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleTemplateChange(template.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                  selectedTemplate === template.id
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    selectedTemplate === template.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  } transition-colors duration-300`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{template.name}</p>
                    <p className="text-xs text-gray-600">{template.questions.length} preguntas</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="p-1 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Personalización de preguntas */}
        {currentTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              Vista Previa de Encuesta
            </h4>

            {currentTemplate.questions.map((question, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {index + 1}. {question}
                </label>

                {question.includes('recomiendes') ? (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={responses[question] || 0}
                      onChange={(e) => handleResponseChange(question, parseInt(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right,
                          rgb(254 202 202) 0%,
                          rgb(254 240 138) 50%,
                          rgb(187 247 208) 100%)`
                      }}
                    />
                    <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                      <span className="font-medium">0 - Nada probable</span>
                      <div className="px-3 py-1 bg-indigo-500 text-white font-bold rounded-full">
                        {responses[question] || 0}
                      </div>
                      <span className="font-medium">10 - Muy probable</span>
                    </div>
                  </div>
                ) : (
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white"
                    placeholder="Escribe tu respuesta aquí..."
                    value={responses[question] || ''}
                    onChange={(e) => handleResponseChange(question, e.target.value)}
                  ></textarea>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Canales de envío */}
        {selectedTemplate && (
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Canales de Envío
            </label>
            <div className="grid grid-cols-3 gap-3">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedChannel === channel.id
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white mb-2 shadow-lg`}>
                    <channel.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 text-center">{channel.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Programación de envíos */}
        {selectedTemplate && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-700">Programar envío</p>
                <p className="text-xs text-gray-600">Enviar inmediatamente o programar para más tarde</p>
              </div>
              <button className="px-4 py-2 bg-white border-2 border-purple-300 rounded-xl text-sm font-bold text-purple-700 hover:bg-purple-50 transition-colors duration-300">
                Configurar
              </button>
            </div>
          </div>
        )}

        {/* Botón de envío */}
        <motion.button
          onClick={handleSubmit}
          disabled={isSending || !selectedTemplate || Object.keys(responses).length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white border border-white/20 group ${
            isSending || !selectedTemplate || Object.keys(responses).length === 0
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {/* Efecto hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

          <div className="relative z-10 flex items-center justify-center gap-3">
            <Send className="w-6 h-6" />
            <span className="text-lg font-bold">
              {isSending ? 'Enviando Encuesta...' : 'Enviar Encuesta'}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default EncuestasRapidas;