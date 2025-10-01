
import React, { useState, useEffect } from 'react';
import { widgetCaptacionApi, WidgetConfig } from '../widgetCaptacionApi';

const GeneradorWidget: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetConfig | null>(null);
  const [widgetType, setWidgetType] = useState<'reserva' | 'info' | 'descarga'>('reserva');
  const [widgetName, setWidgetName] = useState<string>('');

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    const data = await widgetCaptacionApi.getWidgets();
    setWidgets(data);
  };

  const handleCreateWidget = async () => {
    if (!widgetName) return;
    const newWidget = {
      type: widgetType,
      name: widgetName,
      design: { primaryColor: '#000000', buttonText: 'Click Me', fields: [] }, // Default design
    };
    await widgetCaptacionApi.createWidget(newWidget);
    setWidgetName('');
    fetchWidgets();
  };

  const handleCopyEmbedCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Código embed copiado al portapapeles!');
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Generador de Widget</h2>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Crear Nuevo Widget</h3>
        <div className="flex items-center space-x-4">
          <select
            className="border rounded-md p-2"
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.value as 'reserva' | 'info' | 'descarga')}
          >
            <option value="reserva">Reserva</option>
            <option value="info">Información</option>
            <option value="descarga">Descarga de Guía</option>
          </select>
          <input
            type="text"
            placeholder="Nombre del Widget"
            className="border rounded-md p-2 flex-grow"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleCreateWidget}
          >
            Crear Widget
          </button>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-2">Widgets Existentes</h3>
      {widgets.length === 0 ? (
        <p>No hay widgets creados aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="border p-4 rounded-md shadow-sm">
              <h4 className="font-semibold text-lg mb-2">{widget.name} ({widget.type})</h4>
              <p className="text-gray-600 mb-2">ID: {widget.id}</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Código Embed:</label>
                <textarea
                  readOnly
                  value={widget.embedCode}
                  className="w-full p-2 border rounded-md bg-gray-50 text-sm mt-1"
                  rows={4}
                ></textarea>
                <button
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                  onClick={() => handleCopyEmbedCode(widget.embedCode)}
                >
                  Copiar Código
                </button>
              </div>
              <button
                className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                onClick={() => setSelectedWidget(widget)}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedWidget && (
        <div className="mt-8 p-4 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-4">Detalles del Widget: {selectedWidget.name}</h3>
          <p><strong>Tipo:</strong> {selectedWidget.type}</p>
          <p><strong>ID:</strong> {selectedWidget.id}</p>
          <p><strong>Color Primario:</strong> {selectedWidget.design.primaryColor}</p>
          <p><strong>Texto del Botón:</strong> {selectedWidget.design.buttonText}</p>
          <p><strong>Campos del Formulario:</strong> {selectedWidget.design.fields.join(', ')}</p>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => setSelectedWidget(null)}
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneradorWidget;
