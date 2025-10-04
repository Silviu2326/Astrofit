import React, { useState } from 'react';
import {
  Send,
  Mail,
  Users,
  Calendar,
  Clock,
  Eye,
  Split,
  Save,
  Trash2,
  Plus,
  FileText,
  Filter,
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
}

interface Segment {
  id: string;
  name: string;
  criteria: string;
  size: number;
}

interface ABTest {
  enabled: boolean;
  variantA: {
    subject: string;
    percentage: number;
  };
  variantB: {
    subject: string;
    percentage: number;
  };
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  segment: string;
  scheduled?: Date;
  status: 'draft' | 'scheduled' | 'sent';
  abTest?: ABTest;
}

const EmailBroadcast: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'templates' | 'segments' | 'campaigns'>('compose');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [subjectA, setSubjectA] = useState('');
  const [subjectB, setSubjectB] = useState('');
  const [splitPercentage, setSplitPercentage] = useState(50);
  const [showPreview, setShowPreview] = useState(false);

  const templates: EmailTemplate[] = [
    { id: '1', name: 'Bienvenida', subject: '¡Bienvenido a nuestra comunidad!', content: 'Hola {{nombre}},\n\nGracias por unirte...', category: 'Onboarding' },
    { id: '2', name: 'Newsletter Mensual', subject: 'Novedades del mes', content: 'Hola {{nombre}},\n\nEste mes tenemos...', category: 'Newsletter' },
    { id: '3', name: 'Oferta Especial', subject: '🎉 Oferta exclusiva para ti', content: 'Hola {{nombre}},\n\nTenemos una oferta...', category: 'Promocional' },
    { id: '4', name: 'Recordatorio', subject: 'No te olvides de...', content: 'Hola {{nombre}},\n\nTe recordamos que...', category: 'Transaccional' }
  ];

  const segments: Segment[] = [
    { id: '1', name: 'Todos los suscriptores', criteria: 'Todos', size: 15420 },
    { id: '2', name: 'Nuevos usuarios (30 días)', criteria: 'Registrados últimos 30 días', size: 1250 },
    { id: '3', name: 'Usuarios activos', criteria: 'Actividad en últimos 7 días', size: 8340 },
    { id: '4', name: 'Usuarios inactivos', criteria: 'Sin actividad en 30+ días', size: 2890 },
    { id: '5', name: 'Alta conversión', criteria: 'CTR > 5%', size: 3120 }
  ];

  const campaigns: EmailCampaign[] = [
    { id: '1', name: 'Newsletter Marzo', subject: 'Novedades del mes', content: '...', segment: 'Todos los suscriptores', status: 'sent' },
    { id: '2', name: 'Campaña Primavera', subject: 'Ofertas de temporada', content: '...', segment: 'Usuarios activos', status: 'scheduled', scheduled: new Date('2025-10-15') },
    { id: '3', name: 'Reactivación', subject: 'Te echamos de menos', content: '...', segment: 'Usuarios inactivos', status: 'draft' }
  ];

  const handleTemplateSelect = (template: EmailTemplate) => {
    setEmailSubject(template.subject);
    setEmailContent(template.content);
    setActiveTab('compose');
  };

  const handleSendBroadcast = () => {
    console.log('Sending broadcast...', {
      subject: abTestEnabled ? 'A/B Test' : emailSubject,
      content: emailContent,
      segment: selectedSegment,
      scheduled: scheduledDate && scheduledTime ? `${scheduledDate} ${scheduledTime}` : null,
      abTest: abTestEnabled ? { subjectA, subjectB, splitPercentage } : null
    });
  };

  const renderCompose = () => (
    <div className="space-y-6">
      {/* A/B Testing Toggle */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Split className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-semibold text-white">A/B Testing</h3>
              <p className="text-sm text-gray-400">Prueba dos versiones del asunto para optimizar apertura</p>
            </div>
          </div>
          <button
            onClick={() => setAbTestEnabled(!abTestEnabled)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              abTestEnabled
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {abTestEnabled ? 'Activado' : 'Desactivado'}
          </button>
        </div>
      </div>

      {/* Subject Line */}
      {abTestEnabled ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Asunto Variante A
            </label>
            <input
              type="text"
              value={subjectA}
              onChange={(e) => setSubjectA(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
              placeholder="Escribe el asunto de la variante A..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Asunto Variante B
            </label>
            <input
              type="text"
              value={subjectB}
              onChange={(e) => setSubjectB(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Escribe el asunto de la variante B..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Distribución (A: {splitPercentage}% / B: {100 - splitPercentage}%)
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={splitPercentage}
              onChange={(e) => setSplitPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Asunto del Email
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
            placeholder="Escribe el asunto del email..."
          />
        </div>
      )}

      {/* Email Content */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contenido del Email
        </label>
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-700 bg-gray-900/50">
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
              <strong>B</strong>
            </button>
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white italic">
              <em>I</em>
            </button>
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white underline">
              U
            </button>
            <div className="w-px h-6 bg-gray-700 mx-1"></div>
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="w-full bg-transparent px-4 py-3 text-white focus:outline-none min-h-[300px] resize-none"
            placeholder="Escribe el contenido del email...&#10;&#10;Puedes usar variables como {{nombre}}, {{email}}, etc."
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Usa <code className="px-1.5 py-0.5 bg-gray-800 rounded text-pink-400">{"{{variable}}"}</code> para personalizar
        </p>
      </div>

      {/* Segmentation */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Segmentación de Audiencia
        </label>
        <select
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">Selecciona un segmento...</option>
          {segments.map(segment => (
            <option key={segment.id} value={segment.id}>
              {segment.name} ({segment.size.toLocaleString()} usuarios)
            </option>
          ))}
        </select>
      </div>

      {/* Scheduling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Fecha de Envío
          </label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Hora de Envío
          </label>
          <input
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSendBroadcast}
          className="flex-1 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {scheduledDate ? 'Programar Envío' : 'Enviar Ahora'}
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <Eye className="w-5 h-5" />
          Vista Previa
        </button>
        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
          <Save className="w-5 h-5" />
          Guardar
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Vista Previa del Email</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 text-gray-900">
                <h4 className="text-xl font-bold mb-4">{abTestEnabled ? subjectA : emailSubject}</h4>
                <div className="whitespace-pre-wrap">{emailContent}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Templates de Email</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <div key={template.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                  {template.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="p-2 hover:bg-gray-700 rounded-lg text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-2">{template.subject}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{template.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Segmentos de Audiencia</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Segmento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {segments.map(segment => (
          <div key={segment.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-fuchsia-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-fuchsia-400" />
                  <h4 className="font-semibold text-white">{segment.name}</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">{segment.criteria}</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-white">{segment.size.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">usuarios</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Campañas de Email</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-white">{campaign.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    campaign.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                    campaign.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {campaign.status === 'sent' ? 'Enviado' :
                     campaign.status === 'scheduled' ? 'Programado' :
                     'Borrador'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{campaign.subject}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {campaign.segment}
                  </span>
                  {campaign.scheduled && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {campaign.scheduled.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Stats
                </button>
                {campaign.status === 'draft' && (
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Enviar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-purple-600 rounded-xl">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Email Broadcast
              </h1>
              <p className="text-gray-400 mt-1">
                Crea y envía campañas de email masivas personalizadas
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('compose')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'compose'
                  ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Componer
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'segments'
                  ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Segmentos
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Campañas
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          {activeTab === 'compose' && renderCompose()}
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'segments' && renderSegments()}
          {activeTab === 'campaigns' && renderCampaigns()}
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default EmailBroadcast;
