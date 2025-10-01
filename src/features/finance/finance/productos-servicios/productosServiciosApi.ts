export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  modalidad: 'presencial' | 'online' | 'hibrido';
  tipo: 'individual' | 'grupal' | 'membresia' | 'programa' | 'bono';
  disponibilidad: boolean;
  cupos?: number;
  duracion: string;
  caracteristicas: string[];
  imagen: string;
}

export const mockProductos: Producto[] = [
  // SESIONES INDIVIDUALES
  {
    id: 'prod-001',
    nombre: 'Sesión Personalizada 1 a 1',
    precio: 60,
    descripcion: 'Entrenamiento personal individual adaptado a tus objetivos.',
    modalidad: 'presencial',
    tipo: 'individual',
    disponibilidad: true,
    duracion: '60 minutos',
    caracteristicas: ['Plan de entrenamiento personalizado', 'Seguimiento individual', 'Flexibilidad de horarios'],
    imagen: '/images/sesion-individual.jpg',
  },
  {
    id: 'prod-009',
    nombre: 'Sesión Express 30min',
    precio: 35,
    descripcion: 'Sesión intensiva para personas con poco tiempo.',
    modalidad: 'presencial',
    tipo: 'individual',
    disponibilidad: true,
    duracion: '30 minutos',
    caracteristicas: ['Alta intensidad', 'Enfoque específico', 'Resultados rápidos'],
    imagen: '/images/sesion-express.jpg',
  },
  {
    id: 'prod-010',
    nombre: 'Asesoría Nutricional Individual',
    precio: 0,
    descripcion: 'Primera consulta nutricional gratuita.',
    modalidad: 'presencial',
    tipo: 'individual',
    disponibilidad: true,
    duracion: '45 minutos',
    caracteristicas: ['Evaluación inicial', 'Plan nutricional básico', 'Recomendaciones personalizadas'],
    imagen: '/images/asesoria-nutricional.jpg',
  },

  // BONOS DE CLASES
  {
    id: 'prod-002',
    nombre: 'Bono 10 Clases Grupales',
    precio: 250,
    descripcion: 'Paquete de 10 sesiones de entrenamiento grupal.',
    modalidad: 'presencial',
    tipo: 'bono',
    disponibilidad: true,
    cupos: 15,
    duracion: '60 minutos por clase',
    caracteristicas: ['Acceso a todas las clases grupales', 'Válido por 3 meses', 'Ambiente motivador'],
    imagen: '/images/bono-clases.jpg',
  },
  {
    id: 'prod-006',
    nombre: 'Bono 5 Sesiones Individuales',
    precio: 275,
    descripcion: 'Paquete de 5 sesiones de entrenamiento personal.',
    modalidad: 'presencial',
    tipo: 'bono',
    disponibilidad: true,
    duracion: '60 minutos por sesión',
    caracteristicas: ['Ahorro por volumen', 'Entrenamiento personalizado', 'Válido por 2 meses'],
    imagen: '/images/bono-5-sesiones.jpg',
  },
  {
    id: 'prod-011',
    nombre: 'Bono 20 Clases Premium',
    precio: 450,
    descripcion: 'Máximo ahorro con 20 clases grupales.',
    modalidad: 'presencial',
    tipo: 'bono',
    disponibilidad: true,
    cupos: 20,
    duracion: '60 minutos por clase',
    caracteristicas: ['Máximo descuento', 'Acceso prioritario', 'Válido por 6 meses', 'Clases ilimitadas por semana'],
    imagen: '/images/bono-20-clases.jpg',
  },

  // MEMBRESÍAS MENSUALES
  {
    id: 'prod-003',
    nombre: 'Membresía Mensual Premium',
    precio: 99,
    descripcion: 'Acceso ilimitado a todas las clases y 2 sesiones individuales al mes.',
    modalidad: 'hibrido',
    tipo: 'membresia',
    disponibilidad: true,
    duracion: '1 mes',
    caracteristicas: ['Clases ilimitadas', '2 sesiones 1 a 1', 'Acceso a plataforma online', 'Descuentos en talleres'],
    imagen: '/images/membresia-premium.jpg',
  },
  {
    id: 'prod-007',
    nombre: 'Membresía Mensual Básica',
    precio: 50,
    descripcion: 'Acceso a 8 clases grupales al mes.',
    modalidad: 'presencial',
    tipo: 'membresia',
    disponibilidad: true,
    duracion: '1 mes',
    caracteristicas: ['8 clases grupales', 'Flexibilidad de horarios'],
    imagen: '/images/membresia-basica.jpg',
  },
  {
    id: 'prod-012',
    nombre: 'Membresía VIP Elite',
    precio: 149,
    descripcion: 'Experiencia completa con todos los servicios incluidos.',
    modalidad: 'hibrido',
    tipo: 'membresia',
    disponibilidad: true,
    duracion: '1 mes',
    caracteristicas: [
      'Acceso ilimitado a todas las clases',
      '4 sesiones personalizadas',
      'Plan nutricional completo',
      'Acceso a zona VIP',
      'Toalla y bebida incluida',
      'Prioridad en reservas'
    ],
    imagen: '/images/membresia-vip.jpg',
  },

  // PROGRAMAS ONLINE
  {
    id: 'prod-004',
    nombre: 'Programa Online 8 Semanas Transformación',
    precio: 350,
    descripcion: 'Programa de entrenamiento y nutrición 100% online para una transformación completa.',
    modalidad: 'online',
    tipo: 'programa',
    disponibilidad: true,
    cupos: 50,
    duracion: '8 semanas',
    caracteristicas: ['Plan de entrenamiento semanal', 'Guía nutricional', 'Seguimiento online', 'Comunidad privada'],
    imagen: '/images/programa-online.jpg',
  },
  {
    id: 'prod-008',
    nombre: 'Programa Híbrido 12 Semanas Avanzado',
    precio: 500,
    descripcion: 'Combinación de sesiones presenciales y seguimiento online para resultados avanzados.',
    modalidad: 'hibrido',
    tipo: 'programa',
    disponibilidad: true,
    cupos: 20,
    duracion: '12 semanas',
    caracteristicas: ['4 sesiones presenciales al mes', 'Plan online completo', 'Soporte 24/7'],
    imagen: '/images/programa-hibrido.jpg',
  },
  {
    id: 'prod-013',
    nombre: 'Programa Pérdida de Peso 6 Semanas',
    precio: 280,
    descripcion: 'Programa enfocado en pérdida de peso saludable y sostenible.',
    modalidad: 'online',
    tipo: 'programa',
    disponibilidad: true,
    cupos: 60,
    duracion: '6 semanas',
    caracteristicas: [
      'Rutinas de cardio y fuerza',
      'Plan de comidas personalizado',
      'Recetas saludables',
      'Seguimiento de progreso',
      'Soporte vía WhatsApp'
    ],
    imagen: '/images/programa-perdida-peso.jpg',
  },
  {
    id: 'prod-014',
    nombre: 'Programa Ganancia Muscular 10 Semanas',
    precio: 420,
    descripcion: 'Programa especializado en hipertrofia y ganancia de masa muscular.',
    modalidad: 'online',
    tipo: 'programa',
    disponibilidad: true,
    cupos: 40,
    duracion: '10 semanas',
    caracteristicas: [
      'Rutinas de fuerza progresivas',
      'Plan nutricional alto en proteínas',
      'Guía de suplementación',
      'Videos tutoriales de ejercicios',
      'Mediciones semanales'
    ],
    imagen: '/images/programa-ganancia-muscular.jpg',
  },

  // CLASES GRUPALES (Nuevas)
  {
    id: 'prod-015',
    nombre: 'Clase Grupal Yoga',
    precio: 15,
    descripcion: 'Sesión de yoga para todos los niveles.',
    modalidad: 'presencial',
    tipo: 'grupal',
    disponibilidad: true,
    cupos: 20,
    duracion: '60 minutos',
    caracteristicas: ['Mejora flexibilidad', 'Reduce estrés', 'Todos los niveles bienvenidos'],
    imagen: '/images/clase-yoga.jpg',
  },
  {
    id: 'prod-016',
    nombre: 'Clase Grupal HIIT',
    precio: 18,
    descripcion: 'Entrenamiento de alta intensidad en intervalos.',
    modalidad: 'presencial',
    tipo: 'grupal',
    disponibilidad: true,
    cupos: 15,
    duracion: '45 minutos',
    caracteristicas: ['Quema máxima de calorías', 'Mejora resistencia', 'Ambiente energético'],
    imagen: '/images/clase-hiit.jpg',
  },
  {
    id: 'prod-017',
    nombre: 'Clase Grupal Spinning',
    precio: 16,
    descripcion: 'Ciclismo indoor con música motivadora.',
    modalidad: 'presencial',
    tipo: 'grupal',
    disponibilidad: true,
    cupos: 25,
    duracion: '50 minutos',
    caracteristicas: ['Cardio intensivo', 'Fortalece piernas', 'Música en vivo'],
    imagen: '/images/clase-spinning.jpg',
  },
  {
    id: 'prod-018',
    nombre: 'Clase Grupal Pilates',
    precio: 17,
    descripcion: 'Fortalecimiento del core y mejora de postura.',
    modalidad: 'presencial',
    tipo: 'grupal',
    disponibilidad: true,
    cupos: 18,
    duracion: '60 minutos',
    caracteristicas: ['Fortalece abdomen', 'Mejora postura', 'Bajo impacto'],
    imagen: '/images/clase-pilates.jpg',
  },
  {
    id: 'prod-019',
    nombre: 'Clase Grupal Funcional',
    precio: 15,
    descripcion: 'Entrenamiento funcional con peso corporal.',
    modalidad: 'presencial',
    tipo: 'grupal',
    disponibilidad: true,
    cupos: 20,
    duracion: '55 minutos',
    caracteristicas: ['Movimientos naturales', 'Mejora movilidad', 'Para todos los niveles'],
    imagen: '/images/clase-funcional.jpg',
  },

  // VALORACIÓN INICIAL
  {
    id: 'prod-005',
    nombre: 'Sesión de Valoración Inicial',
    precio: 0,
    descripcion: 'Sesión gratuita para evaluar tus objetivos y diseñar un plan.',
    modalidad: 'presencial',
    tipo: 'individual',
    disponibilidad: true,
    duracion: '30 minutos',
    caracteristicas: ['Análisis de objetivos', 'Evaluación física básica', 'Recomendaciones personalizadas'],
    imagen: '/images/valoracion-inicial.jpg',
  },
];

export const getProductos = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProductos);
    }, 500);
  });
};

export const getProductosByType = (type: Producto['tipo']): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProductos.filter(producto => producto.tipo === type));
    }, 500);
  });
};

export const getBestSellingProducts = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock de productos más vendidos
      const bestSellers = mockProductos.filter(p =>
        ['prod-001', 'prod-003', 'prod-004', 'prod-002', 'prod-016'].includes(p.id)
      );
      resolve(bestSellers);
    }, 500);
  });
};
