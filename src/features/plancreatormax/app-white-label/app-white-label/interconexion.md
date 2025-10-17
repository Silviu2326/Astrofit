# Interconexión — app-white-label

## 1) Resumen Ejecutivo
- **Estado**: No interconectado.
- **BASE PATH propuesto**: `/api/app-white-label` (siguiendo el patrón REST del backend existente).
- **Objetivo**: Conectar FE↔BE para el módulo de personalización de aplicaciones white-label.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatormax/app-white-label/app-white-label/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TypeScript, baseURL por .env, Auth Bearer, estados UI (loading/error/empty).

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → BASE PATH → controller → model → DB.

## 4) Contratos de Datos (DTO)

### 4.1 Configuración de App
```typescript
// Request DTOs
interface AppConfigRequest {
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  icon?: string;
  logo?: string;
  typography: string;
  splashScreen?: {
    backgroundColor: string;
    logoUrl?: string;
  };
}

// Response DTOs
interface AppConfigResponse {
  id: string;
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  logo?: string;
  typography: string;
  splashScreen?: SplashScreenConfig;
  createdAt: string;
  updatedAt: string;
}

interface SplashScreenConfig {
  backgroundColor: string;
  logoUrl?: string;
  duration: number;
}
```

### 4.2 Notificaciones Push
```typescript
// Request DTOs
interface CreateNotificationRequest {
  title: string;
  message: string;
  scheduledAt?: string;
  segmentFilters?: {
    activeUsers: boolean;
    inactiveUsers: boolean;
    ios: boolean;
    android: boolean;
    minSessions: number;
  };
}

interface UpdateNotificationRequest {
  title?: string;
  message?: string;
  scheduledAt?: string;
}

// Response DTOs
interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  sentAt?: string;
  openRate?: number;
  clickRate?: number;
  segmentFilters?: SegmentFilters;
  createdAt: string;
  updatedAt: string;
}

interface NotificationStats {
  totalSent: number;
  openRate: number;
  clickRate: number;
  activeUsers: number;
}
```

### 4.3 Vista Previa App
```typescript
// Request DTOs
interface PreviewConfigRequest {
  appConfig: AppConfigResponse;
  deviceType: 'iOS' | 'Android' | 'Tablet' | 'Desktop';
  currentScreen: string;
}

// Response DTOs
interface PreviewResponse {
  id: string;
  appConfig: AppConfigResponse;
  deviceType: string;
  currentScreen: string;
  previewUrl: string;
  isLive: boolean;
  createdAt: string;
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `configuracion-app/configuracionAppApi.ts` → funciones completas para CRUD de configuración
- `personalizacion-push/personalizacionPushApi.ts` → funciones para gestión de notificaciones
- `vista-preview-app/vistaPreviewAppApi.ts` → funciones para vista previa en tiempo real

### 5.2 MODIFICAR
- `configuracion-app/ConfiguracionAppPage.tsx` → integrar servicios reales, estados, errores
- `personalizacion-push/PersonalizacionPushPage.tsx` → conectar con API de notificaciones
- `vista-preview-app/VistaPreviewAppPage.tsx` → sincronización en tiempo real

### 5.3 Placeholders de Diff (forma)
```diff
# configuracion-app/configuracionAppApi.ts
+ add: getAppConfig(): Promise<AppConfigResponse>
+ add: updateAppConfig(config: AppConfigRequest): Promise<AppConfigResponse>
+ add: uploadLogo(file: File): Promise<{logoUrl: string}>
+ replace: MOCK → GET {BASE_PATH}/config
+ replace: MOCK → POST {BASE_PATH}/config
+ error: map 4xx/5xx a Result<Error>

# personalizacion-push/personalizacionPushApi.ts
+ add: createNotification(data: CreateNotificationRequest): Promise<NotificationResponse>
+ add: getNotifications(): Promise<NotificationResponse[]>
+ add: updateNotification(id: string, data: UpdateNotificationRequest): Promise<NotificationResponse>
+ add: deleteNotification(id: string): Promise<void>
+ add: getNotificationStats(): Promise<NotificationStats>
+ replace: MOCK → POST {BASE_PATH}/notifications
+ replace: MOCK → GET {BASE_PATH}/notifications
+ error: map 4xx/5xx a Result<Error>

