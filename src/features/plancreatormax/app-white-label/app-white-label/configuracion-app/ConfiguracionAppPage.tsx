import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Palette, 
  Upload, 
  Settings, 
  Download,
  Sparkles,
  Eye,
  Brush
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import InputModal from '@/components/ui/input-modal';

const ConfiguracionAppPage: React.FC = () => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
  const [isTypographyModalOpen, setIsTypographyModalOpen] = useState(false);
  const [isExportConfirmOpen, setIsExportConfirmOpen] = useState(false);

  const [logoUrl, setLogoUrl] = useState<string>('');
  const [palette, setPalette] = useState<'indigo' | 'purple' | 'pink'>('indigo');
  const [fontFamily, setFontFamily] = useState<'Inter' | 'Rubik' | 'Plus Jakarta Sans'>('Inter');

  const gradients = useMemo(() => {
    switch (palette) {
      case 'indigo':
        return {
          primary: 'from-indigo-500 to-purple-600',
          header: 'from-indigo-500 via-purple-500 to-pink-500',
          status: 'from-indigo-500 to-purple-600',
          blockA: 'from-indigo-50 to-purple-50',
          blockB: 'from-purple-50 to-pink-50',
        };
      case 'purple':
        return {
          primary: 'from-purple-500 to-pink-600',
          header: 'from-purple-500 via-pink-500 to-rose-500',
          status: 'from-purple-500 to-pink-600',
          blockA: 'from-purple-50 to-pink-50',
          blockB: 'from-pink-50 to-rose-50',
        };
      case 'pink':
        return {
          primary: 'from-pink-500 to-rose-600',
          header: 'from-pink-500 via-rose-500 to-red-500',
          status: 'from-pink-500 to-rose-600',
          blockA: 'from-pink-50 to-rose-50',
          blockB: 'from-rose-50 to-red-50',
        };
    }
  }, [palette]);

  const handleLogoConfirm = (value: string) => {
    setLogoUrl(value);
    setIsLogoModalOpen(false);
    toast.success('Logo actualizado correctamente');
  };

  const handleExport = async () => {
    setIsExportConfirmOpen(false);
    toast.loading('Exportando configuración...', { id: 'export' });
    // Simulación de exportación
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Configuración exportada como JSON', { id: 'export' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Smartphone className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Configuración <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">App</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Personaliza tu aplicación con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">branding único</span> y configuración avanzada
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Palette className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Personalización Visual</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Eye className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Vista Previa en Vivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Configuración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Panel de Personalización Visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Brush className="w-6 h-6" />
                </div>
                Personalización Visual
              </h2>
            </div>

            {/* Contenido de configuración */}
            <div className="space-y-6">
              {/* Sección Logo */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-3">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900">Logo de la Aplicación</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Sube tu logo personalizado para la app</p>
                <button
                  onClick={() => setIsLogoModalOpen(true)}
                  className="w-full h-32 bg-white/60 backdrop-blur-sm border-2 border-dashed border-indigo-300 rounded-xl flex items-center justify-center hover:border-indigo-500 transition-colors"
                >
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                      <p className="text-sm text-indigo-600 font-medium">Selecciona tu logo</p>
                    </div>
                  )}
                </button>
              </div>

              {/* Sección Colores */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Paleta de Colores</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Personaliza los colores principales de tu app</p>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => setIsPaletteModalOpen(true)} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto mb-2 shadow-lg ring-2 ring-offset-2 ring-indigo-200 group-hover:ring-indigo-300 transition"></div>
                    <p className="text-xs text-gray-600">Primario</p>
                  </button>
                  <button onClick={() => setIsPaletteModalOpen(true)} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto mb-2 shadow-lg ring-2 ring-offset-2 ring-purple-200 group-hover:ring-purple-300 transition"></div>
                    <p className="text-xs text-gray-600">Secundario</p>
                  </button>
                  <button onClick={() => setIsPaletteModalOpen(true)} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl mx-auto mb-2 shadow-lg ring-2 ring-offset-2 ring-pink-200 group-hover:ring-pink-300 transition"></div>
                    <p className="text-xs text-gray-600">Acento</p>
                  </button>
                </div>
              </div>

              {/* Sección Tipografía */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Tipografía</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Selecciona la fuente para tu aplicación</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsTypographyModalOpen(true)}
                    className="w-full text-left p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200 hover:border-blue-400 transition"
                    style={{ fontFamily }}
                  >
                    <p className="font-semibold text-gray-900">{fontFamily} (Actual)</p>
                    <p className="text-xs text-gray-600">Moderno y legible</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel de Vista Previa */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Eye className="w-6 h-6" />
                </div>
                Vista Previa en Vivo
              </h2>
            </div>

            {/* Mockup del móvil */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Frame del móvil */}
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className={`h-8 bg-gradient-to-r ${gradients.status} flex items-center justify-between px-6 text-white text-xs`}>
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white/30 rounded-sm"></div>
                        <div className="w-4 h-2 bg-white/30 rounded-sm"></div>
                        <div className="w-4 h-2 bg-white/30 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App content */}
                    <div className="p-6 h-full">
                      <div className="text-center mb-6">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-2xl mx-auto mb-4" />
                        ) : (
                          <div className={`w-16 h-16 bg-gradient-to-br ${gradients.primary} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900">Mi App</h3>
                        <p className="text-sm text-gray-600">Vista previa en tiempo real</p>
                      </div>

                      {/* Sample content */}
                      <div className="space-y-4">
                        <div className={`p-4 bg-gradient-to-r ${gradients.blockA} rounded-xl`}>
                          <p className="text-sm font-medium text-gray-900">Bienvenido</p>
                          <p className="text-xs text-gray-600">Contenido personalizado</p>
                        </div>
                        <div className={`p-4 bg-gradient-to-r ${gradients.blockB} rounded-xl`}>
                          <p className="text-sm font-medium text-gray-900">Funcionalidades</p>
                          <p className="text-xs text-gray-600">Características de la app</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] pointer-events-none"></div>
              </div>
            </div>

            {/* Indicadores de estado */}
            <div className="mt-6 flex justify-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 rounded-full px-3 py-1 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">En Vivo</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700">iOS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Botón de Exportación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExportConfirmOpen(true)}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-white font-bold text-lg group border border-white/20"
        >
          {/* Efecto hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

          {/* Decoración */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex items-center gap-3">
            <Download className="w-6 h-6" />
            Exportar Configuración
          </div>
        </motion.button>
      </motion.div>

      {/* Modales */}
      <InputModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        onConfirm={handleLogoConfirm}
        title="Subir Logo"
        message="Pega la URL del logo a utilizar para la vista previa."
        placeholder="https://.../logo.png"
        confirmText="Usar logo"
      />

      <Modal
        isOpen={isPaletteModalOpen}
        onClose={() => setIsPaletteModalOpen(false)}
        title="Seleccionar paleta de colores"
        size="md"
      >
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => {
              setPalette('indigo');
              setIsPaletteModalOpen(false);
              toast.success('Paleta Indigo aplicada');
            }}
            className={`p-4 rounded-xl border ${palette === 'indigo' ? 'border-indigo-500' : 'border-gray-200'} hover:border-indigo-400 transition bg-white`}
          >
            <div className="w-full h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md mb-2"></div>
            <p className="text-sm font-medium text-gray-800">Indigo</p>
          </button>
          <button
            onClick={() => {
              setPalette('purple');
              setIsPaletteModalOpen(false);
              toast.success('Paleta Purple aplicada');
            }}
            className={`p-4 rounded-xl border ${palette === 'purple' ? 'border-purple-500' : 'border-gray-200'} hover:border-purple-400 transition bg-white`}
          >
            <div className="w-full h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md mb-2"></div>
            <p className="text-sm font-medium text-gray-800">Purple</p>
          </button>
          <button
            onClick={() => {
              setPalette('pink');
              setIsPaletteModalOpen(false);
              toast.success('Paleta Pink aplicada');
            }}
            className={`p-4 rounded-xl border ${palette === 'pink' ? 'border-pink-500' : 'border-gray-200'} hover:border-pink-400 transition bg-white`}
          >
            <div className="w-full h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-md mb-2"></div>
            <p className="text-sm font-medium text-gray-800">Pink</p>
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isTypographyModalOpen}
        onClose={() => setIsTypographyModalOpen(false)}
        title="Seleccionar tipografía"
        size="sm"
      >
        <div className="space-y-3">
          {(['Inter', 'Rubik', 'Plus Jakarta Sans'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFontFamily(f);
                setIsTypographyModalOpen(false);
                toast.success(`Tipografía ${f} aplicada`);
              }}
              className={`w-full text-left p-3 rounded-xl border ${fontFamily === f ? 'border-blue-500' : 'border-gray-200'} hover:border-blue-400 transition bg-white`}
              style={{ fontFamily: f }}
            >
              <p className="text-gray-900 font-semibold">{f}</p>
              <p className="text-xs text-gray-600">Texto de ejemplo con {f}</p>
            </button>
          ))}
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isExportConfirmOpen}
        onClose={() => setIsExportConfirmOpen(false)}
        onConfirm={handleExport}
        title="Exportar configuración"
        message="Se generará un archivo JSON con la configuración actual. ¿Deseas continuar?"
        confirmText="Exportar"
        cancelText="Cancelar"
        type="info"
      />
    </div>
  );
};

export default ConfiguracionAppPage;
