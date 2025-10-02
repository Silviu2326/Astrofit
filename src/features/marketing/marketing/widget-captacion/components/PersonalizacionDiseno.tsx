import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette, Type, Image as ImageIcon, Sparkles, Eye,
  Paintbrush, Layout, CheckCircle, Copy, Save, RotateCcw
} from 'lucide-react';

// Datos mock de widgets
const mockWidgets = [
  {
    id: 'widget-1',
    name: 'Reserva de Consultoría',
    type: 'reserva' as const,
    design: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#06b6d4',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      borderRadius: '16',
      buttonText: 'Reservar Ahora',
      title: '¡Agenda tu Consultoría Gratis!',
      description: 'Nuestros expertos están listos para ayudarte',
      fontFamily: 'Inter',
      animation: 'slide-up'
    }
  },
  {
    id: 'widget-2',
    name: 'Newsletter Suscripción',
    type: 'info' as const,
    design: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#a78bfa',
      backgroundColor: '#faf5ff',
      textColor: '#581c87',
      borderRadius: '24',
      buttonText: 'Suscribirse',
      title: 'Únete a nuestra Newsletter',
      description: 'Recibe contenido exclusivo',
      fontFamily: 'Poppins',
      animation: 'fade-in'
    }
  },
  {
    id: 'widget-3',
    name: 'Descarga Ebook',
    type: 'descarga' as const,
    design: {
      primaryColor: '#10b981',
      secondaryColor: '#34d399',
      backgroundColor: '#ecfdf5',
      textColor: '#064e3b',
      borderRadius: '20',
      buttonText: 'Descargar Gratis',
      title: 'Descarga tu Ebook Gratis',
      description: 'Guía completa de Marketing 2025',
      fontFamily: 'Roboto',
      animation: 'scale-in'
    }
  }
];

// Temas predefinidos
const predefinedThemes = [
  {
    name: 'Océano',
    primaryColor: '#0ea5e9',
    secondaryColor: '#06b6d4',
    backgroundColor: '#e0f2fe',
    gradient: 'from-cyan-500 to-blue-500',
    emoji: '🌊'
  },
  {
    name: 'Bosque',
    primaryColor: '#10b981',
    secondaryColor: '#34d399',
    backgroundColor: '#d1fae5',
    gradient: 'from-green-500 to-emerald-500',
    emoji: '🌲'
  },
  {
    name: 'Atardecer',
    primaryColor: '#f59e0b',
    secondaryColor: '#fb923c',
    backgroundColor: '#fef3c7',
    gradient: 'from-orange-500 to-red-500',
    emoji: '🌅'
  },
  {
    name: 'Lavanda',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a78bfa',
    backgroundColor: '#f3e8ff',
    gradient: 'from-purple-500 to-pink-500',
    emoji: '💜'
  },
  {
    name: 'Neón',
    primaryColor: '#ec4899',
    secondaryColor: '#f472b6',
    backgroundColor: '#fce7f3',
    gradient: 'from-pink-500 to-rose-500',
    emoji: '⚡'
  },
  {
    name: 'Carbón',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    backgroundColor: '#f3f4f6',
    gradient: 'from-gray-600 to-gray-800',
    emoji: '⚫'
  }
];

