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
    <div className={`relative overflow-hidden px-4 py-3 rounded-2xl border-2 ${
      data.isConfigured ? 'border-green-400/60' : 'border-red-400/60'
    } bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all min-w-[220px] group`}>
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-2xl opacity-30"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-green-700 uppercase tracking-wide">Inicio</div>
            <div className="text-sm font-bold text-gray-800">{data.label}</div>
          </div>
        </div>
        {!data.isConfigured && (
          <div className="mt-3 px-2 py-1 bg-red-50 rounded-lg text-xs text-red-700 flex items-center gap-1.5 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">Sin configurar</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ConditionNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`relative overflow-hidden px-4 py-3 rounded-2xl border-2 ${
      data.isConfigured ? 'border-yellow-400/60' : 'border-red-400/60'
    } bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all min-w-[220px] group`}>
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-2xl opacity-30"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Condición</div>
            <div className="text-sm font-bold text-gray-800">{data.label}</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold border border-green-200">✓ Sí</span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold border border-red-200">✗ No</span>
        </div>
        {!data.isConfigured && (
          <div className="mt-3 px-2 py-1 bg-red-50 rounded-lg text-xs text-red-700 flex items-center gap-1.5 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">Sin configurar</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`relative overflow-hidden px-4 py-3 rounded-2xl border-2 ${
      data.isConfigured ? 'border-cyan-400/60' : 'border-red-400/60'
    } bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all min-w-[220px] group`}>
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-2xl opacity-30"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-700 uppercase tracking-wide">Acción</div>
            <div className="text-sm font-bold text-gray-800">{data.label}</div>
          </div>
        </div>
        {data.config && (
          <div className="mt-2 px-2 py-1 bg-cyan-50 rounded-lg text-xs text-cyan-700 font-mono truncate border border-cyan-200">
            {JSON.stringify(data.config).substring(0, 30)}...
          </div>
        )}
        {!data.isConfigured && (
          <div className="mt-3 px-2 py-1 bg-red-50 rounded-lg text-xs text-red-700 flex items-center gap-1.5 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">Sin configurar</span>
          </div>
        )}
      </div>
    </div>
  );
};

