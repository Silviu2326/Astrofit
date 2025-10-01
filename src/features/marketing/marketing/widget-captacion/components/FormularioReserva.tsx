
import React, { useState, useEffect } from 'react';
import { widgetCaptacionApi, WidgetConfig, Lead } from '../widgetCaptacionApi';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  [key: string]: string; // For dynamic fields
}

const FormularioReserva: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | ''>('');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', date: '', time: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    const data = await widgetCaptacionApi.getWidgets();
    setWidgets(data.filter(w => w.type === 'reserva' || w.type === 'info')); // Only show relevant widgets
    if (data.length > 0) {
      setSelectedWidgetId(data[0].id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = (currentWidget: WidgetConfig) => {
    const newErrors: { [key: string]: string } = {};
    currentWidget.design.fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `El campo ${field} es obligatorio.`;
      }
      // Basic email validation
      if (field === 'email' && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Formato de email inválido.';
      }
      // Basic phone validation (optional, can be more complex)
      if (field === 'telefono' && formData.phone && !/^\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Formato de teléfono inválido (9 dígitos).';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const currentWidget = widgets.find(w => w.id === selectedWidgetId);
    if (!currentWidget) {
      setMessage('Por favor, selecciona un widget válido.');
      return;
    }

    if (!validateForm(currentWidget)) {
      setMessage('Por favor, corrige los errores en el formulario.');
      return;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      widgetId: selectedWidgetId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      date: formData.date || '',
      time: formData.time || '',
      sourcePage: window.location.pathname, // In a real scenario, this would come from the widget embed
      timestamp: new Date(),
    };

    try {
      // Simulate saving lead (in a real app, this would be an API call)
      console.log('New Lead Submitted:', newLead);
      widgetCaptacionApi.simulateNewLeadWebhook(newLead); // Simulate webhook
      setMessage('¡Tu solicitud ha sido enviada con éxito!');
      setFormData({ name: '', email: '', phone: '', date: '', time: '' }); // Clear form
      setErrors({});
    } catch (error) {
      setMessage('Hubo un error al enviar tu solicitud. Inténtalo de nuevo.');
      console.error('Error submitting lead:', error);
    }
  };

  const currentWidget = widgets.find(w => w.id === selectedWidgetId);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Formulario de Reserva/Información</h2>

      <div className="mb-4">
        <label htmlFor="widget-select" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Widget para Previsualizar Formulario:
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

      {currentWidget ? (
        <div className="border p-6 rounded-md bg-gray-50">
          <h3 className="text-xl font-medium mb-4">Previsualización del Formulario: {currentWidget.name}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentWidget.design.fields.includes('nombre') && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}
            {currentWidget.design.fields.includes('email') && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            )}
            {currentWidget.design.fields.includes('telefono') && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            )}
            {currentWidget.design.fields.includes('fecha') && (
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
            )}
            {currentWidget.design.fields.includes('hora') && (
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: currentWidget.design.primaryColor }}
            >
              {currentWidget.design.buttonText}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center ${message.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      ) : (
        <p>Selecciona un widget para ver su formulario.</p>
      )}
    </div>
  );
};

export default FormularioReserva;
