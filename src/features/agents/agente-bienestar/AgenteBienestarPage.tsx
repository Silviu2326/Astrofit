import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, Award, Sparkles, Send, MessageCircle, Smile, Droplet, Moon, Zap } from 'lucide-react';
import TableroHabitos from './components/TableroHabitos';
import SemaforoAdherencia from './components/SemaforoAdherencia';
import RetosGamificados from './components/RetosGamificados';
import PanelMotivacional from './components/PanelMotivacional';
import TendenciasEstiloVida from './components/TendenciasEstiloVida';

const AgenteBienestarPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: '¡Hola! Soy tu asistente de bienestar. ¿Cómo te sientes hoy?', sender: 'agent', time: '9:00 AM' },
    { id: 2, text: 'Hola, me siento bien pero un poco cansado', sender: 'user', time: '9:01 AM' },
    { id: 3, text: 'Entiendo. ¿Has estado durmiendo bien últimamente? Veo que tu racha de sueño ha bajado un poco.', sender: 'agent', time: '9:01 AM' },
    { id: 4, text: 'La verdad es que he estado acostándome tarde', sender: 'user', time: '9:02 AM' },
    { id: 5, text: 'Te recomiendo establecer una rutina de sueño. ¿Qué tal si empezamos con acostarte 30 minutos más temprano esta semana?', sender: 'agent', time: '9:02 AM' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock stats
  const stats = [
    { icon: Heart, title: 'Nivel de Bienestar', value: 78, max: 100, color: 'from-teal-500 to-cyan-500', change: '+5' },
    { icon: Activity, title: 'Días Activos', value: 15, unit: 'días', color: 'from-cyan-500 to-blue-500', change: '+3' },
    { icon: TrendingUp, title: 'Objetivos Cumplidos', value: 12, max: 15, color: 'from-blue-500 to-indigo-500', change: '+2' },
    { icon: Award, title: 'Racha de Hábitos', value: 7, unit: 'días', color: 'from-indigo-500 to-purple-500', change: '+1' },
  ];

  const quickReplies = [
    { icon: Smile, text: '¿Cómo mejorar mi energía?' },
    { icon: Droplet, text: 'Recordatorio de hidratación' },
    { icon: Moon, text: 'Tips para dormir mejor' },
    { icon: Zap, text: 'Ejercicio rápido' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newUserMessage = {
        id: chatMessages.length + 1,
        text: message,
        sender: 'user' as const,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newUserMessage]);
      setMessage('');

      // Simulate agent typing
      setIsTyping(true);
      setTimeout(() => {
        const agentResponse = {
          id: chatMessages.length + 2,
          text: 'Entiendo tu consulta. Te sugiero mantener una rutina constante y escuchar a tu cuerpo. ¿Hay algo específico en lo que pueda ayudarte?',
          sender: 'agent' as const,
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickReply = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Agente de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Bienestar</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg md:text-xl lg:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Tu asistente personal para un <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">estilo de vida saludable</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 md:px-4 py-2 border border-white/20">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
              <span className="text-xs md:text-sm font-semibold text-white">Chat IA Activo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 md:px-4 py-2 border border-white/20">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
              <span className="text-xs md:text-sm font-semibold text-white">Tracking 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 md:px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-300" />
              <span className="text-xs md:text-sm font-semibold text-white">Gamificado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>

              {/* Título */}
              <p className="text-xs md:text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}{stat.unit || ''}
              </p>

              {/* Progress circular */}
              {stat.max && (
                <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              )}

              {/* Cambio */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">esta semana</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interfaz de Chat con IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xl">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Chat con tu Asistente de Bienestar</h3>
              <p className="text-sm text-gray-600">Conversación en tiempo real</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 md:h-96 overflow-y-auto mb-4 space-y-4 px-2">
            {chatMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] md:max-w-[70%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                      : 'bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm md:text-base">{msg.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</p>
                </div>
                {msg.sender === 'agent' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply.text)}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 rounded-full border border-teal-200 transition-all duration-300 text-sm"
              >
                <reply.icon className="w-4 h-4 text-teal-600" />
                <span className="text-teal-700 font-medium">{reply.text}</span>
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Escribe tu mensaje aquí..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Enviar</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Componentes principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
        <div className="lg:col-span-2">
          <TableroHabitos />
        </div>
        <div>
          <SemaforoAdherencia />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <RetosGamificados />
        <PanelMotivacional />
      </div>

      <TendenciasEstiloVida />
    </div>
  );
};

export default AgenteBienestarPage;