# vista-preview-app/vistaPreviewAppApi.ts
+ add: createPreview(config: PreviewConfigRequest): Promise<PreviewResponse>
+ add: updatePreview(id: string, config: PreviewConfigRequest): Promise<PreviewResponse>
+ add: getPreview(id: string): Promise<PreviewResponse>
+ replace: MOCK → POST {BASE_PATH}/preview
+ replace: MOCK → GET {BASE_PATH}/preview/{id}
+ error: map 4xx/5xx a Result<Error>
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR
- `backend/src/routes/appWhiteLabel.routes.js` → rutas para configuración, notificaciones y preview
- `backend/src/controllers/appWhiteLabel.controller.js` → lógica de negocio
- `backend/src/models/AppConfig.model.js` → esquema de configuración de app
- `backend/src/models/Notification.model.js` → esquema de notificaciones push
- `backend/src/models/Preview.model.js` → esquema de vistas previas

### 6.2 MODIFICAR
- `backend/src/routes/api.routes.js` → montar router de app-white-label
- `backend/src/server.js` → middleware de autenticación si es necesario

### 6.3 Placeholders de Diff (forma)
```diff
# backend/src/routes/appWhiteLabel.routes.js
+ router.get("/config", auth, ctrl.getAppConfig)
+ router.post("/config", auth, validate(AppConfigRequest), ctrl.updateAppConfig)
+ router.post("/config/upload-logo", auth, upload.single('logo'), ctrl.uploadLogo)
+ router.get("/notifications", auth, ctrl.getNotifications)
+ router.post("/notifications", auth, validate(CreateNotificationRequest), ctrl.createNotification)
+ router.put("/notifications/:id", auth, validate(UpdateNotificationRequest), ctrl.updateNotification)
+ router.delete("/notifications/:id", auth, ctrl.deleteNotification)
+ router.get("/notifications/stats", auth, ctrl.getNotificationStats)
+ router.post("/preview", auth, validate(PreviewConfigRequest), ctrl.createPreview)
+ router.get("/preview/:id", auth, ctrl.getPreview)
+ router.put("/preview/:id", auth, validate(PreviewConfigRequest), ctrl.updatePreview)

# backend/src/routes/api.routes.js
+ router.use('/app-white-label', appWhiteLabelRoutes);

# backend/src/controllers/appWhiteLabel.controller.js
+ getAppConfig: async (req, res) => { ... }
+ updateAppConfig: async (req, res) => { ... }
+ uploadLogo: async (req, res) => { ... }
+ getNotifications: async (req, res) => { ... }
+ createNotification: async (req, res) => { ... }
+ updateNotification: async (req, res) => { ... }
+ deleteNotification: async (req, res) => { ... }
+ getNotificationStats: async (req, res) => { ... }
+ createPreview: async (req, res) => { ... }
+ getPreview: async (req, res) => { ... }
+ updatePreview: async (req, res) => { ... }
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|--------------|
| Cargar configuración | configuracionAppApi.getAppConfig | GET /api/app-white-label/config | getAppConfig | AppConfig | - | AppConfigResponse |
| Guardar configuración | configuracionAppApi.updateAppConfig | POST /api/app-white-label/config | updateAppConfig | AppConfig | AppConfigRequest | AppConfigResponse |
| Subir logo | configuracionAppApi.uploadLogo | POST /api/app-white-label/config/upload-logo | uploadLogo | AppConfig | FormData | {logoUrl: string} |
| Listar notificaciones | personalizacionPushApi.getNotifications | GET /api/app-white-label/notifications | getNotifications | Notification | - | NotificationResponse[] |
| Crear notificación | personalizacionPushApi.createNotification | POST /api/app-white-label/notifications | createNotification | Notification | CreateNotificationRequest | NotificationResponse |
| Actualizar notificación | personalizacionPushApi.updateNotification | PUT /api/app-white-label/notifications/:id | updateNotification | Notification | UpdateNotificationRequest | NotificationResponse |
| Eliminar notificación | personalizacionPushApi.deleteNotification | DELETE /api/app-white-label/notifications/:id | deleteNotification | Notification | - | void |
| Obtener estadísticas | personalizacionPushApi.getNotificationStats | GET /api/app-white-label/notifications/stats | getNotificationStats | Notification | - | NotificationStats |
| Crear vista previa | vistaPreviewAppApi.createPreview | POST /api/app-white-label/preview | createPreview | Preview | PreviewConfigRequest | PreviewResponse |
| Obtener vista previa | vistaPreviewAppApi.getPreview | GET /api/app-white-label/preview/:id | getPreview | Preview | - | PreviewResponse |
| Actualizar vista previa | vistaPreviewAppApi.updatePreview | PUT /api/app-white-label/preview/:id | updatePreview | Preview | PreviewConfigRequest | PreviewResponse |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: URL base del backend (ej: `http://localhost:5000`)
- **Headers**: `Authorization: Bearer {token}` para autenticación
- **Content-Type**: `application/json` para requests, `multipart/form-data` para uploads

