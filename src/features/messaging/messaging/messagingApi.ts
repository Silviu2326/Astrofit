// Mock API para el sistema de mensajería
export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  status: 'active' | 'archived' | 'blocked';
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sent' | 'delivered' | 'read';
  isFromClient: boolean;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    clientId: 'client-1',
    clientName: 'Ana García',
    lastMessage: 'Perfecto, nos vemos mañana a las 10:00',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
    unreadCount: 0,
    isOnline: true,
    status: 'active',
    tags: ['Premium', 'Entrenamiento Personal']
  },
  {
    id: '2',
    clientId: 'client-2',
    clientName: 'Carlos Ruiz',
    lastMessage: '¿Podrías enviarme la rutina de piernas?',
    lastMessageTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
    unreadCount: 1,
    isOnline: false,
    status: 'active',
    tags: ['Básico', 'Rutinas']
  },
  {
    id: '3',
    clientId: 'client-3',
    clientName: 'María López',
    lastMessage: 'Gracias por la sesión de hoy, me siento mucho mejor',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    unreadCount: 0,
    isOnline: false,
    status: 'active',
    tags: ['Premium', 'Rehabilitación']
  },
  {
    id: '4',
    clientId: 'client-4',
    clientName: 'Pedro Sánchez',
    lastMessage: '¿Qué tal si cambiamos la cita del viernes?',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    unreadCount: 2,
    isOnline: true,
    status: 'active',
    tags: ['Básico', 'Flexibilidad']
  },
  {
    id: '5',
    clientId: 'client-5',
    clientName: 'Laura Martín',
    lastMessage: 'He completado todos los ejercicios de la semana',
    lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
    unreadCount: 0,
    isOnline: false,
    status: 'active',
    tags: ['Premium', 'Disciplinada']
  },
  {
    id: '6',
    clientId: 'client-6',
    clientName: 'Javier Torres',
    lastMessage: 'Necesito ayuda con la técnica de sentadillas',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
    unreadCount: 1,
    isOnline: false,
    status: 'active',
    tags: ['Básico', 'Técnica']
  },
  {
    id: '7',
    clientId: 'client-7',
    clientName: 'Carmen Díaz',
    lastMessage: '¿Cuándo es mi próxima evaluación?',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    unreadCount: 0,
    isOnline: false,
    status: 'archived',
    tags: ['Premium', 'Evaluaciones']
  }
];

const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'msg-1-1',
      conversationId: '1',
      senderId: 'client-1',
      senderName: 'Ana García',
      content: 'Hola! ¿Cómo estás?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: true
    },
    {
      id: 'msg-1-2',
      conversationId: '1',
      senderId: 'trainer',
      senderName: 'Entrenador',
      content: '¡Hola Ana! Muy bien, gracias. ¿Cómo te sientes después de la sesión de ayer?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: false
    },
    {
      id: 'msg-1-3',
      conversationId: '1',
      senderId: 'client-1',
      senderName: 'Ana García',
      content: 'Excelente! Me siento muy motivada. ¿Podemos programar la próxima sesión?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: true
    },
    {
      id: 'msg-1-4',
      conversationId: '1',
      senderId: 'trainer',
      senderName: 'Entrenador',
      content: '¡Perfecto! Me alegra saberlo. ¿Te parece bien mañana a las 10:00?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: false
    },
    {
      id: 'msg-1-5',
      conversationId: '1',
      senderId: 'client-1',
      senderName: 'Ana García',
      content: 'Perfecto, nos vemos mañana a las 10:00',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: true
    }
  ],
  '2': [
    {
      id: 'msg-2-1',
      conversationId: '2',
      senderId: 'client-2',
      senderName: 'Carlos Ruiz',
      content: 'Hola! ¿Podrías enviarme la rutina de piernas que hablamos?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: true
    },
    {
      id: 'msg-2-2',
      conversationId: '2',
      senderId: 'trainer',
      senderName: 'Entrenador',
      content: '¡Por supuesto Carlos! Te la envío ahora mismo. Recuerda calentar bien antes de empezar.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: false
    }
  ],
  '3': [
    {
      id: 'msg-3-1',
      conversationId: '3',
      senderId: 'client-3',
      senderName: 'María López',
      content: 'Gracias por la sesión de hoy, me siento mucho mejor. La técnica que me enseñaste me ayudó mucho.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
      status: 'read',
      isFromClient: true
    }
  ],
  '4': [
    {
      id: 'msg-4-1',
      conversationId: '4',
      senderId: 'client-4',
      senderName: 'Pedro Sánchez',
      content: 'Hola! ¿Qué tal si cambiamos la cita del viernes?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'text',
      status: 'delivered',
      isFromClient: true
    },
    {
      id: 'msg-4-2',
      conversationId: '4',
      senderId: 'client-4',
      senderName: 'Pedro Sánchez',
      content: 'Tengo un imprevisto familiar y no podré asistir.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: 'text',
      status: 'delivered',
      isFromClient: true
    }
  ]
};

class MessagingApi {
  async getConversations(): Promise<Conversation[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockConversations];
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMessages[conversationId] || [];
  }

  async sendMessage(conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text'): Promise<Message> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newMessage: Message = {
      id: `msg-${conversationId}-${Date.now()}`,
      conversationId,
      senderId: 'trainer',
      senderName: 'Entrenador',
      content,
      timestamp: new Date(),
      type,
      status: 'sent',
      isFromClient: false
    };

    // Actualizar mock data
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);

    // Actualizar última conversación
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.lastMessage = content;
      conversation.lastMessageTime = new Date();
    }

    return newMessage;
  }

  async markAsRead(conversationId: string): Promise<void> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
    }
  }

  async archiveConversation(conversationId: string): Promise<void> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.status = 'archived';
    }
  }

  async blockConversation(conversationId: string): Promise<void> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.status = 'blocked';
    }
  }

  async getConversationById(conversationId: string): Promise<Conversation | null> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return mockConversations.find(c => c.id === conversationId) || null;
  }

  // Método para simular mensajes entrantes (para testing)
  async simulateIncomingMessage(conversationId: string, content: string): Promise<Message> {
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const newMessage: Message = {
      id: `msg-${conversationId}-${Date.now()}`,
      conversationId,
      senderId: conversation.clientId,
      senderName: conversation.clientName,
      content,
      timestamp: new Date(),
      type: 'text',
      status: 'delivered',
      isFromClient: true
    };

    // Actualizar mock data
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);

    // Actualizar conversación
    conversation.lastMessage = content;
    conversation.lastMessageTime = new Date();
    conversation.unreadCount += 1;

    return newMessage;
  }
}

export const messagingApi = new MessagingApi();
