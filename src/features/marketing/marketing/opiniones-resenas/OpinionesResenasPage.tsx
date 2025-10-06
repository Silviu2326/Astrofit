import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, MessageSquare, ThumbsUp, AlertCircle, CheckCircle, Clock,
  TrendingUp, Send, Filter, Search, Heart, Flag, Award,
  ExternalLink, Facebook, Globe, MapPin, Copy, Download,
  ChevronDown, Smile, Frown, Meh, Sparkles, Hash
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type ReviewStatus = 'nueva' | 'respondida' | 'destacada';
type ReviewPlatform = 'google' | 'facebook' | 'yelp' | 'tripadvisor' | 'propio';
type SentimentType = 'positivo' | 'neutral' | 'negativo';

interface Review {
  id: string;
  clientName: string;
  avatar: string;
  rating: number;
  platform: ReviewPlatform;
  date: string;
  comment: string;
  status: ReviewStatus;
  response?: string;
  responseDate?: string;
  helpful: number;
}

interface ResponseTemplate {
  id: string;
  name: string;
  ratingRange: number[];
  template: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'María González',
    avatar: '👩',
    rating: 5,
    platform: 'google',
    date: '2024-10-01',
    comment: 'Excelente servicio! El equipo fue muy profesional y atento. Superaron todas mis expectativas. Totalmente recomendado.',
    status: 'respondida',
    response: '¡Muchas gracias María! Nos alegra mucho que hayas tenido una gran experiencia. Esperamos verte pronto.',
    responseDate: '2024-10-02',
    helpful: 12
  },
  {
    id: '2',
    clientName: 'Carlos Rodríguez',
    avatar: '👨',
    rating: 4,
    platform: 'facebook',
    date: '2024-09-28',
    comment: 'Muy buen servicio en general. La atención fue rápida aunque hubo un pequeño retraso en la entrega. Aún así, quedé satisfecho.',
    status: 'respondida',
    response: 'Gracias Carlos por tu feedback. Trabajamos constantemente para mejorar nuestros tiempos de entrega.',
    responseDate: '2024-09-29',
    helpful: 8
  },
  {
    id: '3',
    clientName: 'Ana Martínez',
    avatar: '👩‍🦰',
    rating: 5,
    platform: 'google',
    date: '2024-09-25',
    comment: '¡Increíble! La calidad del producto es excepcional y el servicio al cliente de primera. Definitivamente volveré.',
    status: 'destacada',
    response: '¡Gracias Ana! Tu opinión significa mucho para nosotros.',
    responseDate: '2024-09-26',
    helpful: 15
  },
  {
    id: '4',
    clientName: 'Luis Fernández',
    avatar: '👨‍💼',
    rating: 3,
    platform: 'yelp',
    date: '2024-09-22',
    comment: 'El servicio estuvo bien, pero esperaba un poco más por el precio. La atención fue correcta pero nada extraordinario.',
    status: 'respondida',
    response: 'Agradecemos tu honestidad Luis. Tomaremos en cuenta tus comentarios para mejorar.',
    responseDate: '2024-09-23',
    helpful: 5
  },
  {
    id: '5',
    clientName: 'Laura Sánchez',
    avatar: '👩‍💻',
    rating: 5,
    platform: 'tripadvisor',
    date: '2024-09-20',
    comment: 'Una experiencia fantástica de principio a fin. El personal es amable y conocedor. ¡Altamente recomendado!',
    status: 'destacada',
    response: '¡Gracias Laura! Nos encanta saber que disfrutaste tu experiencia.',
    responseDate: '2024-09-21',
    helpful: 18
  },
  {
    id: '6',
    clientName: 'Pedro Jiménez',
    avatar: '👨‍🔧',
    rating: 2,
    platform: 'google',
    date: '2024-09-18',
    comment: 'Tuve algunos problemas con el pedido. La comunicación no fue clara y hubo confusión en la entrega.',
    status: 'respondida',
    response: 'Lamentamos mucho tu experiencia Pedro. Hemos tomado medidas para evitar que esto vuelva a ocurrir.',
    responseDate: '2024-09-19',
    helpful: 3
  },
  {
    id: '7',
    clientName: 'Isabel Torres',
    avatar: '👩‍🎨',
    rating: 5,
    platform: 'propio',
    date: '2024-09-15',
    comment: 'Servicio impecable. La atención personalizada hace toda la diferencia. Gracias por cuidar cada detalle.',
    status: 'destacada',
    helpful: 20
  },
  {
    id: '8',
    clientName: 'Javier Morales',
    avatar: '👨‍🏫',
    rating: 4,
    platform: 'facebook',
    date: '2024-09-12',
    comment: 'Buena experiencia general. El producto cumplió con lo esperado y el equipo fue amable.',
    status: 'nueva',
    helpful: 6
  },
  {
    id: '9',
    clientName: 'Carmen Ruiz',
    avatar: '👩‍⚕️',
    rating: 5,
    platform: 'google',
    date: '2024-09-10',
    comment: 'Excelente en todos los aspectos. Profesionalismo, calidad y atención al cliente de primer nivel.',
    status: 'destacada',
    response: '¡Muchas gracias Carmen! Tu confianza es nuestro mayor logro.',
    responseDate: '2024-09-11',
    helpful: 22
  },
  {
    id: '10',
    clientName: 'Roberto Díaz',
    avatar: '👨‍⚖️',
    rating: 4,
    platform: 'yelp',
    date: '2024-09-08',
    comment: 'Muy satisfecho con el servicio. Cumplieron con lo prometido y el resultado fue bueno.',
    status: 'nueva',
    helpful: 7
  },
  {
    id: '11',
    clientName: 'Sofía Herrera',
    avatar: '👩‍🔬',
    rating: 5,
    platform: 'google',
    date: '2024-09-05',
    comment: 'Simplemente perfecto. No podría pedir más. El equipo es excepcional y muy profesional.',
    status: 'destacada',
    helpful: 25
  },
  {
    id: '12',
    clientName: 'Miguel Ángel Castro',
    avatar: '👨‍🎓',
    rating: 3,
    platform: 'facebook',
    date: '2024-09-03',
    comment: 'Servicio aceptable pero con margen de mejora. El proceso podría ser más eficiente.',
    status: 'respondida',
    response: 'Gracias por tus comentarios Miguel. Estamos trabajando para optimizar nuestros procesos.',
    responseDate: '2024-09-04',
    helpful: 4
  },
  {
    id: '13',
    clientName: 'Patricia Vega',
    avatar: '👩‍🍳',
    rating: 5,
    platform: 'tripadvisor',
    date: '2024-09-01',
    comment: '¡Maravilloso! Superó todas mis expectativas. La calidad y el servicio son incomparables.',
    status: 'destacada',
    helpful: 19
  },
  {
    id: '14',
    clientName: 'Fernando López',
    avatar: '👨‍🚀',
    rating: 1,
    platform: 'google',
    date: '2024-08-28',
    comment: 'Muy decepcionado. El servicio no cumplió con lo prometido y la atención fue deficiente.',
    status: 'respondida',
    response: 'Lamentamos profundamente tu experiencia Fernando. Nos gustaría hablar contigo para resolver esto.',
    responseDate: '2024-08-29',
    helpful: 2
  },
  {
    id: '15',
    clientName: 'Elena Ramírez',
    avatar: '👩‍🎤',
    rating: 5,
    platform: 'propio',
    date: '2024-08-25',
    comment: 'Extraordinario servicio. La atención al detalle es impresionante. ¡Volveré sin duda!',
    status: 'destacada',
    helpful: 28
  }
];