### 8.2 Backend
- **CORS_ORIGIN**: URL del frontend (ej: `http://localhost:5173`)
- **JWT_SECRET**: Clave para validación de tokens
- **DB_URI**: Conexión a MongoDB
- **UPLOAD_PATH**: Directorio para archivos subidos

### 8.3 Middleware de Seguridad
- **Autenticación**: Verificar JWT en todas las rutas protegidas
- **Validación**: Validar DTOs con joi/celebrate
- **CORS**: Configurar orígenes permitidos
- **Rate Limiting**: Límites para endpoints de notificaciones

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear modelo AppConfig
**Target**: backend  
**Archivos implicados**: `backend/src/models/AppConfig.model.js`  
**Objetivo**: Definir esquema de configuración de aplicación  
**Pasos concretos**: Crear modelo con campos: appName, primaryColor, secondaryColor, icon, logo, typography, splashScreen, timestamps  
**Criterios de aceptación**: Modelo creado con validaciones, índices y métodos de instancia  

### T2: Crear modelo Notification
**Target**: backend  
**Archivos implicados**: `backend/src/models/Notification.model.js`  
**Objetivo**: Definir esquema de notificaciones push  
**Pasos concretos**: Crear modelo con campos: title, message, status, sentAt, openRate, clickRate, segmentFilters, timestamps  
**Criterios de aceptación**: Modelo creado con validaciones, índices y métodos de instancia  

### T3: Crear modelo Preview
**Target**: backend  
**Archivos implicados**: `backend/src/models/Preview.model.js`  
**Objetivo**: Definir esquema de vistas previas  
**Pasos concretos**: Crear modelo con campos: appConfig, deviceType, currentScreen, previewUrl, isLive, timestamps  
**Criterios de aceptación**: Modelo creado con validaciones, índices y métodos de instancia  

### T4: Crear controlador appWhiteLabel
**Target**: backend  
**Archivos implicados**: `backend/src/controllers/appWhiteLabel.controller.js`  
**Objetivo**: Implementar lógica de negocio para app-white-label  
**Pasos concretos**: Crear controlador con métodos: getAppConfig, updateAppConfig, uploadLogo, getNotifications, createNotification, updateNotification, deleteNotification, getNotificationStats, createPreview, getPreview, updatePreview  
**Criterios de aceptación**: Controlador creado con manejo de errores, validaciones y respuestas consistentes  

### T5: Crear rutas appWhiteLabel
**Target**: backend  
**Archivos implicados**: `backend/src/routes/appWhiteLabel.routes.js`  
**Objetivo**: Definir endpoints REST para app-white-label  
**Pasos concretos**: Crear router con rutas: GET /config, POST /config, POST /config/upload-logo, GET /notifications, POST /notifications, PUT /notifications/:id, DELETE /notifications/:id, GET /notifications/stats, POST /preview, GET /preview/:id, PUT /preview/:id  
**Criterios de aceptación**: Rutas creadas con middleware de autenticación y validación  

### T6: Montar rutas en API principal
**Target**: backend  
**Archivos implicados**: `backend/src/routes/api.routes.js`  
**Objetivo**: Integrar rutas de app-white-label en la API principal  
**Pasos concretos**: Importar appWhiteLabelRoutes y montar en /app-white-label  
**Criterios de aceptación**: Rutas accesibles en /api/app-white-label  

### T7: Implementar configuracionAppApi completo
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/configuracion-app/configuracionAppApi.ts`  
**Objetivo**: Reemplazar mocks con llamadas reales a la API  
**Pasos concretos**: Implementar getAppConfig, updateAppConfig, uploadLogo con manejo de errores y tipos TypeScript  
**Criterios de aceptación**: API funcional con tipos correctos y manejo de errores  

### T8: Implementar personalizacionPushApi completo
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/personalizacion-push/personalizacionPushApi.ts`  
**Objetivo**: Reemplazar mocks con llamadas reales a la API  
**Pasos concretos**: Implementar createNotification, getNotifications, updateNotification, deleteNotification, getNotificationStats con manejo de errores y tipos TypeScript  
**Criterios de aceptación**: API funcional con tipos correctos y manejo de errores  

