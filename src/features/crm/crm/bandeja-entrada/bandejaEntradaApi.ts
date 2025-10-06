interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  type: 'client' | 'system' | 'payment';
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  category: 'client' | 'business' | 'personal';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  actionRequired: boolean;
}

export const bandejaEntradaApi = {
  getMessages: (): Message[] => [
    {
      id: '1',
      sender: 'María González',
      subject: 'Consulta sobre rutina de ejercicios',
      content: 'Hola Carlos, quería preguntarte sobre la rutina que me asignaste. ¿Puedo hacer los ejercicios en casa o necesito ir al gimnasio?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'high',
      type: 'client'
    },
    {
      id: '2',
      sender: 'Sistema TrainerPro',
      subject: 'Pago procesado correctamente',
      content: 'El pago de $150 de Ana López ha sido procesado exitosamente.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: 'medium',
      type: 'system'
    },
    {
      id: '3',
      sender: 'Juan Pérez',
      subject: 'Cancelación de sesión',
      content: 'Hola Carlos, necesito cancelar mi sesión de mañana por motivos familiares. ¿Podemos reprogramarla?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      priority: 'high',
      type: 'client'
    },
    {
      id: '4',
      sender: 'Sistema de Pagos',
      subject: 'Pago pendiente - Laura Martín',
      content: 'El pago de Laura Martín está vencido desde hace 3 días.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
      priority: 'high',
      type: 'payment'
    }
  ],

  getTasks: (): Task[] => [
    {
      id: '1',
      title: 'Actualizar rutina de María González',
      description: 'Revisar y actualizar la rutina basada en su progreso',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'high',
      assignedTo: 'Carlos Entrenador',
      category: 'client'
    },
    {
      id: '2',
      title: 'Seguimiento nutricional - Ana López',
      description: 'Revisar diario alimenticio y ajustar plan',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      completed: false,
      priority: 'medium',
      assignedTo: 'Carlos Entrenador',
      category: 'client'
    },
    {
      id: '3',
      title: 'Renovar certificación CPR',
      description: 'La certificación vence el próximo mes',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'medium',
      assignedTo: 'Carlos Entrenador',
      category: 'business'
    },
    {
      id: '4',
      title: 'Preparar materiales para sesión grupal',
      description: 'Sesión de yoga del viernes',
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
      completed: true,
      priority: 'low',
      assignedTo: 'Carlos Entrenador',
      category: 'business'
    }
  ],

  getNotifications: (): Notification[] => [
    {
      id: '1',
      title: 'Sesión próxima',
      message: 'Sesión con María González en 30 minutos',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      type: 'info',
      actionRequired: true
    },
    {
      id: '2',
      title: 'Nuevo cliente registrado',
      message: 'Pedro Ruiz se ha registrado como nuevo cliente',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false,
      type: 'success',
      actionRequired: true
    },
    {
      id: '3',
      title: 'Recordatorio de pago',
      message: 'Laura Martín tiene un pago pendiente',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
      type: 'warning',
      actionRequired: false
    },
    {
      id: '4',
      title: 'Backup completado',
      message: 'Respaldo de datos completado exitosamente',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true,
      type: 'success',
      actionRequired: false
    }
  ]
};