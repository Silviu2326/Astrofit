import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';

interface PreviewTiempoRealProps {
  brandingConfig: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: number;
    logoUrl: string;
  };
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  fullScreen?: boolean;
}

const PreviewTiempoReal: React.FC<PreviewTiempoRealProps> = ({
  brandingConfig,
  previewMode,
  setPreviewMode,
  fullScreen = false,
}) => {
  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'max-w-full';
    }
  };

  const previewStyles = {
    '--primary-color': brandingConfig.primaryColor,
    '--secondary-color': brandingConfig.secondaryColor,
    '--accent-color': brandingConfig.accentColor,
    fontFamily: brandingConfig.fontFamily,
    fontSize: `${brandingConfig.fontSize}px`,
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: fullScreen ? 0 : 0.25, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                <Eye className="w-5 h-5" />
              </div>
              Preview en Tiempo Real
            </h2>
            <p className="text-sm text-gray-600 mt-1">Vista previa de tu diseño</p>
          </div>

          {/* Responsive Controls */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-1 flex gap-1">
            {[
              { mode: 'desktop', icon: Monitor, label: 'Desktop' },
              { mode: 'tablet', icon: Tablet, label: 'Tablet' },
              { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
            ].map((device) => (
              <button
                key={device.mode}
                onClick={() => setPreviewMode(device.mode as any)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  previewMode === device.mode
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title={device.label}
              >
                <device.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Preview Container */}
        <div className="bg-gradient-to-br from-slate-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center min-h-[600px]">
          <div className={`${getPreviewWidth()} w-full mx-auto`}>
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={previewStyles}
            >
              {/* Preview Header */}
              <div
                className="p-6 border-b"
                style={{
                  background: `linear-gradient(to right, ${brandingConfig.primaryColor}, ${brandingConfig.secondaryColor})`,
                }}
              >
                <div className="flex items-center justify-between">
                  {brandingConfig.logoUrl ? (
                    <img src={brandingConfig.logoUrl} alt="Logo" className="h-10 brightness-0 invert" />
                  ) : (
                    <div className="h-8 w-32 bg-white/30 rounded-lg backdrop-blur-sm"></div>
                  )}
                  <nav className="hidden md:flex gap-6 text-white font-medium">
                    <a href="#" className="hover:opacity-80 transition-opacity">Inicio</a>
                    <a href="#" className="hover:opacity-80 transition-opacity">Servicios</a>
                    <a href="#" className="hover:opacity-80 transition-opacity">Contacto</a>
                  </nav>
                </div>
              </div>

              {/* Preview Hero */}
              <div
                className="p-8 md:p-12 text-center"
                style={{
                  background: `linear-gradient(135deg, ${brandingConfig.primaryColor}15, ${brandingConfig.secondaryColor}15)`,
                }}
              >
                <h1
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{ color: brandingConfig.primaryColor }}
                >
                  Bienvenido a tu Sitio
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                  Este es un preview en tiempo real de cómo se verá tu diseño con los colores y tipografía seleccionados.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: brandingConfig.primaryColor }}
                  >
                    Botón Primario
                  </button>
                  <button
                    className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: brandingConfig.accentColor }}
                  >
                    Botón Acento
                  </button>
                </div>
              </div>

              {/* Preview Cards */}
              <div className="p-8 md:p-12 bg-gray-50">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-8 text-center"
                  style={{ color: brandingConfig.secondaryColor }}
                >
                  Características Destacadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: i === 2 ? brandingConfig.accentColor : brandingConfig.primaryColor }}
                      >
                        {i}
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: brandingConfig.secondaryColor }}>
                        Característica {i}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Descripción de la característica con el estilo de tipografía seleccionado.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: brandingConfig.primaryColor }}>
                    Título de Sección
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Este es un ejemplo de cómo se verá el texto del cuerpo con la fuente{' '}
                    <span className="font-bold" style={{ color: brandingConfig.accentColor }}>
                      {brandingConfig.fontFamily}
                    </span>{' '}
                    en tamaño {brandingConfig.fontSize}px. El texto se adapta automáticamente a los cambios que realices.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Los colores de marca también se aplican en tiempo real: el{' '}
                    <span className="font-bold" style={{ color: brandingConfig.primaryColor }}>
                      color primario
                    </span>
                    , el{' '}
                    <span className="font-bold" style={{ color: brandingConfig.secondaryColor }}>
                      color secundario
                    </span>
                    , y el{' '}
                    <span className="font-bold" style={{ color: brandingConfig.accentColor }}>
                      color de acento
                    </span>
                    .
                  </p>

                  {/* Form Example */}
                  <div
                    className="bg-gray-50 rounded-2xl p-6 border-2"
                    style={{ borderColor: `${brandingConfig.primaryColor}30` }}
                  >
                    <h3 className="text-lg font-bold mb-4" style={{ color: brandingConfig.secondaryColor }}>
                      Formulario de Ejemplo
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none"
                        style={{
                          borderColor: `${brandingConfig.primaryColor}30`,
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none"
                        style={{
                          borderColor: `${brandingConfig.primaryColor}30`,
                        }}
                      />
                      <button
                        className="w-full px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                        style={{ backgroundColor: brandingConfig.accentColor }}
                      >
                        Enviar Formulario
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Footer */}
              <div
                className="p-8 text-center text-white"
                style={{
                  background: `linear-gradient(to right, ${brandingConfig.secondaryColor}, ${brandingConfig.primaryColor})`,
                }}
              >
                {brandingConfig.logoUrl && (
                  <img src={brandingConfig.logoUrl} alt="Logo" className="h-8 mx-auto mb-4 brightness-0 invert" />
                )}
                <p className="text-sm opacity-80">© 2024 Tu Empresa. Todos los derechos reservados.</p>
                <div className="flex justify-center gap-4 mt-4">
                  <a href="#" className="hover:opacity-80 transition-opacity">Privacidad</a>
                  <span>·</span>
                  <a href="#" className="hover:opacity-80 transition-opacity">Términos</a>
                  <span>·</span>
                  <a href="#" className="hover:opacity-80 transition-opacity">Contacto</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <RefreshCw className="w-3 h-3" />
          <span>Los cambios se aplican en tiempo real</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewTiempoReal;