### T9: Implementar vistaPreviewAppApi completo
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/vista-preview-app/vistaPreviewAppApi.ts`  
**Objetivo**: Reemplazar mocks con llamadas reales a la API  
**Pasos concretos**: Implementar createPreview, getPreview, updatePreview con manejo de errores y tipos TypeScript  
**Criterios de aceptación**: API funcional con tipos correctos y manejo de errores  

### T10: Integrar API en ConfiguracionAppPage
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/configuracion-app/ConfiguracionAppPage.tsx`  
**Objetivo**: Conectar página con servicios reales  
**Pasos concretos**: Reemplazar lógica local con llamadas a configuracionAppApi, agregar estados de loading/error, manejar respuestas  
**Criterios de aceptación**: Página funcional con datos reales del backend  

### T11: Integrar API en PersonalizacionPushPage
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/personalizacion-push/PersonalizacionPushPage.tsx`  
**Objetivo**: Conectar página con servicios reales  
**Pasos concretos**: Reemplazar lógica local con llamadas a personalizacionPushApi, agregar estados de loading/error, manejar respuestas  
**Criterios de aceptación**: Página funcional con datos reales del backend  

### T12: Integrar API en VistaPreviewAppPage
**Target**: frontend  
**Archivos implicados**: `src/features/plancreatormax/app-white-label/app-white-label/vista-preview-app/VistaPreviewAppPage.tsx`  
**Objetivo**: Conectar página con servicios reales  
**Pasos concretos**: Reemplazar lógica local con llamadas a vistaPreviewAppApi, agregar estados de loading/error, manejar respuestas  
**Criterios de aceptación**: Página funcional con datos reales del backend  

### T13: Configurar variables de entorno
**Target**: both  
**Archivos implicados**: `.env`, `backend/src/config/`, `vite.config.ts`  
**Objetivo**: Configurar URLs y credenciales para desarrollo  
**Pasos concretos**: Definir VITE_API_URL, CORS_ORIGIN, JWT_SECRET, DB_URI, UPLOAD_PATH  
**Criterios de aceptación**: Variables configuradas y accesibles en frontend y backend  

### T14: Implementar middleware de autenticación
**Target**: backend  
**Archivos implicados**: `backend/src/middleware/auth.js`  
**Objetivo**: Proteger rutas de app-white-label  
**Pasos concretos**: Crear middleware para verificar JWT, extraer usuario, validar permisos  
**Criterios de aceptación**: Rutas protegidas con autenticación funcional  

### T15: Implementar validaciones DTO
**Target**: backend  
**Archivos implicados**: `backend/src/middleware/validation.js`  
**Objetivo**: Validar datos de entrada con esquemas  
**Pasos concretos**: Crear validadores para AppConfigRequest, CreateNotificationRequest, UpdateNotificationRequest, PreviewConfigRequest  
**Criterios de aceptación**: Validaciones funcionando con mensajes de error claros  

### T16: Configurar upload de archivos
**Target**: backend  
**Archivos implicados**: `backend/src/middleware/upload.js`  
**Objetivo**: Manejar subida de logos e imágenes  
**Pasos concretos**: Configurar multer para upload de archivos, validar tipos y tamaños, guardar en directorio  
**Criterios de aceptación**: Upload funcional con validaciones de seguridad  

### T17: Implementar manejo de errores
**Target**: both  
**Archivos implicados**: `backend/src/middleware/errorHandler.js`, componentes React  
**Objetivo**: Manejo consistente de errores  
**Pasos concretos**: Crear middleware de errores, componentes de error en React, toast notifications  
**Criterios de aceptación**: Errores manejados de forma consistente en FE y BE  

### T18: Testing de integración
**Target**: both  
**Archivos implicados**: `__tests__/`, `backend/src/__tests__/`  
**Objetivo**: Verificar funcionamiento end-to-end  
**Pasos concretos**: Crear tests para endpoints, servicios, componentes  
**Criterios de aceptación**: Tests pasando con cobertura adecuada  

### T19: Documentación de API
**Target**: backend  
**Archivos implicados**: `backend/docs/`, `README.md`  
**Objetivo**: Documentar endpoints y uso  
**Pasos concretos**: Crear documentación de API con ejemplos de uso  
**Criterios de aceptación**: Documentación completa y actualizada  

### T20: Optimización y performance
**Target**: both  
**Archivos implicados**: Todo el módulo  
**Objetivo**: Optimizar rendimiento  
**Pasos concretos**: Implementar caching, paginación, lazy loading, compresión de imágenes  
**Criterios de aceptación**: Módulo optimizado con buenas prácticas de performance  
