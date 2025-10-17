# Interconexión — membresias/

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/membresias` (no existe en backend actual).
- **Objetivo**: Conectar FE↔BE para el módulo de membresías con 4 sub-módulos: listado, página, beneficios y pagos.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatorpro/membresias/membresias/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TS, baseURL por .env, Auth Bearer, estados UI (loading/error/empty).

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → `/api/membresias` → controller → model → DB.

## 4) Contratos de Datos (DTO)

### 4.1 Membresia (Core Entity)
```typescript
interface Membresia {
  id: string;
  nivel: 'Bronce' | 'Plata' | 'Oro' | 'Premium';
  miembrosActivos: number;
  ingresosGenerados: number;
  estado: 'activo' | 'pausado';
  nombre: string;
  descripcion: string;
  precio: number;
  periodicidad: 'mensual' | 'anual';
  beneficios: string[];
  testimonios: Testimonio[];
  faq: FAQ[];
  createdAt: Date;
  updatedAt: Date;
}

interface Testimonio {
  id: number;
  name: string;
  feedback: string;
}

interface FAQ {
  question: string;
  answer: string;
}
```

### 4.2 Request/Response DTOs
```typescript
// GET /api/membresias
interface GetMembresiasResponse {
  success: boolean;
  data: Membresia[];
  total: number;
}

// POST /api/membresias
interface CreateMembresiaRequest {
  nivel: string;
  nombre: string;
  descripcion: string;
  precio: number;
  periodicidad: string;
  beneficios: string[];
}

// PUT /api/membresias/:id
interface UpdateMembresiaRequest {
  nivel?: string;
  miembrosActivos?: number;
  ingresosGenerados?: number;
  estado?: string;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  periodicidad?: string;
  beneficios?: string[];
}

// GET /api/membresias/pagos
interface PagosResponse {
  pagosRecurrentes: PagoRecurrente[];
  ingresosMensuales: IngresoMensual[];
  metricasCancelacion: MetricasCancelacion;
}

interface PagoRecurrente {
  id: string;
  membresiaId: string;
  usuarioId: string;
  monto: number;
  fechaProximoPago: Date;
  estado: 'activo' | 'cancelado' | 'suspendido';
}

interface IngresoMensual {
  mes: string;
  total: number;
  membresiaId: string;
  membresiaNombre: string;
}

interface MetricasCancelacion {
  tasaCancelacion: number;
  totalCancelaciones: number;
  periodo: string;
}
```

### 4.3 Validaciones
- **Zod schemas** para validación de entrada
- **Campos requeridos**: nivel, nombre, precio, periodicidad
- **Rangos**: precio > 0, miembrosActivos >= 0
- **Enums**: nivel, estado, periodicidad

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `src/features/plancreatorpro/membresias/membresias/types/Membresia.ts` → interfaces y tipos
- `src/features/plancreatorpro/membresias/membresias/utils/apiClient.ts` → cliente HTTP centralizado

### 5.2 MODIFICAR

#### 5.2.1 listadoMembresiasApi.ts
```diff
# src/features/plancreatorpro/membresias/membresias/listado-membresias/listadoMembresiasApi.ts
+ import { apiClient } from '../utils/apiClient';
+ replace: mockMembresias → GET /api/membresias
+ replace: delay() → real HTTP calls
+ add: error handling con try/catch
+ add: loading states
```

#### 5.2.2 paginaMembresiapApi.ts
```diff
# src/features/plancreatorpro/membresias/membresias/pagina-membresia/paginaMembresiapApi.ts
+ replace: mock data → GET /api/membresias/:id
+ add: fetchMembershipDetails(id: string)
+ add: error handling
```

#### 5.2.3 beneficiosMembresiApi.ts
```diff
# src/features/plancreatorpro/membresias/membresias/beneficios-membresia/beneficiosMembresiApi.ts
+ replace: hardcoded API_BASE_URL → env variable
+ add: proper error handling
+ add: loading states
```

#### 5.2.4 pagosMembresiApi.ts
```diff
# src/features/plancreatorpro/membresias/membresias/pagos-membresia/pagosMembresiApi.ts
+ replace: empty functions → real API calls
+ add: fetchPagosRecurrentes() → GET /api/membresias/pagos
+ add: fetchIngresosMensuales() → GET /api/membresias/ingresos
+ add: fetchMetricasCancelacion() → GET /api/membresias/metricas
```

### 5.3 Placeholders de Diff (forma)
```diff
# src/features/plancreatorpro/membresias/membresias/listado-membresias/listadoMembresiasApi.ts
+ add: getMembresias(): Promise<Membresia[]>
+ replace: mockMembresias → GET /api/membresias
+ error: map 4xx/5xx a Result<Error>
+ add: loading states y error handling

# src/features/plancreatorpro/membresias/membresias/pagina-membresia/paginaMembresiapApi.ts
+ replace: mock data → GET /api/membresias/:id
+ add: proper error handling
+ add: loading states

