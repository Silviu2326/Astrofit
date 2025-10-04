// API real para la gestión de lecciones

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

interface VideoUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  duration?: number;
}

interface LessonContent {
  id: string;
  title: string;
  blocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'image' | 'quiz' | 'pdf';
  content: string;
  order: number;
  metadata?: any;
}

// Configuración de la API (no se usa en modo mock, pero se mantiene para futuras implementaciones)
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
// const LESSON_ID = 'current-lesson';

// Datos mock para simular la API
const mockData = {
  videos: [
    {
      id: 'video_1',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      filename: 'video-ejemplo-1.mp4',
      size: 1048576,
      duration: 30
    },
    {
      id: 'video_2', 
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      filename: 'video-ejemplo-2.mp4',
      size: 2097152,
      duration: 60
    }
  ],
  files: [
    {
      id: 'file_1',
      filename: 'documento-ejemplo.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      size: 13264,
      type: 'application/pdf'
    },
    {
      id: 'file_2',
      filename: 'presentacion.pptx',
      url: 'https://file-examples.com/storage/fe68c1b8a5b5b5b5b5b5b5b/sample.pptx',
      size: 25600,
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
  ],
  lesson: {
    id: 'current-lesson',
    title: 'Lección de Ejemplo',
    blocks: [
    {
      id: 'block_1',
      type: 'text' as const,
      content: 'Este es un ejemplo de contenido de texto para la lección.',
      order: 0
    },
    {
      id: 'block_2',
      type: 'video' as const,
      content: 'video_1',
      order: 1
    }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

// Función helper para simular delay de red
const simulateNetworkDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Función helper para hacer requests (ahora con datos mock) - No se usa actualmente
// const apiRequest = async <T>(
//   endpoint: string, 
//   options: RequestInit = {}
// ): Promise<ApiResponse<T>> => {
//   // Simular delay de red
//   await simulateNetworkDelay();
//   
//   // Simular diferentes endpoints
//   if (endpoint.includes('/videos')) {
//     return {
//       success: true,
//       data: mockData.videos as T,
//       message: 'Videos cargados exitosamente'
//     };
//   }
//   
//   if (endpoint.includes('/files')) {
//     return {
//       success: true,
//       data: mockData.files as T,
//       message: 'Archivos cargados exitosamente'
//     };
//   }
//   
//   if (endpoint.includes('/lessons/') && !endpoint.includes('/videos') && !endpoint.includes('/files')) {
//     return {
//       success: true,
//       data: mockData.lesson as T,
//       message: 'Lección cargada exitosamente'
//     };
//   }
//   
//   // Endpoint no encontrado
//   throw new Error(`Endpoint ${endpoint} not found in mock data`);
// };

// Subir video (simulado con datos mock)
export const uploadVideo = async (file: File): Promise<VideoUploadResponse> => {
  // Simular delay de upload
  await simulateNetworkDelay(1000);
  
  // Crear respuesta mock
  const newVideo: VideoUploadResponse = {
    id: `video_${Date.now()}`,
    url: URL.createObjectURL(file),
    filename: file.name,
    size: file.size,
    duration: Math.floor(Math.random() * 300) + 30 // Duración aleatoria entre 30-330 segundos
  };
  
  // Agregar a datos mock (con tipo correcto)
  mockData.videos.push({
    id: newVideo.id,
    url: newVideo.url,
    filename: newVideo.filename,
    size: newVideo.size,
    duration: newVideo.duration || 0
  });
  
  console.log('Video subido (mock):', newVideo);
  return newVideo;
};

// Subir archivos múltiples (simulado con datos mock)
export const uploadFiles = async (files: File[]): Promise<{ id: string; filename: string; url: string; size: number }[]> => {
  // Simular delay de upload
  await simulateNetworkDelay(800);
  
  const uploadedFiles = files.map(file => {
    const newFile = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      filename: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type
    };
    
    // Agregar a datos mock
    mockData.files.push(newFile);
    
    return newFile;
  });
  
  console.log('Archivos subidos (mock):', uploadedFiles);
  return uploadedFiles;
};

// Guardar contenido de lección (simulado con datos mock)
export const saveLessonContent = async (content: LessonContent): Promise<void> => {
  // Simular delay de guardado
  await simulateNetworkDelay(600);
  
  // Actualizar datos mock
  mockData.lesson = {
    id: content.id,
    title: content.title,
    blocks: content.blocks as any, // Type assertion para evitar conflictos de tipos
    createdAt: content.createdAt,
    updatedAt: new Date().toISOString()
  };
  
  // También guardar en localStorage como backup
  localStorage.setItem(`lesson_${content.id}`, JSON.stringify(content));
  
  console.log('Lección guardada (mock):', content);
};

// Obtener contenido de lección (simulado con datos mock)
export const fetchLessonContent = async (lessonId: string): Promise<LessonContent> => {
  // Simular delay de carga
  await simulateNetworkDelay(400);
  
  // Intentar obtener de localStorage primero
  const stored = localStorage.getItem(`lesson_${lessonId}`);
  if (stored) {
    const parsedLesson = JSON.parse(stored);
    console.log('Lección cargada desde localStorage:', parsedLesson);
    return parsedLesson;
  }
  
  // Usar datos mock por defecto
  console.log('Lección cargada desde mock data:', mockData.lesson);
  return mockData.lesson;
};

// Eliminar archivo (simulado con datos mock)
export const deleteFile = async (fileId: string): Promise<void> => {
  // Simular delay de eliminación
  await simulateNetworkDelay(300);
  
  // Eliminar de datos mock
  const index = mockData.files.findIndex(file => file.id === fileId);
  if (index > -1) {
    mockData.files.splice(index, 1);
    console.log('Archivo eliminado (mock):', fileId);
  }
};

// Eliminar video (simulado con datos mock)
export const deleteVideo = async (videoId: string): Promise<void> => {
  // Simular delay de eliminación
  await simulateNetworkDelay(300);
  
  // Eliminar de datos mock
  const index = mockData.videos.findIndex(video => video.id === videoId);
  if (index > -1) {
    mockData.videos.splice(index, 1);
    console.log('Video eliminado (mock):', videoId);
  }
};

// Obtener lista de archivos de la lección (simulado con datos mock)
export const getLessonFiles = async (_lessonId: string): Promise<any[]> => {
  // Simular delay de carga
  await simulateNetworkDelay(300);
  
  console.log('Archivos cargados (mock):', mockData.files);
  return mockData.files;
};

// Obtener lista de videos de la lección (simulado con datos mock)
export const getLessonVideos = async (_lessonId: string): Promise<any[]> => {
  // Simular delay de carga
  await simulateNetworkDelay(300);
  
  console.log('Videos cargados (mock):', mockData.videos);
  return mockData.videos;
};

// Exportar tipos para uso en componentes
export type { VideoUploadResponse, LessonContent, ContentBlock };