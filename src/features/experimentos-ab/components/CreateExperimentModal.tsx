import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Users, Target } from 'lucide-react';
import { ABExperiment, ABVariant, ABMetric } from '../types';

interface CreateExperimentModalProps {
  onClose: () => void;
  onCreate: (experiment: Omit<ABExperiment, 'id' | 'createdAt'>) => void;
}

export function CreateExperimentModal({ onClose, onCreate }: CreateExperimentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[],
    startDate: '',
    endDate: '',
    minSampleSize: 1000,
    targetPercentage: 100,
    segment: 'Todos los usuarios',
  });

  const [variants, setVariants] = useState<Partial<ABVariant>[]>([
    {
      name: 'Control',
      type: 'control',
      description: 'Versión original',
      trafficPercentage: 50,
      config: {},
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        engagementTime: 0,
      },
      stats: {
        conversionRate: 0,
        ctr: 0,
        averageRevenue: 0,
        confidenceLevel: 0,
      },
    },
    {
      name: 'Variante A',
      type: 'variant',
      description: 'Nueva versión',
      trafficPercentage: 50,
      config: {},
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        engagementTime: 0,
      },
      stats: {
        conversionRate: 0,
        ctr: 0,
        averageRevenue: 0,
        confidenceLevel: 0,
      },
    },
  ]);

  const [metrics, setMetrics] = useState<Partial<ABMetric>[]>([
    {
      name: 'Tasa de Conversión',
      type: 'conversion',
      description: 'Porcentaje de usuarios que convierten',
      goal: 10,
      current: 0,
      unit: '%',
      isPrimary: true,
    },
  ]);

  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const addVariant = () => {
    const newVariant: Partial<ABVariant> = {
      name: `Variante ${String.fromCharCode(65 + variants.length - 1)}`,
      type: 'variant',
      description: 'Nueva variante',
      trafficPercentage: 0,
      config: {},
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        engagementTime: 0,
      },
      stats: {
        conversionRate: 0,
        ctr: 0,
        averageRevenue: 0,
        confidenceLevel: 0,
      },
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 2) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const addMetric = () => {
    const newMetric: Partial<ABMetric> = {
      name: 'Nueva Métrica',
      type: 'custom',
      description: '',
      goal: 0,
      current: 0,
      unit: '',
      isPrimary: false,
    };
    setMetrics([...metrics, newMetric]);
  };

  const handleSubmit = () => {
    const experiment: Omit<ABExperiment, 'id' | 'createdAt'> = {
      name: formData.name,
      description: formData.description,
      status: 'draft',
      targetAudience: {
        segment: formData.segment,
        percentage: formData.targetPercentage,
        filters: {},
      },
      duration: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        minSampleSize: formData.minSampleSize,
        currentSampleSize: 0,
      },
      variants: variants.map((v, i) => ({
        ...v,
        id: `var-${Date.now()}-${i}`,
      })) as ABVariant[],
      metrics: metrics.map((m, i) => ({
        ...m,
        id: `metric-${Date.now()}-${i}`,
      })) as ABMetric[],
      tags: formData.tags,
      category: formData.category,
      priority: formData.priority,
    };

    onCreate(experiment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Crear Nuevo Experimento A/B</h2>
              <p className="text-red-100 mt-1">Paso {step} de 3</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Experimento *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ej: Landing Page - Nuevo CTA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe el objetivo del experimento..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Optimización de Conversión">Optimización de Conversión</option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Optimización de Precios">Optimización de Precios</option>
                    <option value="User Experience">User Experience</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Agregar tag..."
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha de Fin *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Tamaño Mínimo de Muestra
                </label>
                <input
                  type="number"
                  value={formData.minSampleSize}
                  onChange={(e) => setFormData({ ...formData, minSampleSize: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Configurar Variantes</h3>
                <button
                  onClick={addVariant}
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Variante
                </button>
              </div>

              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => {
                          const newVariants = [...variants];
                          newVariants[index] = { ...variant, name: e.target.value };
                          setVariants(newVariants);
                        }}
                        className="font-semibold text-gray-900 bg-transparent border-none focus:outline-none"
                      />
                      {variant.type !== 'control' && variants.length > 2 && (
                        <button
                          onClick={() => removeVariant(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={variant.description}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index] = { ...variant, description: e.target.value };
                        setVariants(newVariants);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                      placeholder="Descripción..."
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        % de Tráfico
                      </label>
                      <input
                        type="number"
                        value={variant.trafficPercentage}
                        onChange={(e) => {
                          const newVariants = [...variants];
                          newVariants[index] = {
                            ...variant,
                            trafficPercentage: parseInt(e.target.value) || 0
                          };
                          setVariants(newVariants);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Total:</strong>{' '}
                  {variants.reduce((sum, v) => sum + (v.trafficPercentage || 0), 0)}% del tráfico
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  Métricas de Éxito
                </h3>
                <button
                  onClick={addMetric}
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Métrica
                </button>
              </div>

              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={metric.name}
                          onChange={(e) => {
                            const newMetrics = [...metrics];
                            newMetrics[index] = { ...metric, name: e.target.value };
                            setMetrics(newMetrics);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo
                        </label>
                        <select
                          value={metric.type}
                          onChange={(e) => {
                            const newMetrics = [...metrics];
                            newMetrics[index] = { ...metric, type: e.target.value as any };
                            setMetrics(newMetrics);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="conversion">Conversión</option>
                          <option value="ctr">CTR</option>
                          <option value="revenue">Ingresos</option>
                          <option value="engagement">Engagement</option>
                          <option value="custom">Personalizado</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción
                        </label>
                        <input
                          type="text"
                          value={metric.description}
                          onChange={(e) => {
                            const newMetrics = [...metrics];
                            newMetrics[index] = { ...metric, description: e.target.value };
                            setMetrics(newMetrics);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta
                        </label>
                        <input
                          type="number"
                          value={metric.goal}
                          onChange={(e) => {
                            const newMetrics = [...metrics];
                            newMetrics[index] = { ...metric, goal: parseFloat(e.target.value) || 0 };
                            setMetrics(newMetrics);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Unidad
                        </label>
                        <input
                          type="text"
                          value={metric.unit}
                          onChange={(e) => {
                            const newMetrics = [...metrics];
                            newMetrics[index] = { ...metric, unit: e.target.value };
                            setMetrics(newMetrics);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="%, $, seg, etc."
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={metric.isPrimary}
                            onChange={(e) => {
                              const newMetrics = [...metrics];
                              newMetrics[index] = { ...metric, isPrimary: e.target.checked };
                              setMetrics(newMetrics);
                            }}
                            className="w-4 h-4 text-orange-600 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Métrica Principal
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                Anterior
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Crear Experimento
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
