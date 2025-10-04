import axios from 'axios';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  isFavorite: boolean;
}

// Placeholder API calls
const API_BASE_URL = '/api/videos'; // Adjust as per your actual API endpoint

// Mock data para desarrollo
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introducción al Entrenamiento Funcional',
    description: 'Aprende los fundamentos del entrenamiento funcional y sus beneficios para la salud.',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    tags: ['funcional', 'principiante', 'salud'],
    difficulty: 'easy',
    topic: 'Entrenamiento Funcional',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Rutina de Fuerza Avanzada',
    description: 'Rutina completa para desarrollar fuerza máxima con ejercicios compuestos.',
    url: 'https://example.com/video2.mp4',
    thumbnail: 'https://picsum.photos/300/200?random=2',
    tags: ['fuerza', 'avanzado', 'compuestos'],
    difficulty: 'hard',
    topic: 'Fuerza',
    isFavorite: true
  },
  {
    id: '3',
    title: 'Yoga para Principiantes',
    description: 'Sesión de yoga suave perfecta para comenzar tu práctica.',
    url: 'https://example.com/video3.mp4',
    thumbnail: 'https://picsum.photos/300/200?random=3',
    tags: ['yoga', 'principiante', 'flexibilidad'],
    difficulty: 'easy',
    topic: 'Yoga',
    isFavorite: false
  },
  {
    id: '4',
    title: 'HIIT Cardio Intenso',
    description: 'Sesión de alta intensidad para quemar grasa y mejorar la condición cardiovascular.',
    url: 'https://example.com/video4.mp4',
    thumbnail: 'https://picsum.photos/300/200?random=4',
    tags: ['hiit', 'cardio', 'quemar-grasa'],
    difficulty: 'hard',
    topic: 'Cardio',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Pilates para el Core',
    description: 'Fortalece tu core con esta rutina de pilates enfocada en la estabilidad.',
    url: 'https://example.com/video5.mp4',
    thumbnail: 'https://picsum.photos/300/200?random=5',
    tags: ['pilates', 'core', 'estabilidad'],
    difficulty: 'medium',
    topic: 'Pilates',
    isFavorite: false
  }
];

export const fetchVideos = async (filters?: { tags?: string[]; difficulty?: string; topic?: string; search?: string }): Promise<Video[]> => {
  try {
    // En desarrollo, usar datos mock
    if (process.env.NODE_ENV === 'development') {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredVideos = [...mockVideos];
      
      // Aplicar filtros si existen
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
          filteredVideos = filteredVideos.filter(video => 
            video.topic.toLowerCase().includes(filters.topic!.toLowerCase())
          );
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
    }
    
    // En producción, usar API real
    const response = await axios.get<Video[]>(API_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    // En caso de error, devolver datos mock para desarrollo
    return mockVideos;
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
