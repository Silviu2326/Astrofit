import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Image, FileText, Video, Mail, BookOpen, Package,
  Download, Eye, CheckCircle, Upload
} from 'lucide-react';
import { mockMarketingMaterials, MarketingMaterial } from '../data/mockData';

export const MarketingMaterials: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set());

  const materialTypes = [
    { id: 'all', label: 'Todos', icon: Package },
    { id: 'banner', label: 'Banners', icon: Image },
    { id: 'copy', label: 'Textos', icon: FileText },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'email', label: 'Emails', icon: Mail },
    { id: 'guide', label: 'Guías', icon: BookOpen },
  ];

  const filteredMaterials = selectedType === 'all'
    ? mockMarketingMaterials
    : mockMarketingMaterials.filter(m => m.type === selectedType);

  const getTypeIcon = (type: MarketingMaterial['type']) => {
    const icons = {
      banner: Image,
      copy: FileText,
      video: Video,
      email: Mail,
      guide: BookOpen,
      asset: Package,
    };
    return icons[type];
  };

  const getTypeColor = (type: MarketingMaterial['type']) => {
    const colors = {
      banner: 'from-blue-500 to-cyan-600',
      copy: 'from-purple-500 to-pink-600',
      video: 'from-red-500 to-orange-600',
      email: 'from-green-500 to-emerald-600',
      guide: 'from-indigo-500 to-purple-600',
      asset: 'from-gray-500 to-slate-600',
    };
    return colors[type];
  };

  const handleDownload = (id: string) => {
    setDownloadedItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      setDownloadedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Materiales de Marketing</h3>
                <p className="text-sm text-pink-100">Recursos para promocionar el programa</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-colors">
              <Upload className="w-5 h-5" />
              Subir Material
            </button>
          </div>

          {/* Filtros de tipo */}
          <div className="flex flex-wrap gap-2">
            {materialTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedType === type.id
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de materiales */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material, index) => {
            const Icon = getTypeIcon(material.type);
            const gradient = getTypeColor(material.type);
            const isDownloaded = downloadedItems.has(material.id);

            return (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all group"
              >
                {/* Icono del tipo */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título y descripción */}
                <h4 className="font-bold text-gray-900 mb-2">{material.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{material.description}</p>

                {/* Tamaño si está disponible */}
                {material.size && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                      {material.size}
                    </span>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(material.id)}
                    disabled={isDownloaded}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      isDownloaded
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Descargado
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Descargar
                      </>
                    )}
                  </button>
                  <button className="p-2 border-2 border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Descarga bulk */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Descargar Todo</h4>
              <p className="text-sm text-gray-600">
                Descarga todos los materiales en un archivo ZIP
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
              <Download className="w-5 h-5" />
              Descargar Pack Completo
            </button>
          </div>
        </div>
      </div>

      {/* Footer con info */}
      <div className="bg-purple-50 p-6 border-t border-purple-200">
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 mb-1">Guía de Uso</p>
            <p className="text-sm text-gray-600">
              Todos los materiales están optimizados para redes sociales y web.
              Asegúrate de seguir las directrices de marca al usarlos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
