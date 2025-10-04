import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Sparkles, Code2, Download, Copy, Check } from 'lucide-react';
import EditorVisual from './components/EditorVisual';
import SelectorColores from './components/SelectorColores';
import SelectorTipografias from './components/SelectorTipografias';
import UploaderLogo from './components/UploaderLogo';
import PreviewTiempoReal from './components/PreviewTiempoReal';

const PersonalizacionEstilosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [brandingConfig, setBrandingConfig] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#ec4899',
    fontFamily: 'Roboto',
    fontSize: 16,
    logoUrl: '',
  });
  const [copied, setCopied] = useState(false);

  const temasPredefinidos = [
    {
      id: 'moderno',
      nombre: 'Moderno',
      descripcion: 'Diseño limpio y vibrante',
      colores: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' },
      gradiente: 'from-indigo-500 via-purple-500 to-pink-500',
    },
    {
      id: 'minimalista',
      nombre: 'Minimalista',
      descripcion: 'Elegancia y simplicidad',
      colores: { primary: '#1f2937', secondary: '#4b5563', accent: '#10b981' },
      gradiente: 'from-gray-800 via-gray-600 to-emerald-500',
    },
    {
      id: 'corporativo',
      nombre: 'Corporativo',
      descripcion: 'Profesional y confiable',
      colores: { primary: '#1e40af', secondary: '#3b82f6', accent: '#06b6d4' },
      gradiente: 'from-blue-900 via-blue-600 to-cyan-500',
    },
    {
      id: 'deportivo',
      nombre: 'Deportivo',
      descripcion: 'Energía y dinamismo',
      colores: { primary: '#dc2626', secondary: '#ea580c', accent: '#eab308' },
      gradiente: 'from-red-600 via-orange-600 to-yellow-500',
    },
    {
      id: 'wellness',
      nombre: 'Wellness',
      descripcion: 'Calma y bienestar',
      colores: { primary: '#059669', secondary: '#14b8a6', accent: '#8b5cf6' },
      gradiente: 'from-emerald-600 via-teal-500 to-purple-500',
    },
  ];

  const aplicarTema = (tema: typeof temasPredefinidos[0]) => {
    setBrandingConfig({
      ...brandingConfig,
      primaryColor: tema.colores.primary,
      secondaryColor: tema.colores.secondary,
      accentColor: tema.colores.accent,
    });
  };

  const exportarCSS = () => {
    const css = `
:root {
  --color-primary: ${brandingConfig.primaryColor};
  --color-secondary: ${brandingConfig.secondaryColor};
  --color-accent: ${brandingConfig.accentColor};
  --font-family: ${brandingConfig.fontFamily}, sans-serif;
  --font-size-base: ${brandingConfig.fontSize}px;
}
    `.trim();

    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Palette className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Personalización de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Estilos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed mb-6">
            Diseña tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">marca visual perfecta</span> con nuestro editor intuitivo
          </p>

          {/* Pills de características */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Palette className="w-4 h-4 text-pink-200" />
              <span className="text-sm font-semibold text-white">Colores de Marca</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span className="text-sm font-semibold text-white">Preview en Vivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Code2 className="w-4 h-4 text-indigo-200" />
              <span className="text-sm font-semibold text-white">CSS Personalizado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TEMAS PREDEFINIDOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎨 Temas Predefinidos</h2>
          <p className="text-gray-600 mb-6">Comienza con un tema base y personalízalo a tu gusto</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {temasPredefinidos.map((tema, index) => (
              <motion.div
                key={tema.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => aplicarTema(tema)}
                className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 border border-gray-100 group"
              >
                <div className={`h-20 rounded-xl bg-gradient-to-r ${tema.gradiente} mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <Sparkles className="w-8 h-8 text-white opacity-80" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{tema.nombre}</h3>
                <p className="text-xs text-gray-600">{tema.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* TABS: EDITOR | PREVIEW */}
      <div className="mb-6 flex justify-between items-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-1.5 border border-white/50 inline-flex">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'editor'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Editor
            </div>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'preview'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </div>
          </button>
        </div>

        {/* Botón Exportar CSS */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportarCSS}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'CSS Copiado!' : 'Exportar CSS'}
        </motion.button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda: Controles */}
          <div className="space-y-6">
            <SelectorColores
              brandingConfig={brandingConfig}
              setBrandingConfig={setBrandingConfig}
            />
            <SelectorTipografias
              brandingConfig={brandingConfig}
              setBrandingConfig={setBrandingConfig}
            />
            <UploaderLogo
              brandingConfig={brandingConfig}
              setBrandingConfig={setBrandingConfig}
            />
          </div>

          {/* Columna derecha: Preview */}
          <div className="space-y-6">
            <PreviewTiempoReal
              brandingConfig={brandingConfig}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
            <EditorVisual />
          </div>
        </div>
      ) : (
        <PreviewTiempoReal
          brandingConfig={brandingConfig}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          fullScreen={true}
        />
      )}
    </div>
  );
};

export default PersonalizacionEstilosPage;
