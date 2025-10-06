import { Flow, FlowTemplate, FlowStats, FlowExecution, FlowAnalytics, Segment, AIOptimization } from './types';

export const mockFlowStats: FlowStats = {
  activeFlows: 12,
  clientsInFlows: 847,
  retentionRate: 78.5,
  conversionsGenerated: 234
};

export const mockFlows: Flow[] = [
  {
    id: '1',
    name: 'Onboarding Nuevos Clientes',
    trigger: 'Registro completado',
    steps: 5,
    activeClients: 156,
    conversionRate: 85.2,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    revenue: 12450
  },
  {
    id: '2',
    name: 'Reactivación Inactivos 7 días',
    trigger: 'Inactividad > 7 días',
    steps: 4,
    activeClients: 89,
    conversionRate: 42.3,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22',
    revenue: 8900
  },
  {
    id: '3',
    name: 'Upsell Premium',
    trigger: 'Uso features > 80%',
    steps: 3,
    activeClients: 234,
    conversionRate: 32.8,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-21',
    revenue: 45600
  },
  {
    id: '4',
    name: 'Renovación Suscripción',
    trigger: '7 días antes de vencer',
    steps: 4,
    activeClients: 178,
    conversionRate: 91.5,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-23',
    revenue: 67200
  },
  {
    id: '5',
    name: 'Carrito Abandonado',
    trigger: 'Abandonó pago',
    steps: 3,
    activeClients: 67,
    conversionRate: 38.9,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-22',
    revenue: 5600
  },
  {
    id: '6',
    name: 'Feedback Post-Compra',
    trigger: 'Compra completada',
    steps: 2,
    activeClients: 123,
    conversionRate: 68.4,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-11',
    updatedAt: '2024-01-19',
    revenue: 0
  },
  {
    id: '7',
    name: 'Reenganche 30 días',
    trigger: 'Inactividad > 30 días',
    steps: 5,
    activeClients: 45,
    conversionRate: 24.6,
    status: 'paused',
    nodes: [],
    edges: [],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18',
    revenue: 3200
  },
  {
    id: '8',
    name: 'Cross-sell Producto B',
    trigger: 'Compró Producto A',
    steps: 3,
    activeClients: 92,
    conversionRate: 45.7,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-23',
    revenue: 18400
  },
  {
    id: '9',
    name: 'Prevención de Churn',
    trigger: 'Reducción de uso > 50%',
    steps: 4,
    activeClients: 34,
    conversionRate: 56.8,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-13',
    updatedAt: '2024-01-21',
    revenue: 12100
  },
  {
    id: '10',
    name: 'Programa Referidos',
    trigger: 'Cliente activo > 3 meses',
    steps: 2,
    activeClients: 201,
    conversionRate: 28.3,
    status: 'active',
    nodes: [],
    edges: [],
    createdAt: '2024-01-09',
    updatedAt: '2024-01-20',
    revenue: 9500
  },
  {
    id: '11',
    name: 'Educación Producto',
    trigger: 'Bajo uso features',
    steps: 6,
    activeClients: 167,
    conversionRate: 72.1,
    status: 'draft',
    nodes: [],
    edges: [],
    createdAt: '2024-01-17',
    updatedAt: '2024-01-22',
    revenue: 0
  },
  {
    id: '12',
    name: 'Win-back Cancelados',
    trigger: 'Canceló hace 2 meses',
    steps: 5,
    activeClients: 28,
    conversionRate: 18.9,
    status: 'paused',
    nodes: [],
    edges: [],
    createdAt: '2024-01-06',
    updatedAt: '2024-01-15',
    revenue: 1800
  }
];

