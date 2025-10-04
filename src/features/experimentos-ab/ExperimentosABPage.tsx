import React, { useState } from 'react';
import {
  FlaskConical, Plus, TrendingUp, Play, Pause, CheckCircle2,
  FileText, Filter, Search, BarChart3, Target, Zap
} from 'lucide-react';
import { useExperiments } from './hooks/useExperiments';
import { ExperimentCard } from './components/ExperimentCard';
import { ExperimentDetails } from './components/ExperimentDetails';
import { CreateExperimentModal } from './components/CreateExperimentModal';
import { ExperimentStatus } from './types';

export function ExperimentosABPage() {
  const {
    experiments,
    stats,
    filter,
    setFilter,
    createExperiment,
    startExperiment,
    pauseExperiment,
    stopExperiment,
    declareWinner,
  } = useExperiments();

  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedExperiment = experiments.find(e => e.id === selectedExperimentId);

  const filteredBySearch = experiments.filter(exp =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedExperiment) {
    return (
      <ExperimentDetails
        experiment={selectedExperiment}
        onClose={() => setSelectedExperimentId(null)}
        onStart={() => startExperiment(selectedExperiment.id)}
        onPause={() => pauseExperiment(selectedExperiment.id)}
        onStop={() => stopExperiment(selectedExperiment.id)}
        onDeclareWinner={declareWinner}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Experimentos A/B</h1>
                <p className="text-red-100 mt-1">
                  Optimiza y mejora tu conversión con tests controlados
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Nuevo Experimento
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-100 text-sm">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/30 rounded-lg">
                  <Play className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-100 text-sm">En Ejecución</p>
                  <p className="text-2xl font-bold">{stats.running}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-100 text-sm">Completados</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/30 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-red-100 text-sm">Borradores</p>
                  <p className="text-2xl font-bold">{stats.draft}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar experimentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('running')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'running'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              En Ejecución
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completados
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'draft'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Borradores
            </button>
          </div>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {filteredBySearch.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay experimentos
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? 'No se encontraron experimentos con ese criterio'
                : 'Comienza creando tu primer experimento A/B'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Crear Experimento
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBySearch.map((experiment) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                onClick={() => setSelectedExperimentId(experiment.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateExperimentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(exp) => {
            createExperiment(exp);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}
