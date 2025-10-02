import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Sun, Moon, Monitor, Smartphone, X, Check, AlertCircle } from 'lucide-react';

interface UploaderLogoProps {
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

const UploaderLogo: React.FC<UploaderLogoProps> = ({ brandingConfig, setBrandingConfig }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(brandingConfig.logoUrl || '');
  const [faviconPreviewUrl, setFaviconPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [logoVersion, setLogoVersion] = useState<'light' | 'dark'>('light');
  const [previewContext, setPreviewContext] = useState<'header' | 'card' | 'footer'>('header');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);

      if (type === 'logo') {
        setLogoFile(file);
        setPreviewUrl(url);
        setBrandingConfig({ ...brandingConfig, logoUrl: url });
      } else {
        setFaviconFile(file);
        setFaviconPreviewUrl(url);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setLogoFile(file);
      setPreviewUrl(url);
      setBrandingConfig({ ...brandingConfig, logoUrl: url });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = () => {
    if (logoFile) {
      // Simular upload
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const clearLogo = () => {
    setLogoFile(null);
    setPreviewUrl('');
    setBrandingConfig({ ...brandingConfig, logoUrl: '' });
  };

  const dimensionesRecomendadas = [
    { contexto: 'Logo Principal', dimensiones: '200 x 60 px', formato: 'PNG/SVG' },
    { contexto: 'Favicon', dimensiones: '32 x 32 px', formato: 'ICO/PNG' },
    { contexto: 'Logo Móvil', dimensiones: '150 x 45 px', formato: 'PNG/SVG' },
    { contexto: 'Redes Sociales', dimensiones: '400 x 400 px', formato: 'PNG/JPG' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
            Logo y Branding
          </h2>
          <p className="text-sm text-gray-600 mt-1">Sube tu logo y favicon en diferentes versiones</p>
        </div>

        {/* Tabs: Logo | Favicon */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-1 inline-flex">
            <button
              onClick={() => setLogoVersion('light')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                logoVersion === 'light'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => setLogoVersion('dark')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                logoVersion === 'dark'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mb-6 border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50'
          }`}
        >
          {!previewUrl ? (
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Arrastra tu logo aquí
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                o haz clic para seleccionar
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="hidden"
                />
                <span className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow inline-block">
                  Seleccionar Logo
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-3">
                Formatos: PNG, SVG, JPG (máx. 2MB)
              </p>
            </div>
          ) : (
            <div>
              <div className={`relative inline-block p-6 rounded-xl mb-4 ${
                logoVersion === 'dark' ? 'bg-gray-900' : 'bg-white border-2 border-gray-200'
              }`}>
                <img
                  src={previewUrl}
                  alt="Logo Preview"
                  className="max-h-20 max-w-xs mx-auto object-contain"
                />
                <button
                  onClick={clearLogo}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="hidden"
                  />
                  <span className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-400 transition-colors inline-block">
                    Cambiar Logo
                  </span>
                </label>
                <button
                  onClick={handleUpload}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center gap-2"
                >
                  {uploadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Guardado
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Favicon Upload */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            Favicon (32x32)
          </label>
          <div className="flex items-center gap-4">
            {faviconPreviewUrl && (
              <div className="w-16 h-16 bg-white rounded-xl border-2 border-indigo-200 p-2 flex items-center justify-center">
                <img src={faviconPreviewUrl} alt="Favicon" className="max-w-full max-h-full" />
              </div>
            )}
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                accept="image/png,image/x-icon"
                onChange={(e) => handleFileChange(e, 'favicon')}
                className="hidden"
              />
              <div className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-400 transition-colors text-center font-semibold text-gray-700">
                {faviconPreviewUrl ? 'Cambiar Favicon' : 'Subir Favicon'}
              </div>
            </label>
          </div>
        </div>

        {/* Preview en diferentes contextos */}
        {previewUrl && (
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-600" />
              Preview en Diferentes Contextos
            </h3>

            {/* Context selector */}
            <div className="flex gap-2 mb-4">
              {[
                { id: 'header', label: 'Header', icon: Monitor },
                { id: 'card', label: 'Card', icon: ImageIcon },
                { id: 'footer', label: 'Footer', icon: Smartphone },
              ].map((ctx) => (
                <button
                  key={ctx.id}
                  onClick={() => setPreviewContext(ctx.id as any)}
                  className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    previewContext === ctx.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <ctx.icon className="w-4 h-4" />
                  {ctx.label}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              {previewContext === 'header' && (
                <div className="flex items-center justify-between border-b pb-4">
                  <img src={previewUrl} alt="Logo" className="h-10" />
                  <nav className="flex gap-4 text-sm text-gray-600">
                    <span>Inicio</span>
                    <span>Servicios</span>
                    <span>Contacto</span>
                  </nav>
                </div>
              )}
              {previewContext === 'card' && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                  <img src={previewUrl} alt="Logo" className="h-16 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">Tu Empresa</h3>
                  <p className="text-sm text-gray-600 mt-2">Descripción de tu negocio</p>
                </div>
              )}
              {previewContext === 'footer' && (
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <img src={previewUrl} alt="Logo" className="h-8 brightness-0 invert" />
                    <div className="text-xs text-gray-400">© 2024 Tu Empresa</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dimensiones Recomendadas */}
        <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            Dimensiones Recomendadas
          </h3>
          <div className="space-y-2">
            {dimensionesRecomendadas.map((dim, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg text-sm"
              >
                <span className="font-semibold text-gray-700">{dim.contexto}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-mono text-xs">{dim.dimensiones}</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">
                    {dim.formato}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploaderLogo;
