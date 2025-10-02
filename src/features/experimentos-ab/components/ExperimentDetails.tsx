import React, { useState } from 'react';
import {
  ArrowLeft, Play, Pause, StopCircle, Award, Calendar,
  Users, Target, Settings, BarChart3, Eye, Edit, Trash2,
  Download, Share2, Copy, CheckCircle
} from 'lucide-react';
import { ABExperiment } from '../types';
import { MetricsPanel } from './MetricsPanel';
import { VariantBuilder } from './VariantBuilder';
import { ResultsChart } from './ResultsChart';

interface ExperimentDetailsProps {
  experiment: ABExperiment;
  onClose: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onDeclareWinner: (experimentId: string, variantId: string, confidence: number, uplift: number) => void;
}

type TabType = 'overview' | 'variants' | 'metrics' | 'results' | 'settings';

export function ExperimentDetails({
  experiment,
  onClose,
  onStart,
  onPause,
  onStop,
  onDeclareWinner,
}: ExperimentDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const selectedVariant = experiment.variants.find(v => v.id === selectedVariantId);

  const handleDeclareWinner = (variantId: string) => {
    const variant = experiment.variants.find(v => v.id === variantId);
    if (!variant) return;

    const control = experiment.variants.find(v => v.type === 'control');
    if (!control) return;

    const uplift = ((variant.stats.conversionRate - control.stats.conversionRate) / control.stats.conversionRate) * 100;
    onDeclareWinner(experiment.id, variantId, variant.stats.confidenceLevel, uplift);
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Eye },
    { id: 'variants', label: 'Variantes', icon: Copy },
    { id: 'metrics', label: 'Métricas', icon: BarChart3 },
    { id: 'results', label: 'Resultados', icon: Target },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-red-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>

            <div className="flex items-center gap-3">
              {experiment.status === 'draft' && (
                <button
                  onClick={onStart}
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Iniciar Experimento
                </button>
              )}

              {experiment.status === 'running' && (
                <>
                  <button
                    onClick={onPause}
                    className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                  >
                    <Pause className="w-4 h-4" />
                    Pausar
                  </button>
                  <button
                    onClick={onStop}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                  >
                    <StopCircle className="w-4 h-4" />
                    Detener
                  </button>
                </>
              )}

              {experiment.status === 'paused' && (
                <button
                  onClick={onStart}
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Reanudar
                </button>
              )}

              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{experiment.name}</h1>
              <p className="text-red-100 mb-4">{experiment.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(experiment.duration.startDate).toLocaleDateString('es-ES')} -{' '}
                    {new Date(experiment.duration.endDate).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {experiment.duration.currentSampleSize.toLocaleString()} /{' '}
                    {experiment.duration.minSampleSize.toLocaleString()} usuarios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  <span>{experiment.variants.length} variantes</span>
                </div>
              </div>
            </div>

            {experiment.winner && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="font-bold">Ganador Declarado</span>
                </div>
                <p className="text-sm text-green-100">
                  {experiment.variants.find(v => v.id === experiment.winner?.variantId)?.name}
                </p>
                <p className="text-xs text-green-200 mt-1">
                  {experiment.winner.confidence.toFixed(1)}% confianza • +{experiment.winner.uplift.toFixed(1)}% mejora
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 border-b border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-white border-b-2 border-white'
                      : 'text-red-200 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              {experiment.metrics.slice(0, 4).map((metric) => (
                <div key={metric.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">{metric.name}</p>
                    {metric.isPrimary && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
                        Principal
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {metric.current.toFixed(1)}
                    </span>
                    <span className="text-gray-500">{metric.unit}</span>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        metric.current >= metric.goal
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gradient-to-r from-red-500 to-orange-500'
                      }`}
                      style={{ width: `${Math.min((metric.current / metric.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Panel */}
            <MetricsPanel experiment={experiment} realtime={experiment.status === 'running'} />
          </div>
        )}

        {activeTab === 'variants' && (
          <div className="space-y-6">
            {selectedVariant ? (
              <div>
                <button
                  onClick={() => setSelectedVariantId(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a variantes
                </button>
                <VariantBuilder
                  variant={selectedVariant}
                  onChange={(updated) => {
                    // Handle update
                  }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {experiment.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-orange-400 transition-all cursor-pointer"
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{variant.name}</h3>
                      {variant.type === 'control' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          Control
                        </span>
                      )}
                      {variant.stats.isWinner && (
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                          🏆 Ganador
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{variant.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600">Conversión</p>
                        <p className="text-lg font-bold text-gray-900">
                          {variant.stats.conversionRate.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">CTR</p>
                        <p className="text-lg font-bold text-gray-900">
                          {variant.stats.ctr.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {!variant.stats.isWinner && variant.type !== 'control' && experiment.status === 'running' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeclareWinner(variant.id);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        <Award className="w-4 h-4" />
                        Declarar Ganador
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'metrics' && (
          <MetricsPanel experiment={experiment} realtime={experiment.status === 'running'} />
        )}

        {activeTab === 'results' && (
          <ResultsChart experiment={experiment} />
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Configuración del Experimento</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Experimento
                </label>
                <input
                  type="text"
                  value={experiment.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={experiment.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={experiment.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <select
                    value={experiment.priority}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    disabled
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
                  <Trash2 className="w-4 h-4" />
                  Eliminar Experimento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
