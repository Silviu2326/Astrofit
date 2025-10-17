# Interconexión — src/features/plancreatorpro/comunidad/comunidad

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/comunidad` (justificado por convención REST y consistencia con otros módulos del sistema).
- **Objetivo**: Conectar FE↔BE para el módulo de comunidad con funcionalidades de feed, grupos, moderación y ranking.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatorpro/comunidad/comunidad/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TypeScript, baseURL por `VITE_API_URL`, Auth Bearer, estados UI (loading/error/empty).

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → `/api/comunidad` → controller → model → DB.

## 4) Contratos de Datos (DTO)

### 4.1 Feed de Comunidad
```typescript
// Request DTOs
interface CreatePostDto {
  content: string;
  type: 'text' | 'image' | 'video' | 'poll';
  media?: Media[];
  pollOptions?: PollOption[];
}

interface CommentDto {
  content: string;
}

// Response DTOs
interface PostResponse {
  id: string;
  author: UserResponse;
  content: string;
  media: Media[];
  type: string;
  likes: string[];
  comments: CommentResponse[];
  shares: number;
  timestamp: string;
  isPinned: boolean;
  pollOptions?: PollOption[];
}

interface UserResponse {
  id: string;
  name: string;
  avatar: string;
}

interface CommentResponse {
  id: string;
  author: UserResponse;
  content: string;
  timestamp: string;
}
```

### 4.2 Grupos de Comunidad
```typescript
interface CreateGroupDto {
  name: string;
  description: string;
  coverImage?: string;
  isPrivate: boolean;
  tags: string[];
}

interface GroupResponse {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  isPrivate: boolean;
  tags: string[];
  members: UserResponse[];
  admins: UserResponse[];
  createdAt: string;
  updatedAt: string;
}
```

### 4.3 Moderación
```typescript
interface ReportDto {
  postId: string;
  reason: string;
  description: string;
}

interface ReportResponse {
  id: string;
  postId: string;
  reporter: UserResponse;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}
```

### 4.4 Ranking y Actividad
```typescript
interface UserActivityResponse {
  id: string;
  name: string;
  avatar: string;
  posts: number;
  comments: number;
  points: number;
  rank: number;
  medals: MedalResponse[];
}