export const mockTemplates: FlowTemplate[] = [
  {
    id: 'template-1',
    name: 'Onboarding de Nuevos Clientes',
    description: 'Flujo completo para dar la bienvenida y educar a nuevos usuarios',
    category: 'onboarding',
    icon: '👋',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: 'Nuevo Registro' }
      },
      {
        id: 'email-1',
        type: 'email',
        position: { x: 300, y: 100 },
        data: { label: 'Email de Bienvenida', config: { subject: '¡Bienvenido! Tutorial rápido' } }
      },
      {
        id: 'delay-1',
        type: 'delay',
        position: { x: 500, y: 100 },
        data: { label: 'Esperar 3 días', config: { duration: 3, unit: 'days' } }
      },
      {
        id: 'conditional-1',
        type: 'conditional',
        position: { x: 700, y: 100 },
        data: { label: '¿Agendó sesión?', config: { condition: 'session_scheduled' } }
      },
      {
        id: 'email-2',
        type: 'email',
        position: { x: 900, y: 50 },
        data: { label: 'Recordatorio Agendar', config: { subject: 'No olvides agendar tu primera sesión' } }
      },
      {
        id: 'delay-2',
        type: 'delay',
        position: { x: 900, y: 200 },
        data: { label: 'Esperar 4 días', config: { duration: 4, unit: 'days' } }
      },
      {
        id: 'email-3',
        type: 'email',
        position: { x: 1100, y: 150 },
        data: { label: 'Feedback Inicial', config: { subject: '¿Cómo va tu experiencia?' } }
      }
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'email-1' },
      { id: 'e2', source: 'email-1', target: 'delay-1' },
      { id: 'e3', source: 'delay-1', target: 'conditional-1' },
      { id: 'e4', source: 'conditional-1', target: 'email-2', label: 'No', type: 'no' },
      { id: 'e5', source: 'conditional-1', target: 'delay-2', label: 'Sí', type: 'yes' },
      { id: 'e6', source: 'delay-2', target: 'email-3' },
      { id: 'e7', source: 'email-2', target: 'email-3' }
    ]
  },
  {
    id: 'template-2',
    name: 'Reactivación de Inactivos',
    description: 'Recupera clientes que han estado inactivos por más de 7 días',
    category: 'reactivation',
    icon: '🔄',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: 'Inactividad > 7 días' }
      },
      {
        id: 'email-1',
        type: 'email',
        position: { x: 300, y: 100 },
        data: { label: 'Te extrañamos', config: { subject: '¡Te extrañamos! Vuelve y recibe un regalo' } }
      },
      {
        id: 'delay-1',
        type: 'delay',
        position: { x: 500, y: 100 },
        data: { label: 'Esperar 2 días', config: { duration: 2, unit: 'days' } }
      },
      {
        id: 'conditional-1',
        type: 'conditional',
        position: { x: 700, y: 100 },
        data: { label: '¿Volvió activo?', config: { condition: 'became_active' } }
      },
      {
        id: 'email-2',
        type: 'email',
        position: { x: 900, y: 100 },
        data: { label: 'Oferta especial 20%', config: { subject: 'Última oportunidad: 20% de descuento' } }
      }
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'email-1' },
      { id: 'e2', source: 'email-1', target: 'delay-1' },
      { id: 'e3', source: 'delay-1', target: 'conditional-1' },
      { id: 'e4', source: 'conditional-1', target: 'email-2', label: 'No', type: 'no' }
    ]
  },
  {
    id: 'template-3',
    name: 'Upsell a Plan Premium',
    description: 'Convierte usuarios que usan intensivamente las funciones básicas',
    category: 'upsell',
    icon: '⬆️',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: 'Uso features > 80%' }
      },
      {
        id: 'email-1',
        type: 'email',
        position: { x: 300, y: 100 },
        data: { label: 'Beneficios Premium', config: { subject: 'Desbloquea todo el potencial con Premium' } }
      },
      {
        id: 'delay-1',
        type: 'delay',
        position: { x: 500, y: 100 },
        data: { label: 'Esperar 1 día', config: { duration: 1, unit: 'days' } }
      },
      {
        id: 'email-2',
        type: 'email',
        position: { x: 700, y: 100 },
        data: { label: 'Descuento Limitado', config: { subject: '30% OFF Premium - Solo 48h' } }
      }
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'email-1' },
      { id: 'e2', source: 'email-1', target: 'delay-1' },
      { id: 'e3', source: 'delay-1', target: 'email-2' }
    ]
  },
  {
    id: 'template-4',
    name: 'Renovación de Suscripción',
    description: 'Asegura la renovación de suscripciones próximas a vencer',
    category: 'renewal',
    icon: '🔄',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: '7 días antes de vencer' }
      },
      {
        id: 'email-1',
        type: 'email',
        position: { x: 300, y: 100 },
        data: { label: 'Recordatorio Renovación', config: { subject: 'Tu suscripción vence en 7 días' } }
      },
      {
        id: 'delay-1',
        type: 'delay',
        position: { x: 500, y: 100 },
        data: { label: 'Esperar 4 días', config: { duration: 4, unit: 'days' } }
      },
      {
        id: 'email-2',
        type: 'email',
        position: { x: 700, y: 100 },
        data: { label: 'Urgencia 3 días', config: { subject: '⚠️ Solo 3 días para renovar' } }
      },
      {
        id: 'delay-2',
        type: 'delay',
        position: { x: 900, y: 100 },
        data: { label: 'Esperar 2 días', config: { duration: 2, unit: 'days' } }
      },
      {
        id: 'push-1',
        type: 'push',
        position: { x: 1100, y: 100 },
        data: { label: 'Notificación Urgente', config: { title: '¡Renueva hoy!', message: 'Tu suscripción vence hoy' } }
      }
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'email-1' },
      { id: 'e2', source: 'email-1', target: 'delay-1' },
      { id: 'e3', source: 'delay-1', target: 'email-2' },
      { id: 'e4', source: 'email-2', target: 'delay-2' },
      { id: 'e5', source: 'delay-2', target: 'push-1' }
    ]
  },
  {
    id: 'template-5',
    name: 'Recuperación de Carrito Abandonado',
    description: 'Recupera ventas de carritos abandonados con recordatorios y descuentos',
    category: 'recovery',
    icon: '🛒',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: 'Abandonó pago' }
      },
      {
        id: 'delay-1',
        type: 'delay',
        position: { x: 300, y: 100 },
        data: { label: 'Esperar 1 hora', config: { duration: 1, unit: 'hours' } }
      },
      {
        id: 'email-1',
        type: 'email',
        position: { x: 500, y: 100 },
        data: { label: 'Recordatorio Carrito', config: { subject: 'Olvidaste algo en tu carrito' } }
      },
      {
        id: 'delay-2',
        type: 'delay',
        position: { x: 700, y: 100 },
        data: { label: 'Esperar 23 horas', config: { duration: 23, unit: 'hours' } }
      },
      {
        id: 'email-2',
        type: 'email',
        position: { x: 900, y: 100 },
        data: { label: 'Descuento 15%', config: { subject: '15% OFF en tu carrito - Solo hoy' } }
      }
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'delay-1' },
      { id: 'e2', source: 'delay-1', target: 'email-1' },
      { id: 'e3', source: 'email-1', target: 'delay-2' },
      { id: 'e4', source: 'delay-2', target: 'email-2' }
    ]
  }
];

