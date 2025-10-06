import React, { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Panel,
  NodeTypes,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Play,
  Zap,
  FileDown,
  FileUp,
  Trash2,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  UserPlus,
  Calendar,
  Clock,
  CreditCard,
  MessageSquare,
  Webhook,
  Mail,
  Phone,
  CheckSquare,
  Tag,
  Bell,
  Send,
  Timer,
  GitBranch,
  Merge,
  RotateCw,
  StopCircle,
  Edit3,
  AlertCircle,
  CheckCircle,
  Copy,
  Settings,
  Undo,
  Redo,
  Download,
  Upload,
  FileText,
  Target,
  Users,
  TrendingUp,
  Award,
  Star,
  BookOpen,
} from 'lucide-react';

// ============ TIPOS Y INTERFACES ============

type NodeCategory = 'trigger' | 'condition' | 'action' | 'utility';

interface NodeTemplate {
  id: string;
  type: NodeCategory;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  defaultConfig?: any;
}

interface FlowNode extends Node {
  data: {
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    type: NodeCategory;
    config?: any;
    isConfigured?: boolean;
  };
}

interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  edges: Edge[];
  category: string;
}

// ============ PLANTILLAS DE NODOS ============

const nodeTemplates: Record<string, NodeTemplate[]> = {
  triggers: [
    { id: 'new-client', type: 'trigger', label: 'Nuevo Cliente', icon: UserPlus, color: 'green', description: 'Se dispara cuando un cliente nuevo se registra' },
    { id: 'inactive-client', type: 'trigger', label: 'Cliente Inactivo', icon: Clock, color: 'green', description: 'Cliente sin actividad por X días' },
    { id: 'birthday', type: 'trigger', label: 'Cumpleaños', icon: Calendar, color: 'green', description: 'Día del cumpleaños del cliente' },
    { id: 'specific-date', type: 'trigger', label: 'Fecha Específica', icon: Calendar, color: 'green', description: 'En una fecha y hora específica' },
    { id: 'scheduled-time', type: 'trigger', label: 'Hora Programada', icon: Clock, color: 'green', description: 'Se ejecuta a una hora específica' },
    { id: 'renewal-soon', type: 'trigger', label: 'Renovación Próxima', icon: Award, color: 'green', description: 'Membresía próxima a vencer' },
    { id: 'session-completed', type: 'trigger', label: 'Sesión Completada', icon: CheckCircle, color: 'green', description: 'Después de completar una sesión' },
    { id: 'payment-received', type: 'trigger', label: 'Pago Recibido', icon: CreditCard, color: 'green', description: 'Cuando se recibe un pago' },
    { id: 'feedback-received', type: 'trigger', label: 'Feedback Recibido', icon: MessageSquare, color: 'green', description: 'Cliente envía feedback' },
    { id: 'webhook', type: 'trigger', label: 'Webhook Externo', icon: Webhook, color: 'green', description: 'Evento desde sistema externo' },
  ],
  conditions: [
    { id: 'if-then', type: 'condition', label: 'Si/Entonces/Sino', icon: GitBranch, color: 'yellow', description: 'Evalúa una condición' },
    { id: 'compare-value', type: 'condition', label: 'Comparar Valor', icon: Target, color: 'yellow', description: 'Compara un valor con otro' },
    { id: 'has-tag', type: 'condition', label: 'Tiene Etiqueta', icon: Tag, color: 'yellow', description: 'Cliente tiene etiqueta específica' },
    { id: 'in-segment', type: 'condition', label: 'En Segmento', icon: Users, color: 'yellow', description: 'Cliente pertenece a segmento' },
    { id: 'time-of-day', type: 'condition', label: 'Hora del Día', icon: Clock, color: 'yellow', description: 'Dentro de rango horario' },
    { id: 'day-of-week', type: 'condition', label: 'Día de la Semana', icon: Calendar, color: 'yellow', description: 'Día específico de la semana' },
    { id: 'membership-type', type: 'condition', label: 'Tipo de Membresía', icon: Award, color: 'yellow', description: 'Tipo de plan del cliente' },
    { id: 'ltv-check', type: 'condition', label: 'LTV Mayor/Menor', icon: TrendingUp, color: 'yellow', description: 'Valor de vida del cliente' },
    { id: 'adherence-check', type: 'condition', label: 'Adherencia', icon: Star, color: 'yellow', description: 'Nivel de adherencia del cliente' },
  ],
  actions: [
    { id: 'send-email', type: 'action', label: 'Enviar Email', icon: Mail, color: 'blue', description: 'Envía un correo electrónico' },
    { id: 'send-whatsapp', type: 'action', label: 'Enviar WhatsApp', icon: Phone, color: 'blue', description: 'Envía mensaje de WhatsApp/SMS' },
    { id: 'create-task', type: 'action', label: 'Crear Tarea', icon: CheckSquare, color: 'blue', description: 'Crea una tarea para el equipo' },
    { id: 'update-field', type: 'action', label: 'Actualizar Campo', icon: Edit3, color: 'blue', description: 'Actualiza datos del cliente' },
    { id: 'add-tag', type: 'action', label: 'Añadir Etiqueta', icon: Tag, color: 'blue', description: 'Añade etiqueta al cliente' },
    { id: 'remove-tag', type: 'action', label: 'Quitar Etiqueta', icon: Tag, color: 'blue', description: 'Elimina etiqueta del cliente' },
    { id: 'change-membership', type: 'action', label: 'Cambiar Membresía', icon: Award, color: 'blue', description: 'Modifica plan del cliente' },
    { id: 'create-notification', type: 'action', label: 'Crear Notificación', icon: Bell, color: 'blue', description: 'Notificación interna' },
    { id: 'webhook-post', type: 'action', label: 'Webhook POST', icon: Send, color: 'blue', description: 'Envía datos a API externa' },
    { id: 'log-event', type: 'action', label: 'Registrar Evento', icon: BookOpen, color: 'blue', description: 'Registra evento en CRM' },
  ],
  utilities: [
    { id: 'delay', type: 'utility', label: 'Delay', icon: Timer, color: 'gray', description: 'Espera un tiempo determinado' },
    { id: 'split-ab', type: 'utility', label: 'Split A/B', icon: GitBranch, color: 'gray', description: 'Prueba A/B aleatoria' },
    { id: 'merge', type: 'utility', label: 'Merger', icon: Merge, color: 'gray', description: 'Une múltiples caminos' },
    { id: 'loop', type: 'utility', label: 'Loop', icon: RotateCw, color: 'gray', description: 'Repite acciones' },
    { id: 'end-flow', type: 'utility', label: 'Fin del Flujo', icon: StopCircle, color: 'gray', description: 'Termina la ejecución' },
  ],
};

