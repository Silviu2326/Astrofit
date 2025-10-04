export interface MesocicloTemplate {
  id: string;
  title: string;
  duration: string;
  sport: string;
  description: string;
  isFavorite: boolean;
  previewContent: string; // Basic content for preview
}

export const predefinedMesocicloTemplates: MesocicloTemplate[] = [
  {
    id: '1',
    title: 'Pretemporada Fútbol',
    duration: '6 semanas',
    sport: 'Fútbol',
    description: 'Planificación completa para la pretemporada de fútbol, enfocada en resistencia, fuerza y táctica.',
    isFavorite: false,
    previewContent: 'Detalles de la pretemporada de fútbol: 2 semanas de adaptación, 2 de carga, 2 de competición.',
  },
  {
    id: '2',
    title: 'Fuerza Máxima',
    duration: '8 semanas',
    sport: 'Levantamiento de Pesas',
    description: 'Mesociclo diseñado para el desarrollo de la fuerza máxima en atletas de levantamiento de pesas.',
    isFavorite: false,
    previewContent: 'Detalles de fuerza máxima: 3 fases de progresión, enfocadas en sentadilla, peso muerto y press de banca.',
  },
  {
    id: '3',
    title: 'Resistencia Aeróbica',
    duration: '4 semanas',
    sport: 'Running',
    description: 'Mejora tu capacidad aeróbica con este plan de entrenamiento de 4 semanas.',
    isFavorite: false,
    previewContent: 'Detalles de resistencia aeróbica: Incluye entrenamientos de intervalos, fartlek y tiradas largas.',
  },
  {
    id: '4',
    title: 'Preparación Maratón',
    duration: '12 semanas',
    sport: 'Running',
    description: 'Plan de entrenamiento avanzado para preparar un maratón, con enfoque en volumen y recuperación.',
    isFavorite: false,
    previewContent: 'Detalles de preparación maratón: 3 fases, con aumento progresivo de kilometraje y entrenamientos específicos.',
  },
  {
    id: '5',
    title: 'Hipertrofia Muscular',
    duration: '10 semanas',
    sport: 'Cultirismo',
    description: 'Programa de 10 semanas para maximizar el crecimiento muscular y la definición.',
    isFavorite: false,
    previewContent: 'Detalles de hipertrofia: Rutinas divididas, técnicas de alta intensidad y nutrición.',
  },
];

// Nuevas interfaces para IA y colaboración comunitaria
export interface RecommendedTemplate extends MesocicloTemplate {
  reason: string;
}

export interface CommunityTemplate extends MesocicloTemplate {
  author: string;
  rating: number;
  reviewsCount: number;
}

export interface TemplateReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TemplateVersion {
  version: number;
  date: string;
  changes: string;
  author: string;
}

export interface EffectivenessAnalysisResult {
  templateId: string;
  performanceMetrics: {
    strengthGain: string;
    enduranceImprovement: string;
    injuryRate: string;
  };
  feedbackSummary: string;
}