export const mockExecutions: FlowExecution[] = [
  {
    id: 'exec-1',
    flowId: '1',
    clientId: 'client-1',
    clientName: 'Juan Pérez',
    entryDate: '2024-01-23 10:30',
    currentStep: 'Email de Bienvenida',
    nextAction: 'Esperar 3 días',
    status: 'in_progress',
    completionRate: 40
  },
  {
    id: 'exec-2',
    flowId: '2',
    clientId: 'client-2',
    clientName: 'María García',
    entryDate: '2024-01-22 14:15',
    currentStep: 'Oferta especial 20%',
    nextAction: '-',
    status: 'in_progress',
    completionRate: 80
  },
  {
    id: 'exec-3',
    flowId: '1',
    clientId: 'client-3',
    clientName: 'Carlos López',
    entryDate: '2024-01-20 09:00',
    currentStep: 'Completado',
    nextAction: '-',
    status: 'completed',
    completionRate: 100
  },
  {
    id: 'exec-4',
    flowId: '3',
    clientId: 'client-4',
    clientName: 'Ana Martínez',
    entryDate: '2024-01-23 16:45',
    currentStep: 'Beneficios Premium',
    nextAction: 'Esperar 1 día',
    status: 'in_progress',
    completionRate: 33
  },
  {
    id: 'exec-5',
    flowId: '4',
    clientId: 'client-5',
    clientName: 'Luis Rodríguez',
    entryDate: '2024-01-21 11:20',
    currentStep: 'Urgencia 3 días',
    nextAction: 'Esperar 2 días',
    status: 'in_progress',
    completionRate: 60
  }
];

