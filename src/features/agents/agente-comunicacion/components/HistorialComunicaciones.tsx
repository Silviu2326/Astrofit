
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Mail, MessageCircle, Smartphone, CheckCircle2, Eye, Clock, Search } from 'lucide-react';

interface Comunicacion {
  id: string;
  cliente: string;
  tipo: 'Bienvenida' | 'Seguimiento' | 'Motivación' | 'Recordatorio' | 'Recuperación' | 'Felicitación';
  canal: 'email' | 'sms' | 'whatsapp' | 'push';
  fecha: string;
  estado: 'Enviado' | 'Leído' | 'Respondido';
  tasaApertura: number;
  preview: string;
}

const HistorialComunicaciones: React.FC = () => {
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroCanal, setFiltroCanal] = useState<string>('todos');

  const comunicaciones: Comunicacion[] = [
    {
      id: '1',
      cliente: 'Ana García',
      tipo: 'Bienvenida',
      canal: 'email',
      fecha: '2024-01-14 09:30',
      estado: 'Respondido',
      tasaApertura: 95,
      preview: '¡Bienvenida Ana! Estamos emocionados de comenzar este viaje contigo...'
    },
    {
      id: '2',
      cliente: 'Carlos Ruiz',
      tipo: 'Seguimiento',
      canal: 'whatsapp',
      fecha: '2024-01-14 10:15',
      estado: 'Leído',
      tasaApertura: 88,
      preview: 'Hola Carlos, ¿cómo te sientes después de la sesión de ayer?'
    },
    {
      id: '3',
      cliente: 'María López',
      tipo: 'Motivación',
      canal: 'sms',
      fecha: '2024-01-14 11:00',
      estado: 'Leído',
      tasaApertura: 92,
      preview: '¡María, has logrado el 75% de tu objetivo! Sigue así 💪'
    },
    {
      id: '4',
      cliente: 'Juan Pérez',
      tipo: 'Recordatorio',
      canal: 'push',
      fecha: '2024-01-14 14:00',
      estado: 'Enviado',
      tasaApertura: 0,
      preview: 'Recordatorio: Tu sesión es mañana a las 11:00 AM'
    },
    {
      id: '5',
      cliente: 'Laura Martínez',
      tipo: 'Recuperación',
      canal: 'email',
      fecha: '2024-01-13 16:30',
      estado: 'Leído',
      tasaApertura: 75,
      preview: '¡Hola Laura! Te extrañamos en el gym. ¿Todo bien?'
    },
    {
      id: '6',
      cliente: 'Pedro Sánchez',
      tipo: 'Felicitación',
      canal: 'whatsapp',
      fecha: '2024-01-13 18:00',
      estado: 'Respondido',
      tasaApertura: 100,
      preview: '¡Felicidades Pedro! Has alcanzado tu objetivo de fuerza 🎉'
    }
  ];

  const getIconoCanal = (canal: string) => {
    switch (canal) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'push': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'Respondido': return 'bg-green-100 text-green-700 border-green-300';
      case 'Leído': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Enviado': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'Bienvenida': return 'from-blue-500 to-indigo-600';
      case 'Seguimiento': return 'from-purple-500 to-pink-600';
      case 'Motivación': return 'from-orange-500 to-red-600';
      case 'Recordatorio': return 'from-yellow-500 to-amber-600';
      case 'Recuperación': return 'from-teal-500 to-cyan-600';
      case 'Felicitación': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const comunicacionesFiltradas = comunicaciones.filter(c => {
    const matchBusqueda = c.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                          c.preview.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || c.estado === filtroEstado;
    const matchCanal = filtroCanal === 'todos' || c.canal === filtroCanal;
    return matchBusqueda && matchEstado && matchCanal;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <History className="w-6 h-6" />
          </div>
          Historial de Comunicaciones
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por cliente o mensaje..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80"
          >
            <option value="todos">Todos los estados</option>
            <option value="Enviado">Enviado</option>
            <option value="Leído">Leído</option>
            <option value="Respondido">Respondido</option>
          </select>
          <select
            value={filtroCanal}
            onChange={(e) => setFiltroCanal(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80"
          >
            <option value="todos">Todos los canales</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="push">Push</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {comunicacionesFiltradas.map((comunicacion, index) => (
            <motion.div
              key={comunicacion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-md group"
            >
              {/* Línea vertical (timeline) */}
              {index < comunicacionesFiltradas.length - 1 && (
                <div className="absolute left-[29px] top-16 w-0.5 h-full bg-gradient-to-b from-purple-200 to-transparent"></div>
              )}

              {/* Avatar / Icono */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${getColorTipo(comunicacion.tipo)}`}>
                <span className="text-sm">{comunicacion.cliente.split(' ').map(n => n[0]).join('')}</span>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{comunicacion.cliente}</p>
                    <p className="text-xs text-gray-600">{comunicacion.tipo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getColorEstado(comunicacion.estado)}`}>
                      {comunicacion.estado}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{comunicacion.preview}</p>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    {getIconoCanal(comunicacion.canal)}
                    <span className="capitalize">{comunicacion.canal}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{comunicacion.fecha}</span>
                  </div>
                  {comunicacion.estado !== 'Enviado' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Eye className="w-3 h-3" />
                      <span className="font-semibold">{comunicacion.tasaApertura}% apertura</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {comunicacionesFiltradas.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No se encontraron comunicaciones que coincidan con los filtros.</p>
          </div>
        )}

        {/* Footer con resumen */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{comunicaciones.length}</p>
              <p className="text-xs text-gray-600">Total Enviados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {comunicaciones.filter(c => c.estado === 'Leído').length}
              </p>
              <p className="text-xs text-gray-600">Leídos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {comunicaciones.filter(c => c.estado === 'Respondido').length}
              </p>
              <p className="text-xs text-gray-600">Respondidos</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HistorialComunicaciones;