const UtilityNode = ({ data }: { data: any }) => {
  const Icon = data.icon;
  return (
    <div className={`relative overflow-hidden px-4 py-3 rounded-2xl border-2 ${
      data.isConfigured ? 'border-slate-400/60' : 'border-red-400/60'
    } bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all min-w-[220px] group`}>
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-slate-200 to-gray-200 rounded-full blur-2xl opacity-30"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Utilidad</div>
            <div className="text-sm font-bold text-gray-800">{data.label}</div>
          </div>
        </div>
        {!data.isConfigured && (
          <div className="mt-3 px-2 py-1 bg-red-50 rounded-lg text-xs text-red-700 flex items-center gap-1.5 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">Sin configurar</span>
          </div>
        )}
      </div>
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
        style: {
          stroke: 'url(#gradient)',
          strokeWidth: 3,
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#0891b2' },
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 h-auto bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 z-50 shadow-2xl overflow-hidden"
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

        <div className="relative z-10 px-6 py-6">
          {/* Primera fila: Título y acciones */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Icono animado */}
              <div className="relative">
                <div className="absolute inset-0 w-12 h-12 bg-cyan-300 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <Zap className="w-6 h-6 text-cyan-200 animate-pulse" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                  Crear Automatización
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">
                    {flowStatus.label === 'Válido' && '✓'}
                  </span>
                </h1>
                <p className="text-cyan-100 text-lg mt-1">
                  Construye flujos poderosos <span className="font-bold text-white px-2 py-0.5 bg-white/20 rounded-lg backdrop-blur-sm">sin código</span>
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                    flowStatus.color === 'green' ? 'bg-green-500/20 text-green-100 border-green-400/50' :
                    flowStatus.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-100 border-yellow-400/50' :
                    flowStatus.color === 'red' ? 'bg-red-500/20 text-red-100 border-red-400/50' :
                    'bg-white/20 text-white border-white/30'
                  }`}>
                    {flowStatus.label}
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                    <span className="text-sm font-semibold text-white">{nodes.length} nodos</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                    <span className="text-sm font-semibold text-white">{edges.length} conexiones</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-xl transition-all text-sm text-white"
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Plantillas</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportFlow}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-xl transition-all text-sm text-white"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Exportar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="p-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-xl transition-all text-white"
              >
                <Settings className="w-4 h-4" />
              </motion.button>
              <div className="w-px h-8 bg-white/20"></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 hover:bg-red-500/30 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-200" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 rounded-xl transition-all shadow-lg"
              >
                <Save className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Borrador</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTestModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/30 backdrop-blur-md border border-cyan-400/50 hover:bg-cyan-500/40 text-cyan-50 rounded-xl transition-all shadow-lg"
              >
                <PlayCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Probar</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveFlow}
                className="relative overflow-hidden flex items-center space-x-2 px-5 py-2 bg-white text-cyan-600 rounded-xl transition-all shadow-xl hover:shadow-2xl font-bold group"
              >
                <div className="absolute inset-0 bg-cyan-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Play className="w-4 h-4 relative z-10" />
                <span className="text-sm relative z-10">Activar</span>
              </motion.button>
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
                  className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-cyan-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl cursor-pointer text-sm font-semibold text-white transition-all hover:bg-white/15"
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
                className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-cyan-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
              />
            </div>
          </div>

          {/* Errores de validación */}
          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/20 backdrop-blur-md border border-red-400/50 rounded-2xl"
            >
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-200 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-red-100 mb-2">
                    Errores en el flujo:
                  </div>
                  <ul className="text-xs text-red-200 space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-red-300"></div>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Panel Izquierdo - Paleta de Nodos */}
      <AnimatePresence>
        {!leftPanelCollapsed && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-80 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-2xl overflow-hidden"
            style={{ marginTop: validationErrors.length > 0 ? '265px' : '220px' }}
          >
            {/* Decoración de fondo */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 opacity-30 blur-2xl"></div>

            <div className="h-full overflow-y-auto custom-scrollbar relative z-10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 uppercase tracking-wide">
                      Paleta de Nodos
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">Arrastra al canvas</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowVariables(!showVariables)}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all font-semibold shadow-md"
                  >
                    Variables
                  </motion.button>
                </div>

                {/* Variables Panel */}
                {showVariables && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-5 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="text-xs font-bold text-cyan-800 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      Variables Disponibles
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {availableVariables.map((v, idx) => (
                        <motion.div
                          key={v.key}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="group relative overflow-hidden flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-cyan-50 cursor-pointer transition-all hover:shadow-md border border-transparent hover:border-cyan-200"
                          onClick={() => copyVariable(v.key)}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

                          <div className="flex-1 relative z-10">
                            <div className="text-xs font-mono font-bold text-cyan-700">
                              {v.key}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">{v.description}</div>
                          </div>
                          <Copy className="w-4 h-4 text-cyan-400 group-hover:text-cyan-600 transition-colors relative z-10" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Categorías de Nodos */}
                <div className="space-y-4">
                  {/* DISPARADORES */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/60 backdrop-blur-md border border-green-200 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <button
                      onClick={() => toggleCategory('triggers')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <PlayCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-green-800">
                          DISPARADORES
                        </span>
                        <span className="text-xs text-green-700 bg-green-200 px-2.5 py-0.5 rounded-full font-bold">
                          {nodeTemplates.triggers.length}
                        </span>
                      </div>
                      {collapsedCategories.triggers ? (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                    {!collapsedCategories.triggers && (
                      <div className="p-3 space-y-2 bg-gradient-to-br from-white/50 to-green-50/50">
                        {nodeTemplates.triggers.map((template, idx) => {
                          const Icon = template.icon;
                          return (
                            <motion.div
                              key={template.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="group relative overflow-hidden flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-xl cursor-move transition-all border border-green-200/50 hover:border-green-300 hover:shadow-md"
                            >
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="text-sm font-bold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate mt-0.5">
                                  {template.description}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* CONDICIONES */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/60 backdrop-blur-md border border-yellow-200 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <button
                      onClick={() => toggleCategory('conditions')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                          <GitBranch className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-yellow-800">
                          CONDICIONES
                        </span>
                        <span className="text-xs text-yellow-700 bg-yellow-200 px-2.5 py-0.5 rounded-full font-bold">
                          {nodeTemplates.conditions.length}
                        </span>
                      </div>
                      {collapsedCategories.conditions ? (
                        <ChevronDown className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-yellow-600" />
                      )}
                    </button>
                    {!collapsedCategories.conditions && (
                      <div className="p-3 space-y-2 bg-gradient-to-br from-white/50 to-yellow-50/50">
                        {nodeTemplates.conditions.map((template, idx) => {
                          const Icon = template.icon;
                          return (
                            <motion.div
                              key={template.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="group relative overflow-hidden flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 rounded-xl cursor-move transition-all border border-yellow-200/50 hover:border-yellow-300 hover:shadow-md"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="text-sm font-bold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate mt-0.5">
                                  {template.description}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* ACCIONES */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/60 backdrop-blur-md border border-cyan-200 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <button
                      onClick={() => toggleCategory('actions')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-cyan-800">ACCIONES</span>
                        <span className="text-xs text-cyan-700 bg-cyan-200 px-2.5 py-0.5 rounded-full font-bold">
                          {nodeTemplates.actions.length}
                        </span>
                      </div>
                      {collapsedCategories.actions ? (
                        <ChevronDown className="w-5 h-5 text-cyan-600" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-cyan-600" />
                      )}
                    </button>
                    {!collapsedCategories.actions && (
                      <div className="p-3 space-y-2 bg-gradient-to-br from-white/50 to-cyan-50/50">
                        {nodeTemplates.actions.map((template, idx) => {
                          const Icon = template.icon;
                          return (
                            <motion.div
                              key={template.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="group relative overflow-hidden flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl cursor-move transition-all border border-cyan-200/50 hover:border-cyan-300 hover:shadow-md"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="text-sm font-bold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate mt-0.5">
                                  {template.description}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* UTILIDADES */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <button
                      onClick={() => toggleCategory('utilities')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Settings className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">UTILIDADES</span>
                        <span className="text-xs text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full font-bold">
                          {nodeTemplates.utilities.length}
                        </span>
                      </div>
                      {collapsedCategories.utilities ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                    {!collapsedCategories.utilities && (
                      <div className="p-3 space-y-2 bg-gradient-to-br from-white/50 to-slate-50/50">
                        {nodeTemplates.utilities.map((template, idx) => {
                          const Icon = template.icon;
                          return (
                            <motion.div
                              key={template.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  'application/reactflow',
                                  JSON.stringify(template)
                                );
                                e.dataTransfer.effectAllowed = 'move';
                              }}
                              className="group relative overflow-hidden flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 rounded-xl cursor-move transition-all border border-slate-200/50 hover:border-slate-300 hover:shadow-md"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="text-sm font-bold text-gray-800 truncate">
                                  {template.label}
                                </div>
                                <div className="text-xs text-gray-600 truncate mt-0.5">
                                  {template.description}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
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
        className="flex-1 relative"
        style={{ marginTop: validationErrors.length > 0 ? '265px' : '220px' }}
      >
        {/* Grid pattern de fondo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(8,145,178,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(8,145,178,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

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
          snapGrid={[20, 20]}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <Background variant={BackgroundVariant.Dots} gap={40} size={1.5} color="#cbd5e1" />
          <Controls className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl" />
          <MiniMap
            nodeColor={(node) => {
              const colors: Record<string, string> = {
                trigger: '#10b981',
                condition: '#eab308',
                action: '#06b6d4',
                utility: '#64748b',
              };
              return colors[node.type || 'action'] || '#06b6d4';
            }}
            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden"
            style={{
              backgroundColor: 'transparent',
            }}
          />
          <Panel position="top-left" className="m-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                  INSTRUCCIONES
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  <span>Arrastra nodos desde el panel izquierdo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  <span>Conecta arrastrando desde los puntos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  <span>Click en un nodo para configurar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  <span>Rueda del mouse para zoom</span>
                </div>
              </div>
            </motion.div>
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
            className="w-96 bg-white/80 backdrop-blur-xl border-l border-white/50 shadow-2xl overflow-hidden"
            style={{ marginTop: validationErrors.length > 0 ? '265px' : '220px' }}
          >
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-bl from-cyan-100 via-blue-100 to-indigo-100 opacity-30 blur-2xl"></div>

            <div className="h-full overflow-y-auto custom-scrollbar relative z-10">
              {selectedNode ? (
                <div className="p-5">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        selectedNode.data.type === 'trigger' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                        selectedNode.data.type === 'condition' ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                        selectedNode.data.type === 'action' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' :
                        'bg-gradient-to-br from-slate-500 to-gray-600'
                      }`}>
                        {React.createElement(selectedNode.data.icon, {
                          className: 'w-6 h-6 text-white',
                        })}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                          Configurar Nodo
                        </h3>
                        <p className="text-base font-bold text-gray-800 mt-0.5">
                          {selectedNode.data.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ID: {selectedNode.id}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onDeleteNode}
                      className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
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

                    <div className="pt-5 border-t border-gray-200/50">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          updateNodeConfig(selectedNode.data.config || {})
                        }
                        className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all group"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Aplicar Cambios</span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl blur-2xl opacity-30"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl flex items-center justify-center border border-cyan-200">
                      <Settings className="w-10 h-10 text-cyan-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Sin Nodo Seleccionado
                  </h3>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Haz click en un nodo del canvas para ver y editar su configuración
                  </p>
                </motion.div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con gradiente */}
              <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <FileText className="w-7 h-7" />
                    Plantillas de Flujo
                  </h2>
                  <p className="text-cyan-100 mt-2">
                    Comienza con una plantilla prediseñada y personalízala
                  </p>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)] custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  {flowTemplates.map((template, idx) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative overflow-hidden p-5 bg-white/60 backdrop-blur-sm border-2 border-cyan-200/50 rounded-2xl hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => loadTemplate(template)}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-bold border border-cyan-200">
                            {template.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2 text-base">{template.name}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-cyan-600 font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                          Click para usar
                        </div>
                      </div>
                    </motion.div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowTestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full border border-white/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con gradiente */}
              <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <PlayCircle className="w-7 h-7" />
                    Probar Flujo
                  </h2>
                  <p className="text-cyan-100 mt-2">
                    Simula la ejecución del flujo con datos de prueba
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Seleccionar Cliente de Prueba
                  </label>
                  <select className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-cyan-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm font-medium">
                    <option>Juan Pérez (Premium)</option>
                    <option>María García (Básico)</option>
                    <option>Carlos López (Inactivo - 15 días)</option>
                  </select>
                </div>

                <div className="relative overflow-hidden p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl mb-5">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <PlayCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-base font-bold text-cyan-800">
                        Simulación de Ejecución
                      </div>
                    </div>
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-700">Trigger activado: Nuevo Cliente</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-700">Condición evaluada: Membresía = Premium</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-700">Acción: Email enviado ✓</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-yellow-200"
                      >
                        <Timer className="w-5 h-5 text-yellow-600 animate-spin" />
                        <span className="text-sm font-semibold text-gray-700">Esperando 2 días...</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTestModal(false)}
                    className="flex-1 py-3 bg-white border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700"
                  >
                    Cerrar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden flex-1 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">Ejecutar Simulación</span>
                  </motion.button>
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