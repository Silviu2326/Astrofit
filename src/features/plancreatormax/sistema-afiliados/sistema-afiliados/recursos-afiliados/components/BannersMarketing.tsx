import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Copy, Target, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchBanners } from '../recursosAfiliadosApi';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
}

const BannersMarketing: React.FC = () => {
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
        toast.success('Banners de marketing cargados');
      } catch (error) {
        toast.error('Error al cargar los banners');
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
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Create download link
      const link = document.createElement('a');
      link.href = banner.downloadUrl;
      link.download = `${banner.title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`¡Banner "${banner.title}" descargado exitosamente!`);
    } catch (error) {
      toast.error('Error al descargar el banner');
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = (banner: Banner) => {
    setPreviewModal(banner);
  };

  const copyImageUrl = (banner: Banner) => {
    navigator.clipboard.writeText(banner.imageUrl);
    toast.success('URL del banner copiada al portapapeles');
  };

  const shareBanner = async (banner: Banner) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: banner.title,
          text: `Mira este banner de marketing: ${banner.title}`,
          url: banner.imageUrl,
        });
        toast.success('Banner compartido exitosamente');
      } catch (error) {
        copyImageUrl(banner);
      }
    } else {
      copyImageUrl(banner);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-2 text-gray-600">Cargando banners...</span>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Banners de Marketing</h3>
      <p className="text-gray-700 mb-6">
        Utiliza estos banners visualmente atractivos para tus campañas. Haz clic para previsualizar y descargar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    title="Previsualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareBanner(banner)}
                    className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
                    title="Compartir"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-600" />
                <h4 className="font-semibold text-gray-800">{banner.title}</h4>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(banner)}
                  disabled={downloading === banner.id}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloading === banner.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Descargar Banner
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
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold">{previewModal.title}</h3>
              </div>
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
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {downloading === previewModal.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Descargar Banner
                  </>
                )}
              </button>
              <button
                onClick={() => shareBanner(previewModal)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Compartir
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

export default BannersMarketing;
