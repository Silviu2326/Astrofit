# Interconexión — automatizaciones-engagement

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/automatizaciones-engagement` (nuevo recurso que necesita ser creado).
- **Objetivo**: Conectar FE↔BE para el módulo de automatizaciones de engagement con tres submódulos: flujos-retencion, mensajes-personalizados, y reactivacion-clientes.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatormax/automatizaciones-engagement/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TypeScript, baseURL por .env, Auth Bearer, estados UI (loading/error/empty).

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → BASE PATH → controller → model → DB.

El módulo maneja tres dominios principales:
1. **Flujos de Retención**: Constructor visual, secuencias automáticas, disparadores, métricas A/B
2. **Mensajes Personalizados**: Plantillas, segmentación, multicanal, métricas de rendimiento
3. **Reactivación de Clientes**: Detección de inactividad, acciones de reactivación, alertas

## 4) Contratos de Datos (DTO)

### 4.1 Flujos de Retención
```typescript
// Request DTOs
interface CreateFlujoRequest {
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  triggers: TriggerConfig[];
  actions: ActionConfig[];
}

interface FlowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  position: { x: number; y: number };
  data: any;
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
}

// Response DTOs
interface FlujoResponse {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  nodes: FlowNode[];
  edges: FlowEdge[];
  metrics: FlujoMetrics;
  createdAt: string;
  updatedAt: string;
}

interface FlujoMetrics {
  retentionRate: number;
  reactivated: number;
  roi: number;
  totalSent: number;
  openRate: number;
  conversionRate: number;
}
```

### 4.2 Mensajes Personalizados
```typescript
// Request DTOs
interface CreateMensajeRequest {
  title: string;
  description: string;
  content: string;
  channel: 'email' | 'push' | 'sms';
  template: string;
  variables: Record<string, any>;
  targetSegment: string;
}

// Response DTOs
interface MensajeResponse {
  id: string;
  title: string;
  description: string;
  content: string;
  channel: string;
  status: 'active' | 'paused';
  sent: number;
  openRate: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
}
```

### 4.3 Reactivación de Clientes
```typescript
// Request DTOs
interface ReactivationActionRequest {
  clientId: string;
  actionType: 'email' | 'call' | 'offer' | 'personal';
  message?: string;
  offerId?: string;
}

// Response DTOs
interface InactiveClientResponse {
  id: string;
  name: string;
  email: string;
  lastActivity: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  plan: string;
  suggestedActions: string[];
  metrics: ClientMetrics;
}

