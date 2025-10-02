import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone, TrendingUp, Users, DollarSign, Target, Calendar,
  BarChart2, Lightbulb, Hash, FileText, Award, Zap,
  Instagram, Facebook, Twitter, Linkedin, Youtube,
  Plus, RefreshCw, Edit, Clock, Eye, Heart, MessageCircle, Share2,
  ArrowUpRight, ArrowDownRight, CheckCircle, Sparkles, Rocket
} from 'lucide-react';
import { BeneficiosMembresiaSection } from '../../agente-marketing/components/BeneficiosMembresiaSection';

const AgenteMarketingPage = () => {
  const [selectedContentType, setSelectedContentType] = useState('post');
  const [selectedTone, setSelectedTone] = useState('motivador');
  const [selectedView, setSelectedView] = useState('calendario');
  const [selectedTab, setSelectedTab] = useState('generador');

  // Datos mock
  const statsData = [
    {
      title: 'Leads Este Mes',
      value: '486',
      change: '+24.5',
      icon: Users,
      progress: 75,
      trend: 'up'
    },
    {
      title: 'Tasa de Conversión',
      value: '12.8%',
      change: '+3.2',
      icon: Target,
      progress: 65,
      trend: 'up'
    },
    {
      title: 'ROI de Campañas',
      value: '385%',
      change: '+45',
      icon: DollarSign,
      progress: 85,
      trend: 'up'
    },
    {
      title: 'Engagement',
      value: '8.4K',
      change: '+18.7',
      icon: Heart,
      progress: 70,
      trend: 'up'
    }
  ];

  const contentTypes = [
    { id: 'post', name: 'Post Redes Sociales', icon: Instagram },
    { id: 'email', name: 'Email Marketing', icon: FileText },
    { id: 'blog', name: 'Blog Post', icon: FileText },
    { id: 'story', name: 'Story/Reel', icon: Sparkles },
    { id: 'ad', name: 'Anuncio Publicitario', icon: Target }
  ];

  const toneOptions = [
    { id: 'motivador', name: 'Motivador' },
    { id: 'educativo', name: 'Educativo' },
    { id: 'promocional', name: 'Promocional' }
  ];

  const generatedContent = {
    text: "🚀 ¡Transforma tu negocio hoy! Descubre cómo nuestras soluciones de IA pueden aumentar tu productividad hasta un 300%. No esperes más para dar el salto al futuro. 💡\n\nLas empresas que adoptan tecnología temprano son las que lideran el mercado mañana. ¿Estás listo para ser pionero?",
    hashtags: "#IA #Tecnología #Innovación #Productividad #TransformaciónDigital #Emprendimiento #Negocios #FuturoDigital",
    cta: "👉 Agenda tu demo gratuita ahora (link en bio)",
    platforms: ['Instagram', 'Facebook', 'LinkedIn']
  };

  const calendarPosts = [
    { day: 1, type: 'post', status: 'publicado', platform: 'Instagram' },
    { day: 3, type: 'story', status: 'programado', platform: 'Facebook' },
    { day: 5, type: 'blog', status: 'draft', platform: 'LinkedIn' },
    { day: 7, type: 'ad', status: 'programado', platform: 'Instagram' },
    { day: 10, type: 'post', status: 'publicado', platform: 'Twitter' },
    { day: 12, type: 'email', status: 'programado', platform: 'Email' },
    { day: 15, type: 'story', status: 'publicado', platform: 'Instagram' },
    { day: 18, type: 'post', status: 'draft', platform: 'LinkedIn' },
    { day: 20, type: 'ad', status: 'programado', platform: 'Facebook' },
    { day: 22, type: 'blog', status: 'publicado', platform: 'Blog' },
    { day: 25, type: 'post', status: 'programado', platform: 'Instagram' },
    { day: 28, type: 'story', status: 'draft', platform: 'Facebook' }
  ];

  const performanceData = [
    {
      id: 1,
      title: 'Lanzamiento Producto Q4',
      platform: 'Instagram',
      reach: '45.2K',
      engagement: '8.4K',
      clicks: '2.1K',
      conversions: '156',
      insight: 'Posts con fotos tienen 3x más engagement'
    },
    {
      id: 2,
      title: 'Campaña Black Friday',
      platform: 'Facebook',
      reach: '62.8K',
      engagement: '12.3K',
      clicks: '3.8K',
      conversions: '287',
      insight: 'Mejor horario: 18:00-21:00'
    },
    {
      id: 3,
      title: 'Email Newsletter Semanal',
      platform: 'Email',
      reach: '15.4K',
      engagement: '4.2K',
      clicks: '1.5K',
      conversions: '98',
      insight: 'CTR superior los martes'
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Lanzamiento Producto',
      objective: 'Ventas',
      budget: '5,000€',
      duration: '14 días',
      channels: ['Facebook', 'Instagram', 'Google'],
      prediction: { reach: '150K', conversions: '450', roi: '420%' },
      status: 'activa'
    },
    {
      id: 2,
      name: 'Captación Leads B2B',
      objective: 'Leads',
      budget: '3,000€',
      duration: '30 días',
      channels: ['LinkedIn', 'Google'],
      prediction: { reach: '80K', conversions: '280', roi: '350%' },
      status: 'activa'
    },
    {
      id: 3,
      name: 'Brand Awareness',
      objective: 'Awareness',
      budget: '2,000€',
      duration: '21 días',
      channels: ['Instagram', 'TikTok'],
      prediction: { reach: '200K', conversions: '150', roi: '280%' },
      status: 'borrador'
    }
  ];

  const adOptimizations = [
    {
      ad: 'Anuncio A - "Descubre el futuro"',
      ctr: '2.4%',
      cpc: '0.45€',
      cpa: '12.50€',
      recommendations: [
        'Cambiar headline por: "Transforma tu negocio hoy"',
        'Ajustar audiencia: Añadir interés en "Software empresarial"',
        'Incrementar presupuesto en 20% para aprovechar momento'
      ]
    },
    {
      ad: 'Anuncio B - "Solución innovadora"',
      ctr: '1.8%',
      cpc: '0.62€',
      cpa: '18.30€',
      recommendations: [
        'Mejorar imagen: Usar personas en acción',
        'Optimizar para móvil: Reducir texto en imagen',
        'Probar horario nocturno (20:00-23:00)'
      ]
    }
  ];

  const marketingPlan = {
    title: 'Plan de Marketing - Próximos 30 días',
    weeks: [
      {
        week: 'Semana 1',
        actions: [
          'Lanzar campaña de awareness en Instagram',
          'Publicar 3 blog posts educativos',
          'Enviar newsletter semanal'
        ],
        content: ['5 posts', '2 stories', '1 reel'],
        channels: ['Instagram', 'Blog', 'Email']
      },
      {
        week: 'Semana 2',
        actions: [
          'Iniciar campaña de retargeting',
          'Webinar gratuito sobre producto',
          'Colaboración con influencer'
        ],
        content: ['4 posts', '3 stories', '1 video'],
        channels: ['Facebook', 'LinkedIn', 'YouTube']
      },
      {
        week: 'Semana 3',
        actions: [
          'Promoción especial tiempo limitado',
          'Testimonios de clientes',
          'Actualizar landing pages'
        ],
        content: ['6 posts', '4 stories', '2 reels'],
        channels: ['Instagram', 'Facebook', 'Web']
      },
      {
        week: 'Semana 4',
        actions: [
          'Análisis de resultados',
          'Optimización de campañas',
          'Planificación próximo mes'
        ],
        content: ['3 posts', '2 stories', '1 informe'],
        channels: ['Todas las plataformas']
      }
    ]
  };

  const competitorInsights = [
    {
      competitor: 'Competidor A',
      topContent: 'Videos educativos cortos',
      strategy: 'Enfoque en contenido viral',
      gap: 'Poca presencia en LinkedIn'
    },
    {
      competitor: 'Competidor B',
      topContent: 'Infografías sobre industria',
      strategy: 'Thought leadership',
      gap: 'No utilizan video marketing'
    },
    {
      competitor: 'Competidor C',
      topContent: 'Testimonios clientes',
      strategy: 'Social proof intensivo',
      gap: 'Baja frecuencia de publicación'
    }
  ];

  const hashtagGroups = [
    {
      name: 'Grupo Tech',
      hashtags: ['#IA', '#Tecnología', '#Innovación', '#FuturoDigital'],
      avgReach: '45K',
      avgEngagement: '3.2%'
    },
    {
      name: 'Grupo Negocio',
      hashtags: ['#Emprendimiento', '#Negocios', '#Startup', '#Productividad'],
      avgReach: '38K',
      avgEngagement: '4.1%'
    },
    {
      name: 'Grupo Trending',
      hashtags: ['#Tendencias2024', '#TransformaciónDigital', '#Marketing', '#Ventas'],
      avgReach: '52K',
      avgEngagement: '2.8%'
    }
  ];

  const copyFormulas = [
    {
      name: 'AIDA',
      description: 'Atención → Interés → Deseo → Acción',
      useCase: 'Ventas directas'
    },
    {
      name: 'PAS',
      description: 'Problema → Agitación → Solución',
      useCase: 'Productos/servicios'
    },
    {
      name: 'FAB',
      description: 'Características → Ventajas → Beneficios',
      useCase: 'Productos técnicos'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Rocket className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Marketing</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Estrategias inteligentes para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">hacer crecer tu negocio</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Megaphone className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Campañas IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">ROI Optimizado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Analytics Avanzados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TABS DE NAVEGACIÓN */}
      <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'generador', name: 'Generador de Contenido', icon: FileText },
            { id: 'calendario', name: 'Calendario', icon: Calendar },
            { id: 'rendimiento', name: 'Rendimiento', icon: BarChart2 },
            { id: 'campanas', name: 'Campañas', icon: Megaphone },
            { id: 'optimizador', name: 'Optimizador', icon: TrendingUp },
            { id: 'estrategias', name: 'Estrategias', icon: Lightbulb },
            { id: 'competencia', name: 'Competencia', icon: Target },
            { id: 'hashtags', name: 'Hashtags', icon: Hash },
            { id: 'copywriting', name: 'Copywriting', icon: Edit },
            { id: 'reportes', name: 'Reportes', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* GENERADOR DE CONTENIDO */}
      {selectedTab === 'generador' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Formulario */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                Crear Contenido con IA
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Tipo de contenido */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Tipo de Contenido</label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedContentType(type.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedContentType === type.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <type.icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tema/Keyword */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tema / Keyword</label>
                <input
                  type="text"
                  placeholder="ej: Lanzamiento de producto innovador"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Tono */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Tono</label>
                <div className="flex gap-3">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedTone === tone.id
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                          : 'border-2 border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {tone.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Longitud */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Longitud</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  defaultValue="200"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Corto</span>
                  <span>Medio</span>
                  <span>Largo</span>
                </div>
              </div>

              <button className="w-full relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generar Contenido
                </div>
              </button>
            </div>
          </div>

          {/* Output generado */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Eye className="w-6 h-6" />
                </div>
                Contenido Generado
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Texto principal */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Texto Principal</label>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{generatedContent.text}</p>
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hashtags Sugeridos</label>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <p className="text-blue-700 font-medium">{generatedContent.hashtags}</p>
                </div>
              </div>

              {/* CTA */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Call-to-Action</label>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                  <p className="text-green-700 font-semibold">{generatedContent.cta}</p>
                </div>
              </div>

              {/* Preview por plataforma */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Preview por Plataforma</label>
                <div className="flex gap-3">
                  {[
                    { name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500' },
                    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' },
                    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-500 to-blue-700' }
                  ].map((platform) => (
                    <button
                      key={platform.name}
                      className={`flex-1 p-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2`}
                    >
                      <platform.icon className="w-5 h-5" />
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Regenerar
                </button>
                <button className="flex-1 px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Programar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* CALENDARIO DE CONTENIDO */}
      {selectedTab === 'calendario' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Calendario de Contenido - Diciembre 2024
              </h3>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Post
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Vista de calendario */}
            <div className="grid grid-cols-7 gap-3 mb-6">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 text-sm">
                  {day}
                </div>
              ))}

              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const post = calendarPosts.find(p => p.day === day);
                return (
                  <div
                    key={day}
                    className={`aspect-square p-2 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      post
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-gray-700">{day}</div>
                    {post && (
                      <div className="mt-1">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          post.status === 'publicado' ? 'bg-green-500' :
                          post.status === 'programado' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}>
                          {post.type === 'post' && <FileText className="w-3 h-3 text-white" />}
                          {post.type === 'story' && <Sparkles className="w-3 h-3 text-white" />}
                          {post.type === 'blog' && <FileText className="w-3 h-3 text-white" />}
                          {post.type === 'ad' && <Target className="w-3 h-3 text-white" />}
                          {post.type === 'email' && <FileText className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Leyenda */}
            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm font-semibold text-gray-700">Publicado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <span className="text-sm font-semibold text-gray-700">Programado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-400"></div>
                <span className="text-sm font-semibold text-gray-700">Borrador</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ANALIZADOR DE RENDIMIENTO */}
      {selectedTab === 'rendimiento' && (
        <div className="space-y-6">
          {performanceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
            >
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-blue-100">{item.platform}</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <BarChart2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <p className="text-sm font-semibold text-blue-600 mb-1">Alcance</p>
                    <p className="text-2xl font-bold text-blue-900">{item.reach}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <p className="text-sm font-semibold text-purple-600 mb-1">Engagement</p>
                    <p className="text-2xl font-bold text-purple-900">{item.engagement}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                    <p className="text-sm font-semibold text-pink-600 mb-1">Clicks</p>
                    <p className="text-2xl font-bold text-pink-900">{item.clicks}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <p className="text-sm font-semibold text-green-600 mb-1">Conversiones</p>
                    <p className="text-2xl font-bold text-green-900">{item.conversions}</p>
                  </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-yellow-900 mb-1">💡 Insight</p>
                    <p className="text-yellow-800">{item.insight}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* GENERADOR DE CAMPAÑAS */}
      {selectedTab === 'campanas' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Mis Campañas</h2>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nueva Campaña
            </button>
          </div>

          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{campaign.name}</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'activa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status === 'activa' ? '● Activa' : '○ Borrador'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {campaign.objective}
                    </span>
                  </div>
                </div>
                <Megaphone className="w-8 h-8 text-orange-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Detalles */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Presupuesto: <strong>{campaign.budget}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Duración: <strong>{campaign.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Target className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Canales:</span>
                    {campaign.channels.map((channel) => (
                      <span key={channel} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Predicción */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <p className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Predicción de Resultados
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Alcance:</span>
                      <strong className="text-purple-900">{campaign.prediction.reach}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Conversiones:</span>
                      <strong className="text-purple-900">{campaign.prediction.conversions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">ROI Estimado:</span>
                      <strong className="text-green-600 text-lg">{campaign.prediction.roi}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* OPTIMIZADOR DE ANUNCIOS */}
      {selectedTab === 'optimizador' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Optimizador de Anuncios</h2>

          {adOptimizations.map((ad, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
                <h3 className="text-xl font-bold text-white">{ad.ad}</h3>
              </div>

              <div className="p-6">
                {/* Métricas actuales */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-2xl text-center">
                    <p className="text-sm text-blue-600 font-semibold mb-1">CTR</p>
                    <p className="text-2xl font-bold text-blue-900">{ad.ctr}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-2xl text-center">
                    <p className="text-sm text-purple-600 font-semibold mb-1">CPC</p>
                    <p className="text-2xl font-bold text-purple-900">{ad.cpc}</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-2xl text-center">
                    <p className="text-sm text-pink-600 font-semibold mb-1">CPA</p>
                    <p className="text-2xl font-bold text-pink-900">{ad.cpa}</p>
                  </div>
                </div>

                {/* Recomendaciones */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <p className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Recomendaciones de Mejora
                  </p>
                  <ul className="space-y-2">
                    {ad.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-green-800">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ESTRATEGIAS PERSONALIZADAS */}
      {selectedTab === 'estrategias' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-7 h-7" />
              {marketingPlan.title}
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {marketingPlan.weeks.map((week, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{week.week}</h4>

                {/* Acciones */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Acciones:</p>
                  <ul className="space-y-2">
                    {week.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contenidos y canales */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-xl">
                    <p className="font-semibold text-gray-700 mb-2">Contenidos a crear:</p>
                    <div className="flex flex-wrap gap-2">
                      {week.content.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl">
                    <p className="font-semibold text-gray-700 mb-2">Canales:</p>
                    <div className="flex flex-wrap gap-2">
                      {week.channels.map((ch, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* COMPETENCIA INSIGHTS */}
      {selectedTab === 'competencia' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Análisis de Competencia</h2>

          {competitorInsights.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{comp.competitor}</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  <p className="font-semibold text-blue-900 mb-2">Contenido que funciona</p>
                  <p className="text-blue-700">{comp.topContent}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-2xl">
                  <p className="font-semibold text-purple-900 mb-2">Estrategia detectada</p>
                  <p className="text-purple-700">{comp.strategy}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <p className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Oportunidad
                  </p>
                  <p className="text-green-700 font-semibold">{comp.gap}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* GENERADOR DE HASHTAGS */}
      {selectedTab === 'hashtags' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Generador de Hashtags</h2>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nuevo Grupo
            </button>
          </div>

          {hashtagGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.hashtags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Hash className="w-8 h-8 text-orange-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <p className="text-sm text-blue-600 font-semibold mb-1">Alcance Promedio</p>
                  <p className="text-2xl font-bold text-blue-900">{group.avgReach}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <p className="text-sm text-purple-600 font-semibold mb-1">Engagement Promedio</p>
                  <p className="text-2xl font-bold text-purple-900">{group.avgEngagement}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ASISTENTE DE COPYWRITING */}
      {selectedTab === 'copywriting' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fórmulas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit className="w-6 h-6" />
                Fórmulas de Copywriting
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {copyFormulas.map((formula, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-2">{formula.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{formula.description}</p>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {formula.useCase}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mejorador de textos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
          >
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Mejorar Textos
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Texto Actual</label>
                <textarea
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm min-h-[120px]"
                  placeholder="Escribe o pega tu texto aquí..."
                ></textarea>
              </div>

              <button className="w-full relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Mejorar Texto
                </div>
              </button>

              {/* Resultados */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-green-900">Versión Mejorada</p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-green-100 rounded-lg">
                      <span className="text-xs font-bold text-green-700">Claridad: 9/10</span>
                    </div>
                    <div className="px-3 py-1 bg-purple-100 rounded-lg">
                      <span className="text-xs font-bold text-purple-700">Persuasión: 8/10</span>
                    </div>
                  </div>
                </div>
                <p className="text-green-800 leading-relaxed">
                  Tu texto mejorado aparecerá aquí con mayor claridad, persuasión y llamadas a la acción optimizadas.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* REPORTES DE MARKETING */}
      {selectedTab === 'reportes' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-7 h-7" />
                Reportes de Marketing
              </h3>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300">
                Exportar PDF
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Performance Mensual */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-4">Performance Mensual</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-blue-600 mb-1">Total Alcance</p>
                  <p className="text-2xl font-bold text-blue-900">245K</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 mb-1">Engagement</p>
                  <p className="text-2xl font-bold text-blue-900">28.4K</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 mb-1">Leads</p>
                  <p className="text-2xl font-bold text-blue-900">486</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 mb-1">Conversiones</p>
                  <p className="text-2xl font-bold text-blue-900">156</p>
                </div>
              </div>
            </div>

            {/* ROI por Canal */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <h4 className="text-xl font-bold text-purple-900 mb-4">ROI por Canal</h4>
              <div className="space-y-3">
                {[
                  { channel: 'Instagram', roi: '385%', color: 'from-purple-500 to-pink-500' },
                  { channel: 'Facebook', roi: '342%', color: 'from-blue-500 to-blue-700' },
                  { channel: 'LinkedIn', roi: '298%', color: 'from-blue-400 to-blue-600' },
                  { channel: 'Google Ads', roi: '425%', color: 'from-green-500 to-emerald-600' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="font-semibold text-gray-900">{item.channel}</span>
                    <span className={`px-4 py-2 bg-gradient-to-r ${item.color} text-white rounded-lg font-bold`}>
                      {item.roi}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mejores Contenidos */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Top 3 Mejores Contenidos
              </h4>
              <div className="space-y-3">
                {[
                  { title: 'Lanzamiento Producto Q4', engagement: '8.4K', platform: 'Instagram' },
                  { title: 'Campaña Black Friday', engagement: '12.3K', platform: 'Facebook' },
                  { title: 'Tutorial IA para Negocios', engagement: '6.8K', platform: 'YouTube' }
                ].map((content, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{content.title}</p>
                      <p className="text-sm text-gray-600">{content.platform}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-bold text-gray-900">{content.engagement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* BENEFICIOS DE MEMBRESÍA */}
      <BeneficiosMembresiaSection />
    </div>
  );
};

export default AgenteMarketingPage;
