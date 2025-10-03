import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, AlertCircle, User } from 'lucide-react';

interface AthleteConfirmation {
  id: string;
  name: string;
  status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso';
}

interface ListaConfirmacionesProps {
  confirmations: AthleteConfirmation[];
  onUpdateAvailability: (athleteId: string, status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso') => void;
}

const statusConfig: Record<AthleteConfirmation['status'], {
  label: string;
  badgeClass: string;
  icon: any;
  gradient: string;
}> = {
  confirmado: {
    label: 'Confirmado',
    badgeClass: 'bg-green-100 text-green-700 border-green-300',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-teal-600'
  },
  rechazado: {
    label: 'Rechazado',
    badgeClass: 'bg-red-100 text-red-700 border-red-300',
    icon: XCircle,
    gradient: 'from-red-500 to-pink-600'
  },
  pendiente: {
    label: 'Pendiente',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-300',
    icon: Clock,
    gradient: 'from-orange-500 to-yellow-600'
  },
  dudoso: {
    label: 'Dudoso',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: AlertCircle,
    gradient: 'from-blue-500 to-indigo-600'
  },
};

export const ListaConfirmaciones: React.FC<ListaConfirmacionesProps> = ({ confirmations, onUpdateAvailability }) => {
  // Generar un color para el avatar basado en el nombre
  const getAvatarColor = (name: string): string => {
    const colors = [
      'from-blue-400 to-indigo-600',
      'from-purple-400 to-pink-600',
      'from-green-400 to-emerald-600',
      'from-orange-400 to-red-600',
      'from-cyan-400 to-blue-600',
      'from-pink-400 to-rose-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        >
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          Confirmaciones de Atletas
        </motion.h2>

        {confirmations.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No hay confirmaciones para mostrar.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {confirmations.map((athlete, index) => {
              const config = statusConfig[athlete.status];
              const StatusIcon = config.icon;
              const initials = athlete.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

              return (
                <motion.div
                  key={athlete.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarColor(athlete.name)} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-sm">{initials}</span>
                  </div>

                  {/* Información del atleta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 mb-1 truncate">
                      {athlete.name}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.badgeClass} font-semibold text-xs`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </div>
                  </div>

                  {/* Selector de estado */}
                  <div className="flex-shrink-0">
                    <select
                      value={athlete.status}
                      onChange={(e) => onUpdateAvailability(athlete.id, e.target.value as AthleteConfirmation['status'])}
                      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium text-sm text-gray-700 hover:border-indigo-300 cursor-pointer"
                    >
                      <option value="confirmado">✓ Confirmado</option>
                      <option value="rechazado">✗ Rechazado</option>
                      <option value="pendiente">⏳ Pendiente</option>
                      <option value="dudoso">❓ Dudoso</option>
                    </select>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
