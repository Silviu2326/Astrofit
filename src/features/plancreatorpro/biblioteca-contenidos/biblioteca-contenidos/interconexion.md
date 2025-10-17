# Interconexión — biblioteca-contenidos

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/biblioteca-contenidos` (inferido del patrón existente en el backend que usa kebab-case para rutas plurales).
- **Objetivo**: Conectar FE↔BE para el módulo de biblioteca de contenidos que incluye artículos, videos, archivos descargables y búsqueda centralizada.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TypeScript, baseURL por .env, Auth Bearer, estados UI (loading/error/empty), validación con express-validator.

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → BASE PATH → controller → model → MongoDB. El módulo maneja 4 sub-recursos: artículos, videos, archivos descargables y búsqueda centralizada, cada uno con su propio endpoint pero bajo el mismo BASE PATH.

## 4) Contratos de Datos (DTO)

### 4.1 Artículos
**Request DTO (Create/Update)**:
```typescript
{
  titulo: string (required, 5-200 chars)
  extracto: string (required, 10-500 chars) 
  contenido: string (required, min 50 chars)
  categoria: string (required, 2-50 chars)
  autor?: string (optional, 2-100 chars)
  tags?: string[] (optional)
  esPublico?: boolean (optional, default true)
  imagen?: string (optional, URL)
}
```

**Response DTO**:
```typescript
{
  _id: string
  titulo: string
  extracto: string
  contenido: string
  categoria: string
  autor: string
  tags: string[]
  esPublico: boolean
  imagen: string
  vistas: number
  createdAt: string
  updatedAt: string
}
```

### 4.2 Videos
**Request DTO**:
```typescript
{
  titulo: string (required)
  descripcion: string (required)
  url: string (required, URL)
  thumbnail: string (required, URL)
  tags: string[] (required)
  dificultad: 'easy' | 'medium' | 'hard' (required)
  topico: string (required)
  esFavorito?: boolean (optional, default false)
}
```

### 4.3 Archivos Descargables
**Request DTO**:
```typescript
{
  nombre: string (required)
  tipo: string (required)
  tamaño: string (required)
  urlArchivo: string (required, URL)
  urlPreview?: string (optional, URL)
  descargas: number (default 0)
}
```

### 4.4 Búsqueda Centralizada
**Request DTO**:
```typescript
{
  query: string (required)
  tipo?: 'articulo' | 'video' | 'archivo' | 'todos'
  categoria?: string
  topico?: string
  dificultad?: string
  page?: number (default 1)
  limit?: number (default 20)
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/bibliotecaContenidosApi.ts` → funciones centralizadas que llaman al BASE PATH.
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/` → interfaces TypeScript para DTOs.

### 5.2 MODIFICAR
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/buscador-contenidos/buscadorContenidosApi.ts` → reemplazar mocks con llamadas reales.
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-articulos/contenidosArticulosApi.ts` → cambiar baseUrl y eliminar queryFn mocks.
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-video/contenidosVideoApi.ts` → reemplazar mocks con axios real.
- `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-descargables/contenidosDescargablesApi.ts` → implementar funciones reales.

### 5.3 Placeholders de Diff (forma)
```diff
# src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/buscador-contenidos/buscadorContenidosApi.ts
+ add: searchContent(query: string, filters: SearchFilters): Promise<SearchResults>
+ replace: MOCK → GET {BASE_PATH}/search?q={query}&tipo={filters.tipo}
+ error: map 4xx/5xx a Result<Error>

# src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-articulos/contenidosArticulosApi.ts
+ replace: baseUrl: '/api/articles' → baseUrl: process.env.VITE_API_URL + '/biblioteca-contenidos/articulos'
+ replace: queryFn mocks → query: () => 'articulos'
+ error: map API errors a RTK Query errors

# src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-video/contenidosVideoApi.ts
+ replace: mockVideos → axios.get(`${BASE_PATH}/videos`)
+ replace: API_BASE_URL → process.env.VITE_API_URL + '/biblioteca-contenidos/videos'
+ error: handle axios errors properly
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR
- `backend/src/routes/bibliotecaContenidos.routes.js` → lista completa de endpoints (GET/POST/PUT/DELETE).
- `backend/src/controllers/bibliotecaContenidos.controller.js` → controladores para artículos, videos, archivos y búsqueda.
- `backend/src/models/ContenidoVideo.model.js` → esquema para videos.
- `backend/src/models/ContenidoArchivo.model.js` → esquema para archivos descargables.

### 6.2 MODIFICAR
- `backend/src/routes/api.routes.js` → agregar `router.use('/biblioteca-contenidos', bibliotecaContenidosRoutes)`.
- `backend/src/models/BlogArticulo.model.js` → ya existe, verificar compatibilidad.

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/api.routes.js
+ import bibliotecaContenidosRoutes from './bibliotecaContenidos.routes.js';
+ router.use('/biblioteca-contenidos', bibliotecaContenidosRoutes);

# backend/src/routes/bibliotecaContenidos.routes.js
+ router.get('/articulos', auth, ctrl.getArticulos)
+ router.post('/articulos', auth, validate(CreateArticuloDto), ctrl.createArticulo)
+ router.get('/videos', auth, ctrl.getVideos)
+ router.post('/videos', auth, validate(CreateVideoDto), ctrl.createVideo)
+ router.get('/archivos', auth, ctrl.getArchivos)
+ router.post('/archivos', auth, validate(CreateArchivoDto), ctrl.createArchivo)
+ router.get('/search', auth, ctrl.searchContenidos)
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|--------------|
| Buscar contenido | searchContent() | GET /api/biblioteca-contenidos/search | searchContenidos | BlogArticulo, ContenidoVideo, ContenidoArchivo | SearchRequest | SearchResponse |
| Listar artículos | getArticles() | GET /api/biblioteca-contenidos/articulos | getArticulos | BlogArticulo | - | ArticuloResponse[] |
| Crear artículo | createArticle() | POST /api/biblioteca-contenidos/articulos | createArticulo | BlogArticulo | CreateArticuloDto | ArticuloResponse |
| Listar videos | fetchVideos() | GET /api/biblioteca-contenidos/videos | getVideos | ContenidoVideo | - | VideoResponse[] |
| Subir video | uploadVideo() | POST /api/biblioteca-contenidos/videos | createVideo | ContenidoVideo | CreateVideoDto | VideoResponse |
| Listar archivos | fetchDownloadableContent() | GET /api/biblioteca-contenidos/archivos | getArchivos | ContenidoArchivo | - | ArchivoResponse[] |
| Registrar descarga | recordDownload() | POST /api/biblioteca-contenidos/archivos/:id/download | recordDownload | ContenidoArchivo | - | SuccessResponse |

## 8) Configuración y Seguridad

**FE**: 
- `VITE_API_URL=http://localhost:5000/api` (baseURL)
- Headers: `Authorization: Bearer ${token}`

**BE**: 
- `CORS_ORIGIN=http://localhost:5173`
- `JWT_SECRET` para autenticación
- `DB_URI` para MongoDB
- Middleware `protect` en todas las rutas
- Validación con `express-validator`

## 9) Plan de Tareas Atómicas (convertible a prompts)

**T1**: Crear tipos TypeScript para DTOs
- **Target**: frontend
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/`
- **Objetivo**: Definir interfaces para Request/Response DTOs
- **Pasos**: Crear archivos de tipos para Artículo, Video, Archivo, Search
- **Criterios**: Interfaces exportables y reutilizables

**T2**: Crear API centralizada de biblioteca
- **Target**: frontend  
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/bibliotecaContenidosApi.ts`
- **Objetivo**: API centralizada con axios para todos los endpoints
- **Pasos**: Implementar funciones para artículos, videos, archivos y búsqueda
- **Criterios**: Manejo de errores, loading states, tipos TypeScript

**T3**: Migrar API de artículos a backend real
- **Target**: frontend
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-articulos/contenidosArticulosApi.ts`
- **Objetivo**: Reemplazar RTK Query mocks con llamadas reales
- **Pasos**: Cambiar baseUrl, eliminar queryFn, usar axios
- **Criterios**: Funcionalidad idéntica sin mocks

**T4**: Migrar API de videos a backend real
- **Target**: frontend
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-video/contenidosVideoApi.ts`
- **Objetivo**: Reemplazar mocks con llamadas axios reales
- **Pasos**: Eliminar mockVideos, implementar axios calls
- **Criterios**: Filtros funcionando, manejo de errores

**T5**: Implementar API de archivos descargables
- **Target**: frontend
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-descargables/contenidosDescargablesApi.ts`
- **Objetivo**: Implementar funciones reales para archivos
- **Pasos**: fetchDownloadableContent, recordDownload con axios
- **Criterios**: Listado y registro de descargas funcionando

**T6**: Implementar búsqueda centralizada
- **Target**: frontend
- **Archivos**: `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/buscador-contenidos/buscadorContenidosApi.ts`
- **Objetivo**: Reemplazar mocks con búsqueda real
- **Pasos**: searchContent, getSearchSuggestions con axios
- **Criterios**: Búsqueda unificada funcionando

**T7**: Crear rutas de biblioteca en backend
- **Target**: backend
- **Archivos**: `backend/src/routes/bibliotecaContenidos.routes.js`
- **Objetivo**: Definir todas las rutas del módulo
- **Pasos**: GET/POST/PUT/DELETE para artículos, videos, archivos, search
- **Criterios**: Rutas RESTful con validación

**T8**: Crear controladores de biblioteca
- **Target**: backend
- **Archivos**: `backend/src/controllers/bibliotecaContenidos.controller.js`
- **Objetivo**: Implementar lógica de negocio para todos los endpoints
- **Pasos**: CRUD completo para cada tipo de contenido
- **Criterios**: Manejo de errores, validación, respuestas consistentes

**T9**: Crear modelos de video y archivo
- **Target**: backend
- **Archivos**: `backend/src/models/ContenidoVideo.model.js`, `backend/src/models/ContenidoArchivo.model.js`
- **Objetivo**: Esquemas MongoDB para videos y archivos
- **Pasos**: Definir schemas con validación e índices
- **Criterios**: Esquemas compatibles con DTOs del frontend

**T10**: Integrar rutas en API principal
- **Target**: backend
- **Archivos**: `backend/src/routes/api.routes.js`
- **Objetivo**: Montar rutas de biblioteca en la API principal
- **Pasos**: Import y router.use para biblioteca-contenidos
- **Criterios**: Rutas accesibles en /api/biblioteca-contenidos

## 10) Indicaciones para Prompt 2 (generar JSON)

Convertir T1..T10 a `src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/prompts.json` con:

```json
{
  "meta": { 
    "module": "biblioteca-contenidos", 
    "run_id": "2024-01-20T10:00:00Z" 
  },
  "prompts": [
    {
      "id": "P1",
      "target": "frontend",
      "title": "Crear tipos TypeScript para DTOs de biblioteca",
      "files_hint": [
        "src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/Articulo.ts",
        "src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/Video.ts",
        "src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/Archivo.ts",
        "src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/types/Search.ts"
      ],
      "content": "Crear interfaces TypeScript para todos los DTOs del módulo biblioteca-contenidos. Incluir tipos para Request/Response de artículos, videos, archivos y búsqueda. Exportar desde index.ts para fácil importación."
    },
    {
      "id": "P2", 
      "target": "frontend",
      "title": "Crear API centralizada de biblioteca con axios",
      "files_hint": [
        "src/features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/bibliotecaContenidosApi.ts"
      ],
      "content": "Implementar API centralizada usando axios para todos los endpoints de biblioteca-contenidos. Incluir funciones para artículos, videos, archivos y búsqueda. Manejar errores, loading states y usar tipos TypeScript."
    }
  ]
}
```
