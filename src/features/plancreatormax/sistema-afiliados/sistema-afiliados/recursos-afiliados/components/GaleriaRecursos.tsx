import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchBanners } from '../recursosAfiliadosApi';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
}

const GaleriaRecursos: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<Banner | null>(null);

  useEffect(() => {
    const getBanners = async () => {
      try {
        setLoading(true);
        const data = await fetchBanners();
        setBanners(data as Banner[]);
        toast.success('Recursos cargados correctamente');
      } catch (error) {
        toast.error('Error al cargar los recursos');
      } finally {
        setLoading(false);
      }
    };
    getBanners();
  }, []);

  const handleDownload = async (banner: Banner) => {
    try {
      setDownloading(banner.id);
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create download link
      const link = document.createElement('a');
      link.href = banner.downloadUrl;
      link.download = `${banner.title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`¡${banner.title} descargado exitosamente!`);
    } catch (error) {
      toast.error('Error al descargar el recurso');
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = (banner: Banner) => {
    setPreviewModal(banner);
  };

  const copyImageUrl = (banner: Banner) => {
    navigator.clipboard.writeText(banner.imageUrl);
    toast.success('URL de imagen copiada al portapapeles');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Cargando recursos...</span>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Galería de Banners Descargables</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative group">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button
                    onClick={() => handlePreview(banner)}
                    className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => copyImageUrl(banner)}
                    className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{banner.title}</h4>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(banner)}
                  disabled={downloading === banner.id}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloading === banner.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Descargar
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{previewModal.title}</h3>
              <button
                onClick={() => setPreviewModal(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img 
                src={previewModal.imageUrl} 
                alt={previewModal.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => handleDownload(previewModal)}
                disabled={downloading === previewModal.id}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {downloading === previewModal.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Descargar
                  </>
                )}
              </button>
              <button
                onClick={() => copyImageUrl(previewModal)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copiar URL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default GaleriaRecursos;
