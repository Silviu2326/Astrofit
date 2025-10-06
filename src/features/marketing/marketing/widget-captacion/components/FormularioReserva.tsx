import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Clock, MessageSquare,
  CheckCircle, AlertCircle, Monitor, Smartphone, Eye,
  Settings2, Sparkles
} from 'lucide-react';

// Datos mockeados de widgets con configuraciones
const mockWidgets = [
  {
    id: 'widget-1',
    name: 'Reserva de Consultoría',
    type: 'reserva',
    fields: ['nombre', 'email', 'telefono', 'fecha', 'hora'],
    design: {
      primaryColor: '#0ea5e9',
      buttonText: 'Reservar Ahora',
      title: '¡Agenda tu Consultoría Gratis!',
      description: 'Nuestros expertos están listos para ayudarte'
    }
  },
  {
    id: 'widget-2',
    name: 'Newsletter Suscripción',
    type: 'info',
    fields: ['nombre', 'email'],
    design: {
      primaryColor: '#8b5cf6',
      buttonText: 'Suscribirse',
      title: 'Únete a nuestra Newsletter',
      description: 'Recibe contenido exclusivo cada semana'
    }
  },
  {
    id: 'widget-3',
    name: 'Descarga Ebook Gratuito',
    type: 'descarga',
    fields: ['nombre', 'email', 'telefono'],
    design: {
      primaryColor: '#10b981',
      buttonText: 'Descargar Gratis',
      title: 'Descarga tu Ebook Gratis',
      description: 'Guía completa de Marketing Digital 2025'
    }
  },
  {
    id: 'widget-4',
    name: 'Contacto Completo',
    type: 'info',
    fields: ['nombre', 'email', 'telefono', 'mensaje'],
    design: {
      primaryColor: '#f59e0b',
      buttonText: 'Enviar Mensaje',
      title: '¿Tienes alguna pregunta?',
      description: 'Estamos aquí para ayudarte'
    }
  }
];

const FormularioReserva: React.FC = () => {
  const [selectedWidgetId, setSelectedWidgetId] = useState(mockWidgets[0].id);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentWidget = mockWidgets.find(w => w.id === selectedWidgetId) || mockWidgets[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    currentWidget.fields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    // Validación de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validación de teléfono
    if (formData.telefono && currentWidget.fields.includes('telefono') && !/^\d{9,}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido (mínimo 9 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          fecha: '',
          hora: '',
          mensaje: ''
        });
      }, 3000);
    }
  };

  const renderField = (field: string) => {
    const fieldConfig: { [key: string]: { icon: any, type: string, placeholder: string, label: string } } = {
      nombre: { icon: User, type: 'text', placeholder: 'Juan Pérez', label: 'Nombre Completo' },
      email: { icon: Mail, type: 'email', placeholder: 'juan@ejemplo.com', label: 'Email' },
      telefono: { icon: Phone, type: 'tel', placeholder: '612345678', label: 'Teléfono' },
      fecha: { icon: Calendar, type: 'date', placeholder: '', label: 'Fecha' },
      hora: { icon: Clock, type: 'time', placeholder: '', label: 'Hora' },
      mensaje: { icon: MessageSquare, type: 'textarea', placeholder: 'Escribe tu mensaje...', label: 'Mensaje' }
    };

    const config = fieldConfig[field];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <div key={field}>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {config.label}
        </label>
        {config.type === 'textarea' ? (
          <textarea
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            placeholder={config.placeholder}
            rows={4}
            className={`w-full px-4 py-3 rounded-2xl border-2 ${
              errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-100'
            } focus:ring-4 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none`}
          />
        ) : (
          <input
            type={config.type}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            placeholder={config.placeholder}
            className={`w-full px-4 py-3 rounded-2xl border-2 ${
              errors[field]
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-100'
            } focus:ring-4 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm`}
          />
        )}
        {errors[field] && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium"
          >
            <AlertCircle className="w-4 h-4" />
            {errors[field]}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Selector de Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
            <Settings2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Configuración y Preview</h2>
            <p className="text-gray-600">Selecciona un widget para ver su formulario</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockWidgets.map((widget, index) => (
            <motion.button
              key={widget.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedWidgetId(widget.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                selectedWidgetId === widget.id
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-xl scale-105'
                  : 'bg-white hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 border-2 border-gray-200 hover:border-cyan-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Eye className={`w-5 h-5 ${selectedWidgetId === widget.id ? 'text-white' : 'text-cyan-500'}`} />
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  selectedWidgetId === widget.id
                    ? 'bg-white/20 text-white'
                    : 'bg-cyan-100 text-cyan-700'
                }`}>
                  {widget.type}
                </span>
              </div>
              <h3 className={`font-bold text-sm ${selectedWidgetId === widget.id ? 'text-white' : 'text-gray-900'}`}>
                {widget.name}
              </h3>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview del Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel de Vista Previa */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Vista Previa</h3>
                <p className="text-sm text-gray-600">Preview del widget en tiempo real</p>
              </div>
            </div>

            {/* Toggle de dispositivo */}
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  previewDevice === 'desktop'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  previewDevice === 'mobile'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mockup del dispositivo */}
          <div className="flex items-center justify-center">
            <div className={`transition-all duration-500 ${
              previewDevice === 'desktop' ? 'w-full' : 'w-80'
            }`}>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-2xl p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1 text-xs text-gray-400 font-mono">
                  tudominio.com
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-b-2xl" style={{ minHeight: '400px' }}>
                {/* Widget Preview Card */}
                <motion.div
                  key={selectedWidgetId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto"
                >
                  {/* Header del widget */}
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentWidget.design.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentWidget.design.description}
                    </p>
                  </div>

                  {/* Mini formulario preview */}
                  <div className="space-y-3">
                    {currentWidget.fields.slice(0, 3).map((field, idx) => (
                      <div key={idx} className="h-10 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                    <button
                      style={{ backgroundColor: currentWidget.design.primaryColor }}
                      className="w-full py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      {currentWidget.design.buttonText}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulario Funcional */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Formulario Interactivo</h3>
              <p className="text-sm text-gray-600">Prueba el formulario en acción</p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-green-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex p-4 bg-green-500 rounded-full mb-4"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                ¡Formulario Enviado!
              </h3>
              <p className="text-green-700">
                Tu información ha sido recibida correctamente
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {currentWidget.fields.map(field => renderField(field))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{ backgroundColor: currentWidget.design.primaryColor }}
                className="w-full py-4 rounded-2xl text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {currentWidget.design.buttonText}
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                Al enviar aceptas nuestra política de privacidad
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Configuración de Campos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Settings2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Campos Configurados</h2>
            <p className="text-gray-600">Campos activos en este widget</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {['nombre', 'email', 'telefono', 'fecha', 'hora', 'mensaje'].map((field, index) => {
            const isActive = currentWidget.fields.includes(field);
            const icons: { [key: string]: any } = {
              nombre: User,
              email: Mail,
              telefono: Phone,
              fecha: Calendar,
              hora: Clock,
              mensaje: MessageSquare
            };
            const Icon = icons[field];

            return (
              <motion.div
                key={field}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-semibold capitalize">{field}</p>
                {isActive && (
                  <CheckCircle className="w-4 h-4 mx-auto mt-1" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FormularioReserva;
