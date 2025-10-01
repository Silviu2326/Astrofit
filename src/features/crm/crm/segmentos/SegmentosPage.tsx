import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, Plus, Sparkles } from 'lucide-react';
import SegmentosList from './components/SegmentosList';
import SegmentoBuilder from './components/SegmentoBuilder';
import SegmentoPreview from './components/SegmentoPreview';
import SegmentoActions from './components/SegmentoActions';

export interface Segment {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  lastUpdated: string;
  rules: any[];
}

const mockSegments: Segment[] = [
  {
    id: '1',
    name: 'Clientes online sin reservas (30 días)',
    description: 'Clientes que han interactuado online pero no han hecho reservas en los últimos 30 días.',
    memberCount: 120,
    lastUpdated: '2025-09-26',
    rules: [],
  },
  {
    id: '2',
    name: 'Interesados en fuerza (PAR-Q incompleto)',
    description: 'Personas interesadas en entrenamiento de fuerza que no han completado el cuestionario PAR-Q.',
    memberCount: 45,
    lastUpdated: '2025-09-25',
    rules: [],
  },
  {
    id: '3',
    name: 'Clientes Premium (Cumpleaños este mes)',
    description: 'Clientes con membresía premium que cumplen años en el mes actual.',
    memberCount: 30,
    lastUpdated: '2025-09-27',
    rules: [],
  },
];

const SegmentosPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [segmentPreviewCount, setSegmentPreviewCount] = useState<number>(0);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSaveSegment = (segment: Segment) => {
    console.log('Saving segment:', segment);
    alert(`Segmento "${segment.name}" guardado.`);
    setIsCreatingNew(false);
    setSelectedSegment(null);
  };

  const handleRunPreview = (rules: any[]) => {
    const count = Math.floor(Math.random() * 200) + 10;
    setSegmentPreviewCount(count);
  };

  const handleNewSegment = () => {
    setSelectedSegment(null);
    setIsCreatingNew(true);
    setSegmentPreviewCount(0);
  };

  const totalMembers = mockSegments.reduce((sum, seg) => sum + seg.memberCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Segmentos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Clientes</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl">
                  Crea audiencias específicas con <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">reglas dinámicas</span>
                </p>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewSegment}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Segmento</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-indigo-50 rounded-lg">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Total Segmentos</p>
            <p className="text-3xl font-bold text-indigo-600">{mockSegments.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Total Miembros</p>
            <p className="text-3xl font-bold text-purple-600">{totalMembers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-3">Promedio por Segmento</p>
            <p className="text-3xl font-bold text-green-600">{Math.round(totalMembers / mockSegments.length)}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Segmentos */}
          <div className="lg:col-span-1">
            <SegmentosList
              segments={mockSegments}
              onSelectSegment={(segment) => {
                setSelectedSegment(segment);
                setIsCreatingNew(false);
              }}
              selectedSegmentId={selectedSegment?.id || null}
            />
          </div>

          {/* Builder y Preview */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedSegment ? `Editar: ${selectedSegment.name}` : 'Crear Nuevo Segmento'}
                </h2>
              </div>

              <SegmentoBuilder
                initialSegment={selectedSegment}
                onSave={handleSaveSegment}
                onRunPreview={handleRunPreview}
              />
            </motion.div>

            <SegmentoPreview count={segmentPreviewCount} />

            {selectedSegment && <SegmentoActions segment={selectedSegment} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentosPage;
