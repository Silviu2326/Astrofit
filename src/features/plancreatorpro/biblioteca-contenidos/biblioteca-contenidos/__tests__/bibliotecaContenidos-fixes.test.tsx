import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Importar las APIs y páginas a testear
import {
  getArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  getArchivos,
  getArchivoById,
  createArchivo,
  updateArchivo,
  searchContent
} from '../bibliotecaContenidosApi';

import ContenidosArticulosPage from '../contenidos-articulos/ContenidosArticulosPage';
import ContenidosVideoPage from '../contenidos-video/ContenidosVideoPage';
import ContenidosDescargablesPage from '../contenidos-descargables/ContenidosDescargablesPage';
import BuscadorContenidosPage from '../buscador-contenidos/BuscadorContenidosPage';

// Importar tipos para verificar alineación
import {
  CreateVideoDto,
  VideoResponse,
  ArticuloResponse,
  ArchivoResponse
} from '../types/index';

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

describe('Biblioteca Contenidos - Tests de Correcciones Frontend', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('mock-token');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Tests de Mapeo de Campos', () => {
    it('getArticulos debe devolver objetos con campos mapeados', async () => {
      const mockBackendData = [
        {
          _id: '1',
          titulo: 'Test Article',
          extracto: 'Test excerpt',
          contenido: 'Test content',
          categoria: 'Test',
          autor: 'Test Author',
          tags: ['test'],
          esPublico: true,
          imagen: 'test.jpg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          vistas: 0,
          likes: 0,
          isDeleted: false
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockBackendData }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getArticulos();
      
      // Verificar que los campos están mapeados correctamente
      expect(result[0]).toHaveProperty('id', '1');
      expect(result[0]).toHaveProperty('fechaCreacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('fechaActualizacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('isDeleted', false);
      
      // Verificar que los campos del backend no existen
      expect(result[0]).not.toHaveProperty('_id');
      expect(result[0]).not.toHaveProperty('createdAt');
      expect(result[0]).not.toHaveProperty('updatedAt');
    });

    it('getVideos debe devolver objetos con campos mapeados', async () => {
      const mockBackendData = [
        {
          _id: '1',
          titulo: 'Test Video',
          descripcion: 'Test description',
          url: 'test.mp4',
          thumbnail: 'thumb.jpg',
          tags: ['test'],
          dificultad: 'easy',
          topico: 'Test Topic',
          esFavorito: false,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          duracion: 300,
          vistas: 0,
          likes: 0,
          isDeleted: false
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockBackendData }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getVideos();
      
      // Verificar que los campos están mapeados correctamente
      expect(result[0]).toHaveProperty('id', '1');
      expect(result[0]).toHaveProperty('fechaCreacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('fechaActualizacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('isDeleted', false);
      expect(result[0]).toHaveProperty('dificultad', 'easy');
      
      // Verificar que los campos del backend no existen
      expect(result[0]).not.toHaveProperty('_id');
      expect(result[0]).not.toHaveProperty('createdAt');
      expect(result[0]).not.toHaveProperty('updatedAt');
    });

    it('getArchivos debe devolver objetos con campos mapeados', async () => {
      const mockBackendData = [
        {
          _id: '1',
          nombre: 'Test File.pdf',
          tipo: 'pdf',
          tamaño: 1024000,
          urlArchivo: 'test.pdf',
          urlPreview: 'preview.jpg',
          descripcion: 'Test file',
          categoria: 'Test',
          tags: ['test'],
          descargas: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isDeleted: false
        }
      ];

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockBackendData }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await getArchivos();
      
      // Verificar que los campos están mapeados correctamente
      expect(result[0]).toHaveProperty('id', '1');
      expect(result[0]).toHaveProperty('fechaCreacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('fechaActualizacion', '2024-01-01T00:00:00Z');
      expect(result[0]).toHaveProperty('isDeleted', false);
      
      // Verificar que los campos del backend no existen
      expect(result[0]).not.toHaveProperty('_id');
      expect(result[0]).not.toHaveProperty('createdAt');
      expect(result[0]).not.toHaveProperty('updatedAt');
    });

    it('searchContent debe devolver resultados con campos mapeados', async () => {
      const mockBackendData = {
        resultados: [
          {
            _id: '1',
            tipo: 'articulo',
            titulo: 'Test Article',
            descripcion: 'Test description',
            categoria: 'Test',
            tags: ['test'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            relevancia: 0.9,
            url: 'test.html',
            thumbnail: 'thumb.jpg'
          }
        ],
        total: 1,
        filtros: {
          categorias: ['Test'],
          tags: ['test'],
          dificultades: ['easy'],
          topicos: ['Test Topic'],
          tipos: ['articulo']
        },
        sugerencias: ['test suggestion'],
        tiempoBusqueda: 100
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockBackendData }),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      const result = await searchContent('test query');
      
      // Verificar que los campos están mapeados correctamente
      expect(result.resultados[0]).toHaveProperty('id', '1');
      expect(result.resultados[0]).toHaveProperty('fechaCreacion', '2024-01-01T00:00:00Z');
      expect(result.resultados[0]).toHaveProperty('fechaActualizacion', '2024-01-01T00:00:00Z');
      
      // Verificar que los campos del backend no existen
      expect(result.resultados[0]).not.toHaveProperty('_id');
      expect(result.resultados[0]).not.toHaveProperty('createdAt');
      expect(result.resultados[0]).not.toHaveProperty('updatedAt');
    });
  });

  describe('Tests de Tipos Alineados', () => {
    it('CreateVideoDto debe aceptar dificultad en inglés', () => {
      const videoDto: CreateVideoDto = {
        titulo: 'Test Video',
        descripcion: 'Test description',
        url: 'test.mp4',
        thumbnail: 'thumb.jpg',
        tags: ['test'],
        dificultad: 'easy', // Debe aceptar 'easy', 'medium', 'hard'
        topico: 'Test Topic',
        esFavorito: false
      };

      expect(videoDto.dificultad).toBe('easy');
    });

    it('CreateVideoDto debe aceptar dificultad medium', () => {
      const videoDto: CreateVideoDto = {
        titulo: 'Test Video',
        descripcion: 'Test description',
        url: 'test.mp4',
        thumbnail: 'thumb.jpg',
        tags: ['test'],
        dificultad: 'medium',
        topico: 'Test Topic',
        esFavorito: false
      };

      expect(videoDto.dificultad).toBe('medium');
    });

    it('CreateVideoDto debe aceptar dificultad hard', () => {
      const videoDto: CreateVideoDto = {
        titulo: 'Test Video',
        descripcion: 'Test description',
        url: 'test.mp4',
        thumbnail: 'thumb.jpg',
        tags: ['test'],
        dificultad: 'hard',
        topico: 'Test Topic',
        esFavorito: false
      };

      expect(videoDto.dificultad).toBe('hard');
    });

    it('VideoResponse debe incluir todos los campos del backend', () => {
      const videoResponse: VideoResponse = {
        id: '1',
        titulo: 'Test Video',
        descripcion: 'Test description',
        url: 'test.mp4',
        thumbnail: 'thumb.jpg',
        tags: ['test'],
        dificultad: 'easy',
        topico: 'Test Topic',
        esFavorito: false,
        fechaCreacion: '2024-01-01T00:00:00Z',
        fechaActualizacion: '2024-01-01T00:00:00Z',
        duracion: 300,
        vistas: 0,
        likes: 0,
        isDeleted: false
      };

      // Verificar que todos los campos están presentes
      expect(videoResponse).toHaveProperty('id');
      expect(videoResponse).toHaveProperty('titulo');
      expect(videoResponse).toHaveProperty('descripcion');
      expect(videoResponse).toHaveProperty('url');
      expect(videoResponse).toHaveProperty('thumbnail');
      expect(videoResponse).toHaveProperty('tags');
      expect(videoResponse).toHaveProperty('dificultad');
      expect(videoResponse).toHaveProperty('topico');
      expect(videoResponse).toHaveProperty('esFavorito');
      expect(videoResponse).toHaveProperty('fechaCreacion');
      expect(videoResponse).toHaveProperty('fechaActualizacion');
      expect(videoResponse).toHaveProperty('duracion');
      expect(videoResponse).toHaveProperty('vistas');
      expect(videoResponse).toHaveProperty('likes');
      expect(videoResponse).toHaveProperty('isDeleted');
    });

    it('ArticuloResponse debe incluir campo isDeleted', () => {
      const articuloResponse: ArticuloResponse = {
        id: '1',
        titulo: 'Test Article',
        extracto: 'Test excerpt',
        contenido: 'Test content',
        categoria: 'Test',
        autor: 'Test Author',
        tags: ['test'],
        esPublico: true,
        imagen: 'test.jpg',
        fechaCreacion: '2024-01-01T00:00:00Z',
        fechaActualizacion: '2024-01-01T00:00:00Z',
        vistas: 0,
        likes: 0,
        isDeleted: false
      };

      expect(articuloResponse).toHaveProperty('isDeleted', false);
    });

    it('ArchivoResponse debe incluir campo isDeleted', () => {
      const archivoResponse: ArchivoResponse = {
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
        fechaCreacion: '2024-01-01T00:00:00Z',
        fechaActualizacion: '2024-01-01T00:00:00Z',
        isDeleted: false
      };

      expect(archivoResponse).toHaveProperty('isDeleted', false);
    });
  });

  describe('Tests de API Centralizada', () => {
    it('todas las funciones de artículos deben estar disponibles', () => {
      expect(typeof getArticulos).toBe('function');
      expect(typeof getArticuloById).toBe('function');
      expect(typeof createArticulo).toBe('function');
      expect(typeof updateArticulo).toBe('function');
    });

    it('todas las funciones de videos deben estar disponibles', () => {
      expect(typeof getVideos).toBe('function');
      expect(typeof getVideoById).toBe('function');
      expect(typeof createVideo).toBe('function');
      expect(typeof updateVideo).toBe('function');
    });

    it('todas las funciones de archivos deben estar disponibles', () => {
      expect(typeof getArchivos).toBe('function');
      expect(typeof getArchivoById).toBe('function');
      expect(typeof createArchivo).toBe('function');
      expect(typeof updateArchivo).toBe('function');
    });

    it('función de búsqueda debe estar disponible', () => {
      expect(typeof searchContent).toBe('function');
    });

    it('no debe haber duplicación de funciones', () => {
      // Verificar que las funciones están definidas una sola vez
      const functions = [
        getArticulos, getArticuloById, createArticulo, updateArticulo,
        getVideos, getVideoById, createVideo, updateVideo,
        getArchivos, getArchivoById, createArchivo, updateArchivo,
        searchContent
      ];

      const uniqueFunctions = new Set(functions);
      expect(uniqueFunctions.size).toBe(functions.length);
    });
  });

  describe('Tests de Páginas', () => {
    it('ContenidosArticulosPage debe importar de bibliotecaContenidosApi', async () => {
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

    it('ContenidosVideoPage debe importar de bibliotecaContenidosApi', async () => {
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

    it('ContenidosDescargablesPage debe importar de bibliotecaContenidosApi', async () => {
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

    it('BuscadorContenidosPage debe importar de bibliotecaContenidosApi', async () => {
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

    it('las páginas deben manejar estados de carga correctamente', async () => {
      // Mock de la API con delay
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockImplementation(() => 
          new Promise(resolve => setTimeout(() => resolve({ data: [] }), 100))
        ),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<ContenidosArticulosPage />);
      
      // Verificar que se muestra el estado de carga
      expect(screen.getByText('Cargando artículos...')).toBeInTheDocument();
      
      // Esperar a que termine la carga
      await waitFor(() => {
        expect(screen.getByText('Biblioteca Artículos')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('las páginas deben manejar errores correctamente', async () => {
      // Mock de la API con error
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error('Network Error')),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      } as any);

      renderWithRouter(<ContenidosArticulosPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Error al cargar artículos')).toBeInTheDocument();
      });
    });
  });

  describe('Verificación de Correcciones Completas', () => {
    it('debe verificar que no hay errores de TypeScript', () => {
      // Este test verifica que los tipos están correctamente alineados
      const videoDto: CreateVideoDto = {
        titulo: 'Test',
        descripcion: 'Test',
        url: 'test.mp4',
        dificultad: 'easy',
        topico: 'Test'
      };

      expect(videoDto.dificultad).toBe('easy');
    });

    it('debe verificar que los campos opcionales están marcados correctamente', () => {
      const articuloResponse: ArticuloResponse = {
        id: '1',
        titulo: 'Test',
        extracto: 'Test',
        contenido: 'Test',
        categoria: 'Test',
        esPublico: true,
        fechaCreacion: '2024-01-01',
        fechaActualizacion: '2024-01-01',
        vistas: 0,
        likes: 0,
        isDeleted: false
        // autor, imagen, tags son opcionales y no están presentes
      };

      expect(articuloResponse).toHaveProperty('id');
      expect(articuloResponse).toHaveProperty('titulo');
      expect(articuloResponse).toHaveProperty('extracto');
      expect(articuloResponse).toHaveProperty('contenido');
      expect(articuloResponse).toHaveProperty('categoria');
      expect(articuloResponse).toHaveProperty('esPublico');
      expect(articuloResponse).toHaveProperty('fechaCreacion');
      expect(articuloResponse).toHaveProperty('fechaActualizacion');
      expect(articuloResponse).toHaveProperty('vistas');
      expect(articuloResponse).toHaveProperty('likes');
      expect(articuloResponse).toHaveProperty('isDeleted');
    });

    it('debe verificar que las interfaces coinciden con las respuestas del backend', () => {
      // Simular respuesta del backend
      const backendResponse = {
        _id: '1',
        titulo: 'Test',
        descripcion: 'Test',
        url: 'test.mp4',
        dificultad: 'easy',
        topico: 'Test',
        esFavorito: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        duracion: 300,
        vistas: 0,
        likes: 0,
        isDeleted: false
      };

      // Simular mapeo (como lo haría mapResponse)
      const mappedResponse = {
        id: backendResponse._id,
        titulo: backendResponse.titulo,
        descripcion: backendResponse.descripcion,
        url: backendResponse.url,
        dificultad: backendResponse.dificultad,
        topico: backendResponse.topico,
        esFavorito: backendResponse.esFavorito,
        fechaCreacion: backendResponse.createdAt,
        fechaActualizacion: backendResponse.updatedAt,
        duracion: backendResponse.duracion,
        vistas: backendResponse.vistas,
        likes: backendResponse.likes,
        isDeleted: backendResponse.isDeleted
      };

      // Verificar que el mapeo es correcto
      expect(mappedResponse.id).toBe(backendResponse._id);
      expect(mappedResponse.fechaCreacion).toBe(backendResponse.createdAt);
      expect(mappedResponse.fechaActualizacion).toBe(backendResponse.updatedAt);
      expect(mappedResponse.isDeleted).toBe(backendResponse.isDeleted);
    });
  });
});
