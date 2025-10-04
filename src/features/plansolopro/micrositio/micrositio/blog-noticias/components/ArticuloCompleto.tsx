import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getArticuloById, Articulo } from '../blogNoticiasApi';
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Mail
} from 'lucide-react';

const ArticuloCompleto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articulo, setArticulo] = useState<Articulo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticulo = async () => {
      if (id) {
        const data = await getArticuloById(id);
        setArticulo(data || null);
      }
    };
    fetchArticulo();
  }, [id]);

  const categoryColors: { [key: string]: string } = {
    'tips fitness': 'from-blue-500 to-indigo-600',
    'nutrición': 'from-green-500 to-emerald-600',
    'noticias personales': 'from-purple-500 to-pink-600'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = articulo?.titulo || '';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!articulo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-fuchsia-50/30 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-gray-600">Cargando artículo...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const categoryGradient = categoryColors[articulo.categoria] || 'from-violet-500 to-fuchsia-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-fuchsia-50/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Botón volver */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 text-gray-700 hover:text-violet-600 font-semibold">
              <ArrowLeft className="w-5 h-5" />
              Volver al blog
            </button>
          </Link>
        </motion.div>

        {/* Artículo principal */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative"
        >
          {/* Imagen destacada */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Categoría badge */}
            <div className="absolute top-6 left-6">
              <div className={`px-5 py-2.5 bg-gradient-to-r ${categoryGradient} rounded-full shadow-xl backdrop-blur-sm`}>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{articulo.categoria}</span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{formatDate(articulo.fechaPublicacion)}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">5 min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8 md:p-12 relative">
            {/* Decoración de fondo */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {articulo.titulo}
              </h1>

              {/* Extracto */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed italic border-l-4 border-violet-500 pl-6 py-2 bg-violet-50/50 rounded-r-xl">
                {articulo.extracto}
              </p>

              {/* Contenido principal */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {articulo.contenido}
                </p>
              </div>

              {/* Separador */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

              {/* Sección de compartir */}
              <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 border border-violet-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl text-white">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Compartir artículo</h3>
                </div>

                <p className="text-gray-600 mb-4">
                  ¿Te gustó este artículo? ¡Compártelo con tu comunidad!
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1DA1F2] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare('email')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-300'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5" />
                        Copiar enlace
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Efectos de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Te gustó este contenido?
            </h3>
            <p className="text-xl text-purple-100 mb-6">
              Suscríbete a nuestro newsletter y recibe los mejores artículos cada semana
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-violet-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Suscribirme
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticuloCompleto;
