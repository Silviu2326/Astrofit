import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, AlignLeft, Sparkles, ChevronDown } from 'lucide-react';

interface SelectorTipografiasProps {
  brandingConfig: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: number;
    logoUrl: string;
  };
  setBrandingConfig: (config: any) => void;
}

const SelectorTipografias: React.FC<SelectorTipografiasProps> = ({ brandingConfig, setBrandingConfig }) => {
  const [fontCategory, setFontCategory] = useState<'sans' | 'serif' | 'mono' | 'display'>('sans');

  // Google Fonts organizadas por categoría
  const googleFonts = {
    sans: ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Work Sans', 'Nunito'],
    serif: ['Playfair Display', 'Merriweather', 'Lora', 'Crimson Text', 'EB Garamond', 'Libre Baskerville'],
    mono: ['Roboto Mono', 'Fira Code', 'Source Code Pro', 'JetBrains Mono', 'Courier Prime'],
    display: ['Bebas Neue', 'Righteous', 'Pacifico', 'Satisfy', 'Dancing Script', 'Permanent Marker'],
  };

  const tamanosFuente = [
    { label: 'Pequeño', value: 14 },
    { label: 'Normal', value: 16 },
    { label: 'Grande', value: 18 },
    { label: 'Extra Grande', value: 20 },
  ];

  const jerarquiaTipografica = [
    { nivel: 'H1', size: '3xl', peso: 'bold', ejemplo: 'Título Principal' },
    { nivel: 'H2', size: '2xl', peso: 'semibold', ejemplo: 'Subtítulo Grande' },
    { nivel: 'H3', size: 'xl', peso: 'semibold', ejemplo: 'Subtítulo Mediano' },
    { nivel: 'H4', size: 'lg', peso: 'medium', ejemplo: 'Subtítulo Pequeño' },
    { nivel: 'Body', size: 'base', peso: 'normal', ejemplo: 'Texto del cuerpo principal' },
    { nivel: 'Small', size: 'sm', peso: 'normal', ejemplo: 'Texto pequeño y metadata' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white">
              <Type className="w-5 h-5" />
            </div>
            Tipografía
          </h2>
          <p className="text-sm text-gray-600 mt-1">Elige las fuentes perfectas para tu marca</p>
        </div>

        {/* Categorías de Fuentes */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-3">Categoría de Fuente</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'sans', label: 'Sans Serif', icon: 'Aa' },
              { id: 'serif', label: 'Serif', icon: 'Aa' },
              { id: 'mono', label: 'Monospace', icon: '</>' },
              { id: 'display', label: 'Display', icon: 'Aa' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFontCategory(cat.id as any)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  fontCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className="text-lg mb-1">{cat.icon}</div>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Fuente Principal */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-600" />
            Fuente Principal
          </label>
          <div className="relative">
            <select
              value={brandingConfig.fontFamily}
              onChange={(e) => setBrandingConfig({ ...brandingConfig, fontFamily: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none bg-white appearance-none cursor-pointer font-medium text-gray-900"
              style={{ fontFamily: brandingConfig.fontFamily }}
            >
              {googleFonts[fontCategory].map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>

          {/* Preview de la fuente seleccionada */}
          <div className="mt-4 p-6 bg-white rounded-xl border-2 border-indigo-100">
            <p
              className="text-3xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: brandingConfig.fontFamily }}
            >
              Aa Bb Cc Dd Ee Ff
            </p>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: brandingConfig.fontFamily }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
            <p
              className="text-sm text-gray-500 mt-2"
              style={{ fontFamily: brandingConfig.fontFamily }}
            >
              1234567890 !@#$%^&*()
            </p>
          </div>
        </div>

        {/* Tamaño de Fuente Base */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-purple-600" />
            Tamaño Base
          </label>
          <div className="grid grid-cols-4 gap-2">
            {tamanosFuente.map((size) => (
              <button
                key={size.value}
                onClick={() => setBrandingConfig({ ...brandingConfig, fontSize: size.value })}
                className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  brandingConfig.fontSize === size.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className="text-xs mb-1 opacity-70">{size.value}px</div>
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jerarquía Tipográfica */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Preview de Jerarquía Tipográfica
          </h3>
          <div className="space-y-4">
            {jerarquiaTipografica.map((item) => (
              <motion.div
                key={item.nivel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: jerarquiaTipografica.indexOf(item) * 0.05 }}
                className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-indigo-300 transition-all group"
              >
                <div className="flex items-baseline gap-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {item.nivel}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-${item.size} font-${item.peso} text-gray-900 group-hover:text-indigo-600 transition-colors`}
                      style={{ fontFamily: brandingConfig.fontFamily }}
                    >
                      {item.ejemplo}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 font-mono">
                    {item.size} / {item.peso}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Google Fonts Info */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <div className="p-1 bg-indigo-100 rounded">
            <Sparkles className="w-3 h-3 text-indigo-600" />
          </div>
          <span>Fuentes cargadas desde Google Fonts</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectorTipografias;
