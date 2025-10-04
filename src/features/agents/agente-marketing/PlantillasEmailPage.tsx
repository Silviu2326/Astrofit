import React, { useState } from 'react';
import { ArrowLeft, Mail, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import BibliotecaTemplates from './components/email/BibliotecaTemplates';
import EditorEmailDragDrop from './components/email/EditorEmailDragDrop';
import TemplatesPersonalizados from './components/email/TemplatesPersonalizados';

type TabType = 'biblioteca' | 'editor' | 'personalizados';

export default function PlantillasEmailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('biblioteca');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const tabs = [
    { id: 'biblioteca' as TabType, label: 'Biblioteca', icon: Mail },
    { id: 'editor' as TabType, label: 'Editor Visual', icon: Sparkles },
    { id: 'personalizados' as TabType, label: 'Mis Templates', icon: Plus },
  ];

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setActiveTab('editor');
  };

  const handleSaveTemplate = (template: any) => {
    console.log('Template guardado:', template);
    setActiveTab('personalizados');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/agente-marketing"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Agente de Marketing
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                📧 Plantillas de Email
              </h1>
              <p className="text-white/80">
                Biblioteca de templates profesionales con editor drag & drop
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl">
          {activeTab === 'biblioteca' && (
            <BibliotecaTemplates onSelectTemplate={handleSelectTemplate} />
          )}

          {activeTab === 'editor' && (
            <EditorEmailDragDrop
              initialTemplate={selectedTemplate}
              onSave={handleSaveTemplate}
            />
          )}

          {activeTab === 'personalizados' && (
            <TemplatesPersonalizados onEditTemplate={handleSelectTemplate} />
          )}
        </div>
      </div>
    </div>
  );
}
