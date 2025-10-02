import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Eye, Star, Tag, Heart, Bookmark, Share2,
  Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle,
  ChevronUp, Calendar, User, ArrowLeft, TrendingUp,
  FileText, Download, ExternalLink
} from 'lucide-react';

interface LectorArticuloProps {
  article: any;
  onClose?: () => void;
}

const LectorArticulo: React.FC<LectorArticuloProps> = ({ article, onClose }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Detectar scroll para progress bar y back to top
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;

      setReadingProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Nutrición': 'from-emerald-500 to-teal-500',
      'Entrenamiento': 'from-orange-500 to-red-500',
      'Bienestar': 'from-purple-500 to-pink-500',
      'Motivación': 'from-blue-500 to-indigo-500',
      'Ciencia y Estudios': 'from-cyan-500 to-blue-500',
      'Negocio': 'from-amber-500 to-orange-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  // Artículos relacionados mockeados
  const relatedArticles = [
    {
      id: 101,
      title: 'Hidratación: Clave en el Rendimiento',
      category: article.category,
      image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
      readTime: '5 min'
    },
    {
      id: 102,
      title: 'Errores Comunes en la Dieta',
      category: article.category,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      readTime: '7 min'
    },
    {
      id: 103,
      title: 'Suplementación Inteligente',
      category: article.category,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      readTime: '10 min'
    }
  ];

  // Contenido expandido del artículo
  const fullContent = `
    <h2>Introducción</h2>
    <p>El mundo de la nutrición deportiva está en constante evolución, y entender los macronutrientes es fundamental para cualquier atleta que busque optimizar su rendimiento. En este artículo profundo, exploraremos cada macronutriente en detalle.</p>

    <h2>Proteínas: Los Bloques Constructores</h2>
    <p>Las proteínas son esenciales para la reparación y construcción de tejido muscular. La cantidad óptima depende de varios factores:</p>
    <ul>
      <li>Tipo de actividad física</li>
      <li>Nivel de entrenamiento</li>
      <li>Objetivos específicos (hipertrofia, mantenimiento, etc.)</li>
      <li>Composición corporal actual</li>
    </ul>

    <blockquote>
      "La proteína no solo construye músculo, sino que también juega un papel crucial en la recuperación y el sistema inmune." - Dr. Juan Pérez
    </blockquote>

    <h3>Fuentes de Proteína de Alta Calidad</h3>
    <p>No todas las proteínas son iguales. Las mejores fuentes incluyen:</p>
    <ul>
      <li><strong>Huevos:</strong> Proteína completa con excelente biodisponibilidad</li>
      <li><strong>Pechuga de pollo:</strong> Alta en proteína, baja en grasa</li>
      <li><strong>Pescado:</strong> Rico en omega-3 además de proteína</li>
      <li><strong>Legumbres:</strong> Excelente opción vegetal con fibra adicional</li>
    </ul>

    <h2>Carbohidratos: Tu Combustible Principal</h2>
    <p>Los carbohidratos son la fuente de energía preferida del cuerpo durante el ejercicio de alta intensidad. Entender cuándo y cómo consumirlos puede marcar la diferencia en tu rendimiento.</p>

    <h3>Timing de Carbohidratos</h3>
    <p>El momento en que consumes carbohidratos es tan importante como la cantidad:</p>
    <ul>
      <li><strong>Pre-entreno:</strong> 1-3 horas antes, carbohidratos complejos</li>
      <li><strong>Durante:</strong> Para sesiones >90 min, carbohidratos simples</li>
      <li><strong>Post-entreno:</strong> Ventana anabólica, mezcla de simple y complejo</li>
    </ul>

    <h2>Grasas: El Macronutriente Incomprendido</h2>
    <p>Durante años, las grasas fueron demonizadas. Hoy sabemos que son esenciales para la salud hormonal, la absorción de vitaminas y como fuente de energía en ejercicios de baja intensidad.</p>

    <h3>Tipos de Grasas</h3>
    <p>No todas las grasas son iguales. Prioriza:</p>
    <ul>
      <li><strong>Omega-3:</strong> Pescado graso, nueces, semillas de chía</li>
      <li><strong>Monoinsaturadas:</strong> Aceite de oliva, aguacate, almendras</li>
      <li><strong>Limita saturadas:</strong> No elimines, pero modera</li>
      <li><strong>Evita trans:</strong> Altamente procesadas y perjudiciales</li>
    </ul>

    <h2>Conclusión</h2>
    <p>Dominar los macronutrientes es un proceso continuo de aprendizaje y ajuste. No existe una fórmula única para todos, pero entender estos principios fundamentales te permitirá tomar decisiones informadas sobre tu nutrición deportiva.</p>

    <p><strong>Recuerda:</strong> La consistencia es más importante que la perfección. Pequeños cambios sostenibles generan grandes resultados a largo plazo.</p>
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Progress Bar de Lectura */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-8">
            {/* Header del Artículo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
            >
              {/* Imagen Hero */}
              <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />

                {/* Badge de Categoría */}
                <div className="absolute top-6 left-6 z-20">
                  <div className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(article.category)} text-white text-sm font-bold rounded-full shadow-lg`}>
                    {article.category}
                  </div>
                </div>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {article.title}
                  </h1>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Metadata del autor */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xl text-2xl">
                      {article.avatar}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{article.author}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} lectura</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className="p-3 bg-gray-100 hover:bg-pink-50 rounded-xl transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-700'}`} />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        Compartir
                      </button>

                      {/* Menu de compartir */}
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-30 min-w-[200px]"
                        >
                          <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors text-left">
                              <Facebook className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium">Facebook</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-sky-50 rounded-xl transition-colors text-left">
                              <Twitter className="w-5 h-5 text-sky-500" />
                              <span className="text-sm font-medium">Twitter</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors text-left">
                              <Linkedin className="w-5 h-5 text-blue-700" />
                              <span className="text-sm font-medium">LinkedIn</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                              <Mail className="w-5 h-5 text-gray-600" />
                              <span className="text-sm font-medium">Email</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-xl transition-colors text-left">
                              <Link2 className="w-5 h-5 text-emerald-600" />
                              <span className="text-sm font-medium">Copiar link</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del artículo */}
              <div className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:my-6 prose-li:text-gray-700 prose-li:my-2
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-emerald-500
                    prose-blockquote:bg-emerald-50 prose-blockquote:py-4 prose-blockquote:px-6
                    prose-blockquote:rounded-r-2xl prose-blockquote:my-8
                    prose-blockquote:text-gray-700 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: fullContent }}
                />
              </div>

              {/* Tags */}
              <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tags</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag: string, idx: number) => (
                    <div
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl hover:shadow-md transition-all cursor-pointer"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                  ¿Te resultó útil este artículo?
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= userRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-gray-600">
                    Rating actual: <span className="font-bold text-gray-900">{article.rating}</span> ({article.views} votos)
                  </span>
                </div>
              </div>

              {/* Sección de comentarios */}
              <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Comentarios ({article.comments || 0})
                  </h3>
                </div>

                {/* Form de comentario */}
                <div className="mb-6">
                  <textarea
                    placeholder="Comparte tu opinión sobre este artículo..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-gray-900 resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                      Publicar comentario
                    </button>
                  </div>
                </div>

                {/* Lista de comentarios */}
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-8">
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Tabla de contenidos */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Tabla de Contenidos</h3>
                </div>
                <div className="space-y-2">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium">
                    Introducción
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium">
                    Proteínas: Los Bloques Constructores
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium">
                    Carbohidratos: Tu Combustible Principal
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium">
                    Grasas: El Macronutriente Incomprendido
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium">
                    Conclusión
                  </a>
                </div>
              </motion.div>

              {/* Artículos relacionados */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">También te puede interesar</h3>
                </div>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <div
                      key={related.id}
                      className="group cursor-pointer hover:bg-emerald-50 rounded-2xl p-3 transition-all"
                    >
                      <div className="flex gap-3">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-emerald-600 mb-1">{related.category}</p>
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{related.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">¿Te gustó este artículo?</h3>
                  <p className="text-emerald-100 text-sm mb-4">
                    Suscríbete para recibir más contenido como este directamente en tu correo.
                  </p>
                  <button className="w-full px-4 py-3 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                    Suscribirme ahora
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectorArticulo;