// ============ PLANTILLAS DE FLUJOS ============

const flowTemplates: FlowTemplate[] = [
  {
    id: 'welcome',
    name: 'Email de Bienvenida',
    description: 'Serie de 3 emails para nuevos clientes',
    category: 'onboarding',
    nodes: [],
    edges: [],
  },
  {
    id: 'inactive',
    name: 'Recuperar Inactivos',
    description: 'Reactivar clientes sin actividad',
    category: 'retention',
    nodes: [],
    edges: [],
  },
  {
    id: 'post-session',
    name: 'Follow-up Post-Sesión',
    description: 'Seguimiento después de entrenamiento',
    category: 'engagement',
    nodes: [],
    edges: [],
  },
  {
    id: 'birthday',
    name: 'Cumpleaños Automatizado',
    description: 'Felicitación de cumpleaños',
    category: 'engagement',
    nodes: [],
    edges: [],
  },
  {
    id: 'renewal',
    name: 'Renovación Membresía',
    description: 'Secuencia de renovación completa',
    category: 'retention',
    nodes: [],
    edges: [],
  },
];

// ============ VARIABLES DISPONIBLES ============

const availableVariables = [
  { key: '{nombre_cliente}', description: 'Nombre del cliente' },
  { key: '{email_cliente}', description: 'Email del cliente' },
  { key: '{proximo_entrenamiento}', description: 'Fecha del próximo entrenamiento' },
  { key: '{dias_inactivo}', description: 'Días sin actividad' },
  { key: '{fecha_cumpleanos}', description: 'Fecha de cumpleaños' },
  { key: '{tipo_membresia}', description: 'Tipo de membresía actual' },
  { key: '{fecha_registro}', description: 'Fecha de registro' },
  { key: '{entrenador_asignado}', description: 'Nombre del entrenador' },
  { key: '{ultima_sesion}', description: 'Fecha última sesión' },
  { key: '{ltv}', description: 'Valor de vida del cliente' },
];

