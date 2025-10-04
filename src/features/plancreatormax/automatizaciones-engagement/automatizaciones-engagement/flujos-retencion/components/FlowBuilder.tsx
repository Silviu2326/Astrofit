import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MessageSquare, Bell, Tag, CreditCard, Webhook, GitBranch,
  Clock, Zap, Plus, Trash2, ZoomIn, ZoomOut, Maximize2, Save,
  Play, Eye, Settings as SettingsIcon, ChevronRight
} from 'lucide-react';
import { FlowNode, FlowEdge, NodeType } from '../types';

interface FlowBuilderProps {
  onClose: () => void;
  templateName?: string;
  initialNodes?: FlowNode[];
  initialEdges?: FlowEdge[];
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({
  onClose,
  templateName,
  initialNodes = [],
  initialEdges = []
}) => {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showNodePalette, setShowNodePalette] = useState(true);

  const nodeTypes: { type: NodeType; icon: any; label: string; color: string }[] = [
    { type: 'trigger', icon: Zap, label: 'Trigger', color: 'from-yellow-500 to-orange-600' },
    { type: 'email', icon: Mail, label: 'Email', color: 'from-blue-500 to-indigo-600' },
    { type: 'sms', icon: MessageSquare, label: 'SMS', color: 'from-green-500 to-emerald-600' },
    { type: 'push', icon: Bell, label: 'Push', color: 'from-purple-500 to-pink-600' },
    { type: 'tag', icon: Tag, label: 'Tag', color: 'from-orange-500 to-red-600' },
    { type: 'plan', icon: CreditCard, label: 'Cambiar Plan', color: 'from-indigo-500 to-purple-600' },
    { type: 'webhook', icon: Webhook, label: 'Webhook', color: 'from-gray-600 to-gray-800' },
    { type: 'conditional', icon: GitBranch, label: 'Condicional', color: 'from-teal-500 to-cyan-600' },
    { type: 'delay', icon: Clock, label: 'Delay', color: 'from-pink-500 to-rose-600' },
    { type: 'split', icon: Zap, label: 'A/B Split', color: 'from-violet-500 to-purple-600' }
  ];

  const getNodeIcon = (type: NodeType) => {
    const nodeType = nodeTypes.find(n => n.type === type);
    return nodeType?.icon || Mail;
  };

  const getNodeColor = (type: NodeType) => {
    const nodeType = nodeTypes.find(n => n.type === type);
    return nodeType?.color || 'from-gray-500 to-gray-600';
  };

