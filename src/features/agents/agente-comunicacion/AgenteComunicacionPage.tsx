
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, TrendingUp, Users, Mail, MessageCircle, Smartphone, BarChart3, Clock, Sparkles } from 'lucide-react';
import EstadisticasRapidas from './components/EstadisticasRapidas';
import GeneradorMensajes from './components/GeneradorMensajes';
import EditorMensajes from './components/EditorMensajes';
import PlantillasRapidas from './components/PlantillasRapidas';
import RecomendadorTiming from './components/RecomendadorTiming';
import AnalizadorTono from './components/AnalizadorTono';
import PersonalizadorMasivo from './components/PersonalizadorMasivo';
import HistorialComunicaciones from './components/HistorialComunicaciones';
import AnalisisEfectividad from './components/AnalisisEfectividad';

const AgenteComunicacionPage: React.FC = () => {
  const [mensajeGenerado, setMensajeGenerado] = useState<string>('');
  const [mensajeEditado, setMensajeEditado] = useState<string>('');

  const handleMensajeGenerado = (mensaje: string) => {
    setMensajeGenerado(mensaje);
    setMensajeEditado(mensaje);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-orange-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <MessageSquare className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Comunicación</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
            Genera <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">mensajes personalizados</span> para tus clientes con IA
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Mail className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Email</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MessageCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">WhatsApp</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Smartphone className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">SMS</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Personalización IA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <EstadisticasRapidas />

      {/* GENERADOR Y EDITOR DE MENSAJES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GeneradorMensajes onMensajeGenerado={handleMensajeGenerado} />
        <EditorMensajes
          mensajeInicial={mensajeEditado}
          onMensajeEditado={setMensajeEditado}
        />
      </div>

      {/* BIBLIOTECA DE TEMPLATES Y ANALIZADOR DE TONO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PlantillasRapidas onSeleccionarTemplate={handleMensajeGenerado} />
        </div>
        <div>
          <AnalizadorTono mensaje={mensajeEditado} />
        </div>
      </div>

      {/* RECOMENDADOR DE TIMING Y PERSONALIZADOR MASIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecomendadorTiming />
        <PersonalizadorMasivo mensaje={mensajeEditado} />
      </div>

      {/* HISTORIAL DE COMUNICACIONES */}
      <div className="mb-8">
        <HistorialComunicaciones />
      </div>

      {/* ANÁLISIS DE EFECTIVIDAD */}
      <div className="mb-8">
        <AnalisisEfectividad />
      </div>
    </div>
  );
};

export default AgenteComunicacionPage;
