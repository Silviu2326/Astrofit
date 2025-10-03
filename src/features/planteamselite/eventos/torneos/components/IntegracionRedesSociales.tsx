import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Twitter, Facebook, Instagram, MessageCircle, Heart, Send } from 'lucide-react';

const IntegracionRedesSociales: React.FC = () => {
  const socialPlatforms = [
    { name: 'Twitter', icon: Twitter, followers: '12.5K', engagement: '8.3%', color: 'from-blue-400 to-blue-600', posts: 145 },
    { name: 'Facebook', icon: Facebook, followers: '8.2K', engagement: '6.1%', color: 'from-blue-600 to-indigo-600', posts: 89 },
    { name: 'Instagram', icon: Instagram, followers: '15.8K', engagement: '12.7%', color: 'from-pink-500 to-rose-500', posts: 234 },
    { name: 'Discord', icon: MessageCircle, followers: '3.4K', engagement: '15.2%', color: 'from-indigo-500 to-purple-600', posts: 567 },
  ];

  const recentPosts = [
    { platform: 'Twitter', content: '¡El torneo está en vivo! #TorneoElite', likes: 342, shares: 89 },
    { platform: 'Instagram', content: 'Highlights del partido Alpha vs Beta', likes: 521, shares: 156 },
    { platform: 'Facebook', content: 'Resultados de la jornada 1', likes: 287, shares: 64 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Redes Sociales</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Gestiona la presencia del torneo en todas las plataformas
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 bg-white/80 group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${platform.color} opacity-10 rounded-full blur-2xl`}></div>

              <div className="relative z-10 p-6">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <platform.icon className="w-8 h-8" />
                </div>

                {/* Nombre */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">{platform.name}</h3>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Seguidores</span>
                    <span className="text-gray-800 font-bold">{platform.followers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Engagement</span>
                    <span className="text-green-600 font-bold">{platform.engagement}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Posts</span>
                    <span className="text-purple-600 font-bold">{platform.posts}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-purple-600" />
            Actividad Reciente
          </h3>

          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-3 py-1 bg-purple-100 rounded-full">
                      <span className="text-xs font-bold text-purple-700">{post.platform}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 ml-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-gray-700">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-700">{post.shares}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              <span>Publicar Actualización</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegracionRedesSociales;
