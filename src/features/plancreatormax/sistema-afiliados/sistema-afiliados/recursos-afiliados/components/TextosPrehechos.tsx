import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, FileText, Instagram, Twitter, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchPrewrittenTexts } from '../recursosAfiliadosApi';

interface PrewrittenText {
  id: string;
  title: string;
  content: string;
}

const TextosPrehechos: React.FC = () => {
  const [texts, setTexts] = useState<PrewrittenText[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedTexts, setCopiedTexts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const getTexts = async () => {
      try {
        setLoading(true);
        const data = await fetchPrewrittenTexts();
        setTexts(data as PrewrittenText[]);
        toast.success('Textos prehechos cargados correctamente');
      } catch (error) {
        toast.error('Error al cargar los textos');
      } finally {
        setLoading(false);
      }
    };
    getTexts();
  }, []);

  const copyToClipboard = async (text: PrewrittenText) => {
    try {
      await navigator.clipboard.writeText(text.content);
      setCopiedTexts(prev => new Set(prev).add(text.id));
      toast.success(`¡Texto "${text.title}" copiado al portapapeles!`);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedTexts(prev => {
          const newSet = new Set(prev);
          newSet.delete(text.id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      toast.error('Error al copiar el texto');
    }
  };

  const getPlatformIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (lowerTitle.includes('tweet') || lowerTitle.includes('twitter')) return <Twitter className="w-4 h-4" />;
    if (lowerTitle.includes('facebook')) return <Facebook className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getPlatformColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('instagram')) return 'from-pink-500 to-purple-600';
    if (lowerTitle.includes('tweet') || lowerTitle.includes('twitter')) return 'from-blue-400 to-blue-600';
    if (lowerTitle.includes('facebook')) return 'from-blue-600 to-blue-800';
    return 'from-indigo-500 to-purple-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600">Cargando textos...</span>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Textos Prehechos para Redes Sociales</h3>
      <p className="text-gray-700 mb-6">
        Copia y pega estos textos optimizados para tus publicaciones en redes sociales.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {texts.map((text) => (
          <motion.div
            key={text.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-gradient-to-r ${getPlatformColor(text.title)} rounded-lg`}>
                  {getPlatformIcon(text.title)}
                </div>
                <h4 className="font-semibold text-gray-800">{text.title}</h4>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">{text.content}</p>
              </div>
              
              <button
                onClick={() => copyToClipboard(text)}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  copiedTexts.has(text.id)
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                }`}
              >
                {copiedTexts.has(text.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Texto
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TextosPrehechos;