const responseTemplates: ResponseTemplate[] = [
  {
    id: '1',
    name: 'Agradecimiento (5 estrellas)',
    ratingRange: [5, 5],
    template: '¡Muchas gracias [NOMBRE]! Nos alegra enormemente que hayas tenido una experiencia tan positiva. Tu satisfacción es nuestro mayor logro. ¡Esperamos verte pronto!'
  },
  {
    id: '2',
    name: 'Disculpa y solución (1-2 estrellas)',
    ratingRange: [1, 2],
    template: 'Lamentamos profundamente tu experiencia [NOMBRE]. Tu feedback es muy valioso para nosotros. Nos gustaría contactarte directamente para resolver esta situación. Por favor, escríbenos a [email] o llámanos al [teléfono].'
  },
  {
    id: '3',
    name: 'Neutral (3-4 estrellas)',
    ratingRange: [3, 4],
    template: 'Gracias por tu feedback [NOMBRE]. Valoramos tu opinión y trabajamos constantemente para mejorar nuestro servicio. Esperamos poder superar tus expectativas en tu próxima visita.'
  }
];

// ============================================================================
// COMPONENT
// ============================================================================

const OpinionesResenasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<ReviewPlatform | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ResponseTemplate | null>(null);

  // Calcular estadísticas
  const totalReviews = mockReviews.length;
  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
  const pendingReviews = mockReviews.filter(r => r.status === 'nueva').length;
  const responseRate = ((mockReviews.filter(r => r.status === 'respondida' || r.status === 'destacada').length / totalReviews) * 100).toFixed(0);

  // Distribución de ratings
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    stars: rating,
    count: mockReviews.filter(r => r.rating === rating).length,
    percentage: (mockReviews.filter(r => r.rating === rating).length / totalReviews * 100).toFixed(0)
  }));

  // Filtrar reseñas
  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === null || review.rating === filterRating;
    const matchesPlatform = filterPlatform === null || review.platform === filterPlatform;
    const matchesStatus = filterStatus === null || review.status === filterStatus;

    return matchesSearch && matchesRating && matchesPlatform && matchesStatus;
  });

  // Palabras clave más mencionadas (análisis simple)
  const keywords = [
    { word: 'Excelente', count: 8, sentiment: 'positivo' as SentimentType },
    { word: 'Profesional', count: 6, sentiment: 'positivo' as SentimentType },
    { word: 'Calidad', count: 5, sentiment: 'positivo' as SentimentType },
    { word: 'Recomendado', count: 4, sentiment: 'positivo' as SentimentType },
    { word: 'Atención', count: 7, sentiment: 'neutral' as SentimentType },
    { word: 'Servicio', count: 9, sentiment: 'neutral' as SentimentType },
    { word: 'Retraso', count: 2, sentiment: 'negativo' as SentimentType },
    { word: 'Problema', count: 1, sentiment: 'negativo' as SentimentType }
  ];

  const getPlatformIcon = (platform: ReviewPlatform) => {
    switch (platform) {
      case 'google': return <Globe className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'yelp': return <Star className="w-4 h-4" />;
      case 'tripadvisor': return <MapPin className="w-4 h-4" />;
      case 'propio': return <Heart className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: ReviewPlatform) => {
    switch (platform) {
      case 'google': return 'bg-blue-500';
      case 'facebook': return 'bg-indigo-600';
      case 'yelp': return 'bg-red-500';
      case 'tripadvisor': return 'bg-green-500';
      case 'propio': return 'bg-purple-500';
    }
  };

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case 'nueva':
        return <div className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Nueva
        </div>;
      case 'respondida':
        return <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Respondida
        </div>;
      case 'destacada':
        return <div className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Award className="w-3 h-3" />
          Destacada
        </div>;
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-8 h-8'
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const handleOpenResponseModal = (review: Review) => {
    setSelectedReview(review);
    setShowResponseModal(true);
    setResponseText(review.response || '');

    // Auto-select template based on rating
    const template = responseTemplates.find(t =>
      review.rating >= t.ratingRange[0] && review.rating <= t.ratingRange[1]
    );
    setSelectedTemplate(template || null);
  };

  const handleUseTemplate = (template: ResponseTemplate) => {
    if (selectedReview) {
      const text = template.template.replace('[NOMBRE]', selectedReview.clientName.split(' ')[0]);
      setResponseText(text);
      setSelectedTemplate(template);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 p-4 md:p-8">

      {/* ====================================================================== */}
      {/* HERO SECTION */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Star className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Opiniones y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Reseñas</span>
            </h1>
          </div>

          {/* Rating promedio grande */}
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-white mb-2">{averageRating}</div>
              <div className="flex gap-1 mb-2">
                {renderStars(Math.round(parseFloat(averageRating)), 'lg')}
              </div>
              <p className="text-amber-100 text-lg font-semibold">{totalReviews} reseñas totales</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================== */}
      {/* ESTADÍSTICAS RÁPIDAS */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Star, label: 'Rating Promedio', value: averageRating, color: 'from-amber-500 to-orange-600', change: '+0.3' },
          { icon: MessageSquare, label: 'Total Reseñas', value: totalReviews.toString(), color: 'from-blue-500 to-indigo-600', change: '+12' },
          { icon: Clock, label: 'Reseñas Pendientes', value: pendingReviews.toString(), color: 'from-orange-500 to-red-600', change: '-3' },
          { icon: CheckCircle, label: 'Tasa de Respuesta', value: `${responseRate}%`, color: 'from-green-500 to-emerald-600', change: '+5%' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.label}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* DISTRIBUCIÓN DE RATINGS */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white">
            <Star className="w-6 h-6" />
          </div>
          Distribución de Ratings
        </h2>

        <div className="space-y-4">
          {ratingDistribution.map((dist, index) => (
            <motion.div
              key={dist.stars}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 w-24">
                <span className="text-sm font-bold text-gray-700">{dist.stars}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dist.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full relative ${
                      dist.stars === 5 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      dist.stars === 4 ? 'bg-gradient-to-r from-lime-500 to-lime-600' :
                      dist.stars === 3 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      dist.stars === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              <div className="w-20 text-right">
                <span className="text-sm font-bold text-gray-700">{dist.count}</span>
                <span className="text-xs text-gray-500 ml-1">({dist.percentage}%)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ====================================================================== */}
      {/* ANÁLISIS DE SENTIMIENTO */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Word Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
              <Hash className="w-6 h-6" />
            </div>
            Palabras Clave Más Mencionadas
          </h2>

          <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
            {keywords.map((keyword, index) => (
              <motion.div
                key={keyword.word}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-full font-bold cursor-pointer ${
                  keyword.sentiment === 'positivo' ? 'bg-green-100 text-green-700 border-2 border-green-300' :
                  keyword.sentiment === 'neutral' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' :
                  'bg-red-100 text-red-700 border-2 border-red-300'
                }`}
                style={{ fontSize: `${12 + keyword.count * 2}px` }}
              >
                {keyword.word} ({keyword.count})
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sentimiento General */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            Análisis de Sentimiento
          </h2>

          <div className="space-y-6">
            {[
              { label: 'Positivo', icon: Smile, percentage: 73, color: 'from-green-500 to-emerald-600', count: 11 },
              { label: 'Neutral', icon: Meh, percentage: 20, color: 'from-blue-500 to-indigo-600', count: 3 },
              { label: 'Negativo', icon: Frown, percentage: 7, color: 'from-red-500 to-pink-600', count: 1 }
            ].map((sentiment, index) => (
              <div key={sentiment.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <sentiment.icon className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-900">{sentiment.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{sentiment.count} ({sentiment.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sentiment.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${sentiment.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-start gap-3">
              <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">Aspectos Más Valorados</p>
                <p className="text-sm text-green-700">Profesionalismo, Calidad del servicio, Atención personalizada</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 mb-1">Aspectos a Mejorar</p>
                <p className="text-sm text-orange-700">Tiempos de entrega, Comunicación previa</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ====================================================================== */}
      {/* FILTROS Y BÚSQUEDA */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en reseñas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white font-semibold"
            >
              <option value="">Todas las estrellas</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>

            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value as ReviewStatus || null)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white font-semibold"
            >
              <option value="">Todos los estados</option>
              <option value="nueva">Nuevas</option>
              <option value="respondida">Respondidas</option>
              <option value="destacada">Destacadas</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================== */}
      {/* FEED DE RESEÑAS */}
      {/* ====================================================================== */}
      <div className="space-y-4 mb-8">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg">
                {review.avatar}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{review.clientName}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {renderStars(review.rating, 'sm')}
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 ${getPlatformColor(review.platform)} text-white text-xs font-bold rounded-full flex items-center gap-1`}>
                      {getPlatformIcon(review.platform)}
                      {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                </div>

                {/* Comentario */}
                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                {/* Respuesta */}
                {review.response && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 mb-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900 text-sm mb-1">Respuesta del equipo</p>
                        <p className="text-blue-700 text-sm">{review.response}</p>
                        {review.responseDate && (
                          <p className="text-xs text-blue-500 mt-1">{new Date(review.responseDate).toLocaleDateString('es-ES')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleOpenResponseModal(review)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {review.response ? 'Editar Respuesta' : 'Responder'}
                  </button>

                  <button className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-300 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Útil ({review.helpful})
                  </button>

                  <button className="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    Reportar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* DESTACAR TESTIMONIOS */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white">
              <Award className="w-6 h-6" />
            </div>
            Testimonios Destacados
          </h2>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copiar HTML
            </button>
            <button className="px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReviews.filter(r => r.status === 'destacada').slice(0, 6).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-xl shadow-md">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{review.clientName}</p>
                  {renderStars(review.rating, 'sm')}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{review.comment}</p>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(review.date).toLocaleDateString('es-ES')}</span>
                  <div className={`px-2 py-1 ${getPlatformColor(review.platform)} text-white rounded-full flex items-center gap-1`}>
                    {getPlatformIcon(review.platform)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ====================================================================== */}
      {/* MODAL DE RESPUESTA */}
      {/* ====================================================================== */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Responder Reseña</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white">
                      {selectedReview.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedReview.clientName}</p>
                      {renderStars(selectedReview.rating, 'sm')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Comentario original */}
              <div className="p-4 bg-gray-50 rounded-2xl mb-6">
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>

              {/* Templates */}
              <div className="mb-6">
                <p className="font-semibold text-gray-900 mb-3">Plantillas de respuesta:</p>
                <div className="flex gap-2 flex-wrap">
                  {responseTemplates
                    .filter(t => selectedReview.rating >= t.ratingRange[0] && selectedReview.rating <= t.ratingRange[1])
                    .map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleUseTemplate(template)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          selectedTemplate?.id === template.id
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                            : 'border-2 border-orange-300 text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-2">Tu respuesta:</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none resize-none"
                  placeholder="Escribe tu respuesta aquí..."
                />
              </div>

              {/* Preview */}
              {responseText && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-900 mb-2">Vista previa:</p>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900 text-sm mb-1">Respuesta del equipo</p>
                        <p className="text-blue-700 text-sm">{responseText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Aquí iría la lógica para guardar la respuesta
                    alert('Respuesta publicada!');
                    setShowResponseModal(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Publicar Respuesta
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OpinionesResenasPage;
