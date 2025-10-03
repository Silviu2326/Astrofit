
import React, { useState, useEffect } from 'react';
import { widgetCaptacionApi, WidgetConfig } from '../widgetCaptacionApi';
import { HexColorPicker } from 'react-colorful'; // Assuming a color picker library is available or will be mocked

// Mock a color picker if react-colorful is not installed
const MockColorPicker: React.FC<{ color: string; onChange: (color: string) => void }> = ({ color, onChange }) => (
  <input
    type="color"
    value={color}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-10 cursor-pointer"
  />
);

const PersonalizacionDiseno: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | ''>('');
  const [currentDesign, setCurrentDesign] = useState<Partial<WidgetConfig['design']>>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchWidgets();
  }, []);

  useEffect(() => {
    if (selectedWidgetId) {
      const widget = widgets.find(w => w.id === selectedWidgetId);
      if (widget) {
        setCurrentDesign(widget.design);
      }
    }
  }, [selectedWidgetId, widgets]);

  const fetchWidgets = async () => {
    const data = await widgetCaptacionApi.getWidgets();
    setWidgets(data);
    if (data.length > 0) {
      setSelectedWidgetId(data[0].id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentDesign(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (color: string) => {
    setCurrentDesign(prev => ({
      ...prev,
      primaryColor: color,
    }));
  };

  const handleFieldChange = (field: string, isChecked: boolean) => {
    setCurrentDesign(prev => {
      const currentFields = prev.fields || [];
      if (isChecked) {
        return { ...prev, fields: [...currentFields, field] };
      } else {
        return { ...prev, fields: currentFields.filter(f => f !== field) };
      }
    });
  };

  const handleSaveDesign = async () => {
    if (!selectedWidgetId) {
      setMessage('Por favor, selecciona un widget para guardar el diseño.');
      return;
    }
    const widgetToUpdate = widgets.find(w => w.id === selectedWidgetId);
    if (widgetToUpdate) {
      const updatedWidget = {
        ...widgetToUpdate,
        design: { ...widgetToUpdate.design, ...currentDesign },
      };
      try {
        await widgetCaptacionApi.updateWidget(updatedWidget);
        setMessage('Diseño del widget actualizado con éxito!');
        fetchWidgets(); // Refresh widgets to show updated design
      } catch (error) {
        setMessage('Error al actualizar el diseño del widget.');
        console.error('Error updating widget design:', error);
      }
    }
  };

  const availableFields = ['nombre', 'email', 'telefono', 'fecha', 'hora', 'mensaje'];

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Personalización de Diseño del Widget</h2>

      <div className="mb-4">
        <label htmlFor="widget-select" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Widget a Personalizar:
        </label>
        <select
          id="widget-select"
          className="border rounded-md p-2 w-full md:w-1/2"
          value={selectedWidgetId}
          onChange={(e) => setSelectedWidgetId(e.target.value)}
        >
          {widgets.map(widget => (
            <option key={widget.id} value={widget.id}>
              {widget.name} ({widget.type})
            </option>
          ))}
        </select>
      </div>

      {selectedWidgetId && currentDesign.primaryColor !== undefined ? (
        <div className="border p-6 rounded-md bg-gray-50">
          <h3 className="text-xl font-medium mb-4">Configuración de Diseño</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Color Primario:</label>
              <MockColorPicker color={currentDesign.primaryColor || '#000000'} onChange={handleColorChange} />
              <input
                type="text"
                id="primaryColor"
                name="primaryColor"
                value={currentDesign.primaryColor || '#000000'}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">Texto del Botón:</label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={currentDesign.buttonText || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campos del Formulario:</label>
              <div className="grid grid-cols-2 gap-2">
                {availableFields.map(field => (
                  <div key={field} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`field-${field}`}
                      checked={currentDesign.fields?.includes(field) || false}
                      onChange={(e) => handleFieldChange(field, e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`field-${field}`} className="ml-2 text-sm text-gray-900 capitalize">{field}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* Add more design customization options here */}

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleSaveDesign}
            >
              Guardar Diseño
            </button>
            {message && (
              <p className={`mt-4 text-center ${message.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Selecciona un widget para personalizar su diseño.</p>
      )}
    </div>
  );
};

export default PersonalizacionDiseno;
