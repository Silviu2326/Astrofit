import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Square, Circle, Type, Image, Layout, Layers, Settings2, Code2 } from 'lucide-react';

const EditorVisual: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [componentStyle, setComponentStyle] = useState({
    borderRadius: 'rounded-xl',
    shadow: 'shadow-lg',
    padding: 'p-4',
  });

  const componentStyles = {
    borderRadius: [
      { value: 'rounded-none', label: 'Square', icon: '▢' },
      { value: 'rounded-xl', label: 'Rounded', icon: '▢' },
      { value: 'rounded-full', label: 'Pill', icon: '●' },
    ],
    shadow: [
      { value: 'shadow-none', label: 'None' },
      { value: 'shadow-md', label: 'Soft' },
      { value: 'shadow-xl', label: 'Strong' },
      { value: 'shadow-2xl', label: 'Extra' },
    ],
  };

  const uiComponents = [
    { id: 'button', name: 'Botón', icon: Square, color: 'from-blue-500 to-indigo-600' },
    { id: 'card', name: 'Card', icon: Layout, color: 'from-purple-500 to-pink-600' },
    { id: 'badge', name: 'Badge', icon: Circle, color: 'from-emerald-500 to-teal-600' },
    { id: 'input', name: 'Input', icon: Type, color: 'from-orange-500 to-red-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                <Layers className="w-5 h-5" />
              </div>
              Componentes UI
            </h2>
            <p className="text-sm text-gray-600 mt-1">Personaliza el estilo de cada elemento</p>
          </div>
        </div>

        {/* Selector de componentes */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {uiComponents.map((component) => (
            <motion.div
              key={component.id}
              whileHover={{ scale: 1.03, y: -2 }}
              onClick={() => setSelectedComponent(component.id)}
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 ${
                selectedComponent === component.id
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                <component.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{component.name}</h3>
            </motion.div>
          ))}
        </div>

        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Border Radius */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Estilo de Bordes
              </label>
              <div className="grid grid-cols-3 gap-2">
                {componentStyles.borderRadius.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setComponentStyle({ ...componentStyle, borderRadius: style.value })}
                    className={`py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      componentStyle.borderRadius === style.value
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shadow */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Sombra
              </label>
              <div className="grid grid-cols-4 gap-2">
                {componentStyles.shadow.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setComponentStyle({ ...componentStyle, shadow: style.value })}
                    className={`py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      componentStyle.shadow === style.value
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview del componente */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-900">Preview</span>
              </div>
              <div className="flex items-center justify-center p-8 bg-white rounded-xl">
                {selectedComponent === 'button' && (
                  <button
                    className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold ${componentStyle.borderRadius} ${componentStyle.shadow} hover:scale-105 transition-transform duration-300`}
                  >
                    Botón de Ejemplo
                  </button>
                )}
                {selectedComponent === 'card' && (
                  <div className={`bg-white ${componentStyle.borderRadius} ${componentStyle.shadow} ${componentStyle.padding} border border-gray-200 w-full max-w-xs`}>
                    <div className="h-3 w-3/4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                  </div>
                )}
                {selectedComponent === 'badge' && (
                  <div className={`px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm ${componentStyle.borderRadius} ${componentStyle.shadow}`}>
                    Badge
                  </div>
                )}
                {selectedComponent === 'input' && (
                  <input
                    type="text"
                    placeholder="Input de ejemplo"
                    className={`px-4 py-3 border-2 border-gray-300 focus:border-purple-500 outline-none ${componentStyle.borderRadius} ${componentStyle.shadow} w-full max-w-xs`}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {!selectedComponent && (
          <div className="text-center py-8 text-gray-500">
            <Layout className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecciona un componente para personalizar</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EditorVisual;
