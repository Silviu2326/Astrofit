import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Package, CheckCircle, Zap, FileArchive } from 'lucide-react';
import toast from 'react-hot-toast';
import { downloadKit } from '../recursosAfiliadosApi';

const KitMarketing: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadKit = async () => {
    try {
      setDownloading(true);
      // In a real app, kitId might be dynamic
      const kitId = 'full_kit_2025';
      await downloadKit(kitId);
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create download link
      const link = document.createElement('a');
      link.href = '/downloads/marketing-kit-2025.zip';
      link.download = 'marketing-kit-2025.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloaded(true);
      toast.success('¡Kit de marketing descargado exitosamente!');
      
      // Reset downloaded state after 3 seconds
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      toast.error('Error al descargar el kit de marketing');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Kit Completo de Marketing por Afiliado</h3>
      <p className="text-gray-700 mb-6">
        Descarga el kit completo con todos los recursos necesarios para tu estrategia de marketing.
      </p>
      
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Kit Completo 2025</h4>
            <p className="text-sm text-gray-600">Incluye banners, textos y recursos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileArchive className="w-4 h-4 text-pink-600" />
            <span>Banners HD</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="w-4 h-4 text-pink-600" />
            <span>Textos Optimizados</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-pink-600" />
            <span>Guías de Uso</span>
          </div>
        </div>
        
        <button
          onClick={handleDownloadKit}
          disabled={downloading}
          className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
            downloaded
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
              : downloading
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white hover:shadow-lg'
          }`}
        >
          {downloaded ? (
            <>
              <CheckCircle className="w-6 h-6" />
              ¡Descargado!
            </>
          ) : downloading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Descargando Kit...
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              Descargar Kit Completo
            </>
          )}
        </button>
        
        {downloading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-gray-600">
              Preparando tu kit de marketing...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default KitMarketing;
