
import { MessageTone, MessageTemplate, MessageEffectiveness } from './types';

// Mock API functions for Agente de Comunicación

export const agenteComunicacionApi = {
  /**
   * Generates a message based on content, tone, and length.
   * @param content The main content or idea for the message.
   * @param tone The desired tone (e.g., 'warm', 'technical', 'motivational').
   * @param length The desired length (e.g., 'short', 'medium', 'long').
   * @returns A promise that resolves with the generated message string.
   */
  generateMessage: async (content: string, tone: MessageTone, length: 'short' | 'medium' | 'long'): Promise<string> => {
    console.log(`Generating message with content: "${content}", tone: ${tone}, length: ${length}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockMessages: Record<MessageTone, string[]> = {
      warm: [
        `¡Hola! Esperamos que tengas un día fantástico. Recuerda que estamos aquí para apoyarte en cada paso.`, 
        `Un saludo cordial. Queremos recordarte lo valioso que eres para nuestra comunidad.`, 
        `Con cariño, te enviamos este mensaje para animarte a seguir adelante con tus metas.`
      ],
      technical: [
        `Estimado usuario, se ha detectado una actualización crítica en su perfil. Por favor, revise los detalles en su panel de control.`, 
        `Notificación de sistema: La API v2.0 ha sido desplegada con nuevas funcionalidades. Consulte la documentación técnica.`, 
        `Informe de rendimiento: Su campaña ha alcanzado un 95% de eficiencia. Acceda a las métricas completas.`
      ],
      motivational: [
        `¡No te rindas! Cada esfuerzo cuenta y te acerca más a tus objetivos. ¡Tú puedes!`, 
        `Inspírate y actúa. El éxito es la suma de pequeños esfuerzos repetidos día tras día.`, 
        `Desafía tus límites. Tu potencial es ilimitado y cada paso te fortalece.`
      ],
    };

    const messages = mockMessages[tone] || mockMessages.warm;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return `[${tone.toUpperCase()} - ${length.toUpperCase()}] ${messages[randomIndex]} (Basado en: "${content}")`;
  },

  /**
   * Fetches a predefined message template.
   * @param templateType The type of template to fetch (e.g., 'welcome', 'session_reminder', 'motivational').
   * @returns A promise that resolves with the message template object.
   */
  getTemplate: async (templateType: 'welcome' | 'session_reminder' | 'motivational'): Promise<MessageTemplate> => {
    console.log(`Fetching template: ${templateType}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    const templates: Record<typeof templateType, MessageTemplate> = {
      welcome: {
        id: 'tpl-001',
        name: 'Mensaje de Bienvenida',
        content: '¡Hola [CLIENT_NAME]! Te damos la bienvenida a El Copy Fitness. Estamos emocionados de tenerte a bordo.',
        tone: 'warm',
      },
      session_reminder: {
        id: 'tpl-002',
        name: 'Recordatorio de Sesión',
        content: 'Hola [CLIENT_NAME], te recordamos tu sesión de [SESSION_TYPE] el [SESSION_DATE] a las [SESSION_TIME]. ¡Te esperamos!',
        tone: 'technical',
      },
      motivational: {
        id: 'tpl-003',
        name: 'Mensaje Motivacional Diario',
        content: '¡Hola [CLIENT_NAME]! Un pequeño recordatorio: cada día es una nueva oportunidad para ser mejor. ¡A por ello!',
        tone: 'motivational',
      },
    };
    return templates[templateType];
  },

  /**
   * Analyzes the effectiveness of a given message.
   * @param message The message content to analyze.
   * @returns A promise that resolves with an effectiveness analysis object.
   */
  analyzeMessageEffectiveness: async (message: string): Promise<MessageEffectiveness> => {
    console.log(`Analyzing message effectiveness: "${message.substring(0, 50)}..."`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockScores = {
      positive: Math.random() * 0.4 + 0.6, // 60-100%
      neutral: Math.random() * 0.3 + 0.1,  // 10-40%
      negative: Math.random() * 0.1,      // 0-10%
    };

    return {
      score: parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)), // 0.50 - 1.00
      sentiment: mockScores,
      suggestions: [
        'Considera usar un lenguaje más activo.',
        'Añade un llamado a la acción más claro.',
        'Prueba con un emoji para mayor impacto.',
      ].filter(() => Math.random() > 0.5), // Randomly include some suggestions
    };
  },

  /**
   * Generates variations of a given message.
   * @param originalMessage The original message to generate variations from.
   * @param count The number of variations to generate.
   * @returns A promise that resolves with an array of message variations.
   */
  generateMessageVariations: async (originalMessage: string, count: number = 3): Promise<string[]> => {
    console.log(`Generating ${count} variations for: "${originalMessage.substring(0, 50)}..."`);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const variations: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomSuffix = Math.random().toString(36).substring(7);
      variations.push(`Variación ${i + 1}: ${originalMessage.replace('mensaje', `mensaje ${randomSuffix}`)}`);
    }
    return variations;
  },

  /**
   * Fetches ideal sending times/days for editorial calendar.
   * @returns A promise that resolves with an array of suggested dates and times.
   */
  getEditorialCalendarSuggestions: async (): Promise<{ date: string; time: string; reason: string }[]> => {
    console.log('Fetching editorial calendar suggestions...');
    await new Promise(resolve => setTimeout(resolve, 800));

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return [
      { date: formatDate(today), time: '09:00', reason: 'Alta apertura en la mañana.' },
      { date: formatDate(today), time: '14:30', reason: 'Pico de actividad post-almuerzo.' },
      { date: formatDate(tomorrow), time: '10:00', reason: 'Engagement óptimo a media mañana.' },
      { date: formatDate(dayAfterTomorrow), time: '11:00', reason: 'Buen día para contenido de valor.' },
    ];
  },

  /**
   * Fetches a library of successful copy examples.
   * @returns A promise that resolves with an array of successful copy objects.
   */
  getSuccessfulCopies: async (): Promise<{ id: string; title: string; content: string; category: string }[]> => {
    console.log('Fetching successful copies library...');
    await new Promise(resolve => setTimeout(resolve, 700));

    return [
      { id: 'copy-001', title: 'Oferta de Lanzamiento', content: '¡No te pierdas nuestra oferta exclusiva de lanzamiento! Solo por tiempo limitado.', category: 'Ventas' },
      { id: 'copy-002', title: 'Testimonio Cliente', content: '"Gracias a El Copy Fitness, mis campañas han mejorado un 200%." - Cliente Satisfecho', category: 'Testimonios' },
      { id: 'copy-003', title: 'Consejo Rápido', content: 'Optimiza tus copys con estas 3 técnicas infalibles. ¡Descúbrelas ahora!', category: 'Educación' },
    ];
  },
};

// Define types for better type safety and readability
export type MessageTone = 'warm' | 'technical' | 'motivational';

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  tone: MessageTone;
}

export interface MessageEffectiveness {
  score: number;
  sentiment: { positive: number; neutral: number; negative: number };
  suggestions: string[];
}
