import React, { useState } from 'react';
import { Store, CreditCard, Truck, Receipt, Globe, Palette, Save, Check, AlertCircle } from 'lucide-react';
import PersonalizacionTienda from './components/PersonalizacionTienda';
import MetodosPago from './components/MetodosPago';
import MetodosEnvio from './components/MetodosEnvio';
import ConfiguracionImpuestos from './components/ConfiguracionImpuestos';

type Tab = 'personalizacion' | 'pago' | 'envio' | 'impuestos';

const ConfiguracionTiendaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('personalizacion');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const tabs = [
    { id: 'personalizacion' as Tab, label: 'Personalización', icon: Palette },
    { id: 'pago' as Tab, label: 'Métodos de Pago', icon: CreditCard },
    { id: 'envio' as Tab, label: 'Métodos de Envío', icon: Truck },
    { id: 'impuestos' as Tab, label: 'Impuestos', icon: Receipt },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  Configuración de Tienda
                </h1>
                <p className="text-gray-600 mt-1">
                  Personaliza tu tienda online, métodos de pago, envío e impuestos
                </p>
              </div>
            </div>

            {hasChanges && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                  </>
                )}
              </button>
            )}
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-green-800 font-medium">
                Configuración guardada correctamente
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'personalizacion' && (
          <PersonalizacionTienda onChangeDetected={() => setHasChanges(true)} />
        )}
        {activeTab === 'pago' && (
          <MetodosPago onChangeDetected={() => setHasChanges(true)} />
        )}
        {activeTab === 'envio' && (
          <MetodosEnvio onChangeDetected={() => setHasChanges(true)} />
        )}
        {activeTab === 'impuestos' && (
          <ConfiguracionImpuestos onChangeDetected={() => setHasChanges(true)} />
        )}
      </div>

      {/* Info Footer */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">
                Importante
              </h3>
              <p className="text-purple-700 text-sm">
                Los cambios en la configuración se aplicarán inmediatamente después de guardar.
                Asegúrate de revisar todas las secciones antes de activar tu tienda online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionTiendaPage;
