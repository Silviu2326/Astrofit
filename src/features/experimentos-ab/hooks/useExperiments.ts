import { useState, useEffect } from 'react';
import { ABExperiment, ExperimentStatus } from '../types';
import { mockExperiments } from '../data/mockExperiments';

export function useExperiments() {
  const [experiments, setExperiments] = useState<ABExperiment[]>(mockExperiments);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<ExperimentStatus | 'all'>('all');

  const filteredExperiments = experiments.filter(exp =>
    filter === 'all' || exp.status === filter
  );

  const createExperiment = (experiment: Omit<ABExperiment, 'id' | 'createdAt'>) => {
    const newExperiment: ABExperiment = {
      ...experiment,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setExperiments([newExperiment, ...experiments]);
    return newExperiment;
  };

  const updateExperiment = (id: string, updates: Partial<ABExperiment>) => {
    setExperiments(experiments.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const deleteExperiment = (id: string) => {
    setExperiments(experiments.filter(exp => exp.id !== id));
  };

  const startExperiment = (id: string) => {
    updateExperiment(id, {
      status: 'running',
      startedAt: new Date().toISOString(),
    });
  };

  const pauseExperiment = (id: string) => {
    updateExperiment(id, { status: 'paused' });
  };

  const stopExperiment = (id: string) => {
    updateExperiment(id, {
      status: 'completed',
      endedAt: new Date().toISOString(),
    });
  };

  const declareWinner = (experimentId: string, variantId: string, confidence: number, uplift: number) => {
    const experiment = experiments.find(exp => exp.id === experimentId);
    if (!experiment) return;

    // Marcar el ganador en las variantes
    const updatedVariants = experiment.variants.map(v => ({
      ...v,
      stats: {
        ...v.stats,
        isWinner: v.id === variantId,
      },
    }));

    updateExperiment(experimentId, {
      variants: updatedVariants,
      winner: {
        variantId,
        confidence,
        uplift,
        declaredAt: new Date().toISOString(),
      },
    });
  };

  const stats = {
    total: experiments.length,
    running: experiments.filter(e => e.status === 'running').length,
    completed: experiments.filter(e => e.status === 'completed').length,
    draft: experiments.filter(e => e.status === 'draft').length,
  };

  return {
    experiments: filteredExperiments,
    allExperiments: experiments,
    loading,
    filter,
    setFilter,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    startExperiment,
    pauseExperiment,
    stopExperiment,
    declareWinner,
    stats,
  };
}
