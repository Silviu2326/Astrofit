import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { reserveSession } from '../calendarioPublicoApi';

interface BotonReservarProps {
  slotId: string;
}

const BotonReservar: React.FC<BotonReservarProps> = ({ slotId }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleReserve = async () => {
    setLoading(true);
    setStatus('idle');

    try {
      const success = await reserveSession(slotId);

      if (success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white shadow-lg"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-bold">¡Reservada!</span>
      </motion.div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white shadow-lg"
      >
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm font-bold">Error</span>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleReserve}
      disabled={loading}
      className="relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 px-4 py-2 text-white font-bold text-sm border border-white/20 group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Efecto hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      {/* Decoración */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>

      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reservando...</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Reservar</span>
          </>
        )}
      </div>
    </motion.button>
  );
};

export default BotonReservar;
