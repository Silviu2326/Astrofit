import React, { useState } from 'react';
import {
  Rocket,
  PlayCircle,
  StopCircle,
  RefreshCw,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Recommendation } from '../types/testResults';

interface ImplementationRecommendationsProps {
  recommendations: Recommendation[];
}

export function ImplementationRecommendations({ recommendations }: ImplementationRecommendationsProps) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([0]));

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIds(newExpanded);
  };

  const getTypeConfig = (type: Recommendation['type']) => {
    switch (type) {
      case 'implement':
        return {
          icon: Rocket,
          label: 'Implementar',
          gradient: 'from-green-500 to-emerald-500',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700'
        };
      case 'continue':
        return {
          icon: PlayCircle,
          label: 'Continuar',
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700'
        };
      case 'stop':
        return {
          icon: StopCircle,
          label: 'Detener',
          gradient: 'from-red-500 to-rose-500',
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700'
        };
      case 'iterate':
        return {
          icon: RefreshCw,
          label: 'Iterar',
          gradient: 'from-purple-500 to-pink-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-700'
        };
    }
  };

  const getPriorityConfig = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return {
          label: 'Alta',
          color: 'bg-red-100 text-red-700 border-red-200'
        };
      case 'medium':
        return {
          label: 'Media',
          color: 'bg-amber-100 text-amber-700 border-amber-200'
        };
      case 'low':
        return {
          label: 'Baja',
          color: 'bg-gray-100 text-gray-700 border-gray-200'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Recomendaciones de Implementación
            </h3>
            <p className="text-sm text-gray-600">
              {recommendations.length} acciones recomendadas basadas en los resultados
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="divide-y divide-gray-100">
        {recommendations.map((recommendation, index) => {
          const typeConfig = getTypeConfig(recommendation.type);
          const priorityConfig = getPriorityConfig(recommendation.priority);
          const Icon = typeConfig.icon;
          const isExpanded = expandedIds.has(index);

          return (
            <div key={index} className="p-6">
              {/* Recommendation Header */}
              <div
                className="cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl bg-gradient-to-br ${typeConfig.gradient}
                    flex items-center justify-center flex-shrink-0
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="text-base font-bold text-gray-900">
                        {recommendation.title}
                      </h4>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`
                          px-2 py-1 rounded-md text-xs font-semibold border
                          ${priorityConfig.color}
                        `}>
                          {priorityConfig.label}
                        </span>

                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {recommendation.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex items-center gap-4">
                      <div className={`
                        px-3 py-1.5 rounded-lg ${typeConfig.bg} border ${typeConfig.border}
                        flex items-center gap-2
                      `}>
                        <span className={`text-xs font-medium ${typeConfig.text}`}>
                          {typeConfig.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Impacto: <span className="font-semibold text-gray-900">
                              {recommendation.impact}/10
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Esfuerzo: <span className="font-semibold text-gray-900">
                              {recommendation.effort}/10
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Impact/Effort Bars */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Impacto</span>
                          <span>{recommendation.impact}/10</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                            style={{ width: `${recommendation.impact * 10}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Esfuerzo</span>
                          <span>{recommendation.effort}/10</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                            style={{ width: `${recommendation.effort * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4 ml-16 space-y-4">
                  {/* Actions Checklist */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-3">
                      Plan de Acción
                    </h5>
                    <div className="space-y-2">
                      {recommendation.actions.map((action, actionIndex) => (
                        <div
                          key={actionIndex}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-green-500 transition-colors">
                            <CheckCircle2 className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors" />
                          </div>
                          <p className="text-sm text-gray-700 flex-1">
                            {action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ROI Estimate */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          ROI Estimado
                        </p>
                        <p className="text-xs text-gray-600">
                          Basado en impacto vs. esfuerzo
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {((recommendation.impact / recommendation.effort) * 100).toFixed(0)}%
                        </div>
                        <p className="text-xs text-gray-600">
                          Retorno esperado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {recommendations.filter(r => r.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Alta Prioridad
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">
              {recommendations.filter(r => r.priority === 'medium').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Media Prioridad
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {recommendations.filter(r => r.priority === 'low').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Baja Prioridad
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
