import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, TrendingUp, Plus, Sparkles, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import SegmentosList from './components/SegmentosList';
import SegmentoBuilder from './components/SegmentoBuilder';
import SegmentoPreview from './components/SegmentoPreview';
import SegmentoActions from './components/SegmentoActions';
import ClienteSelector from './components/ClienteSelector';
import {
  fetchSegmentos,
  createSegmento,
  updateSegmento,
  deleteSegmento,
  Segmento,
  agregarClientesMultiples
} from './segmentosApi';

export interface Segment {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  lastUpdated: string;
  rules: any[];
  manualClientIds?: string[];
  segmentType: 'automatic' | 'manual' | 'hybrid';
}

// Función para convertir Segmento del backend a Segment del frontend
const mapSegmentoToSegment = (segmento: Segmento): Segment => ({
  id: segmento._id,
  name: segmento.nombre,
  description: segmento.descripcion,
  memberCount: segmento.stats.totalMiembros,
  lastUpdated: new Date(segmento.updatedAt).toISOString().slice(0, 10),
  rules: segmento.reglas || [],
  manualClientIds: segmento.clientes || [],
  segmentType: segmento.tipo as 'automatic' | 'manual' | 'hybrid',
});

// Función para convertir Segment del frontend a datos del backend
const mapSegmentToSegmentoDTO = (segment: Segment) => ({
  nombre: segment.name,
  descripcion: segment.description,
  tipo: segment.segmentType,
  reglas: segment.rules,
  clientes: segment.manualClientIds || [],
});

const SegmentosPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [segmentPreviewCount, setSegmentPreviewCount] = useState<number>(0);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [currentSegmentType, setCurrentSegmentType] = useState<'automatic' | 'manual' | 'hybrid'>('automatic');
  const [loading, setLoading] = useState(true);

  // Cargar segmentos al montar el componente
  useEffect(() => {
    loadSegmentos();
  }, []);

  const loadSegmentos = async () => {
    try {
      setLoading(true);
      const data = await fetchSegmentos();
      const mappedSegments = data.map(mapSegmentoToSegment);
      setSegments(mappedSegments);
    } catch (error) {
      console.error('Error al cargar segmentos:', error);
      toast.error('Error al cargar los segmentos');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSegment = async (segment: Segment) => {
    try {
      const segmentoDTO = mapSegmentToSegmentoDTO(segment);

      if (segment.id && !segment.id.startsWith('temp-') && segments.find(s => s.id === segment.id)) {
        // Actualizar segmento existente
        const updated = await updateSegmento(segment.id, segmentoDTO);
        const updatedSegment = mapSegmentoToSegment(updated);
        setSegments(prev => prev.map(s => s.id === segment.id ? updatedSegment : s));
        toast.success(`✅ Segmento "${segment.name}" actualizado correctamente`);
      } else {
        // Crear nuevo segmento
        const created = await createSegmento(segmentoDTO);
        const newSegment = mapSegmentoToSegment(created);
        setSegments(prev => [...prev, newSegment]);
        toast.success(`🎉 Segmento "${segment.name}" creado correctamente`);
      }

      setSelectedSegment(null);
    } catch (error) {
      console.error('Error al guardar segmento:', error);
      toast.error('Error al guardar el segmento');
    }
  };

  const handleRunPreview = (rules: any[]) => {
    // Simular cálculo de miembros basado en reglas
    if (rules.length === 0) {
      setSegmentPreviewCount(selectedSegment?.manualClientIds?.length || 0);
      return;
    }

    // Lógica más realista basada en el tipo de reglas
    let baseCount = 0;
    rules.forEach(rule => {
      switch (rule.type) {
        case 'tag':
          baseCount += rule.operator === 'includes' ? 45 : 15;
          break;
        case 'activity':
          baseCount += rule.operator === 'includes' ? 80 : 25;
          break;
        case 'date':
          baseCount += 30;
          break;
        case 'status':
          baseCount += 60;
          break;
        default:
          baseCount += 20;
      }
    });

    // Aplicar variación aleatoria
    const variation = Math.floor(baseCount * 0.3);
    const automaticCount = Math.max(0, baseCount + Math.floor(Math.random() * variation * 2) - variation);

    // Sumar clientes manuales
    const manualCount = selectedSegment?.manualClientIds?.length || 0;
    setSegmentPreviewCount(automaticCount + manualCount);
  };

  const handleDeleteSegment = async (segmentId: string) => {
    try {
      const segment = segments.find(s => s.id === segmentId);

      await deleteSegmento(segmentId);

      setSegments(prev => prev.filter(s => s.id !== segmentId));
      if (selectedSegment?.id === segmentId) {
        setSelectedSegment(null);
      }
      if (segment) {
        toast.success(`🗑️ Segmento "${segment.name}" eliminado correctamente`);
      }
    } catch (error) {
      console.error('Error al eliminar segmento:', error);
      toast.error('Error al eliminar el segmento');
    }
  };

  const handleNewSegment = () => {
    setSelectedSegment(null);
    setSegmentPreviewCount(0);
    setCurrentSegmentType('automatic');
  };

  const handleClientesChange = (clientIds: string[]) => {
    if (selectedSegment) {
      const updatedSegment = {
        ...selectedSegment,
        manualClientIds: clientIds,
        memberCount: clientIds.length + (selectedSegment.rules.length > 0 ? segmentPreviewCount : 0),
        segmentType: (selectedSegment.rules.length > 0 ? 'hybrid' : 'manual') as 'automatic' | 'manual' | 'hybrid'
      };
      setSelectedSegment(updatedSegment);
      setSegments(prev => prev.map(s => s.id === selectedSegment.id ? updatedSegment : s));
      toast.success(`✅ ${clientIds.length} clientes agregados al segmento`);
    } else {
      // Crear nuevo segmento manual temporal
      const tempSegment: Segment = {
        id: 'temp-' + Date.now(),
        name: 'Nuevo Segmento Manual',
        description: 'Segmento creado manualmente',
        memberCount: clientIds.length,
        lastUpdated: new Date().toISOString().slice(0, 10),
        rules: [],
        manualClientIds: clientIds,
        segmentType: 'manual'
      };
      setSelectedSegment(tempSegment);
      setCurrentSegmentType('manual');
      toast.success(`✅ ${clientIds.length} clientes seleccionados. Completa los datos del segmento.`);
    }
  };

  const totalMembers = segments.reduce((sum, seg) => sum + seg.memberCount, 0);

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
                  Crea audiencias específicas con <span className="font-semibold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">reglas dinámicas o selección manual</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowClientSelector(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                <UserPlus className="w-5 h-5" />
                <span>Seleccionar Clientes</span>
              </motion.button>
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
            <p className="text-3xl font-bold text-indigo-600">{segments.length}</p>
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
            <p className="text-3xl font-bold text-green-600">{segments.length > 0 ? Math.round(totalMembers / segments.length) : 0}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Segmentos */}
          <div className="lg:col-span-1">
            <SegmentosList
              segments={segments}
              onSelectSegment={(segment) => {
                setSelectedSegment(segment);
                setCurrentSegmentType(segment.segmentType);
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Sparkles className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedSegment ? `Editar: ${selectedSegment.name}` : 'Crear Nuevo Segmento'}
                    </h2>
                    {selectedSegment?.manualClientIds && selectedSegment.manualClientIds.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedSegment.manualClientIds.length} cliente(s) seleccionado(s) manualmente
                      </p>
                    )}
                  </div>
                </div>

                {selectedSegment && (
                  <button
                    onClick={() => setShowClientSelector(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Añadir Clientes</span>
                  </button>
                )}
              </div>

              <SegmentoBuilder
                initialSegment={selectedSegment}
                onSave={handleSaveSegment}
                onRunPreview={handleRunPreview}
              />
            </motion.div>

            <SegmentoPreview count={segmentPreviewCount} />

            {selectedSegment && <SegmentoActions segment={selectedSegment} onDelete={handleDeleteSegment} />}
          </div>
        </div>
      </div>

      {/* Cliente Selector Modal */}
      <AnimatePresence>
        {showClientSelector && (
          <ClienteSelector
            selectedClientIds={selectedSegment?.manualClientIds || []}
            onClientesChange={handleClientesChange}
            onClose={() => setShowClientSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SegmentosPage;
