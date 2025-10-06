import React from 'react';
import {
  Play, Pause, CheckCircle2, FileText, TrendingUp, Users,
  Calendar, Target, Award
} from 'lucide-react';
import { ABExperiment } from '../types';

interface ExperimentCardProps {
  experiment: ABExperiment;
  onClick: () => void;
}

export function ExperimentCard({ experiment, onClick }: ExperimentCardProps) {
  const statusConfig = {
    draft: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      icon: FileText,
      label: 'Borrador',
    },
    running: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: Play,
      label: 'En Ejecución',
    },
    paused: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: Pause,
      label: 'Pausado',
    },
    completed: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: CheckCircle2,
      label: 'Completado',
    },
    archived: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      icon: FileText,
      label: 'Archivado',
    },
  };

  const config = statusConfig[experiment.status];
  const StatusIcon = config.icon;

  const primaryMetric = experiment.metrics.find(m => m.isPrimary);
  const winnerVariant = experiment.winner
    ? experiment.variants.find(v => v.id === experiment.winner?.variantId)
    : null;

  const progress = (experiment.duration.currentSampleSize / experiment.duration.minSampleSize) * 100;
  const isComplete = progress >= 100;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden group"
    >
      {/* Header with Status */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
            <StatusIcon className={`w-4 h-4 ${config.text}`} />
            <span className={`text-sm font-medium ${config.text}`}>
              {config.label}
            </span>
          </div>

          {experiment.priority === 'high' && (
            <div className="px-2 py-1 bg-red-100 text-red-700 rounded-full">
              <span className="text-xs font-semibold">Alta Prioridad</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {experiment.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {experiment.description}
        </p>
      </div>

      {/* Metrics */}
      {primaryMetric && experiment.status !== 'draft' && (
        <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-orange-50 border-t border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">{primaryMetric.name}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {primaryMetric.current.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">{primaryMetric.unit}</span>
              </div>
            </div>
            {primaryMetric.current > primaryMetric.goal && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  +{((primaryMetric.current / primaryMetric.goal - 1) * 100).toFixed(0)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Winner Badge */}
      {winnerVariant && (
        <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-900">
              Ganador: {winnerVariant.name}
            </span>
            <span className="text-xs text-green-700">
              ({experiment.winner.confidence.toFixed(1)}% confianza)
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {experiment.status === 'running' && (
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Progreso del Test</span>
            <span className="text-xs font-semibold text-gray-900">
              {Math.min(progress, 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isComplete
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {experiment.duration.currentSampleSize.toLocaleString()} de{' '}
              {experiment.duration.minSampleSize.toLocaleString()} usuarios
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-6 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Variantes</p>
              <p className="text-sm font-semibold text-gray-900">
                {experiment.variants.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Métricas</p>
              <p className="text-sm font-semibold text-gray-900">
                {experiment.metrics.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>
            {new Date(experiment.duration.startDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
            })}
            {' - '}
            {new Date(experiment.duration.endDate).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>

        {/* Tags */}
        {experiment.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {experiment.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {experiment.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{experiment.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400 rounded-xl pointer-events-none transition-colors" />
    </div>
  );
}
