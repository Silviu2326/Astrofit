import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle, XCircle, MessageSquare, Calendar, Users, Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import { mockPendingApplications } from '../data/mockData';

export const PendingApplications: React.FC = () => {
  const [applications, setApplications] = useState(mockPendingApplications);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setApplications(prev => prev.filter(app => app.id !== id));
      setProcessingId(null);
      // Aquí iría la notificación de aprobación
    }, 500);
  };

  const handleReject = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setApplications(prev => prev.filter(app => app.id !== id));
      setProcessingId(null);
      // Aquí iría la notificación de rechazo
    }, 500);
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Instagram': <Instagram className="w-4 h-4" />,
      'YouTube': <Youtube className="w-4 h-4" />,
      'Facebook': <Facebook className="w-4 h-4" />,
      'TikTok': <Users className="w-4 h-4" />,
      'Blog': <MessageSquare className="w-4 h-4" />,
      'Newsletter': <Mail className="w-4 h-4" />,
      'LinkedIn': <Users className="w-4 h-4" />,
    };
    return icons[platform] || <Users className="w-4 h-4" />;
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Todo al día!</h3>
        <p className="text-gray-600">No hay solicitudes pendientes de aprobación</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Solicitudes Pendientes</h3>
            <p className="text-sm text-blue-100">{applications.length} aplicaciones esperando revisión</p>
          </div>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="p-6 space-y-4">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all ${
              processingId === app.id ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                {app.avatar}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{app.name}</h4>
                    <p className="text-sm text-gray-600">{app.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(app.applicationDate).toLocaleDateString('es-ES')}
                  </div>
                </div>

                {/* Razón */}
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Razón para unirse:</p>
                  <p className="text-sm text-gray-600 italic">"{app.reason}"</p>
                </div>

                {/* Audiencia */}
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Audiencia:</p>
                  <p className="text-sm text-gray-600">{app.audience}</p>
                </div>

                {/* Plataformas */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Plataformas:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.platforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-indigo-200 text-indigo-700"
                      >
                        {getPlatformIcon(platform)}
                        <span className="text-sm font-medium">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(app.id)}
                    disabled={processingId !== null}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(app.id)}
                    disabled={processingId !== null}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-5 h-5" />
                    Rechazar
                  </button>
                  <button
                    disabled={processingId !== null}
                    className="px-4 py-3 bg-white border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
