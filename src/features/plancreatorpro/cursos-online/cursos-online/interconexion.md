# Interconexión — cursos-online

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/cursos` (siguiendo convención REST del backend existente).
- **Objetivo**: Conectar FE↔BE para el módulo de cursos online con funcionalidades completas de gestión de cursos, lecciones, quizzes y evaluaciones.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatorpro/cursos-online/cursos-online/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TypeScript, baseURL por VITE_API_URL, Auth Bearer JWT, estados UI (loading/error/empty), validación con express-validator.

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → `/api/cursos` → controller → model → MongoDB.

## 4) Contratos de Datos (DTO)

### 4.1 Curso
```typescript
interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  imagenPortada: string;
  precio: number;
  estado: 'borrador' | 'activo' | 'pausado' | 'archivado';
  categoria: string;
  duracion: string; // "10 horas"
  modulos: Modulo[];
  alumnos: Alumno[];
  progresoMedio: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  instructorId: string;
}

interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  orden: number;
  lecciones: Leccion[];
}

interface Leccion {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'video' | 'texto' | 'quiz' | 'archivo';
  contenido: string; // URL o contenido
  duracion: number; // minutos
  orden: number;
  bloqueada: boolean;
}
```

### 4.2 Quiz/Evaluación
```typescript
interface Quiz {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number; // minutos
  intentosPermitidos: number;
  puntuacionMinima: number;
  estado: 'borrador' | 'activo' | 'pausado';
  preguntas: Pregunta[];
  fechaCreacion: string;
  cursoId: string;
  leccionId?: string;
}

interface Pregunta {
  id: string;
  pregunta: string;
  tipo: 'opcion-multiple' | 'verdadero-falso' | 'texto-libre';
  opciones?: string[];
  respuestaCorrecta?: string | boolean;
  puntos: number;
  orden: number;
}
```

### 4.3 Request/Response DTOs
```typescript
// Crear curso
interface CreateCursoRequest {
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenPortada?: string;
}

// Actualizar curso
interface UpdateCursoRequest {
  titulo?: string;
  descripcion?: string;
  precio?: number;
  estado?: 'borrador' | 'activo' | 'pausado' | 'archivado';
  imagenPortada?: string;
}

