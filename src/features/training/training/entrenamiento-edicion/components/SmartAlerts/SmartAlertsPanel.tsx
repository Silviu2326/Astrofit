import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingDown, Calendar, Target, Activity, Bell, X, CheckCircle2 } from 'lucide-react';
import { TrainingDay, ExerciseConfig } from '../../types/training.types';

interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  category: 'inactivity' | 'volume' | 'progression' | 'deload' | 'injury' | 'milestone';
  title: string;
  message: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  icon: React.ReactNode;
}

interface SmartAlertsPanelProps {
  trainingDays: TrainingDay[];
  clientName: string;
  lastSessionDate?: string;
}

const SmartAlertsPanel: React.FC<SmartAlertsPanelProps> = ({
  trainingDays,
  clientName,
  lastSessionDate = '2024-01-20'
}) => {
  const [dismissedAlerts, setDismissedAlerts] = React.useState<string[]>([]);

  // Generar alertas inteligentes basadas en los datos
  const alerts = useMemo((): Alert[] => {
    const generatedAlerts: Alert[] = [];

    // 1. ALERTA DE INACTIVIDAD
    const daysSinceLastSession = Math.floor(
      (new Date().getTime() - new Date(lastSessionDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastSession >= 5) {
      generatedAlerts.push({
        id: 'inactivity-1',
        type: 'danger',
        category: 'inactivity',
        title: '🚨 Cliente Inactivo',
        message: `${clientName} lleva ${daysSinceLastSession} días sin entrenar. Contacta para verificar su estado.`,
        action: 'Enviar mensaje al cliente',
        priority: 'high',
        timestamp: 'Hace 2 horas',
        icon: <Calendar className="w-5 h-5" />
      });
    } else if (daysSinceLastSession >= 3) {
      generatedAlerts.push({
        id: 'inactivity-2',
        type: 'warning',
        category: 'inactivity',
        title: '⚠️ Posible Inactividad',
        message: `${daysSinceLastSession} días sin sesión. Considera enviar recordatorio motivacional.`,
        action: 'Ver calendario',
        priority: 'medium',
        timestamp: 'Hace 1 hora',
        icon: <Calendar className="w-5 h-5" />
      });
    }

    // 2. ANÁLISIS DE VOLUMEN POR GRUPO MUSCULAR
    const muscleVolume: Record<string, { sets: number; exercises: number }> = {};

    trainingDays.forEach(day => {
      day.exercises.forEach((ex: ExerciseConfig) => {
        // Simplificación: mapear ejercicios a grupos musculares
        const muscle = ex.exerciseId.includes('e1') || ex.exerciseId.includes('e12') ? 'Piernas' :
                       ex.exerciseId.includes('e2') || ex.exerciseId.includes('e7') || ex.exerciseId.includes('e11') ? 'Pecho' :
                       ex.exerciseId.includes('e3') || ex.exerciseId.includes('e5') || ex.exerciseId.includes('e6') ? 'Espalda' :
                       ex.exerciseId.includes('e4') || ex.exerciseId.includes('e10') ? 'Hombros' :
                       ex.exerciseId.includes('e8') || ex.exerciseId.includes('e9') ? 'Brazos' : 'Otros';

        if (!muscleVolume[muscle]) {
          muscleVolume[muscle] = { sets: 0, exercises: 0 };
        }
        muscleVolume[muscle].sets += ex.sets;
        muscleVolume[muscle].exercises += 1;
      });
    });

    // Alertas de volumen (rangos óptimos basados en ciencia)
    const volumeStandards: Record<string, { min: number; max: number }> = {
      'Pecho': { min: 10, max: 22 },
      'Espalda': { min: 12, max: 25 },
      'Piernas': { min: 15, max: 30 },
      'Hombros': { min: 8, max: 20 },
      'Brazos': { min: 6, max: 18 }
    };

    Object.entries(muscleVolume).forEach(([muscle, data]) => {
      const standard = volumeStandards[muscle];
      if (standard) {
        if (data.sets < standard.min) {
          generatedAlerts.push({
            id: `volume-low-${muscle}`,
            type: 'warning',
            category: 'volume',
            title: `📉 Volumen Bajo: ${muscle}`,
            message: `Solo ${data.sets} series/semana (óptimo: ${standard.min}-${standard.max}). Considera añadir ${standard.min - data.sets} series.`,
            action: 'Añadir ejercicios',
            priority: 'medium',
            timestamp: 'Análisis actual',
            icon: <TrendingDown className="w-5 h-5" />
          });
        } else if (data.sets > standard.max) {
          generatedAlerts.push({
            id: `volume-high-${muscle}`,
            type: 'danger',
            category: 'volume',
            title: `⚠️ Volumen Excesivo: ${muscle}`,
            message: `${data.sets} series/semana supera el rango óptimo (${standard.min}-${standard.max}). Riesgo de sobreentrenamiento.`,
            action: 'Reducir volumen',
            priority: 'high',
            timestamp: 'Análisis actual',
            icon: <AlertTriangle className="w-5 h-5" />
          });
        }
      }
    });

    // 3. ESTANCAMIENTO EN PROGRESIÓN (simulado con datos mock)
    const stagnantExercises = [
      { name: 'Press Banca', weeks: 3, lastWeight: 80 },
      { name: 'Sentadilla', weeks: 2, lastWeight: 100 }
    ];

    stagnantExercises.forEach(ex => {
      if (ex.weeks >= 3) {
        generatedAlerts.push({
          id: `stagnant-${ex.name}`,
          type: 'warning',
          category: 'progression',
          title: `🔄 Estancamiento Detectado`,
          message: `${ex.name} sin progreso por ${ex.weeks} semanas (${ex.lastWeight}kg). Considera cambio de estrategia.`,
          action: 'Ajustar progresión',
          priority: 'medium',
          timestamp: 'Hace 3 días',
          icon: <Activity className="w-5 h-5" />
        });
      }
    });

    // 4. RECOMENDACIÓN DE DELOAD
    const totalSets = trainingDays.reduce((acc, day) =>
      acc + day.exercises.reduce((sum, ex) => sum + ex.sets, 0), 0
    );

    const avgRPE = trainingDays.reduce((acc, day) => {
      const dayRPE = day.exercises.filter(ex => ex.rpe).reduce((sum, ex) => sum + (ex.rpe || 0), 0);
      return acc + dayRPE / day.exercises.length;
    }, 0) / trainingDays.length;

    // Simulación: semana 4 de un mesociclo
    const currentWeek = 4;
    if (currentWeek % 4 === 0 && avgRPE > 8) {
      generatedAlerts.push({
        id: 'deload-recommendation',
        type: 'info',
        category: 'deload',
        title: '💆 Deload Recomendado',
        message: `Semana ${currentWeek} con RPE promedio ${avgRPE.toFixed(1)}. Programa deload (50% volumen) para óptima recuperación.`,
        action: 'Programar deload',
        priority: 'medium',
        timestamp: 'Planificación',
        icon: <Target className="w-5 h-5" />
      });
    }

    // 5. LOGROS Y MILESTONES (positivos)
    generatedAlerts.push({
      id: 'milestone-1',
      type: 'success',
      category: 'milestone',
      title: '🎉 ¡Nuevo PR!',
      message: `${clientName} alcanzó nuevo récord en Peso Muerto: 140kg (+5kg). ¡Felicítalo!`,
      action: 'Enviar felicitación',
      priority: 'low',
      timestamp: 'Hace 1 día',
      icon: <CheckCircle2 className="w-5 h-5" />
    });

    return generatedAlerts.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [trainingDays, clientName, lastSessionDate]);

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'danger':
        return {
          bg: 'from-red-500/20 to-red-600/10',
          border: 'border-red-500/40',
          icon: 'text-red-400',
          badge: 'bg-red-500/30 text-red-300'
        };
      case 'warning':
        return {
          bg: 'from-yellow-500/20 to-yellow-600/10',
          border: 'border-yellow-500/40',
          icon: 'text-yellow-400',
          badge: 'bg-yellow-500/30 text-yellow-300'
        };
      case 'info':
        return {
          bg: 'from-blue-500/20 to-blue-600/10',
          border: 'border-blue-500/40',
          icon: 'text-blue-400',
          badge: 'bg-blue-500/30 text-blue-300'
        };
      case 'success':
        return {
          bg: 'from-green-500/20 to-green-600/10',
          border: 'border-green-500/40',
          icon: 'text-green-400',
          badge: 'bg-green-500/30 text-green-300'
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/10',
          border: 'border-gray-500/40',
          icon: 'text-gray-400',
          badge: 'bg-gray-500/30 text-gray-300'
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          Alertas Inteligentes
          {activeAlerts.length > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {activeAlerts.length}
            </span>
          )}
        </h3>
      </div>

      {activeAlerts.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <p className="text-gray-400">Todo en orden. No hay alertas activas.</p>
        </div>
      ) : (
        <AnimatePresence>
          {activeAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-gradient-to-r ${styles.bg} border ${styles.border} rounded-xl p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-black/20 rounded-lg ${styles.icon}`}>
                    {alert.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-white text-sm">{alert.title}</h4>
                      <button
                        onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
                        className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-300 mb-2">{alert.message}</p>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 ${styles.badge} rounded-full text-xs font-semibold uppercase`}>
                          {alert.category}
                        </span>

                        {alert.action && (
                          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors">
                            {alert.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}

      {/* Estadísticas de alertas */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[
          { type: 'danger', count: alerts.filter(a => a.type === 'danger').length, label: 'Críticas' },
          { type: 'warning', count: alerts.filter(a => a.type === 'warning').length, label: 'Advertencias' },
          { type: 'info', count: alerts.filter(a => a.type === 'info').length, label: 'Info' },
          { type: 'success', count: alerts.filter(a => a.type === 'success').length, label: 'Logros' },
        ].map((stat) => {
          const styles = getAlertStyles(stat.type as Alert['type']);
          return (
            <div key={stat.type} className={`bg-gradient-to-br ${styles.bg} border ${styles.border} rounded-lg p-3 text-center`}>
              <div className={`text-2xl font-bold ${styles.icon}`}>{stat.count}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartAlertsPanel;
