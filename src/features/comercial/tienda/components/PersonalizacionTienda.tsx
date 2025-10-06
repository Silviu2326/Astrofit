import React, { useState } from 'react';
import { Palette, Upload, Eye, Globe, Link2, Image as ImageIcon, Type, CheckCircle } from 'lucide-react';

interface Props {
  onChangeDetected: () => void;
}

const PersonalizacionTienda: React.FC<Props> = ({ onChangeDetected }) => {
  const [config, setConfig] = useState({
    nombreTienda: 'Mi Gimnasio Premium',
    dominio: 'mi-gimnasio.com',
    logo: null as File | null,
    colorPrimario: '#9333ea',
    colorSecundario: '#d946ef',
    colorAccento: '#ec4899',
    tipografia: 'Inter',
    descripcionCorta: 'Tu centro de entrenamiento personalizado',
    descripcionLarga: '',
    slogan: 'Transforma tu cuerpo, transforma tu vida',
    emailContacto: 'contacto@mi-gimnasio.com',
    telefono: '+34 900 123 456',
    direccion: 'Calle Principal 123, Madrid',
    redes: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    }
  });

  const handleChange = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
    onChangeDetected();
  };

  const handleRedesChange = (red: string, value: string) => {
    setConfig({
      ...config,
      redes: { ...config.redes, [red]: value }
    });
    onChangeDetected();
  };

  const tipografias = [
    'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Lato'
  ];

  return (
    <div className="space-y-6">
      {/* Identidad de Marca */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Identidad de Marca</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Tienda
            </label>
            <input
              type="text"
              value={config.nombreTienda}
              onChange={(e) => handleChange('nombreTienda', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dominio
            </label>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={config.dominio}
                onChange={(e) => handleChange('dominio', e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slogan
            </label>
            <input
              type="text"
              value={config.slogan}
              onChange={(e) => handleChange('slogan', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipografía
            </label>
            <select
              value={config.tipografia}
              onChange={(e) => handleChange('tipografia', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {tipografias.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Logo de la Tienda
          </label>
          <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Haz clic para subir tu logo
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG o SVG (máx. 2MB)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Paleta de Colores
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Color Primario</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.colorPrimario}
                  onChange={(e) => handleChange('colorPrimario', e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.colorPrimario}
                  onChange={(e) => handleChange('colorPrimario', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Color Secundario</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.colorSecundario}
                  onChange={(e) => handleChange('colorSecundario', e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.colorSecundario}
                  onChange={(e) => handleChange('colorSecundario', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Color Acento</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.colorAccento}
                  onChange={(e) => handleChange('colorAccento', e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.colorAccento}
                  onChange={(e) => handleChange('colorAccento', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
            <Type className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Información de Contacto</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email de Contacto
            </label>
            <input
              type="email"
              value={config.emailContacto}
              onChange={(e) => handleChange('emailContacto', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={config.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={config.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Corta
            </label>
            <input
              type="text"
              value={config.descripcionCorta}
              onChange={(e) => handleChange('descripcionCorta', e.target.value)}
              placeholder="Descripción breve de tu negocio (max 160 caracteres)"
              maxLength={160}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {config.descripcionCorta.length}/160 caracteres
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Larga
            </label>
            <textarea
              value={config.descripcionLarga}
              onChange={(e) => handleChange('descripcionLarga', e.target.value)}
              rows={4}
              placeholder="Descripción detallada de tu negocio, servicios y valores..."
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Redes Sociales</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook
            </label>
            <input
              type="url"
              value={config.redes.facebook}
              onChange={(e) => handleRedesChange('facebook', e.target.value)}
              placeholder="https://facebook.com/tutienda"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={config.redes.instagram}
              onChange={(e) => handleRedesChange('instagram', e.target.value)}
              placeholder="https://instagram.com/tutienda"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter / X
            </label>
            <input
              type="url"
              value={config.redes.twitter}
              onChange={(e) => handleRedesChange('twitter', e.target.value)}
              placeholder="https://twitter.com/tutienda"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube
            </label>
            <input
              type="url"
              value={config.redes.youtube}
              onChange={(e) => handleRedesChange('youtube', e.target.value)}
              placeholder="https://youtube.com/@tutienda"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Vista Previa */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Vista Previa</h2>
        </div>

        <div className="border-2 border-purple-100 rounded-xl p-8" style={{
          background: `linear-gradient(135deg, ${config.colorPrimario}15, ${config.colorSecundario}15, ${config.colorAccento}15)`
        }}>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
              background: `linear-gradient(135deg, ${config.colorPrimario}, ${config.colorSecundario}, ${config.colorAccento})`
            }}>
              <ImageIcon className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: config.tipografia }}>
              {config.nombreTienda}
            </h3>
            <p className="text-lg font-medium mb-4" style={{ color: config.colorPrimario }}>
              {config.slogan}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {config.descripcionCorta || 'Tu descripción aparecerá aquí...'}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white shadow-lg" style={{
              background: `linear-gradient(135deg, ${config.colorPrimario}, ${config.colorSecundario})`
            }}>
              <CheckCircle className="w-5 h-5" />
              Botón de ejemplo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizacionTienda;
