# Guía de Interconexión - Módulo Blog Noticias

## Análisis del Estado Actual

### Frontend (Módulo blog-noticias)
**Ubicación**: `src/features/plansolopro/micrositio/micrositio/blog-noticias/`

#### Estructura Actual:
- `BlogNoticiasPage.tsx` - Página principal con routing
- `blogNoticiasApi.ts` - Servicios API (ACTUALMENTE MOCK)
- `components/` - Componentes UI:
  - `FeedArticulos.tsx` - Lista de artículos
  - `ArticuloCompleto.tsx` - Vista detallada
  - `CategoriasFiltro.tsx` - Filtros y búsqueda
  - `TarjetaArticulo.tsx` - Tarjeta individual

#### Llamadas HTTP Identificadas:
```typescript
// blogNoticiasApi.ts - ACTUALMENTE MOCK
export const getArticulos = (categoria?: string, searchTerm?: string): Promise<Articulo[]>
export const getArticuloById = (id: string): Promise<Articulo | undefined>
export const getCategorias = (): Promise<string[]>
```

#### Datos Mock Actuales:
- Array hardcodeado de 3 artículos
- Simulación de delay con `setTimeout`
- Filtrado local por categoría y búsqueda
- Sin autenticación

### Backend (Análisis de Patrones)
**Ubicación**: `backend/src/`

#### Patrón de API Identificado:
- Base path: `/api`
- Rutas REST estándar con kebab-case
- Autenticación requerida (`protect` middleware)
- Validación con `express-validator`
- Modelos MongoDB con Mongoose
- Controladores con CRUD completo

#### Ejemplo de Patrón (recetas):
- Ruta: `/api/recetas`
- Modelo: `Receta.model.js`
- Controlador: `receta.controller.js`
- Rutas: `receta.routes.js`

## Propuesta de Interconexión

### 1. BASE PATH del Recurso
**Propuesto**: `/api/blog-articulos`

**Justificación**: 
- Sigue el patrón kebab-case del sistema
- Distingue de otros recursos (recetas, entrenamientos)
- REST estándar con plural

### 2. Mapeo FE ↔ BE

#### Servicios Frontend → Endpoints Backend:
```typescript
// ACTUAL (Mock) → PROPUESTO (Real)
getArticulos() → GET /api/blog-articulos
getArticuloById(id) → GET /api/blog-articulos/:id
getCategorias() → GET /api/blog-articulos/categorias
```

#### Endpoints Adicionales Necesarios:
```typescript
// Para funcionalidad completa
POST /api/blog-articulos (crear)
PUT /api/blog-articulos/:id (actualizar)
DELETE /api/blog-articulos/:id (eliminar)
GET /api/blog-articulos/stats (estadísticas)
```

### 3. Contratos DTO

#### Request/Response DTOs:

```typescript
// Articulo DTO
interface Articulo {
  id: string;
  titulo: string;
  imagen: string;
  extracto: string;
  contenido: string;
  categoria: string;
  fechaPublicacion: string;
  autor?: string;
  tags?: string[];
  esPublico: boolean;
  vistas: number;
  createdAt: string;
  updatedAt: string;
}

// Request DTOs
interface CreateArticuloRequest {
  titulo: string;
  imagen: string;
  extracto: string;
  contenido: string;
  categoria: string;
  autor?: string;
  tags?: string[];
  esPublico?: boolean;
}

interface UpdateArticuloRequest extends Partial<CreateArticuloRequest> {
  id: string;
}

// Response DTOs
interface ArticulosResponse {
  success: boolean;
  data: Articulo[];
  total: number;
  page: number;
  limit: number;
}

interface ArticuloResponse {
  success: boolean;
  data: Articulo;
}

interface CategoriasResponse {
  success: boolean;
  data: string[];
}
```

### 4. Validaciones Propuestas

```javascript
// Validaciones para crear/actualizar artículo
const validateArticulo = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),

  body('extracto')
    .notEmpty()
    .withMessage('El extracto es obligatorio')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('El extracto debe tener entre 10 y 500 caracteres'),

  body('contenido')
    .notEmpty()
    .withMessage('El contenido es obligatorio')
    .trim()
    .isLength({ min: 50 })
    .withMessage('El contenido debe tener al menos 50 caracteres'),

  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres'),

  body('imagen')
    .optional()
    .isURL()
    .withMessage('La imagen debe ser una URL válida'),

  body('autor')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El autor debe tener entre 2 y 100 caracteres'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Los tags deben ser un array'),

  body('esPublico')
    .optional()
    .isBoolean()
    .withMessage('esPublico debe ser un booleano'),

  handleValidationErrors
];
```

## Plan de Tareas Atómicas

### TAREA 1: Crear Modelo Backend
**Archivo**: `backend/src/models/BlogArticulo.model.js`
**Acción**: CREAR
**Descripción**: Modelo MongoDB para artículos del blog

### TAREA 2: Crear Controlador Backend
**Archivo**: `backend/src/controllers/blogArticulo.controller.js`
**Acción**: CREAR
**Descripción**: Controlador con CRUD completo para artículos

### TAREA 3: Crear Rutas Backend
**Archivo**: `backend/src/routes/blogArticulo.routes.js`
**Acción**: CREAR
**Descripción**: Rutas REST con validaciones

### TAREA 4: Integrar Rutas en API Principal
**Archivo**: `backend/src/routes/api.routes.js`
**Acción**: MODIFICAR
**Descripción**: Agregar import y router.use para blog-articulos

### TAREA 5: Actualizar Servicios Frontend
**Archivo**: `src/features/plansolopro/micrositio/micrositio/blog-noticias/blogNoticiasApi.ts`
**Acción**: MODIFICAR
**Descripción**: Reemplazar mocks con llamadas HTTP reales