// Listar cursos
interface ListCursosResponse {
  cursos: Curso[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

// Subir archivo
interface UploadFileResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `src/features/plancreatorpro/cursos-online/cursos-online/cursosApi.ts` → servicio centralizado
- `src/features/plancreatorpro/cursos-online/cursos-online/types/` → interfaces TypeScript
- `src/features/plancreatorpro/cursos-online/cursos-online/hooks/` → custom hooks para estado

### 5.2 MODIFICAR
- `crearCursoApi.ts` → reemplazar mocks con llamadas reales
- `cursoDetalleApi.ts` → integrar con RTK Query o axios
- `gestionLeccionesApi.ts` → conectar con endpoints de lecciones
- `listadoCursosApi.ts` → implementar paginación y filtros
- `quizzesEvaluacionesApi.ts` → conectar con sistema de quizzes

### 5.3 Placeholders de Diff (forma)
```diff
# src/features/plancreatorpro/cursos-online/cursos-online/crearCursoApi.ts
+ import axios from 'axios';
+ const API_BASE_URL = import.meta.env.VITE_API_URL;
+ 
+ export const crearCursoApi = {
+   guardarConfiguracion: async (data: CreateCursoRequest): Promise<Curso> => {
+     const response = await axios.post(`${API_BASE_URL}/api/cursos`, data);
+     return response.data;
+   },
+   subirArchivo: async (file: File): Promise<UploadFileResponse> => {
+     const formData = new FormData();
+     formData.append('file', file);
+     const response = await axios.post(`${API_BASE_URL}/api/cursos/upload`, formData);
+     return response.data;
+   }
+ };

# src/features/plancreatorpro/cursos-online/cursos-online/cursoDetalleApi.ts
+ baseQuery: fetchBaseQuery({ 
+   baseUrl: `${import.meta.env.VITE_API_URL}/api/cursos/`,
+   prepareHeaders: (headers) => {
+     const token = localStorage.getItem('token');
+     if (token) headers.set('authorization', `Bearer ${token}`);
+     return headers;
+   }
+ }),
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR
- `backend/src/routes/cursos.routes.js` → rutas completas de cursos
- `backend/src/controllers/cursos.controller.js` → lógica de negocio
- `backend/src/models/Curso.model.js` → esquema MongoDB
- `backend/src/models/Modulo.model.js` → esquema de módulos
- `backend/src/models/Leccion.model.js` → esquema de lecciones
- `backend/src/models/Quiz.model.js` → esquema de quizzes
- `backend/src/models/QuizResult.model.js` → esquema de resultados
- `backend/src/middleware/cursosValidation.js` → validaciones específicas

### 6.2 MODIFICAR
- `backend/src/routes/api.routes.js` → agregar ruta de cursos
- `backend/src/server.js` → montar rutas de cursos
- `backend/src/middleware/validate.middleware.js` → agregar validaciones de cursos

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/api.routes.js
+ import cursosRoutes from './cursos.routes.js';
+ router.use('/cursos', cursosRoutes);

# backend/src/routes/cursos.routes.js
+ router.get('/', protect, cursosController.listarCursos);
+ router.post('/', protect, validateCreateCurso, cursosController.crearCurso);
+ router.get('/:id', protect, cursosController.obtenerCurso);
+ router.put('/:id', protect, validateUpdateCurso, cursosController.actualizarCurso);
+ router.delete('/:id', protect, cursosController.eliminarCurso);
+ router.post('/upload', protect, upload.single('file'), cursosController.subirArchivo);
+ router.get('/:id/lecciones', protect, cursosController.obtenerLecciones);
+ router.post('/:id/lecciones', protect, validateLeccion, cursosController.crearLeccion);
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|-------------|
| Listar cursos | `listadoCursosApi.fetchCursos()` | GET `/api/cursos` | `listarCursos` | `Curso` | `ListCursosQuery` | `ListCursosResponse` |
| Crear curso | `crearCursoApi.guardarConfiguracion()` | POST `/api/cursos` | `crearCurso` | `Curso` | `CreateCursoRequest` | `Curso` |
| Ver detalle | `cursoDetalleApi.getCursoById()` | GET `/api/cursos/:id` | `obtenerCurso` | `Curso` | - | `Curso` |
| Subir archivo | `crearCursoApi.subirArchivo()` | POST `/api/cursos/upload` | `subirArchivo` | `Archivo` | `FormData` | `UploadFileResponse` |
| Gestionar lecciones | `gestionLeccionesApi.saveLessonContent()` | POST `/api/cursos/:id/lecciones` | `crearLeccion` | `Leccion` | `CreateLeccionRequest` | `Leccion` |
| Crear quiz | `quizzesEvaluacionesApi.createQuiz()` | POST `/api/cursos/:id/quizzes` | `crearQuiz` | `Quiz` | `CreateQuizRequest` | `Quiz` |
| Enviar quiz | `quizzesEvaluacionesApi.submitQuiz()` | POST `/api/quizzes/:id/submit` | `enviarQuiz` | `QuizResult` | `SubmitQuizRequest` | `QuizResult` |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: URL base del backend (ej: `http://localhost:5000`)
- **Auth**: Bearer token en localStorage
- **Estados**: loading, error, empty states en componentes

### 8.2 Backend
- **CORS_ORIGIN**: URL del frontend
- **JWT_SECRET**: para autenticación
- **MONGODB_URI**: conexión a base de datos
- **CORS**: configurado para frontend
- **Auth**: middleware `protect` en todas las rutas

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear modelos de base de datos
**Target**: backend
**Archivos implicados**: `backend/src/models/Curso.model.js`, `Modulo.model.js`, `Leccion.model.js`, `Quiz.model.js`, `QuizResult.model.js`
**Objetivo**: Crear esquemas MongoDB para cursos, módulos, lecciones y quizzes
**Pasos concretos**: 
- Crear modelo Curso con campos: titulo, descripcion, imagenPortada, precio, estado, categoria, duracion, instructorId
- Crear modelo Modulo con referencia a Curso
- Crear modelo Leccion con referencia a Modulo
- Crear modelo Quiz con preguntas y configuraciones
- Crear modelo QuizResult para almacenar respuestas
**Criterios de aceptación**: Modelos creados con validaciones, índices apropiados y relaciones correctas

### T2: Crear controladores de cursos
**Target**: backend
**Archivos implicados**: `backend/src/controllers/cursos.controller.js`
**Objetivo**: Implementar lógica de negocio para gestión de cursos
**Pasos concretos**:
- Crear funciones: listarCursos, obtenerCurso, crearCurso, actualizarCurso, eliminarCurso
- Implementar subirArchivo para portadas y contenido
- Agregar manejo de errores y respuestas consistentes
- Implementar paginación y filtros en listarCursos
**Criterios de aceptación**: Controlador completo con todas las operaciones CRUD, manejo de archivos y errores

### T3: Crear rutas de cursos
**Target**: backend
**Archivos implicados**: `backend/src/routes/cursos.routes.js`
**Objetivo**: Definir endpoints REST para cursos
**Pasos concretos**:
- Crear rutas: GET /, POST /, GET /:id, PUT /:id, DELETE /:id
- Agregar ruta POST /upload para archivos
- Agregar rutas para lecciones: GET /:id/lecciones, POST /:id/lecciones
- Agregar rutas para quizzes: GET /:id/quizzes, POST /:id/quizzes
- Aplicar middleware de autenticación y validación
**Criterios de aceptación**: Rutas RESTful completas con middleware de auth y validación

### T4: Crear validaciones de cursos
**Target**: backend
**Archivos implicados**: `backend/src/middleware/cursosValidation.js`
**Objetivo**: Validar datos de entrada para cursos
**Pasos concretos**:
- Crear validateCreateCurso con validaciones de titulo, descripcion, precio
- Crear validateUpdateCurso para actualizaciones
- Crear validateLeccion para gestión de lecciones
- Crear validateQuiz para quizzes
- Integrar con express-validator
**Criterios de aceptación**: Validaciones completas con mensajes de error en español

### T5: Integrar rutas en API principal
**Target**: backend
**Archivos implicados**: `backend/src/routes/api.routes.js`, `backend/src/server.js`
**Objetivo**: Montar rutas de cursos en la API principal
**Pasos concretos**:
- Importar cursosRoutes en api.routes.js
- Agregar router.use('/cursos', cursosRoutes)
- Verificar que no hay conflictos con rutas existentes
- Actualizar documentación de endpoints en api.routes.js
**Criterios de aceptación**: Rutas de cursos disponibles en /api/cursos

### T6: Crear servicio API centralizado
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/cursosApi.ts`
**Objetivo**: Servicio centralizado para todas las operaciones de cursos
**Pasos concretos**:
- Crear funciones para CRUD de cursos
- Implementar subida de archivos
- Agregar manejo de errores y loading states
- Configurar baseURL y headers de autenticación
- Exportar tipos TypeScript
**Criterios de aceptación**: Servicio completo con todas las operaciones, manejo de errores y tipos

### T7: Actualizar crearCursoApi
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/crear-curso/crearCursoApi.ts`
**Objetivo**: Reemplazar mocks con llamadas reales al backend
**Pasos concretos**:
- Reemplazar funciones mock con llamadas HTTP reales
- Usar cursosApi.ts como base
- Mantener la misma interfaz de funciones
- Agregar manejo de errores
- Implementar loading states
**Criterios de aceptación**: API funcional sin mocks, manejo de errores y estados

### T8: Actualizar cursoDetalleApi
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/curso-detalle/cursoDetalleApi.ts`
**Objetivo**: Conectar con backend real usando RTK Query
**Pasos concretos**:
- Configurar baseQuery con autenticación
- Actualizar endpoints para usar /api/cursos
- Agregar endpoints para lecciones y alumnos
- Mantener tipos TypeScript existentes
**Criterios de aceptación**: RTK Query configurado correctamente con autenticación

### T9: Actualizar gestionLeccionesApi
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/gestion-lecciones/gestionLeccionesApi.ts`
**Objetivo**: Conectar gestión de lecciones con backend
**Pasos concretos**:
- Reemplazar datos mock con llamadas HTTP
- Implementar CRUD de lecciones
- Mantener funciones de subida de archivos
- Agregar manejo de errores
**Criterios de aceptación**: Gestión de lecciones completamente funcional

### T10: Actualizar listadoCursosApi
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/listado-cursos/listadoCursosApi.ts`
**Objetivo**: Implementar listado con paginación y filtros
**Pasos concretos**:
- Reemplazar datos mock con llamadas HTTP
- Implementar paginación
- Agregar filtros por estado, categoría
- Implementar búsqueda
- Mantener funciones de actualización de estado
**Criterios de aceptación**: Listado funcional con paginación, filtros y búsqueda

### T11: Actualizar quizzesEvaluacionesApi
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/quizzes-evaluaciones/quizzesEvaluacionesApi.ts`
**Objetivo**: Conectar sistema de quizzes con backend
**Pasos concretos**:
- Reemplazar datos mock con llamadas HTTP
- Implementar CRUD de quizzes
- Implementar envío y evaluación de quizzes
- Agregar estadísticas y reportes
- Mantener tipos TypeScript existentes
**Criterios de aceptación**: Sistema de quizzes completamente funcional

### T12: Crear tipos TypeScript centralizados
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/types/`
**Objetivo**: Centralizar todas las interfaces y tipos
**Pasos concretos**:
- Crear archivo Curso.ts con interfaces principales
- Crear archivo Quiz.ts con tipos de quizzes
- Crear archivo Leccion.ts con tipos de lecciones
- Crear archivo Api.ts con tipos de requests/responses
- Exportar todos los tipos desde index.ts
**Criterios de aceptación**: Tipos centralizados y reutilizables en todo el módulo

### T13: Crear custom hooks para estado
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/cursos-online/cursos-online/hooks/`
**Objetivo**: Hooks reutilizables para manejo de estado
**Pasos concretos**:
- Crear useCursos para listado y filtros
- Crear useCurso para detalle individual
- Crear useLecciones para gestión de lecciones
- Crear useQuizzes para sistema de evaluaciones
- Implementar loading, error y success states
**Criterios de aceptación**: Hooks funcionales con manejo completo de estados

### T14: Actualizar componentes con nuevos servicios
**Target**: frontend
**Archivos implicados**: Todos los componentes en `src/features/plancreatorpro/cursos-online/cursos-online/**/components/`
**Objetivo**: Integrar componentes con APIs reales
**Pasos concretos**:
- Actualizar componentes para usar nuevos hooks
- Agregar manejo de loading y error states
- Implementar actualizaciones optimistas
- Agregar validaciones de formularios
- Mantener UX existente
**Criterios de aceptación**: Todos los componentes funcionando con backend real

### T15: Configurar variables de entorno
**Target**: both
**Archivos implicados**: `.env`, `vite.config.ts`, `backend/src/config/`
**Objetivo**: Configurar URLs y variables de entorno
**Pasos concretos**:
- Configurar VITE_API_URL en frontend
- Configurar CORS_ORIGIN en backend
- Verificar JWT_SECRET y MONGODB_URI
- Documentar variables requeridas
- Crear archivos .env.example
**Criterios de aceptación**: Configuración completa y documentada