export const mockAnalytics: FlowAnalytics = {
  flowId: '1',
  totalEntries: 456,
  completions: 389,
  conversionRate: 85.3,
  averageTime: '4.2 días',
  revenue: 12450,
  nodeMetrics: [
    { nodeId: 'email-1', reached: 456, converted: 456, dropOffRate: 0 },
    { nodeId: 'delay-1', reached: 456, converted: 445, dropOffRate: 2.4 },
    { nodeId: 'conditional-1', reached: 445, converted: 412, dropOffRate: 7.4 },
    { nodeId: 'email-2', reached: 178, converted: 145, dropOffRate: 18.5 },
    { nodeId: 'email-3', reached: 389, converted: 389, dropOffRate: 0 }
  ],
  emailMetrics: [
    { nodeId: 'email-1', sent: 456, opened: 423, clicked: 398, openRate: 92.8, clickRate: 87.3 },
    { nodeId: 'email-2', sent: 178, opened: 145, clicked: 112, openRate: 81.5, clickRate: 62.9 },
    { nodeId: 'email-3', sent: 389, opened: 367, clicked: 289, openRate: 94.3, clickRate: 74.3 }
  ]
};

export const mockSegments: Segment[] = [
  { id: 'seg-1', name: 'Plan Premium', type: 'plan', value: 'premium', audienceSize: 1234 },
  { id: 'seg-2', name: 'Plan Básico', type: 'plan', value: 'basic', audienceSize: 5678 },
  { id: 'seg-3', name: 'España', type: 'location', value: 'ES', audienceSize: 2341 },
  { id: 'seg-4', name: 'México', type: 'location', value: 'MX', audienceSize: 3456 },
  { id: 'seg-5', name: 'Alto Engagement', type: 'behavior', value: 'high_engagement', audienceSize: 987 },
  { id: 'seg-6', name: 'Bajo Engagement', type: 'behavior', value: 'low_engagement', audienceSize: 1567 },
  { id: 'seg-7', name: 'VIP', type: 'tag', value: 'vip', audienceSize: 456 }
];

export const mockAIOptimizations: AIOptimization[] = [
  {
    suggestion: 'Agregar delay de 2h después del primer email mejora conversión 15%',
    impact: '+15% conversión',
    confidence: 92,
    type: 'delay',
    nodeId: 'email-1'
  },
  {
    suggestion: 'Email con subject "🎁 Regalo especial para ti" tiene 23% mejor tasa de apertura',
    impact: '+23% apertura',
    confidence: 88,
    type: 'subject',
    nodeId: 'email-2'
  },
  {
    suggestion: 'Nodo "Email recordatorio" tiene alto drop-off (45%), revisar contenido',
    impact: 'Alto drop-off detectado',
    confidence: 95,
    type: 'content',
    nodeId: 'email-reminder'
  },
  {
    suggestion: 'Dividir path en A/B test: email vs SMS puede mejorar 18% conversión',
    impact: '+18% conversión estimada',
    confidence: 76,
    type: 'path'
  }
];
