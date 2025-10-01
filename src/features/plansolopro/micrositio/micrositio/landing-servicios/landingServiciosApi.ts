
// src/features/micrositio/landing-servicios/landingServiciosApi.ts

export interface Servicio {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string; // Tailwind CSS icon class or similar
}

export interface Testimonio {
  id: string;
  name: string;
  photoUrl: string;
  stars: number;
  comment: string;
}

// Mock data para servicios
export const mockServicios: Servicio[] = [
  {
    id: '1',
    name: 'Entrenamiento Online Personalizado',
    description: 'Planes de entrenamiento adaptados a tus objetivos y disponibles desde cualquier lugar.',
    price: 'Desde 49€/mes',
    icon: '💪', // Emoji como placeholder de icono
  },
  {
    id: '2',
    name: 'Sesiones 1:1 Presenciales/Online',
    description: 'Atención individualizada para maximizar tus resultados con seguimiento constante.',
    price: '60€/sesión',
    icon: '🏋️',
  },
  {
    id: '3',
    name: 'Packs de Transformación Completa',
    description: 'Combina entrenamiento y nutrición para una transformación integral y duradera.',
    price: 'Desde 149€/mes',
    icon: '🚀',
  },
  {
    id: '4',
    name: 'Asesoramiento Nutricional',
    description: 'Guías alimenticias personalizadas para complementar tu entrenamiento y mejorar tu salud.',
    price: 'Desde 35€/mes',
    icon: '🍎',
  },
];

// Mock data para testimonios
export const mockTestimonios: Testimonio[] = [
  {
    id: 't1',
    name: 'Ana G.',
    photoUrl: 'https://via.placeholder.com/100',
    stars: 5,
    comment: '"Juan me ayudó a alcanzar mis metas de fitness en tiempo récord. ¡Totalmente recomendado!"',
  },
  {
    id: 't2',
    name: 'Carlos M.',
    photoUrl: 'https://via.placeholder.com/100',
    stars: 4,
    comment: '"Las sesiones online son muy cómodas y efectivas. He notado un gran cambio en mi energía."',
  },
  {
    id: 't3',
    name: 'Sofía L.',
    photoUrl: 'https://via.placeholder.com/100',
    stars: 5,
    comment: '"El plan nutricional fue clave. Aprendí a comer mejor sin sentir que estaba a dieta."',
  },
];
