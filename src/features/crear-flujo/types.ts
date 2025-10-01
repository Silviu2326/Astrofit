/**
 * @file Contiene todas las definiciones de tipos e interfaces para el módulo de creación de flujos.
 * @author Tu Nombre <tu.email@example.com>
 * @version 1.0.0
 */

// =================================================================
// 1. TIPOS DE NODOS
// =================================================================

/**
 * Representa los tipos de nodos permitidos en el flujo.
 * - `trigger`: Nodo de inicio que dispara el flujo.
 * - `action`: Nodo que ejecuta una acción específica (ej. enviar email).
 * - `condition`: Nodo que bifurca el flujo basado en una condición.
 * - `delay`: Nodo que introduce una espera en el flujo.
 */
export type NodeType = 'trigger' | 'action' | 'condition' | 'delay';

/**
 * Posición de un nodo en el lienzo.
 */
export interface NodePosition {
  /** Coordenada X */
  x: number;
  /** Coordenada Y */
  y: number;
}

/**
 * Estilos aplicables a un nodo.
 */
export interface NodeStyle {
  /** Color de fondo del nodo */
  backgroundColor?: string;
  /** Color del borde */
  borderColor?: string;
  /** Ancho del borde */
  borderWidth?: number;
  /** Radio del borde */
  borderRadius?: number;
}

/**
 * Datos base compartidos por todos los nodos.
 */
export interface BaseNodeData {
  /** Identificador único del nodo */
  id: string;
  /** Tipo de nodo */
  type: NodeType;
  /** Etiqueta visible del nodo */
  label: string;
  /** Descripción opcional del nodo */
  description?: string;
}

/**
 * Datos específicos para un nodo de tipo 'trigger'.
 */
export interface TriggerNodeData extends BaseNodeData {
  type: 'trigger';
  /** Configuración específica del disparador */
  config: {
    /** Tipo de evento que inicia el flujo (ej. 'user_registered') */
    eventName: string;
  };
}

/**
 * Datos específicos para un nodo de tipo 'action'.
 */
export interface ActionNodeData extends BaseNodeData {
  type: 'action';
  /** Configuración de la acción a realizar */
  config: EmailConfig | SMSConfig | WebhookConfig;
}

/**
 * Datos específicos para un nodo de tipo 'condition'.
 */
export interface ConditionNodeData extends BaseNodeData {
  type: 'condition';
  /** Configuración de la condición a evaluar */
  config: ConditionConfig;
}

/**
 * Datos específicos para un nodo de tipo 'delay'.
 */
export interface DelayNodeData extends BaseNodeData {
  type: 'delay';
  /** Configuración del tiempo de espera */
  config: DelayConfig;
}

/**
 * Unión de todos los tipos de datos de nodos.
 */
export type NodeData = TriggerNodeData | ActionNodeData | ConditionNodeData | DelayNodeData;

// =================================================================
// 2. TIPOS DE CONEXIONES (EDGES)
// =================================================================

/**
 * Tipos de conexiones entre nodos.
 * - `success`: Conexión estándar para el siguiente paso exitoso.
 * - `error`: Conexión para manejar fallos en un nodo.
 * - `conditional`: Conexión que depende del resultado de un nodo de condición.
 * - `delay`: Conexión que sigue a un nodo de espera.
 */
export type ConnectionType = 'success' | 'error' | 'conditional' | 'delay';

/**
 * Datos asociados a una conexión (edge).
 */
export interface EdgeData {
  /** Tipo de conexión */
  type: ConnectionType;
  /** Etiqueta opcional para la conexión */
  label?: string;
  /** Configuración específica para conexiones condicionales */
  condition?: {
    /** Valor esperado para activar esta rama (ej. 'true', 'false') */
    expectedValue: string;
  };
}

/**
 * Regla para validar si una conexión entre dos nodos es permitida.
 */
export interface ConnectionRule {
  /** Tipo de nodo de origen */
  sourceType: NodeType;
  /** Tipo de nodo de destino */
  targetType: NodeType;
  /** Tipos de conexión permitidos entre el origen y el destino */
  allowedConnections: ConnectionType[];
}

// =================================================================
// 3. ESTADO DEL FLUJO
// =================================================================

/**
 * Estado actual del flujo de trabajo.
 * - `draft`: El flujo está en modo de edición.
 * - `active`: El flujo está publicado y en ejecución.
 * - `paused`: El flujo está temporalmente detenido.
 * - `error`: El flujo ha encontrado un error crítico.
 */
export type FlowState = 'draft' | 'active' | 'paused' | 'error';

/**
 * Metadatos y configuración general del flujo.
 */
export interface FlowConfig {
  /** Identificador único del flujo */
  id: string;
  /** Nombre del flujo */
  name: string;
  /** Descripción detallada del propósito del flujo */
  description?: string;
  /** Estado actual del flujo */
  state: FlowState;
  /** Fecha de creación del flujo */
  createdAt: Date;
  /** Fecha de la última actualización */
  updatedAt: Date;
}

