export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  attachments?: { name: string; url: string }[];
  categories: string[];
  tags: string[];
  comments: Comment[];
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
}

export interface Comment {
  id: string;
  articleId: string;
  memberId: string;
  memberName: string;
  comment: string;
  createdAt: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Los Fundamentos de la Nutrición Deportiva',
    content: `
      <h2>Introducción a la Nutrición Deportiva</h2>
      <p>La nutrición deportiva es una rama especializada de la nutrición que se enfoca en optimizar el rendimiento deportivo a través de una alimentación estratégica.</p>
      
      <h3>Macronutrientes Esenciales</h3>
      <ul>
        <li><strong>Carbohidratos:</strong> Fuente principal de energía para el ejercicio</li>
        <li><strong>Proteínas:</strong> Esenciales para la reparación y construcción muscular</li>
        <li><strong>Grasas:</strong> Importantes para la absorción de vitaminas y energía sostenida</li>
      </ul>
      
      <h3>Hidratación</h3>
      <p>Mantener una hidratación adecuada es crucial para el rendimiento óptimo. Se recomienda beber agua antes, durante y después del ejercicio.</p>
    `,
    imageUrl: '/placeholder-product.svg',
    categories: ['Nutrición', 'Deportes'],
    tags: ['nutrición', 'deportes', 'macronutrientes', 'hidratación'],
    author: 'Dr. María González',
    publishedAt: '2024-01-15',
    readTime: 8,
    views: 1247,
    comments: [
      {
        id: '1',
        articleId: '1',
        memberId: 'user1',
        memberName: 'Carlos Ruiz',
        comment: 'Excelente artículo, muy informativo sobre los fundamentos básicos.',
        createdAt: '2024-01-16T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Rutinas de Entrenamiento para Principiantes',
    content: `
      <h2>Empezando tu Jornada Fitness</h2>
      <p>Si eres nuevo en el mundo del fitness, es importante comenzar con una rutina bien estructurada que te permita progresar de manera segura.</p>
      
      <h3>Componentes de una Rutina Completa</h3>
      <ol>
        <li><strong>Calentamiento:</strong> 5-10 minutos de actividad cardiovascular ligera</li>
        <li><strong>Entrenamiento de Fuerza:</strong> Ejercicios básicos con peso corporal o pesas ligeras</li>
        <li><strong>Cardio:</strong> 20-30 minutos de ejercicio cardiovascular</li>
        <li><strong>Enfriamiento:</strong> Estiramientos y relajación</li>
      </ol>
      
      <h3>Frecuencia Recomendada</h3>
      <p>Para principiantes, se recomienda entrenar 3-4 veces por semana, permitiendo días de descanso entre sesiones.</p>
    `,
    imageUrl: '/placeholder-product.svg',
    categories: ['Entrenamiento', 'Principiantes'],
    tags: ['entrenamiento', 'principiantes', 'rutina', 'fitness'],
    author: 'Coach Ana Martínez',
    publishedAt: '2024-01-12',
    readTime: 6,
    views: 892,
    comments: []
  },
  {
    id: '3',
    title: 'Mindfulness y Bienestar Mental',
    content: `
      <h2>La Importancia del Bienestar Mental</h2>
      <p>El bienestar mental es tan importante como el físico. La práctica del mindfulness puede mejorar significativamente tu calidad de vida.</p>
      
      <h3>Técnicas de Mindfulness</h3>
      <ul>
        <li><strong>Meditación:</strong> Práctica diaria de 10-15 minutos</li>
        <li><strong>Respiración Consciente:</strong> Técnicas de respiración profunda</li>
        <li><strong>Escaneo Corporal:</strong> Atención plena a las sensaciones del cuerpo</li>
      </ul>
      
      <h3>Beneficios Comprobados</h3>
      <p>Estudios científicos han demostrado que el mindfulness reduce el estrés, mejora la concentración y aumenta la sensación de bienestar general.</p>
    `,
    imageUrl: '/placeholder-product.svg',
    categories: ['Bienestar', 'Mindfulness'],
    tags: ['mindfulness', 'bienestar', 'meditación', 'salud mental'],
    author: 'Psic. Laura Fernández',
    publishedAt: '2024-01-10',
    readTime: 7,
    views: 1156,
    comments: [
      {
        id: '2',
        articleId: '3',
        memberId: 'user2',
        memberName: 'Sofia López',
        comment: 'Me ha ayudado mucho a manejar el estrés del trabajo.',
        createdAt: '2024-01-11T14:20:00Z'
      },
      {
        id: '3',
        articleId: '3',
        memberId: 'user3',
        memberName: 'Miguel Torres',
        comment: 'Excelentes técnicas, las estoy aplicando diariamente.',
        createdAt: '2024-01-12T09:15:00Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Tecnología en el Fitness: Wearables y Apps',
    content: `
      <h2>Revolución Tecnológica en el Fitness</h2>
      <p>La tecnología ha transformado la forma en que entrenamos y monitoreamos nuestro progreso. Los wearables y aplicaciones móviles ofrecen datos valiosos.</p>
      
      <h3>Tipos de Wearables</h3>
      <ul>
        <li><strong>Smartwatches:</strong> Monitoreo continuo de actividad y salud</li>
        <li><strong>Pulseras de Actividad:</strong> Seguimiento básico de pasos y sueño</li>
        <li><strong>Monitores de Frecuencia Cardíaca:</strong> Precisión en el entrenamiento</li>
      </ul>
      
      <h3>Aplicaciones Recomendadas</h3>
      <p>Existen numerosas apps que pueden ayudarte a planificar entrenamientos, seguir tu dieta y mantener la motivación.</p>
    `,
    imageUrl: '/placeholder-product.svg',
    categories: ['Tecnología', 'Fitness'],
    tags: ['tecnología', 'wearables', 'apps', 'fitness tech'],
    author: 'Ing. Roberto Silva',
    publishedAt: '2024-01-08',
    readTime: 9,
    views: 743,
    comments: []
  },
  {
    id: '5',
    title: 'Motivación y Constancia en el Deporte',
    content: `
      <h2>Mantener la Motivación a Largo Plazo</h2>
      <p>La constancia es la clave del éxito en cualquier programa de fitness. Aquí te damos estrategias para mantenerte motivado.</p>
      
      <h3>Estrategias de Motivación</h3>
      <ol>
        <li><strong>Establece Metas Realistas:</strong> Objetivos alcanzables a corto y largo plazo</li>
        <li><strong>Celebra los Pequeños Logros:</strong> Reconoce cada progreso</li>
        <li><strong>Busca Apoyo Social:</strong> Entrena con amigos o únete a grupos</li>
        <li><strong>Varía tu Rutina:</strong> Evita la monotonía</li>
      </ol>
      
      <h3>Superando Obstáculos</h3>
      <p>Es normal enfrentar desafíos. La clave está en tener un plan para superarlos y mantener la perspectiva a largo plazo.</p>
    `,
    imageUrl: '/placeholder-product.svg',
    categories: ['Motivación', 'Psicología'],
    tags: ['motivación', 'constancia', 'objetivos', 'psicología deportiva'],
    author: 'Coach Elena Vargas',
    publishedAt: '2024-01-05',
    readTime: 5,
    views: 1023,
    comments: []
  }
];