  const addNode = (type: NodeType) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 200 + nodes.length * 50, y: 100 + nodes.length * 30 },
      data: { label: nodeTypes.find(n => n.type === type)?.label || 'Node' }
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
    if (selectedNode?.id === nodeId) setSelectedNode(null);
  };

  return (
    <div className="h-full flex">
      {/* Node Palette */}
      {showNodePalette && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 p-4 overflow-y-auto"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nodos Disponibles
          </h3>

          <div className="space-y-2">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <button
                  key={nodeType.type}
                  onClick={() => addNode(nodeType.type)}
                  className="w-full p-3 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-green-500 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${nodeType.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800 text-sm">{nodeType.label}</p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNodePalette(!showNodePalette)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${showNodePalette ? 'rotate-180' : ''}`} />
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <button
              onClick={() => setZoom(Math.min(zoom + 10, 200))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setZoom(Math.max(zoom - 10, 50))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Reset Zoom"
            >
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>

            <span className="text-sm font-medium text-gray-600 ml-2">{zoom}%</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Test
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-auto p-8">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Nodes */}
          <div className="relative" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
            {nodes.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Canvas vacío</p>
                  <p className="text-sm text-gray-400 mt-2">Agrega nodos desde el panel izquierdo</p>
                </div>
              </div>
            ) : (
              <>
                {/* Render Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {edges.map((edge) => {
                    const sourceNode = nodes.find(n => n.id === edge.source);
                    const targetNode = nodes.find(n => n.id === edge.target);
                    if (!sourceNode || !targetNode) return null;

                    const x1 = sourceNode.position.x + 120;
                    const y1 = sourceNode.position.y + 40;
                    const x2 = targetNode.position.x;
                    const y2 = targetNode.position.y + 40;

                    return (
                      <g key={edge.id}>
                        <path
                          d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`}
                          stroke={edge.type === 'yes' ? '#10b981' : edge.type === 'no' ? '#ef4444' : '#6b7280'}
                          strokeWidth="2"
                          fill="none"
                          className="animate-pulse"
                        />
                        {edge.label && (
                          <text
                            x={(x1 + x2) / 2}
                            y={(y1 + y2) / 2 - 10}
                            className="text-xs font-bold fill-gray-600"
                          >
                            {edge.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Render Nodes */}
                {nodes.map((node) => {
                  const Icon = getNodeIcon(node.type);
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <motion.div
                      key={node.id}
                      drag
                      dragMomentum={false}
                      onDragEnd={(e, info) => {
                        setNodes(nodes.map(n =>
                          n.id === node.id
                            ? { ...n, position: { x: n.position.x + info.offset.x, y: n.position.y + info.offset.y } }
                            : n
                        ));
                      }}
                      onClick={() => setSelectedNode(node)}
                      className={`absolute cursor-move ${isSelected ? 'z-20' : 'z-10'}`}
                      style={{
                        left: node.position.x,
                        top: node.position.y
                      }}
                    >
                      <div className={`bg-white rounded-2xl shadow-xl border-2 ${isSelected ? 'border-green-500' : 'border-gray-200'} p-4 min-w-[240px] group hover:shadow-2xl transition-all duration-300`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getNodeColor(node.type)} flex items-center justify-center text-white`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800 text-sm">{node.data.label}</p>
                            <p className="text-xs text-gray-500">{node.type}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>

                        {node.data.config && (
                          <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2 mt-2">
                            {node.data.config.subject && (
                              <p className="truncate"><span className="font-semibold">Subject:</span> {node.data.config.subject}</p>
                            )}
                            {node.data.config.duration && (
                              <p><span className="font-semibold">Duración:</span> {node.data.config.duration} {node.data.config.unit}</p>
                            )}
                          </div>
                        )}

                        {/* Connection points */}
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>

          {/* Minimap */}
          <div className="absolute bottom-4 right-4 w-48 h-32 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 p-2">
            <p className="text-xs font-semibold text-gray-600 mb-1">Minimap</p>
            <div className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute bg-green-500 rounded"
                  style={{
                    left: `${(node.position.x / 1000) * 100}%`,
                    top: `${(node.position.y / 600) * 100}%`,
                    width: '10px',
                    height: '8px'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      {selectedNode && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="w-80 bg-white/80 backdrop-blur-xl border-l border-gray-200 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Configuración
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Nodo</label>
              <input
                type="text"
                value={selectedNode.data.label}
                onChange={(e) => {
                  setNodes(nodes.map(n =>
                    n.id === selectedNode.id
                      ? { ...n, data: { ...n.data, label: e.target.value } }
                      : n
                  ));
                  setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: e.target.value } });
                }}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
              />
            </div>

            {selectedNode.type === 'email' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
                  <input
                    type="text"
                    placeholder="Asunto del email..."
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contenido</label>
                  <textarea
                    rows={6}
                    placeholder="Contenido del email..."
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                  ></textarea>
                </div>
              </>
            )}

            {selectedNode.type === 'delay' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duración</label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unidad</label>
                  <select className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none">
                    <option>Horas</option>
                    <option>Días</option>
                    <option>Semanas</option>
                  </select>
                </div>
              </>
            )}

            {selectedNode.type === 'conditional' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Condición</label>
                  <select className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none">
                    <option>Abrió email</option>
                    <option>Hizo click</option>
                    <option>Completó acción</option>
                    <option>Valor de campo</option>
                  </select>
                </div>
              </>
            )}

            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Guardar Configuración
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FlowBuilder;
