import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Smile, Frown, Meh, Tag,
  Star, Reply, AlertCircle, Filter, Search
} from 'lucide-react';
import { useGetFeedbackQuery } from '../encuestasNpsApi';

const ComentariosUtiles: React.FC = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'promoter' | 'passive' | 'detractor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const promoters = feedback?.filter((f) => f.type === 'promoter') || [];
  const passives = feedback?.filter((f) => f.type === 'passive') || [];
  const detractors = feedback?.filter((f) => f.type === 'detractor') || [];

  // Filtrado
  let filteredFeedback = feedback || [];
  if (selectedFilter !== 'all') {
    filteredFeedback = filteredFeedback.filter(f => f.type === selectedFilter);
  }
  if (searchTerm) {
    filteredFeedback = filteredFeedback.filter(f =>
      f.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Análisis de sentimiento (mock - basado en score)
  const getSentiment = (score: number) => {
    if (score >= 9) return { label: 'Muy Positivo', color: 'from-green-500 to-emerald-600', icon: Smile };
    if (score >= 7) return { label: 'Neutral', color: 'from-yellow-500 to-orange-500', icon: Meh };
    return { label: 'Negativo', color: 'from-red-500 to-pink-600', icon: Frown };
  };

  // Palabras clave destacadas (mock)
  const highlightKeywords = (text: string) => {
    const keywords = ['excelente', 'bueno', 'malo', 'pésimo', 'increíble', 'decepcionante', 'recomiendo', 'mejor', 'peor'];
    let highlighted = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 text-gray-900 px-1 rounded">$1</mark>');
    });
    return highlighted;
  };

  const FeedbackCard: React.FC<{
    type: 'promoter' | 'passive' | 'detractor';
    comment: string;
    score: number;
    id: string;
  }> = ({ type, comment, score, id }) => {
    const sentiment = getSentiment(score);
    const typeConfig = {
      promoter: {
        label: 'Promotor',
        gradient: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        badge: 'bg-green-500',
        textColor: 'text-green-700'
      },
      passive: {
        label: 'Pasivo',
        gradient: 'from-yellow-50 to-orange-50',
        border: 'border-yellow-200',
        badge: 'bg-yellow-500',
        textColor: 'text-yellow-700'
      },
      detractor: {
        label: 'Detractor',
        gradient: 'from-red-50 to-pink-50',
        border: 'border-red-200',
        badge: 'bg-red-500',
        textColor: 'text-red-700'
      }
    };

    const config = typeConfig[type];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br ${config.gradient} rounded-2xl p-5 border-2 ${config.border} relative overflow-hidden group transition-all duration-300 hover:shadow-lg`}
      >
        {/* Decoración de fondo */}
        <div className={`absolute -right-8 -top-8 w-24 h-24 ${config.badge} opacity-5 rounded-full blur-2xl`}></div>

        <div className="relative z-10">
          {/* Header con tipo y score */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 ${config.badge} text-white text-xs font-bold rounded-full`}>
                {config.label}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(score / 2) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-gray-600 ml-1">{score}/10</span>
              </div>
            </div>

            {/* Análisis de sentimiento */}
            <div className="flex items-center gap-1">
              <div className={`p-1 rounded-lg bg-gradient-to-br ${sentiment.color}`}>
                <sentiment.icon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Comentario con palabras clave destacadas */}
          <div className="mb-3">
            <p
              className={`text-sm ${config.textColor} leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: `"${highlightKeywords(comment)}"` }}
            />
          </div>

          {/* Etiquetas y acciones */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">feedback</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:border-blue-300 transition-all duration-300 group/btn">
                <Reply className="w-4 h-4 text-gray-600 group-hover/btn:text-blue-600" />
              </button>
              <button className="p-1.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:border-orange-300 transition-all duration-300 group/btn">
                <AlertCircle className="w-4 h-4 text-gray-600 group-hover/btn:text-orange-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const filterOptions = [
    { id: 'all', label: 'Todos', count: feedback?.length || 0, color: 'from-gray-500 to-slate-600' },
    { id: 'promoter', label: 'Promotores', count: promoters.length, color: 'from-green-500 to-emerald-600' },
    { id: 'passive', label: 'Pasivos', count: passives.length, color: 'from-yellow-500 to-orange-500' },
    { id: 'detractor', label: 'Detractores', count: detractors.length, color: 'from-red-500 to-pink-600' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10 mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          Comentarios Útiles
        </h3>
        <p className="text-purple-100 text-sm relative z-10">
          Feed de feedback categorizado con análisis de sentimiento
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Barra de búsqueda y filtros */}
        <div className="mb-6">
          {/* Búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en comentarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Filtrar por:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedFilter(option.id as any)}
                className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                  selectedFilter === option.id
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${option.color}`}>
                  {option.count}
                </div>
                <div className="text-xs font-bold text-gray-700 mt-1">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Feed de comentarios */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((f, index) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FeedbackCard {...f} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No hay comentarios que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComentariosUtiles;