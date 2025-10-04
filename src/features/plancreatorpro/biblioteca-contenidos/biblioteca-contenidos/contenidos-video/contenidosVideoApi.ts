import axios from 'axios';

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  category: 'Tutoriales' | 'Entrenamientos' | 'Nutrición' | 'Motivación' | 'Webinars';
  isFavorite: boolean;
  duration: string; // en formato "MM:SS"
  views: number;
  likes: number;
  publishedAt: string; // fecha ISO
  author: {
    name: string;
    avatar: string;
  };
  quality: '1080p' | '720p' | '480p';
  isNew?: boolean;
  playlist?: string;
}

// Mock data - 50 videos simulados
const MOCK_VIDEOS: Video[] = [
  // Tutoriales
  {
    id: '1',
    title: 'Fundamentos de Nutrición Deportiva para Principiantes',
    description: 'Aprende los conceptos básicos de nutrición aplicados al deporte. Perfecto para comenzar tu transformación.',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop',
    tags: ['nutrición', 'principiantes', 'fundamentos'],
    difficulty: 'easy',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '15:30',
    views: 12543,
    likes: 892,
    publishedAt: '2025-09-15T10:00:00Z',
    author: { name: 'Dr. Carlos Méndez', avatar: 'https://i.pravatar.cc/150?img=12' },
    quality: '1080p',
    isNew: false,
    playlist: 'Fundamentos de nutrición'
  },
  {
    id: '2',
    title: 'Rutina de Entrenamiento HIIT para Quemar Grasa',
    description: 'Sesión intensiva de 20 minutos para maximizar la quema de grasa. No necesitas equipo.',
    url: 'https://example.com/video2.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop',
    tags: ['HIIT', 'cardio', 'quemar grasa'],
    difficulty: 'hard',
    topic: 'Entrenamiento',
    category: 'Entrenamientos',
    isFavorite: true,
    duration: '22:15',
    views: 45672,
    likes: 3241,
    publishedAt: '2025-09-28T08:00:00Z',
    author: { name: 'Coach Ana Torres', avatar: 'https://i.pravatar.cc/150?img=5' },
    quality: '1080p',
    isNew: true,
    playlist: 'Serie de entrenamiento'
  },
  {
    id: '3',
    title: 'Cómo Calcular tus Macros Perfectamente',
    description: 'Guía paso a paso para calcular proteínas, carbohidratos y grasas según tus objetivos.',
    url: 'https://example.com/video3.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&h=450&fit=crop',
    tags: ['macros', 'nutrición', 'cálculo'],
    difficulty: 'medium',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '18:45',
    views: 23451,
    likes: 1567,
    publishedAt: '2025-09-20T14:00:00Z',
    author: { name: 'Lic. María González', avatar: 'https://i.pravatar.cc/150?img=9' },
    quality: '720p',
    isNew: false,
    playlist: 'Fundamentos de nutrición'
  },
  {
    id: '4',
    title: 'Motivación: Tu Mejor Versión Te Espera',
    description: 'Mensaje inspirador para mantenerte enfocado en tus metas de fitness y bienestar.',
    url: 'https://example.com/video4.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop',
    tags: ['motivación', 'mindset', 'superación'],
    difficulty: 'easy',
    topic: 'Motivación',
    category: 'Motivación',
    isFavorite: true,
    duration: '8:20',
    views: 67234,
    likes: 5432,
    publishedAt: '2025-09-25T06:00:00Z',
    author: { name: 'Coach Roberto Silva', avatar: 'https://i.pravatar.cc/150?img=33' },
    quality: '1080p',
    isNew: true
  },
  {
    id: '5',
    title: 'Entrenamiento de Fuerza para Principiantes',
    description: 'Aprende la técnica correcta en ejercicios básicos de fuerza con peso corporal y mancuernas.',
    url: 'https://example.com/video5.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=450&fit=crop',
    tags: ['fuerza', 'principiantes', 'técnica'],
    difficulty: 'easy',
    topic: 'Entrenamiento',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '25:10',
    views: 34567,
    likes: 2341,
    publishedAt: '2025-08-10T10:00:00Z',
    author: { name: 'Coach Pedro Ramírez', avatar: 'https://i.pravatar.cc/150?img=68' },
    quality: '1080p'
  },
  {
    id: '6',
    title: 'Webinar: Nutrición Avanzada para Atletas',
    description: 'Sesión en vivo sobre estrategias nutricionales para optimizar el rendimiento deportivo.',
    url: 'https://example.com/video6.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=450&fit=crop',
    tags: ['webinar', 'atletas', 'rendimiento'],
    difficulty: 'hard',
    topic: 'Nutrición',
    category: 'Webinars',
    isFavorite: false,
    duration: '45:30',
    views: 18934,
    likes: 1234,
    publishedAt: '2025-09-05T18:00:00Z',
    author: { name: 'Dr. Laura Fernández', avatar: 'https://i.pravatar.cc/150?img=47' },
    quality: '720p'
  },
  {
    id: '7',
    title: 'Yoga para Flexibilidad y Recuperación',
    description: 'Sesión suave de yoga enfocada en mejorar flexibilidad y acelerar la recuperación muscular.',
    url: 'https://example.com/video7.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop',
    tags: ['yoga', 'flexibilidad', 'recuperación'],
    difficulty: 'easy',
    topic: 'Bienestar',
    category: 'Entrenamientos',
    isFavorite: true,
    duration: '30:00',
    views: 42134,
    likes: 3456,
    publishedAt: '2025-09-18T07:00:00Z',
    author: { name: 'Instructora Sofía Morales', avatar: 'https://i.pravatar.cc/150?img=20' },
    quality: '1080p'
  },
  {
    id: '8',
    title: 'Recetas Fitness: Desayunos Proteicos',
    description: '5 recetas rápidas y deliciosas de desayunos altos en proteína para empezar el día con energía.',
    url: 'https://example.com/video8.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=450&fit=crop',
    tags: ['recetas', 'desayuno', 'proteína'],
    difficulty: 'easy',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '12:40',
    views: 56789,
    likes: 4123,
    publishedAt: '2025-09-22T11:00:00Z',
    author: { name: 'Chef Julián Vega', avatar: 'https://i.pravatar.cc/150?img=52' },
    quality: '1080p',
    isNew: true
  },
  // Continuamos con más videos...
  {
    id: '9',
    title: 'Entrenamiento Full Body en Casa',
    description: 'Rutina completa de cuerpo entero que puedes hacer en casa sin equipo especializado.',
    url: 'https://example.com/video9.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
    tags: ['full body', 'casa', 'sin equipo'],
    difficulty: 'medium',
    topic: 'Entrenamiento',
    category: 'Entrenamientos',
    isFavorite: false,
    duration: '35:20',
    views: 38942,
    likes: 2876,
    publishedAt: '2025-09-12T09:00:00Z',
    author: { name: 'Coach Ana Torres', avatar: 'https://i.pravatar.cc/150?img=5' },
    quality: '720p',
    playlist: 'Serie de entrenamiento'
  },
  {
    id: '10',
    title: 'Suplementación Esencial para Fitness',
    description: 'Todo lo que necesitas saber sobre suplementos: cuáles tomar, cuándo y por qué.',
    url: 'https://example.com/video10.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=450&fit=crop',
    tags: ['suplementos', 'fitness', 'nutrición'],
    difficulty: 'medium',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: true,
    duration: '20:15',
    views: 29345,
    likes: 1987,
    publishedAt: '2025-09-08T15:00:00Z',
    author: { name: 'Dr. Carlos Méndez', avatar: 'https://i.pravatar.cc/150?img=12' },
    quality: '1080p'
  },
  {
    id: '11',
    title: 'Mindset de Campeón: Supera tus Límites',
    description: 'Estrategias mentales utilizadas por atletas de élite para alcanzar sus objetivos.',
    url: 'https://example.com/video11.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=450&fit=crop',
    tags: ['mindset', 'mentalidad', 'éxito'],
    difficulty: 'easy',
    topic: 'Motivación',
    category: 'Motivación',
    isFavorite: false,
    duration: '14:50',
    views: 71234,
    likes: 6234,
    publishedAt: '2025-09-27T06:30:00Z',
    author: { name: 'Coach Roberto Silva', avatar: 'https://i.pravatar.cc/150?img=33' },
    quality: '1080p',
    isNew: true
  },
  {
    id: '12',
    title: 'Técnica de Sentadillas Perfectas',
    description: 'Domina uno de los ejercicios más importantes del fitness con la técnica correcta.',
    url: 'https://example.com/video12.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&h=450&fit=crop',
    tags: ['sentadillas', 'técnica', 'piernas'],
    difficulty: 'medium',
    topic: 'Entrenamiento',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '10:25',
    views: 45231,
    likes: 3421,
    publishedAt: '2025-08-25T10:00:00Z',
    author: { name: 'Coach Pedro Ramírez', avatar: 'https://i.pravatar.cc/150?img=68' },
    quality: '1080p'
  },
  {
    id: '13',
    title: 'Webinar: Pérdida de Grasa Sostenible',
    description: 'Estrategias científicamente probadas para perder grasa sin perder músculo.',
    url: 'https://example.com/video13.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=450&fit=crop',
    tags: ['pérdida de grasa', 'ciencia', 'sostenible'],
    difficulty: 'hard',
    topic: 'Nutrición',
    category: 'Webinars',
    isFavorite: true,
    duration: '52:10',
    views: 15678,
    likes: 987,
    publishedAt: '2025-09-01T19:00:00Z',
    author: { name: 'Dr. Laura Fernández', avatar: 'https://i.pravatar.cc/150?img=47' },
    quality: '720p'
  },
  {
    id: '14',
    title: 'Cardio de Bajo Impacto para Todos',
    description: 'Rutina cardiovascular suave pero efectiva, ideal para principiantes o recuperación.',
    url: 'https://example.com/video14.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    tags: ['cardio', 'bajo impacto', 'principiantes'],
    difficulty: 'easy',
    topic: 'Entrenamiento',
    category: 'Entrenamientos',
    isFavorite: false,
    duration: '28:30',
    views: 32145,
    likes: 2134,
    publishedAt: '2025-09-14T08:00:00Z',
    author: { name: 'Instructora Sofía Morales', avatar: 'https://i.pravatar.cc/150?img=20' },
    quality: '1080p'
  },
  {
    id: '15',
    title: 'Meal Prep: Planifica tu Semana',
    description: 'Aprende a preparar todas tus comidas saludables de la semana en solo 2 horas.',
    url: 'https://example.com/video15.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=450&fit=crop',
    tags: ['meal prep', 'planificación', 'organización'],
    difficulty: 'medium',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: false,
    duration: '32:15',
    views: 48765,
    likes: 3987,
    publishedAt: '2025-09-19T12:00:00Z',
    author: { name: 'Chef Julián Vega', avatar: 'https://i.pravatar.cc/150?img=52' },
    quality: '1080p'
  },
  {
    id: '16',
    title: 'Core y Abdominales Definidos',
    description: 'Rutina especializada para fortalecer y definir tu zona media.',
    url: 'https://example.com/video16.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
    tags: ['core', 'abdominales', 'definición'],
    difficulty: 'hard',
    topic: 'Entrenamiento',
    category: 'Entrenamientos',
    isFavorite: true,
    duration: '18:45',
    views: 52341,
    likes: 4123,
    publishedAt: '2025-09-26T07:30:00Z',
    author: { name: 'Coach Ana Torres', avatar: 'https://i.pravatar.cc/150?img=5' },
    quality: '1080p',
    isNew: true,
    playlist: 'Serie de entrenamiento'
  },
  {
    id: '17',
    title: 'Historia de Transformación: Juan Pérez',
    description: 'Inspiradora historia de superación y transformación física de uno de nuestros clientes.',
    url: 'https://example.com/video17.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=450&fit=crop',
    tags: ['transformación', 'inspiración', 'testimonio'],
    difficulty: 'easy',
    topic: 'Motivación',
    category: 'Motivación',
    isFavorite: false,
    duration: '11:20',
    views: 63421,
    likes: 5234,
    publishedAt: '2025-09-23T17:00:00Z',
    author: { name: 'Coach Roberto Silva', avatar: 'https://i.pravatar.cc/150?img=33' },
    quality: '720p'
  },
  {
    id: '18',
    title: 'Estiramiento Post-Entrenamiento',
    description: 'Rutina completa de estiramiento para mejorar flexibilidad y prevenir lesiones.',
    url: 'https://example.com/video18.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=450&fit=crop',
    tags: ['estiramiento', 'flexibilidad', 'recuperación'],
    difficulty: 'easy',
    topic: 'Bienestar',
    category: 'Entrenamientos',
    isFavorite: false,
    duration: '15:00',
    views: 41234,
    likes: 3012,
    publishedAt: '2025-09-11T18:00:00Z',
    author: { name: 'Instructora Sofía Morales', avatar: 'https://i.pravatar.cc/150?img=20' },
    quality: '1080p'
  },
  {
    id: '19',
    title: 'Nutrición Pre y Post Entrenamiento',
    description: 'Qué comer antes y después de entrenar para maximizar resultados.',
    url: 'https://example.com/video19.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop',
    tags: ['pre-workout', 'post-workout', 'timing'],
    difficulty: 'medium',
    topic: 'Nutrición',
    category: 'Tutoriales',
    isFavorite: true,
    duration: '16:35',
    views: 37654,
    likes: 2876,
    publishedAt: '2025-09-17T13:00:00Z',
    author: { name: 'Lic. María González', avatar: 'https://i.pravatar.cc/150?img=9' },
    quality: '1080p',
    playlist: 'Fundamentos de nutrición'
  },
  {
    id: '20',
    title: 'Entrenamiento de Brazos y Hombros',
    description: 'Rutina completa para desarrollar y tonificar brazos y hombros.',
    url: 'https://example.com/video20.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=450&fit=crop',
    tags: ['brazos', 'hombros', 'fuerza'],
    difficulty: 'medium',
    topic: 'Entrenamiento',
    category: 'Entrenamientos',
    isFavorite: false,
    duration: '27:40',
    views: 44321,
    likes: 3245,
    publishedAt: '2025-08-30T09:00:00Z',
    author: { name: 'Coach Pedro Ramírez', avatar: 'https://i.pravatar.cc/150?img=68' },
    quality: '1080p'
  },
  // Agregamos 30 videos más para llegar a 50
  ...Array.from({ length: 30 }, (_, i) => {
    const categories: Array<'Tutoriales' | 'Entrenamientos' | 'Nutrición' | 'Motivación' | 'Webinars'> = ['Tutoriales', 'Entrenamientos', 'Nutrición', 'Motivación', 'Webinars'];
    const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
    const qualities: Array<'1080p' | '720p' | '480p'> = ['1080p', '720p', '480p'];
    const category = categories[i % categories.length];
    const difficulty = difficulties[i % difficulties.length];
    const quality = qualities[i % qualities.length];

    const thumbnails = [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=450&fit=crop'
    ];

    const authors = [
      { name: 'Dr. Carlos Méndez', avatar: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Coach Ana Torres', avatar: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Lic. María González', avatar: 'https://i.pravatar.cc/150?img=9' },
      { name: 'Coach Roberto Silva', avatar: 'https://i.pravatar.cc/150?img=33' },
      { name: 'Instructora Sofía Morales', avatar: 'https://i.pravatar.cc/150?img=20' }
    ];

    return {
      id: `${21 + i}`,
      title: `Video ${category} #${i + 1}`,
      description: `Contenido educativo sobre ${category.toLowerCase()} nivel ${difficulty}`,
      url: `https://example.com/video${21 + i}.mp4`,
      thumbnail: thumbnails[i % thumbnails.length],
      tags: [category.toLowerCase(), difficulty, 'fitness'],
      difficulty,
      topic: category === 'Webinars' ? 'Educación' : category,
      category,
      isFavorite: i % 5 === 0,
      duration: `${10 + (i % 40)}:${(i * 7) % 60}`,
      views: 10000 + (i * 1234),
      likes: 500 + (i * 89),
      publishedAt: new Date(2025, 8, (i % 28) + 1).toISOString(),
      author: authors[i % authors.length],
      quality,
      isNew: i < 3
    };
  })
];