interface ClientMetrics {
  daysInactive: number;
  previousEngagement: number;
  riskScore: number;
  lastPurchase?: string;
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/mensajes-personalizados/mensajesPersonalizadosApi.ts`** → funciones completas (actualmente solo tiene mocks)
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/types/`** → interfaces TypeScript para DTOs

### 5.2 MODIFICAR
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/flujos-retencion/flujosRetencionApi.ts`** → reemplazar URLs hardcodeadas, usar baseURL/env, headers de auth
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/reactivacion-clientes/reactivacionClientesApi.ts`** → completar implementación, agregar manejo de errores
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/mensajes-personalizados/MensajesPersonalizadosPage.tsx`** → integrar servicios reales, estados de loading/error
- **`src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/flujos-retencion/FlujosRetencionPage.tsx`** → conectar con API real, manejar estados

### 5.3 Placeholders de Diff (forma)
```diff
# src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/flujos-retencion/flujosRetencionApi.ts
+ import { API_BASE_URL } from '@/config/api';
+ replace: const API_BASE_URL = '/api/retencion-flujos' → const API_BASE_URL = `${API_BASE_URL}/automatizaciones-engagement/flujos-retencion`;
+ add: headers: { Authorization: `Bearer ${token}` }
+ error: map 4xx/5xx a Result<Error>

# src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/mensajes-personalizados/mensajesPersonalizadosApi.ts
+ replace: return [] → GET {BASE_PATH}/mensajes-personalizados
+ add: createMensaje, updateMensaje, deleteMensaje, getMensajeById
+ add: getMensajesByChannel, getMensajesBySegment
+ error: map 4xx/5xx a Result<Error>

# src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/reactivacion-clientes/reactivacionClientesApi.ts
+ add: getClientMetrics, updateClientStatus, getReactivationHistory
+ error: map 4xx/5xx a Result<Error>
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR
- **`backend/src/routes/automatizacionesEngagement.routes.js`** → rutas para los tres submódulos
- **`backend/src/controllers/automatizacionesEngagement.controller.js`** → controladores para flujos, mensajes, reactivación
- **`backend/src/models/FlujoRetencion.model.js`** → esquema para flujos de retención
- **`backend/src/models/MensajePersonalizado.model.js`** → esquema para mensajes
- **`backend/src/models/ClienteInactivo.model.js`** → esquema para clientes inactivos
- **`backend/src/middleware/automatizacionesValidation.js`** → validaciones específicas

### 6.2 MODIFICAR
- **`backend/src/routes/api.routes.js`** → agregar montaje del nuevo router
- **`backend/src/server.js`** → registrar nuevas rutas

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/api.routes.js
+ import automatizacionesEngagementRoutes from './automatizacionesEngagement.routes.js';
+ router.use('/automatizaciones-engagement', automatizacionesEngagementRoutes);

# backend/src/routes/automatizacionesEngagement.routes.js
+ router.get('/flujos-retencion', auth, ctrl.getFlujos)
+ router.post('/flujos-retencion', auth, validate(CreateFlujoDto), ctrl.createFlujo)
+ router.put('/flujos-retencion/:id', auth, validate(UpdateFlujoDto), ctrl.updateFlujo)
+ router.delete('/flujos-retencion/:id', auth, ctrl.deleteFlujo)
+ router.get('/flujos-retencion/:id/metrics', auth, ctrl.getFlujoMetrics)
+ router.post('/flujos-retencion/:id/ab-test', auth, validate(ABTestDto), ctrl.startABTest)
+ router.get('/mensajes-personalizados', auth, ctrl.getMensajes)
+ router.post('/mensajes-personalizados', auth, validate(CreateMensajeDto), ctrl.createMensaje)
+ router.put('/mensajes-personalizados/:id', auth, validate(UpdateMensajeDto), ctrl.updateMensaje)
+ router.delete('/mensajes-personalizados/:id', auth, ctrl.deleteMensaje)
+ router.get('/reactivacion-clientes/inactivos', auth, ctrl.getInactiveClients)
+ router.post('/reactivacion-clientes/acciones', auth, validate(ReactivationActionDto), ctrl.executeReactivationAction)
+ router.get('/reactivacion-clientes/sugerencias', auth, ctrl.getReactivationSuggestions)
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|---------|-------------|--------------|
| Crear flujo | `createFlujo()` | POST `/api/automatizaciones-engagement/flujos-retencion` | `createFlujo` | `FlujoRetencion` | `CreateFlujoRequest` | `FlujoResponse` |
| Ver métricas | `getMetrics()` | GET `/api/automatizaciones-engagement/flujos-retencion/:id/metrics` | `getFlujoMetrics` | `FlujoRetencion` | - | `FlujoMetrics` |
| A/B Test | `startABTest()` | POST `/api/automatizaciones-engagement/flujos-retencion/:id/ab-test` | `startABTest` | `FlujoRetencion` | `ABTestRequest` | `ABTestResponse` |
| Crear mensaje | `createMensaje()` | POST `/api/automatizaciones-engagement/mensajes-personalizados` | `createMensaje` | `MensajePersonalizado` | `CreateMensajeRequest` | `MensajeResponse` |
| Listar mensajes | `getMensajes()` | GET `/api/automatizaciones-engagement/mensajes-personalizados` | `getMensajes` | `MensajePersonalizado` | - | `MensajeResponse[]` |
| Clientes inactivos | `getInactiveClients()` | GET `/api/automatizaciones-engagement/reactivacion-clientes/inactivos` | `getInactiveClients` | `ClienteInactivo` | - | `InactiveClientResponse[]` |
| Ejecutar acción | `executeReactivationAction()` | POST `/api/automatizaciones-engagement/reactivacion-clientes/acciones` | `executeReactivationAction` | `ClienteInactivo` | `ReactivationActionRequest` | `ActionResponse` |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: `http://localhost:5000/api`
- **Auth**: Bearer token en headers
- **Estados**: loading, error, empty para cada operación

### 8.2 Backend
- **CORS_ORIGIN**: `http://localhost:5173`
- **JWT_SECRET**: para autenticación
- **DB_URI**: MongoDB connection
- **CORS**: Configurado para frontend
- **Auth**: Middleware de autenticación en todas las rutas

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear tipos TypeScript
**Target**: frontend  
**Archivos**: `src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/types/`  
**Objetivo**: Definir interfaces para todos los DTOs del módulo  
**Pasos concretos**: Crear archivos de tipos para FlujoRetencion, MensajePersonalizado, ClienteInactivo  
**Criterios de aceptación**: Interfaces exportables, tipado completo, documentación JSDoc  

### T2: Implementar API de Flujos de Retención
**Target**: frontend  
**Archivos**: `src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/flujos-retencion/flujosRetencionApi.ts`  
**Objetivo**: Reemplazar URLs hardcodeadas y agregar manejo de errores  
**Pasos concretos**: Usar baseURL configurada, headers de auth, manejo de errores 4xx/5xx  
**Criterios de aceptación**: Todas las funciones usan baseURL, headers auth, manejo de errores consistente  

### T3: Completar API de Mensajes Personalizados
**Target**: frontend  
**Archivos**: `src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/mensajes-personalizados/mensajesPersonalizadosApi.ts`  
**Objetivo**: Implementar todas las funciones CRUD para mensajes  
**Pasos concretos**: Reemplazar mocks con llamadas reales, agregar CRUD completo  
**Criterios de aceptación**: CRUD completo, manejo de errores, tipado correcto  

### T4: Mejorar API de Reactivación
**Target**: frontend  
**Archivos**: `src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/reactivacion-clientes/reactivacionClientesApi.ts`  
**Objetivo**: Agregar funciones faltantes y mejorar manejo de errores  
**Pasos concretos**: Agregar getClientMetrics, updateClientStatus, getReactivationHistory  
**Criterios de aceptación**: API completa, manejo de errores, funciones documentadas  

### T5: Crear rutas del backend
**Target**: backend  
**Archivos**: `backend/src/routes/automatizacionesEngagement.routes.js`  
**Objetivo**: Definir todas las rutas para los tres submódulos  
**Pasos concretos**: Crear router con todas las rutas CRUD y especializadas  
**Criterios de aceptación**: Rutas completas, middleware de auth, validaciones  

### T6: Crear controladores del backend
**Target**: backend  
**Archivos**: `backend/src/controllers/automatizacionesEngagement.controller.js`  
**Objetivo**: Implementar lógica de negocio para todos los endpoints  
**Pasos concretos**: Crear funciones para CRUD y operaciones especializadas  
**Criterios de aceptación**: Controladores completos, manejo de errores, respuestas consistentes  

### T7: Crear modelos de base de datos
**Target**: backend  
**Archivos**: `backend/src/models/FlujoRetencion.model.js`, `MensajePersonalizado.model.js`, `ClienteInactivo.model.js`  
**Objetivo**: Definir esquemas de MongoDB para los tres dominios  
**Pasos concretos**: Crear modelos con campos, validaciones, índices  
**Criterios de aceptación**: Esquemas completos, validaciones, índices apropiados  

### T8: Crear middleware de validación
**Target**: backend  
**Archivos**: `backend/src/middleware/automatizacionesValidation.js`  
**Objetivo**: Validaciones específicas para el módulo de automatizaciones  
**Pasos concretos**: Crear validadores para DTOs, reglas de negocio  
**Criterios de aceptación**: Validaciones completas, mensajes de error claros  

### T9: Integrar rutas en el servidor principal
**Target**: backend  
**Archivos**: `backend/src/routes/api.routes.js`, `backend/src/server.js`  
**Objetivo**: Montar las nuevas rutas en el servidor  
**Pasos concretos**: Importar y registrar rutas, configurar middleware  
**Criterios de aceptación**: Rutas accesibles, middleware aplicado correctamente  

### T10: Conectar páginas con APIs reales
**Target**: frontend  
**Archivos**: `src/features/plancreatormax/automatizaciones-engagement/automatizaciones-engagement/*/Page.tsx`  
**Objetivo**: Reemplazar datos mock con llamadas a APIs reales  
**Pasos concretos**: Integrar servicios, manejar estados de loading/error  
**Criterios de aceptación**: Páginas funcionando con datos reales, estados UI correctos  

### T11: Configurar autenticación y CORS
**Target**: backend  
**Archivos**: `backend/src/server.js`, `backend/src/middleware/auth.middleware.js`  
**Objetivo**: Asegurar que todas las rutas requieren autenticación  
**Pasos concretos**: Aplicar middleware de auth, configurar CORS  
**Criterios de aceptación**: Todas las rutas protegidas, CORS configurado correctamente  

### T12: Testing y validación
**Target**: both  
**Archivos**: Tests para frontend y backend  
**Objetivo**: Verificar que toda la interconexión funciona correctamente  
**Pasos concretos**: Crear tests unitarios e integración  
**Criterios de aceptación**: Tests pasando, funcionalidad completa verificada  