/**
 * Representa una versión guardada del flujo.
 */
export interface FlowVersion {
  /** Identificador de la versión */
  versionId: string;
  /** Nodos que componen el flujo en esta versión */
  nodes: NodeData[];
  /** Conexiones entre los nodos */
  edges: EdgeData[];
  /** Comentario o descripción de los cambios en esta versión */
  commitMessage: string;
  /** Fecha en que se creó esta versión */
  createdAt: Date;
}

// =================================================================
// 4. CONFIGURACIONES ESPECÍFICAS DE NODOS
// =================================================================

/**
 * Configuración para un nodo de acción de envío de email.
 */
export interface EmailConfig {
  /** Tipo de acción */
  actionType: 'send_email';
  /** Asunto del correo */
  subject: string;
  /** Cuerpo del correo (puede ser HTML) */
  body: string;
  /** Plantilla de correo a utilizar */
  templateId?: string;
  /** Destinatario(s) del correo */
  recipient: string;
}

/**
 * Configuración para un nodo de acción de envío de SMS.
 */
export interface SMSConfig {
  /** Tipo de acción */
  actionType: 'send_sms';
  /** Contenido del mensaje */
  message: string;
  /** Número de teléfono del destinatario */
  recipient: string;
}

/**
 * Configuración para un nodo de acción de tipo Webhook.
 */
export interface WebhookConfig {
  /** Tipo de acción */
  actionType: 'webhook';
  /** URL del endpoint a llamar */
  url: string;
  /** Método HTTP a utilizar */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Cabeceras de la solicitud */
  headers?: Record<string, string>;
  /** Cuerpo de la solicitud (para POST/PUT) */
  body?: Record<string, any>;
}

/**
 * Configuración para un nodo de condición.
 */
export interface ConditionConfig {
  /** Variable o campo a evaluar */
  variable: string;
  /** Operador de comparación */
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  /** Valor con el que se compara */
  value: string | number | boolean;
}

/**
 * Configuración para un nodo de espera (delay).
 */
export interface DelayConfig {
  /** Duración de la espera */
  duration: number;
  /** Unidad de tiempo para la duración */
  unit: 'seconds' | 'minutes' | 'hours' | 'days';
}

/**
 * Resultado de una validación de flujo.
 */
export interface ValidationResult {
  /** Indica si el flujo es válido */
  isValid: boolean;
  /** Mensajes de error o advertencia */
  messages: string[];
}

/**
 * Resultado de una prueba de ejecución del flujo.
 */
export interface TestResult {
  /** Indica si la prueba fue exitosa */
  success: boolean;
  /** Registros de la ejecución de cada nodo */
  logs: Array<{
    nodeId: string;
    status: 'success' | 'error';
    message: string;
    timestamp: Date;
  }>;
}

// =================================================================
// 5. PROPS DE COMPONENTES DE REACT
// =================================================================

/**
 * Props para el componente principal del editor de flujos.
 */
export interface FlowEditorProps {
  /** Flujo inicial a cargar en el editor */
  initialFlow?: FlowVersion;
  /** Callback que se ejecuta al guardar el flujo */
  onSave: (flow: FlowVersion) => void;
  /** Callback que se ejecuta al cambiar el estado del flujo */
  onStateChange?: (newState: FlowState) => void;
}

/**
 * Props para un componente que renderiza un nodo.
 */
export interface NodeComponentProps {
  /** Datos del nodo a renderizar */
  data: NodeData;
  /** Indica si el nodo está seleccionado */
  isSelected: boolean;
  /** Callback para manejar cambios en los datos del nodo */
  onUpdate: (nodeId: string, newData: Partial<NodeData>) => void;
}

/**
 * Props para el panel de configuración de un nodo.
 */
export interface NodeSettingsPanelProps {
  /** Nodo seleccionado para mostrar su configuración */
  selectedNode: NodeData | null;
  /** Callback para actualizar los datos del nodo */
  onUpdateNode: (nodeId: string, newConfig: any) => void;
  /** Callback para cerrar el panel */
  onClose: () => void;
}

// =================================================================
// TIPOS DE EVENT HANDLERS Y CALLBACKS
// =================================================================

/**
 * Tipo para un manejador de eventos de clic en un nodo.
 * @param event - El evento del mouse.
 * @param node - El nodo que fue clickeado.
 */
export type NodeClickHandler = (event: React.MouseEvent<HTMLDivElement>, node: NodeData) => void;

/**
 * Tipo para una función de callback que se ejecuta al completar una acción.
 * @param success - Indica si la operación fue exitosa.
 * @param error - Mensaje de error si la operación falló.
 */
export type ActionCallback = (success: boolean, error?: string) => void;