# src/features/plancreatorpro/membresias/membresias/beneficios-membresia/beneficiosMembresiApi.ts
+ replace: hardcoded URL → env variable
+ add: proper error handling
+ add: loading states

# src/features/plancreatorpro/membresias/membresias/pagos-membresia/pagosMembresiApi.ts
+ replace: empty functions → real API calls
+ add: fetchPagosRecurrentes() → GET /api/membresias/pagos
+ add: fetchIngresosMensuales() → GET /api/membresias/ingresos
+ add: fetchMetricasCancelacion() → GET /api/membresias/metricas
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR

#### 6.1.1 routes/membresia.routes.js
```javascript
// Lista completa de endpoints
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, validate(CreateMembresiaDto), ctrl.create);
router.put('/:id', auth, validate(UpdateMembresiaDto), ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.get('/pagos', auth, ctrl.getPagos);
router.get('/ingresos', auth, ctrl.getIngresos);
router.get('/metricas', auth, ctrl.getMetricas);
```

#### 6.1.2 controllers/membresia.controller.js
```javascript
// list, getById, create, update, remove, getPagos, getIngresos, getMetricas
```

#### 6.1.3 models/Membresia.model.js
```javascript
// Esquema Mongoose con índices
// Campos: nivel, nombre, descripcion, precio, periodicidad, beneficios, testimonios, faq
// Índices: nivel, estado, createdAt
```

### 6.2 MODIFICAR

#### 6.2.1 server.js
```diff
# backend/src/server.js
+ import membresiaRoutes from './routes/membresia.routes.js';
+ add: app.use('/api/membresias', membresiaRoutes);
```

#### 6.2.2 routes/api.routes.js
```diff
# backend/src/routes/api.routes.js
+ import membresiaRoutes from './membresia.routes.js';
+ add: router.use('/membresias', membresiaRoutes);
+ add: membresias: '/api/membresias' en endpoints
```

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/membresia.routes.js
+ router.get('/', auth, ctrl.list)
+ router.post('/', auth, validate(CreateDto), ctrl.create)
+ router.put('/:id', auth, validate(UpdateDto), ctrl.update)
+ router.delete('/:id', auth, ctrl.remove)
+ router.get('/pagos', auth, ctrl.getPagos)
+ router.get('/ingresos', auth, ctrl.getIngresos)
+ router.get('/metricas', auth, ctrl.getMetricas)

# backend/src/controllers/membresia.controller.js
+ add: list, getById, create, update, remove, getPagos, getIngresos, getMetricas

# backend/src/models/Membresia.model.js
+ add: schema con campos y índices

# backend/src/server.js
+ add: app.use('/api/membresias', membresiaRoutes)
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|--------------|
| Cargar listado | getMembresias() | GET /api/membresias | list() | Membresia | - | GetMembresiasResponse |
| Crear membresía | createMembresia() | POST /api/membresias | create() | Membresia | CreateMembresiaRequest | Membresia |
| Editar membresía | updateMembresia() | PUT /api/membresias/:id | update() | Membresia | UpdateMembresiaRequest | Membresia |
| Eliminar membresía | deleteMembresia() | DELETE /api/membresias/:id | remove() | Membresia | - | {success: boolean} |
| Ver detalles | fetchMembershipDetails() | GET /api/membresias/:id | getById() | Membresia | - | Membresia |
| Cargar pagos | fetchPagosRecurrentes() | GET /api/membresias/pagos | getPagos() | Membresia | - | PagosResponse |
| Cargar ingresos | fetchIngresosMensuales() | GET /api/membresias/ingresos | getIngresos() | Membresia | - | IngresosResponse |
| Cargar métricas | fetchMetricasCancelacion() | GET /api/membresias/metricas | getMetricas() | Membresia | - | MetricasResponse |
| Actualizar beneficios | updateBeneficiosMembresia() | PUT /api/membresias/:id/beneficios | updateBeneficios() | Membresia | UpdateBeneficiosRequest | Membresia |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: `http://localhost:5000/api` (desarrollo)
- **Headers**: `Authorization: Bearer ${token}`
- **Content-Type**: `application/json`

### 8.2 Backend
- **CORS_ORIGIN**: `http://localhost:5173` (desarrollo)
- **JWT_SECRET**: para autenticación
- **DB_URI**: MongoDB connection string

### 8.3 CORS y Auth
- **CORS**: Configurado para permitir requests desde frontend
- **Auth**: Middleware JWT en todas las rutas de membresías
- **Validación**: Zod schemas para validar entrada

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear modelo Membresia en backend
**Target**: backend  
**Archivos implicados**: `backend/src/models/Membresia.model.js`  
**Objetivo**: Crear esquema Mongoose para membresías con campos y índices  
**Pasos concretos**: Crear archivo con schema, campos requeridos, índices  
**Criterios de aceptación**: Schema válido, campos tipados, índices configurados  