interface MedalResponse {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `src/features/plancreatorpro/comunidad/comunidad/feed-comunidad/feedComunidadApi.ts` → funciones HTTP completas
- `src/features/plancreatorpro/comunidad/comunidad/grupos-comunidad/gruposComunidadApi.ts` → implementar funciones faltantes
- `src/features/plancreatorpro/comunidad/comunidad/moderacion-comunidad/moderacionComunidadApi.ts` → implementar funciones faltantes
- `src/features/plancreatorpro/comunidad/comunidad/ranking-actividad/rankingActividadApi.ts` → implementar funciones faltantes

### 5.2 MODIFICAR
- `src/features/plancreatorpro/comunidad/comunidad/feed-comunidad/FeedComunidadPage.tsx` → integrar servicio real, estados, errores
- `src/features/plancreatorpro/comunidad/comunidad/grupos-comunidad/GruposComunidadPage.tsx` → integrar servicio real
- `src/features/plancreatorpro/comunidad/comunidad/moderacion-comunidad/ModeracionComunidadPage.tsx` → integrar servicio real
- `src/features/plancreatorpro/comunidad/comunidad/ranking-actividad/RankingActividadPage.tsx` → integrar servicio real

### 5.3 Placeholders de Diff (forma)
```diff
# src/features/plancreatorpro/comunidad/comunidad/feed-comunidad/feedComunidadApi.ts
+ add: const API_BASE_URL = `${import.meta.env.VITE_API_URL}/comunidad/feed`
+ replace: MOCK posts → GET {API_BASE_URL}/posts
+ add: createPost(post: CreatePostDto): Promise<PostResponse>
+ add: toggleLike(postId: string, userId: string): Promise<void>
+ add: addComment(postId: string, comment: CommentDto): Promise<CommentResponse>
+ error: map 4xx/5xx a Result<Error>

# src/features/plancreatorpro/comunidad/comunidad/grupos-comunidad/gruposComunidadApi.ts
+ add: const API_BASE_URL = `${import.meta.env.VITE_API_URL}/comunidad/grupos`
+ add: getGroups(): Promise<GroupResponse[]>
+ add: createGroup(group: CreateGroupDto): Promise<GroupResponse>
+ add: joinGroup(groupId: string): Promise<void>
+ add: leaveGroup(groupId: string): Promise<void>

# src/features/plancreatorpro/comunidad/comunidad/moderacion-comunidad/moderacionComunidadApi.ts
+ add: const API_BASE_URL = `${import.meta.env.VITE_API_URL}/comunidad/moderacion`
+ add: getReports(): Promise<ReportResponse[]>
+ add: markPost(postId: string, status: string): Promise<void>
+ add: blockUser(userId: string): Promise<void>
+ add: deletePost(postId: string): Promise<void>

# src/features/plancreatorpro/comunidad/comunidad/ranking-actividad/rankingActividadApi.ts
+ add: const API_BASE_URL = `${import.meta.env.VITE_API_URL}/comunidad/ranking`
+ add: getLeaderboard(): Promise<UserActivityResponse[]>
+ add: getUserMedals(userId: string): Promise<MedalResponse[]>
+ add: updateUserPoints(userId: string, points: number): Promise<void>
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR
- `backend/src/routes/comunidad.routes.js` → lista completa de endpoints
- `backend/src/controllers/comunidad.controller.js` → controladores para feed, grupos, moderación, ranking
- `backend/src/models/Post.model.js` → esquema de posts
- `backend/src/models/Group.model.js` → esquema de grupos
- `backend/src/models/Report.model.js` → esquema de reportes
- `backend/src/models/UserActivity.model.js` → esquema de actividad de usuarios

### 6.2 MODIFICAR
- `backend/src/routes/api.routes.js` → montar router de comunidad
- `backend/src/middleware/validate.middleware.js` → validaciones para DTOs de comunidad

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/api.routes.js
+ import comunidadRoutes from './comunidad.routes.js';
+ router.use('/comunidad', comunidadRoutes);

# backend/src/routes/comunidad.routes.js
+ router.get('/feed/posts', auth, ctrl.getPosts)
+ router.post('/feed/posts', auth, validate(CreatePostDto), ctrl.createPost)
+ router.put('/feed/posts/:id/like', auth, ctrl.toggleLike)
+ router.post('/feed/posts/:id/comments', auth, validate(CommentDto), ctrl.addComment)
+ router.get('/grupos', auth, ctrl.getGroups)
+ router.post('/grupos', auth, validate(CreateGroupDto), ctrl.createGroup)
+ router.post('/grupos/:id/join', auth, ctrl.joinGroup)
+ router.get('/moderacion/reports', auth, ctrl.getReports)
+ router.put('/moderacion/posts/:id/status', auth, ctrl.markPost)
+ router.get('/ranking/leaderboard', auth, ctrl.getLeaderboard)
+ router.get('/ranking/users/:id/medals', auth, ctrl.getUserMedals)
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|--------------|
| Cargar feed | getPosts() | GET /api/comunidad/feed/posts | getPosts | Post | - | PostResponse[] |
| Crear post | createPost() | POST /api/comunidad/feed/posts | createPost | Post | CreatePostDto | PostResponse |
| Dar like | toggleLike() | PUT /api/comunidad/feed/posts/:id/like | toggleLike | Post | - | - |
| Comentar | addComment() | POST /api/comunidad/feed/posts/:id/comments | addComment | Post | CommentDto | CommentResponse |
| Cargar grupos | getGroups() | GET /api/comunidad/grupos | getGroups | Group | - | GroupResponse[] |
| Crear grupo | createGroup() | POST /api/comunidad/grupos | createGroup | Group | CreateGroupDto | GroupResponse |
| Unirse a grupo | joinGroup() | POST /api/comunidad/grupos/:id/join | joinGroup | Group | - | - |
| Ver reportes | getReports() | GET /api/comunidad/moderacion/reports | getReports | Report | - | ReportResponse[] |
| Marcar post | markPost() | PUT /api/comunidad/moderacion/posts/:id/status | markPost | Post | - | - |
| Ver ranking | getLeaderboard() | GET /api/comunidad/ranking/leaderboard | getLeaderboard | UserActivity | - | UserActivityResponse[] |
| Ver medallas | getUserMedals() | GET /api/comunidad/ranking/users/:id/medals | getUserMedals | UserActivity | - | MedalResponse[] |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: Variable de entorno para baseURL
- **Auth**: Bearer token en headers
- **Estados**: loading/error/empty en componentes

### 8.2 Backend
- **CORS_ORIGIN**: Configurado para frontend
- **JWT_SECRET**: Para autenticación
- **DB_URI**: MongoDB connection
- **Auth middleware**: Verificación de token en todas las rutas

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear modelos de base de datos
**Target**: backend
**Archivos implicados**: `backend/src/models/Post.model.js`, `backend/src/models/Group.model.js`, `backend/src/models/Report.model.js`, `backend/src/models/UserActivity.model.js`
**Objetivo**: Crear esquemas de MongoDB para posts, grupos, reportes y actividad de usuarios
**Pasos concretos**: 
- Crear modelo Post con campos: id, author, content, media, type, likes, comments, shares, timestamp, isPinned, pollOptions
- Crear modelo Group con campos: id, name, description, coverImage, isPrivate, tags, members, admins, createdAt, updatedAt
- Crear modelo Report con campos: id, postId, reporter, reason, description, status, createdAt
- Crear modelo UserActivity con campos: userId, posts, comments, points, rank, medals, lastActivity
**Criterios de aceptación**: Modelos creados con validaciones y índices apropiados

### T2: Crear controladores de comunidad
**Target**: backend
**Archivos implicados**: `backend/src/controllers/comunidad.controller.js`
**Objetivo**: Implementar lógica de negocio para feed, grupos, moderación y ranking
**Pasos concretos**:
- Implementar controladores: getPosts, createPost, toggleLike, addComment, getGroups, createGroup, joinGroup, getReports, markPost, getLeaderboard, getUserMedals
- Agregar validaciones de entrada y manejo de errores
- Implementar paginación para listados
**Criterios de aceptación**: Controladores funcionales con manejo de errores y validaciones

### T3: Crear rutas de comunidad
**Target**: backend
**Archivos implicados**: `backend/src/routes/comunidad.routes.js`
**Objetivo**: Definir endpoints REST para el módulo de comunidad
**Pasos concretos**:
- Crear rutas para feed: GET/POST /feed/posts, PUT /feed/posts/:id/like, POST /feed/posts/:id/comments
- Crear rutas para grupos: GET/POST /grupos, POST /grupos/:id/join
- Crear rutas para moderación: GET /moderacion/reports, PUT /moderacion/posts/:id/status
- Crear rutas para ranking: GET /ranking/leaderboard, GET /ranking/users/:id/medals
- Aplicar middleware de autenticación y validación
**Criterios de aceptación**: Rutas configuradas con middleware apropiado

### T4: Integrar rutas en API principal
**Target**: backend
**Archivos implicados**: `backend/src/routes/api.routes.js`
**Objetivo**: Montar el router de comunidad en la API principal
**Pasos concretos**:
- Importar comunidadRoutes
- Agregar router.use('/comunidad', comunidadRoutes)
- Actualizar documentación de endpoints
**Criterios de aceptación**: Rutas de comunidad accesibles en /api/comunidad

### T5: Implementar API de feed en frontend
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/comunidad/comunidad/feed-comunidad/feedComunidadApi.ts`
**Objetivo**: Reemplazar mocks con llamadas HTTP reales al backend
**Pasos concretos**:
- Configurar axios con baseURL y interceptors
- Implementar getPosts, createPost, toggleLike, addComment, sharePost, voteOnPoll
- Agregar manejo de errores y tipos TypeScript
- Reemplazar datos simulados con llamadas HTTP
**Criterios de aceptación**: API funcional sin mocks, con manejo de errores

### T6: Implementar API de grupos en frontend
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/comunidad/comunidad/grupos-comunidad/gruposComunidadApi.ts`
**Objetivo**: Implementar funciones HTTP para gestión de grupos
**Pasos concretos**:
- Implementar getGroups, createGroup, joinGroup, leaveGroup, getGroupMembers
- Agregar tipos TypeScript para requests y responses
- Configurar manejo de errores
**Criterios de aceptación**: API de grupos completamente funcional

### T7: Implementar API de moderación en frontend
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/comunidad/comunidad/moderacion-comunidad/moderacionComunidadApi.ts`
**Objetivo**: Implementar funciones HTTP para moderación de contenido
**Pasos concretos**:
- Implementar getReports, markPost, blockUser, deletePost, approveRequest
- Agregar tipos TypeScript y manejo de errores
- Configurar interceptors para autenticación
**Criterios de aceptación**: API de moderación completamente funcional

### T8: Implementar API de ranking en frontend
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/comunidad/comunidad/ranking-actividad/rankingActividadApi.ts`
**Objetivo**: Implementar funciones HTTP para ranking y actividad
**Pasos concretos**:
- Implementar getLeaderboard, getUserMedals, updateUserPoints, getActivityStats
- Agregar tipos TypeScript y manejo de errores
- Configurar paginación para leaderboard
**Criterios de aceptación**: API de ranking completamente funcional

### T9: Integrar servicios en páginas principales
**Target**: frontend
**Archivos implicados**: `src/features/plancreatorpro/comunidad/comunidad/*/Page.tsx`
**Objetivo**: Conectar páginas con servicios HTTP reales
**Pasos concretos**:
- Reemplazar datos simulados con llamadas a APIs
- Agregar estados de loading, error y empty
- Implementar manejo de errores en UI
- Agregar feedback visual para acciones del usuario
**Criterios de aceptación**: Páginas funcionales con datos reales del backend

### T10: Agregar validaciones de backend
**Target**: backend
**Archivos implicados**: `backend/src/middleware/validate.middleware.js`
**Objetivo**: Crear validaciones para DTOs de comunidad
**Pasos concretos**:
- Agregar validateCreatePost, validateCreateGroup, validateReport, validateComment
- Implementar validaciones de campos requeridos y formatos
- Agregar sanitización de datos de entrada
**Criterios de aceptación**: Validaciones completas para todos los DTOs

### T11: Configurar variables de entorno
**Target**: both
**Archivos implicados**: `.env`, `backend/src/config/`, `vite.config.ts`
**Objetivo**: Configurar variables de entorno para desarrollo y producción
**Pasos concretos**:
- Configurar VITE_API_URL en frontend
- Configurar CORS_ORIGIN en backend
- Agregar variables para JWT_SECRET y DB_URI
- Documentar variables requeridas
**Criterios de aceptación**: Variables de entorno configuradas correctamente

### T12: Implementar autenticación y autorización
**Target**: backend
**Archivos implicados**: `backend/src/middleware/auth.middleware.js`
**Objetivo**: Implementar middleware de autenticación para rutas de comunidad
**Pasos concretos**:
- Verificar token JWT en headers
- Validar permisos para acciones de moderación
- Implementar rate limiting para acciones frecuentes
- Agregar logging de actividades
**Criterios de aceptación**: Autenticación y autorización funcionando correctamente

