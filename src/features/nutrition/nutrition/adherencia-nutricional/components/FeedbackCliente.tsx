
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, User, Smile, Meh, Frown, Battery, Heart, Cookie, CheckCircle } from 'lucide-react';
import { getFeedbackEntries, submitFeedback, FeedbackEntry } from '../adherenciaNutricionalApi';

const FeedbackCliente: React.FC = () => {
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFeedback, setNewFeedback] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('😊');
  const [energyLevel, setEnergyLevel] = useState<number>(7);
  const [hungerLevel, setHungerLevel] = useState<number>(5);
  const [cravings, setCravings] = useState<string>('');

  const moods = ['😃', '😊', '😐', '😟', '😢'];

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      const data = await getFeedbackEntries();
      setFeedbackEntries(data);
      setLoading(false);
    };
    fetchFeedback();
  }, []);

  const handleSubmitFeedback = async () => {
    if (newFeedback.trim()) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        clientNote: newFeedback.trim(),
        mood: selectedMood,
        energyLevel,
        hungerLevel,
        cravings: cravings ? cravings.split(',').map(c => c.trim()) : [],
      };
      const createdEntry = await submitFeedback(entry);
      setFeedbackEntries((prev) => [createdEntry, ...prev]);
      setNewFeedback('');
      setSelectedMood('😊');
      setEnergyLevel(7);
      setHungerLevel(5);
      setCravings('');
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Nuevo Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            Registrar Feedback del Día
          </h3>
        </div>

        <div className="p-6">
          {/* Mood Selector */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">¿Cómo te sientes hoy?</label>
            <div className="flex gap-3 justify-center">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood)}
                  className={`text-4xl p-4 rounded-2xl transition-all duration-300 ${
                    selectedMood === mood
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Battery className="w-4 h-4 text-green-600" />
                Nivel de Energía
              </label>
              <span className="text-2xl font-bold text-purple-600">{energyLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600"
              style={{
                background: `linear-gradient(to right, #9333ea 0%, #9333ea ${energyLevel * 10}%, #e5e7eb ${energyLevel * 10}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Hunger Level */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-600" />
                Nivel de Hambre/Saciedad
              </label>
              <span className="text-2xl font-bold text-pink-600">{hungerLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={hungerLevel}
              onChange={(e) => setHungerLevel(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-pink-600"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${hungerLevel * 10}%, #e5e7eb ${hungerLevel * 10}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Cravings */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-orange-600" />
              Antojos Experimentados (separados por coma)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Ej: chocolate, pizza, helado"
              value={cravings}
              onChange={(e) => setCravings(e.target.value)}
            />
          </div>

          {/* Feedback Text */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Notas y Comentarios</label>
            <textarea
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              rows={4}
              placeholder="Comparte cómo te sientes, dificultades que enfrentaste, o cualquier comentario sobre tu día..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitFeedback}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Feedback
          </motion.button>
        </div>
      </motion.div>

      {/* Timeline de Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-purple-600" />
          Timeline de Feedback
        </h3>

        {feedbackEntries.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No hay entradas de feedback aún.</p>
            <p className="text-sm text-gray-400 mt-2">Comienza compartiendo cómo te sientes hoy.</p>
          </div>
        ) : (
          <div className="space-y-4 relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-transparent"></div>

            {feedbackEntries.map((entry, index) => {
              const date = new Date(entry.date);
              const dateStr = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="relative pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg border-4 border-white"></div>

                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{dateStr}</p>
                        {entry.mood && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-3xl">{entry.mood}</span>
                            {entry.energyLevel && (
                              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                                <Battery className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-green-700">{entry.energyLevel}/10</span>
                              </div>
                            )}
                            {entry.hungerLevel && (
                              <div className="flex items-center gap-1 px-3 py-1 bg-red-100 rounded-full">
                                <Heart className="w-4 h-4 text-red-600" />
                                <span className="text-xs font-bold text-red-700">{entry.hungerLevel}/10</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client Note */}
                    <div className="mb-3 p-4 bg-white rounded-xl border border-purple-100">
                      <div className="flex items-start gap-2 mb-2">
                        <User className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-purple-600 mb-1">Cliente</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{entry.clientNote}</p>
                        </div>
                      </div>

                      {/* Cravings */}
                      {entry.cravings && entry.cravings.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.cravings.map((craving, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full"
                            >
                              <Cookie className="w-3 h-3" />
                              {craving}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Trainer Response */}
                    {entry.trainerResponse && (
                      <div className="p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border border-teal-200">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-teal-600 mb-1">Respuesta del Nutricionista</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{entry.trainerResponse}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackCliente;