### T2: Crear controlador de membresías
**Target**: backend  
**Archivos implicados**: `backend/src/controllers/membresia.controller.js`  
**Objetivo**: Implementar CRUD completo para membresías  
**Pasos concretos**: Crear funciones list, getById, create, update, remove, getPagos, getIngresos, getMetricas  
**Criterios de aceptación**: Todas las funciones implementadas, manejo de errores, respuestas consistentes  

### T3: Crear rutas de membresías
**Target**: backend  
**Archivos implicados**: `backend/src/routes/membresia.routes.js`  
**Objetivo**: Definir endpoints REST para membresías  
**Pasos concretos**: Crear router con GET, POST, PUT, DELETE, endpoints especiales  
**Criterios de aceptación**: Rutas configuradas, middleware auth aplicado, validación implementada  

### T4: Integrar rutas en servidor principal
**Target**: backend  
**Archivos implicados**: `backend/src/server.js`, `backend/src/routes/api.routes.js`  
**Objetivo**: Montar rutas de membresías en el servidor  
**Pasos concretos**: Importar rutas, agregar a app.use(), actualizar api.routes.js  
**Criterios de aceptación**: Rutas accesibles, documentación actualizada  

### T5: Crear tipos TypeScript para membresías
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/types/Membresia.ts`  
**Objetivo**: Definir interfaces y tipos para membresías  
**Pasos concretos**: Crear archivo con interfaces Membresia, Testimonio, FAQ, DTOs  
**Criterios de aceptación**: Tipos exportados, interfaces completas, DTOs definidos  

### T6: Crear cliente HTTP centralizado
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/utils/apiClient.ts`  
**Objetivo**: Configurar axios con baseURL y headers  
**Pasos concretos**: Crear cliente con configuración, interceptores, manejo de errores  
**Criterios de aceptación**: Cliente configurado, headers automáticos, manejo de errores  

### T7: Actualizar API de listado de membresías
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/listado-membresias/listadoMembresiasApi.ts`  
**Objetivo**: Reemplazar mocks con llamadas reales al backend  
**Pasos concretos**: Reemplazar mocks, usar apiClient, manejar errores, estados de carga  
**Criterios de aceptación**: Llamadas reales, manejo de errores, estados UI  

### T8: Actualizar API de página de membresía
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/pagina-membresia/paginaMembresiapApi.ts`  
**Objetivo**: Conectar con backend para detalles de membresía  
**Pasos concretos**: Reemplazar mock data, implementar fetchMembershipDetails, manejar errores  
**Criterios de aceptación**: Datos reales, manejo de errores, estados de carga  

### T9: Actualizar API de beneficios de membresía
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/beneficios-membresia/beneficiosMembresiApi.ts`  
**Objetivo**: Conectar con backend para gestión de beneficios  
**Pasos concretos**: Usar env variables, implementar funciones reales, manejar errores  
**Criterios de aceptación**: Configuración por env, funciones implementadas, manejo de errores  

### T10: Actualizar API de pagos de membresía
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/pagos-membresia/pagosMembresiApi.ts`  
**Objetivo**: Implementar funciones para pagos, ingresos y métricas  
**Pasos concretos**: Implementar fetchPagosRecurrentes, fetchIngresosMensuales, fetchMetricasCancelacion  
**Criterios de aceptación**: Funciones implementadas, datos reales, manejo de errores  

### T11: Actualizar páginas con manejo de errores
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatorpro/membresias/membresias/*/components/*.tsx`  
**Objetivo**: Implementar estados de carga y manejo de errores en componentes  
**Pasos concretos**: Agregar loading states, error boundaries, mensajes de error  
**Criterios de aceptación**: UI responsive, estados claros, manejo de errores  

### T12: Configurar variables de entorno
**Target**: both  
**Archivos implicados**: `.env`, `vite.config.ts`  
**Objetivo**: Configurar URLs y configuración de desarrollo  
**Pasos concretos**: Definir VITE_API_URL, CORS_ORIGIN, JWT_SECRET  
**Criterios de aceptación**: Variables configuradas, desarrollo funcional  

### T13: Implementar validación con Zod
**Target**: backend  
**Archivos implicados**: `backend/src/middleware/validation.js`  
**Objetivo**: Crear schemas de validación para membresías  
**Pasos concretos**: Crear schemas CreateMembresiaDto, UpdateMembresiaDto, validaciones  
**Criterios de aceptación**: Validación funcional, mensajes de error claros  

### T14: Implementar autenticación JWT
**Target**: backend  
**Archivos implicados**: `backend/src/middleware/auth.js`  
**Objetivo**: Proteger rutas de membresías con JWT  
**Pasos concretos**: Verificar token, validar usuario, manejar errores de auth  
**Criterios de aceptación**: Rutas protegidas, manejo de errores de auth  

### T15: Testing y documentación
**Target**: both  
**Archivos implicados**: `backend/src/__tests__/membresia.test.js`, `README.md`  
**Objetivo**: Crear tests y documentar la API  
**Pasos concretos**: Tests unitarios, tests de integración, documentación de endpoints  
**Criterios de aceptación**: Tests pasando, documentación completa, ejemplos de uso  

