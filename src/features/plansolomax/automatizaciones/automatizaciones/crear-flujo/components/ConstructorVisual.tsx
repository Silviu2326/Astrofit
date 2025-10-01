import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowProvider,
  Node,
  useNodesState,
  Panel,
  useReactFlow,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import TriggerNode from './customNodes/TriggerNode';
import ActionNode from './customNodes/ActionNode';
import ConditionNode from './customNodes/ConditionNode';
import DelayNode from './customNodes/DelayNode';
import { useStore } from '../store';
import { Zap, Mail, MessageSquare, Webhook, GitMerge, Timer, Undo, Redo, Layout, Grid } from 'lucide-react';
import { getLayoutedElements } from '../utils/layout';

import 'reactflow/dist/style.css';
import './ConstructorVisual.css';

const initialNodes: Node[] = [
  { id: '1', type: 'trigger', position: { x: 250, y: 5 }, data: { label: 'Nuevo Cliente' } },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
};

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 p-4 bg-gray-50 border-r border-gray-200 h-full">
      <h3 className="text-lg font-semibold mb-4">Nodos</h3>
      <div className="space-y-2">
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'trigger', 'Disparador')}
          draggable
        >
          <Zap className="w-5 h-5 text-blue-500" />
          <span>Disparador</span>
        </div>
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'action', 'Email')}
          draggable
        >
          <Mail className="w-5 h-5 text-gray-700" />
          <span>Email</span>
        </div>
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'action', 'SMS')}
          draggable
        >
          <MessageSquare className="w-5 h-5 text-gray-700" />
          <span>SMS</span>
        </div>
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'action', 'Webhook')}
          draggable
        >
          <Webhook className="w-5 h-5 text-gray-700" />
          <span>Webhook</span>
        </div>
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'condition', 'Condición')}
          draggable
        >
          <GitMerge className="w-5 h-5 text-purple-500" />
          <span>Condición</span>
        </div>
        <div
          className="sidebar-node"
          onDragStart={(event) => onDragStart(event, 'delay', 'Espera')}
          draggable
        >
          <Timer className="w-5 h-5 text-yellow-500" />
          <span>Espera</span>
        </div>
      </div>
    </aside>
  );
};

const ConstructorVisual: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, setNodes, setSelectedNode } = useStore();
  const { undo, redo } = useStore.temporal.getState();
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const { project } = useReactFlow();

  useEffect(() => {
    setNodes(localNodes);
  }, [localNodes, setNodes]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = project({
        x: event.clientX - (reactFlowBounds?.left ?? 0),
        y: event.clientY - (reactFlowBounds?.top ?? 0),
      });
      
      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label },
      };

      setLocalNodes((nds) => nds.concat(newNode));
    },
    [project, setLocalNodes],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      localNodes,
      edges
    );

    setLocalNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [localNodes, edges, setLocalNodes, setEdges]);

  const isValidConnection = (connection: Connection) => {
    const sourceNode = localNodes.find((node) => node.id === connection.source);
    const targetNode = localNodes.find((node) => node.id === connection.target);

    if (sourceNode?.type === 'trigger' && targetNode?.type === 'trigger') {
      return false;
    }

    return true;
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        snapToGrid={snapToGrid}
        snapGrid={[20, 20]}
        fitView
        multiSelectionKeyCode="Shift"
          isValidConnection={isValidConnection}
          defaultEdgeOptions={{
            animated: true,
            style: { strokeWidth: 2 },
          }}
          connectionLineStyle={{ stroke: '#4a5568', strokeWidth: 2 }}
        >
          {/* Enhanced Controls */}
          <Controls
            className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg"
            showZoom={true}
            showFitView={true}
            showInteractive={true}
          />

          {/* Enhanced MiniMap */}
          <MiniMap
            className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg"
            nodeColor={(node) => {
              switch (node.type) {
                case 'trigger': return '#3b82f6';
                case 'action': return '#10b981';
                case 'condition': return '#8b5cf6';
                case 'delay': return '#f59e0b';
                default: return '#6b7280';
              }
            }}
            nodeBorderRadius={12}
            maskColor="rgba(0, 0, 0, 0.1)"
          />

          {/* Enhanced Background */}
          <Background
            variant="dots"
            gap={20}
            size={1.5}
            color="#e2e8f0"
            style={{ backgroundColor: 'transparent' }}
          />

          {/* Enhanced Toolbar */}
          <Panel position="top-right" className="space-y-2">
            {/* Main Toolbar */}
            <motion.div
              className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg p-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => undo()}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                title="Deshacer"
              >
                <Undo className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button
                onClick={() => redo()}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                title="Rehacer"
              >
                <Redo className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <button
                onClick={onLayout}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                title="Auto Layout"
              >
                <Layout className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button
                onClick={() => setSnapToGrid(!snapToGrid)}
                className={`p-2.5 rounded-lg transition-colors duration-200 group ${
                  snapToGrid
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-600 group-hover:text-blue-600'
                }`}
                title="Snap to Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Status Panel */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nodos:</span>
                  <span className="font-medium text-gray-800">{nodes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Conexiones:</span>
                  <span className="font-medium text-gray-800">{edges.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500">En vivo</span>
                </div>
              </div>
            </motion.div>
          </Panel>

          {/* Empty State */}
          {nodes.length === 0 && (
            <Panel position="center" className="pointer-events-none">
              <motion.div
                className="text-center space-y-4 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">¡Comienza a crear tu flujo!</h3>
                <p className="text-gray-600 leading-relaxed">
                  Arrastra disparadores y acciones desde el panel lateral para comenzar a construir tu automatización.
                </p>
              </motion.div>
            </Panel>
          )}
        </ReactFlow>
    </div>
  );
};

const ConstructorVisualWrapper: React.FC = () => (
  <ReactFlowProvider>
    <ConstructorVisual />
  </ReactFlowProvider>
);

export default ConstructorVisualWrapper;