// ============ COMPONENTES DE NODOS CUSTOM ============

const TriggerNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${data.isConfigured ? 'border-green-500' : 'border-red-300'} bg-gradient-to-br from-green-50 to-green-100 shadow-lg min-w-[200px]`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-green-700 uppercase">Inicio</div>
          <div className="text-sm font-semibold text-gray-800">{data.label}</div>
        </div>
      </div>
      {!data.isConfigured && (
        <div className="mt-2 text-xs text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Sin configurar</span>
        </div>
      )}
    </div>
  );
};

const ConditionNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${data.isConfigured ? 'border-yellow-500' : 'border-red-300'} bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg min-w-[200px]`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-yellow-700 uppercase">Condición</div>
          <div className="text-sm font-semibold text-gray-800">{data.label}</div>
        </div>
      </div>
      <div className="mt-2 flex space-x-2 text-xs">
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded font-medium">Sí</span>
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded font-medium">No</span>
      </div>
      {!data.isConfigured && (
        <div className="mt-2 text-xs text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Sin configurar</span>
        </div>
      )}
    </div>
  );
};

const ActionNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${data.isConfigured ? 'border-blue-500' : 'border-red-300'} bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg min-w-[200px]`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-blue-700 uppercase">Acción</div>
          <div className="text-sm font-semibold text-gray-800">{data.label}</div>
        </div>
      </div>
      {data.config && (
        <div className="mt-2 text-xs text-gray-600 truncate">
          {JSON.stringify(data.config).substring(0, 30)}...
        </div>
      )}
      {!data.isConfigured && (
        <div className="mt-2 text-xs text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Sin configurar</span>
        </div>
      )}
    </div>
  );
};

const UtilityNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${data.isConfigured ? 'border-gray-500' : 'border-red-300'} bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg min-w-[200px]`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-gray-700 uppercase">Utilidad</div>
          <div className="text-sm font-semibold text-gray-800">{data.label}</div>
        </div>
      </div>
      {!data.isConfigured && (
        <div className="mt-2 text-xs text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Sin configurar</span>
        </div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  utility: UtilityNode,
};

// ============ COMPONENTE PRINCIPAL ============

const CrearFlujoPage: React.FC = () => {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [flowName, setFlowName] = useState('Mi Flujo de Automatización');
  const [flowDescription, setFlowDescription] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [showTemplates, setShowTemplates] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  let nodeIdCounter = useRef(1);

  // ============ FUNCIONES AUXILIARES ============

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeData = event.dataTransfer.getData('application/reactflow');
      if (!nodeData || !reactFlowInstance) return;

      const template: NodeTemplate = JSON.parse(nodeData);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: FlowNode = {
        id: `node-${nodeIdCounter.current++}`,
        type: template.type,
        position,
        data: {
          label: template.label,
          icon: template.icon,
          color: template.color,
          type: template.type,
          isConfigured: false,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: FlowNode) => {
    setSelectedNode(node);
    setRightPanelCollapsed(false);
  }, []);

  const onDeleteNode = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  const validateFlow = useCallback(() => {
    const errors: string[] = [];

    // Validar que haya al menos un nodo trigger
    const triggerNodes = nodes.filter((n) => n.type === 'trigger');
    if (triggerNodes.length === 0) {
      errors.push('El flujo debe tener al menos un disparador');
    }

    // Validar que todos los nodos estén configurados
    const unconfiguredNodes = nodes.filter((n) => !n.data.isConfigured);
    if (unconfiguredNodes.length > 0) {
      errors.push(`${unconfiguredNodes.length} nodo(s) sin configurar`);
    }

    // Validar que todos los nodos estén conectados (excepto end nodes)
    nodes.forEach((node) => {
      if (node.type !== 'utility' || node.data.label !== 'Fin del Flujo') {
        const hasOutgoing = edges.some((e) => e.source === node.id);
        if (!hasOutgoing && node.type !== 'trigger') {
          errors.push(`Nodo "${node.data.label}" no tiene conexiones de salida`);
        }
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    if (validateFlow()) {
      const flowData = {
        name: flowName,
        description: flowDescription,
        nodes,
        edges,
        createdAt: new Date().toISOString(),
      };
      console.log('Flujo guardado:', flowData);
      alert('Flujo guardado correctamente (mock)');
    } else {
      alert('Hay errores en el flujo. Por favor revísalos antes de guardar.');
    }
  }, [flowName, flowDescription, nodes, edges, validateFlow]);

  const exportFlow = useCallback(() => {
    const flowData = {
      name: flowName,
      description: flowDescription,
      nodes,
      edges,
    };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${flowName.replace(/\s+/g, '_')}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [flowName, flowDescription, nodes, edges]);

  const handleDeleteFlow = useCallback(() => {
    if (confirm('¿Estás seguro de que quieres eliminar este flujo?')) {
      setNodes([]);
      setEdges([]);
      setFlowName('Mi Flujo de Automatización');
      setFlowDescription('');
      console.log('Flujo eliminado');
    }
  }, [setNodes, setEdges]);

  const handleSaveDraft = useCallback(() => {
    const draftData = {
      name: flowName,
      description: flowDescription,
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('flowDraft', JSON.stringify(draftData));
    console.log('Borrador guardado');
  }, [flowName, flowDescription, nodes, edges]);

  const loadTemplate = useCallback((template: FlowTemplate) => {
    setFlowName(template.name);
    setFlowDescription(template.description);
    setNodes(template.nodes);
    setEdges(template.edges);
    setShowTemplates(false);
  }, [setNodes, setEdges]);

  const toggleCategory = useCallback((category: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const copyVariable = useCallback((variable: string) => {
    navigator.clipboard.writeText(variable);
    alert(`Variable ${variable} copiada al portapapeles`);
  }, []);

  const updateNodeConfig = useCallback(
    (config: any) => {
      if (!selectedNode) return;
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                config,
                isConfigured: true,
              },
            };
          }
          return node;
        })
      );
      setSelectedNode((prev) =>
        prev ? { ...prev, data: { ...prev.data, config, isConfigured: true } } : null
      );
    },
    [selectedNode, setNodes]
  );

  // Calcular estado del flujo
  const flowStatus = useMemo(() => {
    if (nodes.length === 0) return { label: 'Vacío', color: 'gray' };
    if (validationErrors.length > 0) return { label: 'Con Errores', color: 'red' };
    const allConfigured = nodes.every((n) => n.data.isConfigured);
    if (!allConfigured) return { label: 'Incompleto', color: 'yellow' };
    return { label: 'Válido', color: 'green' };
  }, [nodes, validationErrors]);

  // ============ RENDER ============

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-auto bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="px-6 py-4">
          {/* Primera fila: Título y acciones */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Crear <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Flujo</span>
        </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    flowStatus.color === 'green' ? 'bg-green-100 text-green-700' :
                    flowStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    flowStatus.color === 'red' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {flowStatus.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {nodes.length} nodo(s) • {edges.length} conexión(es)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Plantillas</span>
              </button>
              <button
                onClick={exportFlow}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
              </button>
              <div className="w-px h-8 bg-gray-300"></div>
              <button 
                onClick={handleDeleteFlow}
                className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
              <button 
                onClick={handleSaveDraft}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Guardar Borrador</span>
              </button>
              <button
                onClick={() => setShowTestModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Probar Flujo</span>
              </button>
              <button
                onClick={saveFlow}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Guardar y Activar</span>
              </button>
            </div>
          </div>

          {/* Segunda fila: Nombre y descripción */}
          <div className="flex space-x-4">
            <div className="flex-1">
              {isEditingName ? (
                <input
                  type="text"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg cursor-pointer text-sm font-semibold transition-colors"
                >
                  {flowName}
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={flowDescription}
                onChange={(e) => setFlowDescription(e.target.value)}
                placeholder="Descripción del flujo (opcional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Errores de validación */}
          {validationErrors.length > 0 && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-red-800 mb-1">
                    Errores en el flujo:
                  </div>
                  <ul className="text-xs text-red-700 space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panel Izquierdo - Paleta de Nodos */}
      <AnimatePresence>
        {!leftPanelCollapsed && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl overflow-hidden"
            style={{ marginTop: validationErrors.length > 0 ? '220px' : '180px' }}
          >
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Paleta de Nodos
                  </h2>
                  <button
                    onClick={() => setShowVariables(!showVariables)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Variables
                  </button>
                </div>

                {/* Variables Panel */}
                {showVariables && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden"
                  >
                    <div className="text-xs font-semibold text-blue-800 mb-2">
                      Variables Disponibles
                    </div>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {availableVariables.map((v) => (
                        <div
                          key={v.key}
                          className="flex items-center justify-between p-2 bg-white rounded hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => copyVariable(v.key)}
                        >
                          <div className="flex-1">
                            <div className="text-xs font-mono font-semibold text-gray-800">
                              {v.key}
                            </div>
                            <div className="text-xs text-gray-600">{v.description}</div>
                          </div>
                          <Copy className="w-3 h-3 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Categorías de Nodos */}
                <div className="space-y-3">
                  {/* DISPARADORES */}
                  <div className="border border-green-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory('triggers')}
                      className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <PlayCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-bold text-green-800">
                          DISPARADORES
                        </span>
                        <span className="text-xs text-green-600 bg-green-200 px-2 py-0.5 rounded-full">
                          {nodeTemplates.triggers.length}
                        </span>
                      </div>
                      {collapsedCategories.triggers ? (
                        <ChevronDown className="w-4 h-4 text-green-600" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-green-600" />
                      )}
                    </button>
                    {!collapsedCategories.triggers && (
                      <div className="p-2 space-y-1 bg-white">
                        {nodeTemplates.triggers.map((template) => {
                          const Icon = template.icon;
                          return (
                            <div
                              key={template.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="flex items-center space-x-3 p-2 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg cursor-move transition-all group border border-green-200"
                            >
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {template.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* CONDICIONES */}
                  <div className="border border-yellow-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory('conditions')}
                      className="w-full flex items-center justify-between p-3 bg-yellow-50 hover:bg-yellow-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <GitBranch className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-bold text-yellow-800">
                          CONDICIONES
                        </span>
                        <span className="text-xs text-yellow-600 bg-yellow-200 px-2 py-0.5 rounded-full">
                          {nodeTemplates.conditions.length}
                        </span>
                      </div>
                      {collapsedCategories.conditions ? (
                        <ChevronDown className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-yellow-600" />
                      )}
                    </button>
                    {!collapsedCategories.conditions && (
                      <div className="p-2 space-y-1 bg-white">
                        {nodeTemplates.conditions.map((template) => {
                          const Icon = template.icon;
                          return (
                            <div
                              key={template.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="flex items-center space-x-3 p-2 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg cursor-move transition-all group border border-yellow-200"
                            >
                              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {template.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* ACCIONES */}
                  <div className="border border-blue-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory('actions')}
                      className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-800">ACCIONES</span>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-0.5 rounded-full">
                          {nodeTemplates.actions.length}
                        </span>
                      </div>
                      {collapsedCategories.actions ? (
                        <ChevronDown className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                    {!collapsedCategories.actions && (
                      <div className="p-2 space-y-1 bg-white">
                        {nodeTemplates.actions.map((template) => {
                          const Icon = template.icon;
                          return (
                            <div
                              key={template.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="flex items-center space-x-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg cursor-move transition-all group border border-blue-200"
                            >
                              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {template.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* UTILIDADES */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory('utilities')}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-bold text-gray-800">UTILIDADES</span>
                        <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                          {nodeTemplates.utilities.length}
                        </span>
                      </div>
                      {collapsedCategories.utilities ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    {!collapsedCategories.utilities && (
                      <div className="p-2 space-y-1 bg-white">
                        {nodeTemplates.utilities.map((template) => {
                          const Icon = template.icon;
                          return (
                            <div
                              key={template.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="flex items-center space-x-3 p-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg cursor-move transition-all group border border-gray-300"
                            >
                              <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {template.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Panel Izquierdo */}
      <button
        onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        className="absolute left-0 top-48 z-50 w-6 h-16 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-r-lg shadow-md hover:shadow-lg flex items-center justify-center transition-all"
      >
        {leftPanelCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Canvas Central */}
      <div
        ref={reactFlowWrapper}
        className="flex-1"
        style={{ marginTop: validationErrors.length > 0 ? '220px' : '180px' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const colors: Record<string, string> = {
                trigger: '#10b981',
                condition: '#eab308',
                action: '#3b82f6',
                utility: '#6b7280',
              };
              return colors[node.type || 'action'] || '#3b82f6';
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e5e7eb',
            }}
          />
          <Panel position="top-left" className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 m-4">
            <div className="text-xs font-semibold text-gray-700 mb-2">Instrucciones</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Arrastra nodos desde el panel izquierdo</div>
              <div>• Conecta nodos arrastrando desde los puntos</div>
              <div>• Click en un nodo para configurarlo</div>
              <div>• Usa la rueda del mouse para zoom</div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Toggle Panel Derecho */}
      <button
        onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        className="absolute right-0 top-48 z-50 w-6 h-16 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-l-lg shadow-md hover:shadow-lg flex items-center justify-center transition-all"
      >
        {rightPanelCollapsed ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Panel Derecho - Propiedades */}
      <AnimatePresence>
        {!rightPanelCollapsed && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-96 bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl overflow-hidden"
            style={{ marginTop: validationErrors.length > 0 ? '220px' : '180px' }}
          >
            <div className="h-full overflow-y-auto custom-scrollbar">
              {selectedNode ? (
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {React.createElement(selectedNode.data.icon, {
                        className: 'w-5 h-5 text-gray-700',
                      })}
                      <div>
                        <h3 className="text-sm font-bold text-gray-800">
                          Configurar {selectedNode.data.label}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Nodo ID: {selectedNode.id}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onDeleteNode}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Formulario de configuración dinámico */}
                  <div className="space-y-4">
                    {selectedNode.data.type === 'action' &&
                      selectedNode.data.label === 'Enviar Email' && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Asunto
                            </label>
                            <input
                              type="text"
                              placeholder="Asunto del email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) =>
                                updateNodeConfig({
                                  ...selectedNode.data.config,
                                  subject: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Cuerpo del Email
                            </label>
                            <textarea
                              rows={6}
                              placeholder="Escribe tu mensaje aquí... Usa {nombre_cliente} para personalizar"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) =>
                                updateNodeConfig({
                                  ...selectedNode.data.config,
                                  body: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Remitente
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>info@gimnasio.com</option>
                              <option>coach@gimnasio.com</option>
                              <option>noreply@gimnasio.com</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="tracking" className="rounded" />
                            <label htmlFor="tracking" className="text-xs text-gray-700">
                              Habilitar tracking de apertura y clicks
                            </label>
                          </div>
                        </>
                      )}

                    {selectedNode.data.type === 'condition' && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Campo a Evaluar
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Tipo de Membresía</option>
                            <option>Días Inactivo</option>
                            <option>LTV</option>
                            <option>Adherencia</option>
                            <option>Tiene Etiqueta</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Operador
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Es igual a</option>
                            <option>No es igual a</option>
                            <option>Mayor que</option>
                            <option>Menor que</option>
                            <option>Contiene</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Valor
                          </label>
                          <input
                            type="text"
                            placeholder="Valor a comparar"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </>
                    )}

                    {selectedNode.data.type === 'trigger' && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Configuración del Disparador
                          </label>
                          {selectedNode.data.label === 'Cliente Inactivo' && (
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                  Días de inactividad
                                </label>
                                <input
                                  type="number"
                                  placeholder="7"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onChange={(e) =>
                                    updateNodeConfig({
                                      ...selectedNode.data.config,
                                      days: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {selectedNode.data.label === 'Hora Programada' && (
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">Hora</label>
                                <input
                                  type="time"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">Días</label>
                                <div className="flex flex-wrap gap-1">
                                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                                    <button
                                      key={day}
                                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white text-xs font-semibold transition-colors"
                                    >
                                      {day}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {selectedNode.data.type === 'utility' &&
                      selectedNode.data.label === 'Delay' && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Tiempo de Espera
                            </label>
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                placeholder="1"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                  updateNodeConfig({
                                    ...selectedNode.data.config,
                                    amount: e.target.value,
                                  })
                                }
                              />
                              <select
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                  updateNodeConfig({
                                    ...selectedNode.data.config,
                                    unit: e.target.value,
                                  })
                                }
                              >
                                <option>Minutos</option>
                                <option>Horas</option>
                                <option>Días</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() =>
                          updateNodeConfig(selectedNode.data.config || {})
                        }
                        className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all font-semibold text-sm shadow-lg"
                      >
                        Aplicar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Settings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">
                    Sin Nodo Seleccionado
                  </h3>
                  <p className="text-xs text-gray-600">
                    Haz click en un nodo del canvas para configurarlo
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Plantillas */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Plantillas de Flujo
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Comienza con una plantilla prediseñada
                </p>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid grid-cols-2 gap-4">
                  {flowTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer group"
                      onClick={() => loadTemplate(template)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                          {template.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="mt-3 text-xs text-gray-500">
                        Click para usar esta plantilla
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Probar Flujo */}
      <AnimatePresence>
        {showTestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowTestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Probar Flujo</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Simula la ejecución del flujo con datos de prueba
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seleccionar Cliente de Prueba
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Juan Pérez (Premium)</option>
                    <option>María García (Básico)</option>
                    <option>Carlos López (Inactivo - 15 días)</option>
                  </select>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <PlayCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-blue-800 mb-2">
                        Simulación de Ejecución
                      </div>
                      <div className="space-y-2 text-xs text-blue-700">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Trigger activado: Nuevo Cliente</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Condición evaluada: Membresía = Premium</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Acción: Email enviado ✓</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Timer className="w-4 h-4" />
                          <span>Esperando 2 días...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTestModal(false)}
                    className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                  >
                    Cerrar
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all font-semibold text-sm shadow-lg">
                    Ejecutar Simulación
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CrearFlujoPage;