### TAREA 6: Actualizar Componentes Frontend
**Archivos**: 
- `components/FeedArticulos.tsx`
- `components/ArticuloCompleto.tsx`
- `components/CategoriasFiltro.tsx`
**Acción**: MODIFICAR
**Descripción**: Integrar filtros y búsqueda con backend

### TAREA 7: Agregar Manejo de Errores
**Archivos**: Todos los componentes
**Acción**: MODIFICAR
**Descripción**: Implementar manejo de errores HTTP

### TAREA 8: Agregar Loading States
**Archivos**: Todos los componentes
**Acción**: MODIFICAR
**Descripción**: Implementar estados de carga

## Placeholders de Diferencias

### Backend - Nuevo Modelo
```diff
+ // backend/src/models/BlogArticulo.model.js
+ import mongoose from 'mongoose';
+ 
+ const blogArticuloSchema = new mongoose.Schema({
+   titulo: { type: String, required: true, trim: true },
+   imagen: { type: String, trim: true },
+   extracto: { type: String, required: true, trim: true },
+   contenido: { type: String, required: true, trim: true },
+   categoria: { type: String, required: true, trim: true },
+   autor: { type: String, trim: true },
+   tags: [{ type: String, trim: true }],
+   esPublico: { type: Boolean, default: true },
+   vistas: { type: Number, default: 0 },
+   isDeleted: { type: Boolean, default: false }
+ }, { timestamps: true });
+ 
+ export default mongoose.model('BlogArticulo', blogArticuloSchema);
```

### Backend - Nuevo Controlador
```diff
+ // backend/src/controllers/blogArticulo.controller.js
+ import BlogArticulo from '../models/BlogArticulo.model.js';
+ 
+ export const getArticulos = async (req, res) => { ... }
+ export const getArticuloById = async (req, res) => { ... }
+ export const getCategorias = async (req, res) => { ... }
+ export const createArticulo = async (req, res) => { ... }
+ export const updateArticulo = async (req, res) => { ... }
+ export const deleteArticulo = async (req, res) => { ... }
```

### Backend - Nuevas Rutas
```diff
+ // backend/src/routes/blogArticulo.routes.js
+ import express from 'express';
+ import { getArticulos, getArticuloById, getCategorias, createArticulo, updateArticulo, deleteArticulo } from '../controllers/blogArticulo.controller.js';
+ import { protect } from '../middleware/auth.middleware.js';
+ import { validateArticulo } from '../middleware/validate.middleware.js';
+ 
+ const router = express.Router();
+ router.use(protect);
+ 
+ router.get('/', getArticulos);
+ router.get('/categorias', getCategorias);
+ router.get('/:id', getArticuloById);
+ router.post('/', validateArticulo, createArticulo);
+ router.put('/:id', validateArticulo, updateArticulo);
+ router.delete('/:id', deleteArticulo);
+ 
+ export default router;
```

### Backend - Integración en API Principal
```diff
// backend/src/routes/api.routes.js
+ import blogArticuloRoutes from './blogArticulo.routes.js';

// En el objeto endpoints:
+ blogArticulos: '/api/blog-articulos',

// En las rutas:
+ router.use('/blog-articulos', blogArticuloRoutes);
```

### Frontend - Servicios API
```diff
// src/features/plansolopro/micrositio/micrositio/blog-noticias/blogNoticiasApi.ts
- const articulos: Articulo[] = [...]; // MOCK DATA
- export const getArticulos = (categoria?: string, searchTerm?: string): Promise<Articulo[]> => {
-   return new Promise((resolve) => {
-     setTimeout(() => { ... }, 500);
-   });
- };

+ const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
+ 
+ export const getArticulos = async (categoria?: string, searchTerm?: string): Promise<Articulo[]> => {
+   const params = new URLSearchParams();
+   if (categoria && categoria !== 'Todas') params.append('categoria', categoria);
+   if (searchTerm) params.append('search', searchTerm);
+   
+   const response = await axios.get(`${API_BASE_URL}/blog-articulos?${params}`);
+   return response.data.data;
+ };
```

### Frontend - Componentes con Loading/Error
```diff
// components/FeedArticulos.tsx
const FeedArticulos: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
+ const [loading, setLoading] = useState(true);
+ const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticulos = async () => {
+     try {
+       setLoading(true);
        const data = await getArticulos();
        setArticulos(data);
+     } catch (err) {
+       setError('Error al cargar los artículos');
+     } finally {
+       setLoading(false);
+     }
    };
    fetchArticulos();
  }, []);

+ if (loading) return <div>Cargando...</div>;
+ if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articulos.map((articulo) => (
        <TarjetaArticulo key={articulo.id} articulo={articulo} />
      ))}
    </div>
  );
};
```

## Consideraciones Adicionales

### Autenticación
- El backend requiere autenticación (`protect` middleware)
- El frontend debe incluir tokens de autenticación en las peticiones
- Considerar implementar refresh token automático

### Paginación
- Implementar paginación en `getArticulos`
- Parámetros: `page`, `limit`, `sort`
- Response incluirá `total`, `page`, `limit`

### Búsqueda Avanzada
- Implementar búsqueda por texto completo
- Filtros por fecha, autor, tags
- Ordenamiento por relevancia, fecha, vistas

### Caching
- Considerar implementar cache en frontend
- Cache de categorías (cambian poco)
- Cache de artículos populares

### SEO
- URLs amigables para artículos
- Meta tags dinámicos
- Sitemap automático

### Performance
- Lazy loading de imágenes
- Virtualización para listas largas
- Compresión de imágenes

Esta guía proporciona una hoja de ruta completa para interconectar el módulo blog-noticias con el backend, siguiendo los patrones establecidos en el sistema y manteniendo la consistencia arquitectónica.
