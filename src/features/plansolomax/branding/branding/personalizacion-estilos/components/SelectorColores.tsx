import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Copy, Check, AlertCircle, Droplet, Sparkles } from 'lucide-react';

interface SelectorColoresProps {
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

const SelectorColores: React.FC<SelectorColoresProps> = ({ brandingConfig, setBrandingConfig }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Paletas predefinidas con temas completos
  const paletasPredefinidas = [
    {
      name: 'Vibrante',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      },
    },
    {
      name: 'Océano',
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#3b82f6',
      },
    },
    {
      name: 'Naturaleza',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#84cc16',
      },
    },
    {
      name: 'Sunset',
      colors: {
        primary: '#f59e0b',
        secondary: '#f97316',
        accent: '#ef4444',
      },
    },
    {
      name: 'Elegante',
      colors: {
        primary: '#1f2937',
        secondary: '#4b5563',
        accent: '#6366f1',
      },
    },
  ];

  // Generar paleta automática basada en color primario
  const generarPaletaAutomatica = (baseColor: string) => {
    // Aquí se podría implementar lógica más sofisticada
    return [
      { shade: '50', color: baseColor + '15' },
      { shade: '100', color: baseColor + '30' },
      { shade: '200', color: baseColor + '50' },
      { shade: '500', color: baseColor },
      { shade: '700', color: baseColor + 'dd' },
      { shade: '900', color: baseColor + 'aa' },
    ];
  };

  // Calcular contraste WCAG
  const calcularContraste = (color1: string, color2: string = '#ffffff'): string => {
    // Simplificado - en producción usar una librería como tinycolor2
    const luminance1 = parseInt(color1.substring(1, 3), 16);
    const luminance2 = parseInt(color2.substring(1, 3), 16);
    const ratio = Math.abs(luminance1 - luminance2) / 255;

    if (ratio > 0.7) return 'AAA';
    if (ratio > 0.5) return 'AA';
    return 'Fail';
  };

  const copiarColor = (color: string, tipo: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(tipo);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const aplicarPaleta = (paleta: typeof paletasPredefinidas[0]) => {
    setBrandingConfig({
      ...brandingConfig,
      primaryColor: paleta.colors.primary,
      secondaryColor: paleta.colors.secondary,
      accentColor: paleta.colors.accent,
    });
  };

  const paletaAutomatica = generarPaletaAutomatica(brandingConfig.primaryColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white">
              <Palette className="w-5 h-5" />
            </div>
            Colores de Marca
          </h2>
          <p className="text-sm text-gray-600 mt-1">Define tu paleta de colores con validación WCAG</p>
        </div>

        {/* Color Pickers Principales */}
        <div className="space-y-4 mb-6">
          {/* Color Primario */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-purple-600" />
              Color Primario
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={brandingConfig.primaryColor}
                  onChange={(e) => setBrandingConfig({ ...brandingConfig, primaryColor: e.target.value })}
                  className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Palette className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={brandingConfig.primaryColor}
                    onChange={(e) => setBrandingConfig({ ...brandingConfig, primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none font-mono text-sm"
                  />
                  <button
                    onClick={() => copiarColor(brandingConfig.primaryColor, 'primary')}
                    className="p-2 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    {copiedColor === 'primary' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    calcularContraste(brandingConfig.primaryColor) === 'AAA' ? 'bg-green-100 text-green-700' :
                    calcularContraste(brandingConfig.primaryColor) === 'AA' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    WCAG {calcularContraste(brandingConfig.primaryColor)}
                  </div>
                  <span className="text-xs text-gray-500">Contraste sobre blanco</span>
                </div>
              </div>
            </div>
          </div>

          {/* Color Secundario */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-indigo-600" />
              Color Secundario
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={brandingConfig.secondaryColor}
                  onChange={(e) => setBrandingConfig({ ...brandingConfig, secondaryColor: e.target.value })}
                  className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Palette className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={brandingConfig.secondaryColor}
                    onChange={(e) => setBrandingConfig({ ...brandingConfig, secondaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none font-mono text-sm"
                  />
                  <button
                    onClick={() => copiarColor(brandingConfig.secondaryColor, 'secondary')}
                    className="p-2 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors"
                  >
                    {copiedColor === 'secondary' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Color de Acento */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4">
            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Color de Acento
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={brandingConfig.accentColor}
                  onChange={(e) => setBrandingConfig({ ...brandingConfig, accentColor: e.target.value })}
                  className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={brandingConfig.accentColor}
                    onChange={(e) => setBrandingConfig({ ...brandingConfig, accentColor: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-pink-500 outline-none font-mono text-sm"
                  />
                  <button
                    onClick={() => copiarColor(brandingConfig.accentColor, 'accent')}
                    className="p-2 bg-white rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-colors"
                  >
                    {copiedColor === 'accent' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paletas Predefinidas */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Paletas Predefinidas
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {paletasPredefinidas.map((paleta, index) => (
              <motion.div
                key={paleta.name}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => aplicarPaleta(paleta)}
                className="cursor-pointer bg-white rounded-xl p-2 border-2 border-gray-200 hover:border-purple-300 transition-all group"
              >
                <div className="flex gap-1 mb-2">
                  <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: paleta.colors.primary }}></div>
                  <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: paleta.colors.secondary }}></div>
                  <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: paleta.colors.accent }}></div>
                </div>
                <p className="text-xs font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">{paleta.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Paleta Automática */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Paleta Automática Generada
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {paletaAutomatica.map((shade) => (
              <div key={shade.shade} className="text-center">
                <div
                  className="w-full h-16 rounded-xl shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: shade.color }}
                  onClick={() => copiarColor(shade.color, `shade-${shade.shade}`)}
                ></div>
                <p className="text-xs font-mono text-gray-600">{shade.shade}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Click en cualquier color para copiar
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectorColores;