const PersonalizacionDiseno: React.FC = () => {
  const [selectedWidgetId, setSelectedWidgetId] = useState(mockWidgets[0].id);
  const [design, setDesign] = useState(mockWidgets[0].design);
  const [saved, setSaved] = useState(false);

  const currentWidget = mockWidgets.find(w => w.id === selectedWidgetId) || mockWidgets[0];

  const handleColorChange = (field: string, value: string) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  };

  const handleTextChange = (field: string, value: string) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  };

  const applyTheme = (theme: typeof predefinedThemes[0]) => {
    setDesign(prev => ({
      ...prev,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      backgroundColor: theme.backgroundColor
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const original = mockWidgets.find(w => w.id === selectedWidgetId);
    if (original) {
      setDesign({ ...original.design });
    }
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
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Diseño y Branding</h2>
            <p className="text-gray-600">Personaliza el aspecto de tus widgets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockWidgets.map((widget, index) => (
            <motion.button
              key={widget.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setSelectedWidgetId(widget.id);
                setDesign({ ...widget.design });
              }}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                selectedWidgetId === widget.id
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl scale-105'
                  : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Paintbrush className={`w-5 h-5 ${selectedWidgetId === widget.id ? 'text-white' : 'text-purple-500'}`} />
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  selectedWidgetId === widget.id
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-100 text-purple-700'
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

      {/* Panel Principal con Preview y Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor de Diseño */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Temas Predefinidos */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Temas Prediseñados</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {predefinedThemes.map((theme, index) => (
                <motion.button
                  key={theme.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => applyTheme(theme)}
                  className="relative overflow-hidden rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300 group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative z-10">
                    <span className="text-3xl mb-2 block">{theme.emoji}</span>
                    <p className="text-xs font-bold text-white">{theme.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Configuración de Colores */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Colores</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Color Principal', field: 'primaryColor', desc: 'Botones y elementos destacados' },
                { label: 'Color Secundario', field: 'secondaryColor', desc: 'Bordes y acentos' },
                { label: 'Fondo', field: 'backgroundColor', desc: 'Color de fondo del widget' },
                { label: 'Texto', field: 'textColor', desc: 'Color del texto principal' }
              ].map((item) => (
                <div key={item.field} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {item.label}
                    </label>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <input
                    type="color"
                    value={design[item.field as keyof typeof design] as string}
                    onChange={(e) => handleColorChange(item.field, e.target.value)}
                    className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200 hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Configuración de Textos */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Textos</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={design.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={design.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Texto del Botón
                </label>
                <input
                  type="text"
                  value={design.buttonText}
                  onChange={(e) => handleTextChange('buttonText', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Estilo y Forma */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Estilo</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Redondeo de Bordes: {design.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={design.borderRadius}
                  onChange={(e) => handleTextChange('borderRadius', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fuente
                </label>
                <select
                  value={design.fontFamily}
                  onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  ¡Guardado!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </motion.button>

            <button
              onClick={handleReset}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Restablecer
            </button>
          </div>
        </motion.div>

        {/* Vista Previa en Vivo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:sticky lg:top-8 h-fit"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Vista Previa en Vivo</h3>
                <p className="text-sm text-gray-600">Los cambios se aplican en tiempo real</p>
              </div>
            </div>

            {/* Preview del widget */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 min-h-[500px] flex items-center justify-center">
              <motion.div
                key={JSON.stringify(design)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md shadow-2xl"
                style={{
                  backgroundColor: design.backgroundColor,
                  borderRadius: `${design.borderRadius}px`,
                  fontFamily: design.fontFamily
                }}
              >
                <div className="p-8">
                  {/* Icono decorativo */}
                  <div
                    className="inline-flex p-4 rounded-2xl mb-6"
                    style={{ backgroundColor: design.primaryColor }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>

                  {/* Título */}
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: design.textColor }}
                  >
                    {design.title}
                  </h3>

                  {/* Descripción */}
                  <p
                    className="mb-6 opacity-80"
                    style={{ color: design.textColor }}
                  >
                    {design.description}
                  </p>

                  {/* Campos de formulario simulados */}
                  <div className="space-y-3 mb-6">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-12 rounded-xl"
                        style={{
                          backgroundColor: `${design.secondaryColor}20`,
                          border: `2px solid ${design.secondaryColor}40`
                        }}
                      />
                    ))}
                  </div>

                  {/* Botón */}
                  <button
                    className="w-full py-4 font-bold text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                    style={{
                      backgroundColor: design.primaryColor,
                      borderRadius: `${design.borderRadius}px`
                    }}
                  >
                    {design.buttonText}
                  </button>

                  {/* Texto pequeño */}
                  <p className="text-xs text-center mt-4 opacity-60" style={{ color: design.textColor }}>
                    Política de privacidad
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Código CSS generado */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">Código CSS</label>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <code className="text-xs text-green-400 font-mono whitespace-pre">
{`.widget {
  background: ${design.backgroundColor};
  color: ${design.textColor};
  border-radius: ${design.borderRadius}px;
  font-family: ${design.fontFamily};
}

.widget-button {
  background: ${design.primaryColor};
  border-radius: ${design.borderRadius}px;
}`}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizacionDiseno;
