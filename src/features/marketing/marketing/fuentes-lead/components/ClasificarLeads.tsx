import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Thermometer,
  Snowflake,
  Filter,
  Phone,
  Mail as MailIcon,
  Trash2,
  Award,
  Target
} from 'lucide-react';
import { getLeadSources } from '../fuentesLeadApi';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  quality: 'hot' | 'warm' | 'cold';
  score: number;
  lastContact: string;
}

const ClasificarLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    const fetchLeads = async () => {
      const sources = await getLeadSources();

      // Generar leads mockeados con clasificación
      const mockLeads: Lead[] = [
        { id: '1', name: 'María García', email: 'maria@example.com', source: 'Instagram', quality: 'hot', score: 92, lastContact: '2025-09-28' },
        { id: '2', name: 'Juan Pérez', email: 'juan@example.com', source: 'Google Ads', quality: 'hot', score: 88, lastContact: '2025-09-29' },
        { id: '3', name: 'Ana López', email: 'ana@example.com', source: 'Web Propia', quality: 'hot', score: 95, lastContact: '2025-09-30' },
        { id: '4', name: 'Carlos Ruiz', email: 'carlos@example.com', source: 'Facebook Ads', quality: 'warm', score: 72, lastContact: '2025-09-25' },
        { id: '5', name: 'Laura Torres', email: 'laura@example.com', source: 'LinkedIn', quality: 'warm', score: 68, lastContact: '2025-09-26' },
        { id: '6', name: 'Pedro Sánchez', email: 'pedro@example.com', source: 'Recomendación', quality: 'warm', score: 75, lastContact: '2025-09-27' },
        { id: '7', name: 'Sofia Martín', email: 'sofia@example.com', source: 'Instagram', quality: 'warm', score: 70, lastContact: '2025-09-24' },
        { id: '8', name: 'Diego Fernández', email: 'diego@example.com', source: 'Google Ads', quality: 'cold', score: 45, lastContact: '2025-09-20' },
        { id: '9', name: 'Elena Gómez', email: 'elena@example.com', source: 'Facebook Ads', quality: 'cold', score: 38, lastContact: '2025-09-18' },
        { id: '10', name: 'Miguel Díaz', email: 'miguel@example.com', source: 'LinkedIn', quality: 'cold', score: 52, lastContact: '2025-09-22' }
      ];

      setLeads(mockLeads);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
            <p className="text-gray-600 font-semibold">Cargando clasificación...</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => {
    const matchesQuality = filter === 'all' || lead.quality === filter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesQuality && matchesSource;
  });

  const hotLeads = leads.filter(l => l.quality === 'hot').length;
  const warmLeads = leads.filter(l => l.quality === 'warm').length;
  const coldLeads = leads.filter(l => l.quality === 'cold').length;

  const getQualityBadge = (quality: 'hot' | 'warm' | 'cold') => {
    switch (quality) {
      case 'hot':
        return {
          icon: Flame,
          gradient: 'from-red-500 to-orange-500',
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          label: 'Hot'
        };
      case 'warm':
        return {
          icon: Thermometer,
          gradient: 'from-yellow-500 to-orange-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Warm'
        };
      case 'cold':
        return {
          icon: Snowflake,
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'Cold'
        };
    }
  };

  const sources = Array.from(new Set(leads.map(l => l.source)));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6" />
            </div>
            Clasificación de Leads
          </h3>
          <p className="text-purple-100 mt-2">Organiza y prioriza tus leads por calidad</p>
        </div>
      </div>

      <div className="p-6">
        {/* Resumen de clasificación */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600 uppercase">Hot</p>
                <p className="text-2xl font-bold text-red-900">{hotLeads}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-xl">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-600 uppercase">Warm</p>
                <p className="text-2xl font-bold text-yellow-900">{warmLeads}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Snowflake className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase">Cold</p>
                <p className="text-2xl font-bold text-blue-900">{coldLeads}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Filtros:</span>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
          >
            <option value="all">Todas las calidades</option>
            <option value="hot">🔥 Hot</option>
            <option value="warm">🌡️ Warm</option>
            <option value="cold">❄️ Cold</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
          >
            <option value="all">Todas las fuentes</option>
            {sources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        {/* Lista de leads */}
        <div className="space-y-3">
          {filteredLeads.map((lead, index) => {
            const badge = getQualityBadge(lead.quality);
            const Icon = badge.icon;

            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${badge.bg} border ${badge.border} rounded-2xl p-4 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Badge de calidad */}
                    <div className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${badge.gradient} rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-xs font-bold text-white uppercase">{badge.label}</span>
                    </div>

                    {/* Info del lead */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-gray-900">{lead.name}</h4>
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/50 rounded-lg">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-bold text-purple-700">{lead.score} pts</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MailIcon className="w-4 h-4" />
                          {lead.email}
                        </span>
                        <span className="px-2 py-1 bg-white/50 rounded-lg font-semibold">
                          {lead.source}
                        </span>
                        <span className="text-xs text-gray-500">
                          Último contacto: {new Date(lead.lastContact).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                      title="Contactar"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                      title="Enviar email"
                    >
                      <MailIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                      title="Descartar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Barra de progreso del score */}
                <div className="mt-3 w-full h-2 bg-white/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lead.score}%` }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${badge.gradient} rounded-full`}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold">No hay leads que coincidan con los filtros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClasificarLeads;
