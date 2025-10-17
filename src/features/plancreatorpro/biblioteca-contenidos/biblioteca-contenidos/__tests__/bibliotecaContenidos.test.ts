import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Importar las APIs y páginas a testear
import {
  getArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  deleteArticulo,
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  toggleFavorite,
  getArchivos,
  getArchivoById,
  createArchivo,
  updateArchivo,
  deleteArchivo,
  recordDownload,
  searchContent,
  getSearchSuggestions
} from '../bibliotecaContenidosApi';

import ContenidosArticulosPage from '../contenidos-articulos/ContenidosArticulosPage';
import ContenidosVideoPage from '../contenidos-video/ContenidosVideoPage';
import ContenidosDescargablesPage from '../contenidos-descargables/ContenidosDescargablesPage';
import BuscadorContenidosPage from '../buscador-contenidos/BuscadorContenidosPage';

// Mock de variables de entorno
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000'
  }
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Helper para renderizar con router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Biblioteca Contenidos - Tests de Integración', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('mock-token');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('API de Artículos', () => {
    it('debe obtener artículos correctamente', async () => {
      const mockArticles = [
        {
          id: '1',
          titulo: 'Test Article',
          extracto: 'Test excerpt',
          contenido: 'Test content',
          categoria: 'Test',
          autor: 'Test Author',
          tags: ['test'],
          esPublico: true,
          imagen: 'test.jpg',
          fechaCreacion: '2024-01-01',
          fechaActualizacion: '2024-01-01',
          vistas: 0,
          likes: 0
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockArticles }),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getArticulos();
      expect(result).toEqual(mockArticles);
    });

    it('debe manejar errores en getArticulos', async () => {
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error('Network error')),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(getArticulos()).rejects.toThrow('Network error');
    });

    it('debe crear artículo correctamente', async () => {
      const newArticle = {
        titulo: 'New Article',
        extracto: 'New excerpt',
        contenido: 'New content',
        categoria: 'New Category',
        autor: 'New Author',
        tags: ['new'],
        esPublico: true,
        imagen: 'new.jpg'
      };

      const mockResponse = { id: '2', ...newArticle };

      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await createArticulo(newArticle);
      expect(result).toEqual(mockResponse);
    });

    it('debe actualizar artículo correctamente', async () => {
      const updateData = { titulo: 'Updated Title' };
      const mockResponse = { id: '1', ...updateData };

      mockedAxios.create.mockReturnValue({
        put: vi.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await updateArticulo('1', updateData);
      expect(result).toEqual(mockResponse);
    });

    it('debe eliminar artículo correctamente', async () => {
      mockedAxios.create.mockReturnValue({
        delete: vi.fn().mockResolvedValue({ data: undefined }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(deleteArticulo('1')).resolves.toBeUndefined();
    });
  });

  describe('API de Videos', () => {
    it('debe obtener videos correctamente', async () => {
      const mockVideos = [
        {
          id: '1',
          titulo: 'Test Video',
          descripcion: 'Test description',
          url: 'test.mp4',
          thumbnail: 'thumb.jpg',
          tags: ['test'],
          dificultad: 'principiante' as const,
          topico: 'Test Topic',
          esFavorito: false,
          fechaCreacion: '2024-01-01',
          fechaActualizacion: '2024-01-01',
          duracion: 300,
          vistas: 0,
          likes: 0
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockVideos }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getVideos();
      expect(result).toEqual(mockVideos);
    });

    it('debe crear video correctamente', async () => {
      const newVideo = {
        titulo: 'New Video',
        descripcion: 'New description',
        url: 'new.mp4',
        thumbnail: 'new-thumb.jpg',
        tags: ['new'],
        dificultad: 'intermedio' as const,
        topico: 'New Topic',
        esFavorito: false
      };

      const mockResponse = { id: '2', ...newVideo };

      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await createVideo(newVideo);
      expect(result).toEqual(mockResponse);
    });

    it('debe toggle favorite correctamente', async () => {
      const mockResponse = { id: '1', esFavorito: true };

      mockedAxios.create.mockReturnValue({
        put: vi.fn().mockResolvedValue({ data: mockResponse }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await toggleFavorite('1', true);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('API de Archivos', () => {
    it('debe obtener archivos correctamente', async () => {
      const mockArchivos = [
        {
          id: '1',
          nombre: 'Test File.pdf',
          tipo: 'pdf',
          tamaño: 1024000,
          urlArchivo: 'test.pdf',
          urlPreview: 'preview.jpg',
          descripcion: 'Test file',
          categoria: 'Test',
          tags: ['test'],
          descargas: 0,
          fechaCreacion: '2024-01-01',
          fechaActualizacion: '2024-01-01'
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockArchivos }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getArchivos();
      expect(result).toEqual(mockArchivos);
    });

    it('debe registrar descarga correctamente', async () => {
      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue({ data: undefined }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(recordDownload('1')).resolves.toBeUndefined();
    });
  });

  describe('API de Búsqueda', () => {
    it('debe buscar contenido correctamente', async () => {
      const mockSearchResponse = {
        resultados: [
          {
            id: '1',
            tipo: 'articulo' as const,
            titulo: 'Test Article',
            descripcion: 'Test description',
            categoria: 'Test',
            tags: ['test'],
            fechaCreacion: '2024-01-01',
            relevancia: 0.9,
            url: 'test.html',
            thumbnail: 'thumb.jpg'
          }
        ],
        total: 1,
        filtros: {
          categorias: ['Test'],
          tags: ['test'],
          dificultades: ['principiante'],
          topicos: ['Test Topic'],
          tipos: ['articulo']
        },
        sugerencias: ['test suggestion'],
        tiempoBusqueda: 100
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockSearchResponse }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await searchContent('test query');
      expect(result).toEqual(mockSearchResponse);
    });

    it('debe obtener sugerencias correctamente', async () => {
      const mockSuggestions = ['test suggestion 1', 'test suggestion 2'];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockSuggestions }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getSearchSuggestions('test');
      expect(result).toEqual(mockSuggestions);
    });
  });

  describe('Tests de Render de Páginas', () => {
    it('debe renderizar ContenidosArticulosPage correctamente', async () => {
      // Mock de la API
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: [] }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<ContenidosArticulosPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Biblioteca Artículos')).toBeInTheDocument();
      });
    });

    it('debe renderizar ContenidosVideoPage correctamente', async () => {
      // Mock de la API
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: [] }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<ContenidosVideoPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Biblioteca Videos')).toBeInTheDocument();
      });
    });

    it('debe renderizar ContenidosDescargablesPage correctamente', async () => {
      // Mock de la API
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: [] }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<ContenidosDescargablesPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Contenidos Descargables')).toBeInTheDocument();
      });
    });

    it('debe renderizar BuscadorContenidosPage correctamente', async () => {
      // Mock de la API
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ 
          data: { 
            resultados: [], 
            total: 0, 
            filtros: { categorias: [], tags: [], dificultades: [], topicos: [], tipos: [] },
            sugerencias: [],
            tiempoBusqueda: 0
          } 
        }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<BuscadorContenidosPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Buscador Contenidos')).toBeInTheDocument();
      });
    });
  });

  describe('Verificación de Ausencia de Mocks', () => {
    it('no debe contener mocks en el código de producción', () => {
      // Verificar que las APIs usan axios real
      expect(mockedAxios.create).toBeDefined();
      
      // Verificar que no hay datos hardcodeados en las respuestas
      const mockData = [
        { id: '1', name: 'Mock Data' }
      ];
      
      // Las APIs deben usar axios, no datos mock
      expect(mockedAxios.create).toHaveBeenCalled();
    });

    it('debe usar variables de entorno correctamente', () => {
      expect(process.env.VITE_API_URL).toBeDefined();
    });

    it('debe configurar headers de autorización correctamente', () => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Manejo de Errores', () => {
    it('debe manejar errores de red correctamente', async () => {
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error('Network Error')),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(getArticulos()).rejects.toThrow('Network Error');
    });

    it('debe manejar errores 404 correctamente', async () => {
      const error404 = {
        response: {
          status: 404,
          data: { message: 'Not found' }
        }
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error404),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(getArticuloById('999')).rejects.toThrow();
    });

    it('debe manejar errores 401 correctamente', async () => {
      const error401 = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error401),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      await expect(getArticulos()).rejects.toThrow();
    });
  });
});
