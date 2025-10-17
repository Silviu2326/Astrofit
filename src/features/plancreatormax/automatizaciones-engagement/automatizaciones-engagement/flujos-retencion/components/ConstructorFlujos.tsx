
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  OnConnect,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
// API calls happen in parent via exposed methods

type NodeKind = 'trigger' | 'action' | 'condition';

const defaultPosition = { x: 100, y: 100 };

const nodeStyleByKind: Record<NodeKind, string> = {
  trigger: 'bg-emerald-50 border-emerald-300 text-emerald-700',
  action: 'bg-indigo-50 border-indigo-300 text-indigo-700',
  condition: 'bg-amber-50 border-amber-300 text-amber-700',
};

export type ConstructorFlujosHandle = {
  addTriggerNode: (config?: { name?: string }) => void;
  getFlowData: () => { nodes: Node[]; edges: Edge[] };
};

interface ConstructorFlujosProps {
  onAddTriggerRequest?: () => void;
  onSaveActionsRequest?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const ConstructorFlujos = forwardRef<ConstructorFlujosHandle, ConstructorFlujosProps>(function ConstructorFlujos(
  { onAddTriggerRequest, onSaveActionsRequest, isFullscreen = false, onToggleFullscreen },
  ref
) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [saving] = useState(false);

  const onConnect: OnConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1' } }, eds));
  }, [setEdges]);

  const addNode = useCallback((kind: NodeKind, customLabel?: string) => {
    const id = uuidv4();
    const label = kind === 'trigger' ? 'Disparador' : kind === 'action' ? 'Acción' : 'Condición';
    const position = {
      x: defaultPosition.x + Math.random() * 300,
      y: defaultPosition.y + Math.random() * 200,
    };
    const newNode: Node = {
      id,
      type: 'default',
      position,
      data: { label: customLabel || `${label} #${nodes.length + 1}` },
      style: { borderWidth: 2, borderRadius: 12 },
      className: `${nodeStyleByKind[kind]} px-3 py-2 font-semibold`,
    };
    setNodes((curr) => [...curr, newNode]);
  }, [nodes.length, setNodes]);

  const handleSaveClick = useCallback(() => {
    console.log('🔍 [DEBUG] ConstructorFlujos handleSaveClick called');
    console.log('🔍 [DEBUG] Current nodes count:', nodes.length);
    console.log('🔍 [DEBUG] onSaveActionsRequest prop:', onSaveActionsRequest);
    
    if (nodes.length === 0) {
      console.log('⚠️ [WARNING] No nodes to save');
      toast.error('Añade al menos un nodo para guardar');
      return;
    }
    if (onSaveActionsRequest) {
      console.log('🔍 [DEBUG] Calling onSaveActionsRequest...');
      onSaveActionsRequest();
    } else {
      console.log('⚠️ [WARNING] onSaveActionsRequest is not defined');
      toast.success('Acciones preparadas para guardar');
    }
  }, [nodes.length, onSaveActionsRequest]);

  const handleAddTriggerClick = useCallback(() => {
    console.log('🔍 [DEBUG] ConstructorFlujos handleAddTriggerClick called');
    console.log('🔍 [DEBUG] onAddTriggerRequest prop:', onAddTriggerRequest);
    
    if (onAddTriggerRequest) {
      console.log('🔍 [DEBUG] Calling onAddTriggerRequest...');
      onAddTriggerRequest();
    } else {
      console.log('⚠️ [WARNING] onAddTriggerRequest is not defined, adding node directly');
      addNode('trigger');
      toast.success('Disparador añadido');
    }
  }, [onAddTriggerRequest, addNode]);

  useImperativeHandle(ref, () => ({
    addTriggerNode: (config) => {
      console.log('🔍 [DEBUG] addTriggerNode called with config:', config);
      addNode('trigger', config?.name);
      console.log('🔍 [DEBUG] Trigger node added successfully');
    },
    getFlowData: () => {
      console.log('🔍 [DEBUG] getFlowData called');
      const data = { nodes, edges };
      console.log('🔍 [DEBUG] Returning flow data:', data);
      return data;
    },
  }), [addNode, nodes, edges]);

  const toolbar = useMemo(() => (
    <div className="flex flex-wrap gap-3">
      <motion.button
        onClick={handleAddTriggerClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
      >
        + Disparador
      </motion.button>
      <motion.button
        onClick={() => addNode('action')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-2 rounded-lg border border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
      >
        + Acción
      </motion.button>
      <motion.button
        onClick={() => addNode('condition')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-2 rounded-lg border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
      >
        + Condición
      </motion.button>
      <motion.button
        onClick={handleSaveClick}
        disabled={saving}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-auto px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {saving ? 'Guardando…' : 'Guardar Acciones'}
      </motion.button>
      <button
        onClick={onToggleFullscreen}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
      >
        {isFullscreen ? 'Salir Pantalla Completa' : 'Pantalla Completa'}
      </button>
    </div>
  ), [handleAddTriggerClick, addNode, handleSaveClick, saving, onToggleFullscreen, isFullscreen]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Constructor Visual de Flujos</h3>
        <div className="flex-1" />
        {toolbar}
      </div>
      <div className={isFullscreen ? 'h-[calc(100vh-160px)]' : 'h-[420px]'}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap pannable zoomable />
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
});

export default ConstructorFlujos;