// Funciones simuladas para la API
export const getRecommendedTemplates = async (teamId: string): Promise<RecommendedTemplate[]> => {
  console.log(`Fetching AI recommendations for team: ${teamId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ...predefinedMesocicloTemplates[0],
          id: 'rec1',
          title: 'Recomendado: Pretemporada Fútbol Adaptada',
          reason: 'Basado en el historial de rendimiento de tu equipo en fútbol.',
        },
        {
          ...predefinedMesocicloTemplates[2],
          id: 'rec2',
          title: 'Recomendado: Resistencia Aeróbica para Equipos',
          reason: 'Para mejorar la capacidad cardiovascular general del equipo.',
        },
      ]);
    }, 500);
  });
};

export const getCommunityTemplates = async (): Promise<CommunityTemplate[]> => {
  console.log('Fetching community templates...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ...predefinedMesocicloTemplates[1],
          id: 'comm1',
          title: 'Comunitario: Fuerza Explosiva Avanzada',
          author: 'EntrenadorPro',
          rating: 4.8,
          reviewsCount: 120,
        },
        {
          ...predefinedMesocicloTemplates[3],
          id: 'comm2',
          title: 'Comunitario: Preparación Ultra-Maratón',
          author: 'CorredorExtremo',
          rating: 4.5,
          reviewsCount: 85,
        },
      ]);
    }, 500);
  });
};

export const submitTemplateRating = async (templateId: string, rating: number, review: string): Promise<void> => {
  console.log(`Submitting rating for template ${templateId}: ${rating} - "${review}"`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Rating submitted successfully.');
      resolve();
    }, 300);
  });
};

export const getTemplateRatings = async (templateId: string): Promise<TemplateReview[]> => {
  console.log(`Fetching ratings for template: ${templateId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'rev1', userId: 'user1', userName: 'Carlos G.', rating: 5, comment: 'Excelente plantilla, resultados visibles.', date: '2023-01-15' },
        { id: 'rev2', userId: 'user2', userName: 'Ana M.', rating: 4, comment: 'Muy completa, aunque un poco intensa.', date: '2023-02-20' },
      ]);
    }, 400);
  });
};

export const createCustomTemplate = async (templateData: Omit<MesocicloTemplate, 'id'>): Promise<MesocicloTemplate> => {
  console.log('Creating custom template:', templateData);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTemplate = { ...templateData, id: `custom-${Date.now().toString()}` };
      console.log('Custom template created:', newTemplate);
      resolve(newTemplate);
    }, 600);
  });
};

export const updateCustomTemplate = async (templateId: string, templateData: Partial<MesocicloTemplate>): Promise<MesocicloTemplate> => {
  console.log(`Updating custom template ${templateId}:`, templateData);
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedTemplate = { ...predefinedMesocicloTemplates[0], id: templateId, ...templateData }; // Simulate update
      console.log('Custom template updated:', updatedTemplate);
      resolve(updatedTemplate);
    }, 600);
  });
};

export const getVersionHistory = async (templateId: string): Promise<TemplateVersion[]> => {
  console.log(`Fetching version history for template: ${templateId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { version: 3, date: '2024-09-20', changes: 'Ajuste de volumen en fase 2.', author: 'Admin' },
        { version: 2, date: '2024-08-10', changes: 'Corrección de errores tipográficos.', author: 'Admin' },
        { version: 1, date: '2024-07-01', changes: 'Creación inicial de la plantilla.', author: 'Admin' },
      ]);
    }, 400);
  });
};

export const getEffectivenessAnalysis = async (templateId: string): Promise<EffectivenessAnalysisResult> => {
  console.log(`Fetching effectiveness analysis for template: ${templateId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        templateId: templateId,
        performanceMetrics: {
          strengthGain: '15% promedio',
          enduranceImprovement: '10% en VO2 Max',
          injuryRate: '2% (muy bajo)',
        },
        feedbackSummary: 'La plantilla ha demostrado ser altamente efectiva, con excelente feedback de los usuarios.',
      });
    }, 700);
  });
};

export const getPremiumTemplates = async (): Promise<MesocicloTemplate[]> => {
  console.log('Fetching premium templates...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'prem1',
          title: 'Premium: Preparación Olímpica Natación',
          duration: '20 semanas',
          sport: 'Natación',
          description: 'Plan de élite para atletas de natación con miras a competiciones olímpicas.',
          isFavorite: false,
          previewContent: 'Detalles de preparación olímpica: Microciclos de alta intensidad, periodización avanzada.',
        },
        {
          id: 'prem2',
          title: 'Premium: Recuperación Avanzada Post-Lesión',
          duration: '8 semanas',
          sport: 'General',
          description: 'Programa especializado en la recuperación y readaptación deportiva tras lesiones graves.',
          isFavorite: false,
          previewContent: 'Detalles de recuperación: Fases de movilidad, fuerza progresiva y retorno al deporte.',
        },
      ]);
    }, 500);
  });
};