// Placeholder API calls
const API_BASE_URL = '/api/videos'; // Adjust as per your actual API endpoint

export const fetchVideos = async (filters?: { tags?: string[]; difficulty?: string; topic?: string; search?: string }): Promise<Video[]> => {
  try {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredVideos = [...MOCK_VIDEOS];

    if (filters) {
      if (filters.tags && filters.tags.length > 0) {
        filteredVideos = filteredVideos.filter(video =>
          filters.tags!.some(tag => video.tags.includes(tag))
        );
      }

      if (filters.difficulty) {
        filteredVideos = filteredVideos.filter(video => video.difficulty === filters.difficulty);
      }

      if (filters.topic) {
        filteredVideos = filteredVideos.filter(video => video.topic === filters.topic);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredVideos = filteredVideos.filter(video =>
          video.title.toLowerCase().includes(searchLower) ||
          video.description.toLowerCase().includes(searchLower) ||
          video.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
    }

    return filteredVideos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const uploadVideo = async (videoData: FormData): Promise<Video> => {
  try {
    const response = await axios.post<Video>(`${API_BASE_URL}/upload`, videoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const toggleFavorite = async (videoId: string, isFavorite: boolean): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/${videoId}/favorite`, { isFavorite });
  } catch (error) {
    console.error(`Error toggling favorite for video ${videoId}:`, error);
    throw error;
  }
};

export const fetchVideoById = async (videoId: string): Promise<Video | null> => {
  try {
    const response = await axios.get<Video>(`${API_BASE_URL}/${videoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video by ID ${videoId}:`, error);
    return null;
  }
};
