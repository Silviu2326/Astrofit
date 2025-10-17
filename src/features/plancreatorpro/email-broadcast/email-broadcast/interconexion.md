# Interconexión — email-broadcast

## 1) Resumen Ejecutivo
- **Estado**: Parcialmente interconectado (solo crear-email tiene API real, resto usa mocks).
- **BASE PATH propuesto**: `/api/email-broadcast` (ya definido en crearEmailApi.ts).
- **Objetivo**: Conectar FE↔BE para todas las funcionalidades del módulo email-broadcast.

## 2) Alcance y Convenciones
- **FE**: `src/features/plancreatorpro/email-broadcast/email-broadcast/**`
- **BE**: `backend/src/{routes,controllers,models,middleware,utils,config}`
- **Reglas**: TS, baseURL por .env, Auth Bearer, estados UI (loading/error/empty).

## 3) Arquitectura Objetivo (texto)
UI → servicio `*Api.ts` → `/api/email-broadcast` → controller → model → DB.

## 4) Contratos de Datos (DTO)

### 4.1 Campañas de Email
**Request DTO (CreateCampaign):**
```typescript
{
  subject: string;           // required
  content: string;          // required
  recipients: string[];      // required
  scheduledDate?: string;   // ISO date
  templateId?: string;      // optional
  segmentId?: string;       // optional
  senderName: string;       // required
  senderEmail: string;      // required
  replyTo?: string;         // optional
  tags?: string[];          // optional
}
```

**Response DTO (Campaign):**
```typescript
{
  id: string;
  subject: string;
  content: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled' | 'failed';
  performance: 'good' | 'average' | 'bad';
  revenue?: number;
  unsubscribeRate?: number;
  bounceRate?: number;
  segment?: string;
  template?: string;
  senderName: string;
  senderEmail: string;
  replyTo?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### 4.2 Plantillas de Email
**Request DTO (CreateTemplate):**
```typescript
{
  name: string;             // required
  category: string;         // required
  content: string;          // required
  thumbnail?: string;       // optional
  isFavorite?: boolean;     // optional
}
```

**Response DTO (EmailTemplate):**
```typescript
{
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  content: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 4.3 Reportes y Métricas
**Response DTO (EmailMetrics):**
```typescript
{
  tasaApertura: number;
  tasaClics: number;
  tasaBajas: number;
  emailsEnviados: number;
  emailsEntregados: number;
}
```

## 5) Frontend — Crear/Modificar

### 5.1 CREAR (si faltan)
- `src/features/plancreatorpro/email-broadcast/email-broadcast/shared/emailBroadcastApi.ts` → funciones centralizadas para todas las operaciones.

### 5.2 MODIFICAR

#### 5.2.1 `crear-email/crearEmailApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/crear-email/crearEmailApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: sendEmail → emailBroadcastApi.sendEmail
+ replace: saveEmailDraft → emailBroadcastApi.saveDraft
+ add: getTemplates(): Promise<EmailTemplate[]>
+ add: getSegments(): Promise<Segment[]>
+ error: map 4xx/5xx a Result<Error>
```

#### 5.2.2 `listado-emails/listadoEmailsApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/listado-emails/listadoEmailsApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: fetchCampaigns → emailBroadcastApi.getCampaigns
+ replace: duplicateCampaign → emailBroadcastApi.duplicateCampaign
+ replace: archiveCampaign → emailBroadcastApi.archiveCampaign
+ add: deleteCampaign(id: string): Promise<void>
+ add: getCampaignStats(): Promise<CampaignStats>
```

#### 5.2.3 `plantillas-email/plantillasEmailApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/plantillas-email/plantillasEmailApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: getEmailTemplates → emailBroadcastApi.getTemplates
+ replace: getEmailTemplateById → emailBroadcastApi.getTemplateById
+ replace: updateEmailTemplate → emailBroadcastApi.updateTemplate
+ replace: toggleFavoriteTemplate → emailBroadcastApi.toggleFavorite
+ add: createTemplate(template: CreateTemplate): Promise<EmailTemplate>
+ add: deleteTemplate(id: string): Promise<void>
```

#### 5.2.4 `campaign-detail/campaignDetailApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/campaign-detail/campaignDetailApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: fetchCampaignDetail → emailBroadcastApi.getCampaignDetail
+ replace: fetchCampaignAnalytics → emailBroadcastApi.getCampaignAnalytics
+ replace: exportCampaignReport → emailBroadcastApi.exportReport
+ add: updateCampaignStatus(id: string, status: string): Promise<void>
+ add: resendCampaign(id: string): Promise<void>
```

#### 5.2.5 `historial-completo/historialCompletoApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/historial-completo/historialCompletoApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: fetchAllCampaigns → emailBroadcastApi.getAllCampaigns
+ replace: exportCampaigns → emailBroadcastApi.exportCampaigns
+ replace: deleteCampaign → emailBroadcastApi.deleteCampaign
+ replace: duplicateCampaign → emailBroadcastApi.duplicateCampaign
+ add: getCampaignsByDateRange(start: string, end: string): Promise<Campaign[]>
+ add: getCampaignsByStatus(status: string): Promise<Campaign[]>
```

#### 5.2.6 `reportes-envio/reportesEnvioApi.ts`
```diff
# src/features/plancreatorpro/email-broadcast/email-broadcast/reportes-envio/reportesEnvioApi.ts
+ import { emailBroadcastApi } from '../shared/emailBroadcastApi';
+ replace: fetchMetricasEmail → emailBroadcastApi.getEmailMetrics
+ replace: fetchEmbudoConversion → emailBroadcastApi.getConversionFunnel
+ replace: fetchAnalisisIngresos → emailBroadcastApi.getRevenueAnalysis
+ replace: fetchComparativaCampanas → emailBroadcastApi.getCampaignComparison
+ add: getAdvancedMetrics(filters: MetricsFilters): Promise<AdvancedMetrics>
+ add: exportMetricsReport(format: 'csv' | 'pdf'): Promise<Blob>
```

## 6) Backend — Crear/Modificar

### 6.1 CREAR

#### 6.1.1 `backend/src/routes/emailBroadcast.routes.js`
```javascript
import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  // Campañas
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  duplicateCampaign,
  archiveCampaign,
  getCampaignAnalytics,
  exportCampaignReport,
  
  // Plantillas
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleFavorite,
  
  // Reportes
  getEmailMetrics,
  getConversionFunnel,
  getRevenueAnalysis,
  getCampaignComparison,
  exportMetricsReport
} from '../controllers/emailBroadcast.controller.js';

const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(protect);

// Rutas de campañas
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.post('/campaigns', createCampaign);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);
router.post('/campaigns/:id/duplicate', duplicateCampaign);
router.patch('/campaigns/:id/archive', archiveCampaign);
router.get('/campaigns/:id/analytics', getCampaignAnalytics);
router.get('/campaigns/:id/export', exportCampaignReport);

// Rutas de plantillas
router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplateById);
router.post('/templates', createTemplate);
router.put('/templates/:id', updateTemplate);
router.delete('/templates/:id', deleteTemplate);
router.patch('/templates/:id/favorite', toggleFavorite);

// Rutas de reportes
router.get('/metrics', getEmailMetrics);
router.get('/metrics/conversion-funnel', getConversionFunnel);
router.get('/metrics/revenue-analysis', getRevenueAnalysis);
router.get('/metrics/campaign-comparison', getCampaignComparison);
router.get('/metrics/export', exportMetricsReport);

export default router;
```

#### 6.1.2 `backend/src/controllers/emailBroadcast.controller.js`
```javascript
import EmailCampaign from '../models/EmailCampaign.model.js';
import EmailTemplate from '../models/EmailTemplate.model.js';
import EmailMetrics from '../models/EmailMetrics.model.js';

// Controladores para campañas, plantillas y reportes
// Implementar CRUD completo con validaciones y manejo de errores
```

#### 6.1.3 `backend/src/models/EmailCampaign.model.js`
```javascript
import mongoose from 'mongoose';

const emailCampaignSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  recipients: [{ type: String, required: true }],
  scheduledDate: { type: Date },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmailTemplate' },
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  replyTo: { type: String },
  tags: [{ type: String }],
  status: { type: String, enum: ['sent', 'draft', 'scheduled', 'failed'], default: 'draft' },
  performance: { type: String, enum: ['good', 'average', 'bad'] },
  revenue: { type: Number, default: 0 },
  openRate: { type: Number, default: 0 },
  clickRate: { type: Number, default: 0 },
  unsubscribeRate: { type: Number, default: 0 },
  bounceRate: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('EmailCampaign', emailCampaignSchema);
```

#### 6.1.4 `backend/src/models/EmailTemplate.model.js`
```javascript
import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String },
  isFavorite: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('EmailTemplate', emailTemplateSchema);
```

### 6.2 MODIFICAR

#### 6.2.1 `backend/src/routes/api.routes.js`
```diff
# backend/src/routes/api.routes.js
+ import emailBroadcastRoutes from './emailBroadcast.routes.js';
+ add: router.use('/email-broadcast', emailBroadcastRoutes);
+ update: endpoints object to include email-broadcast: '/api/email-broadcast'
```

#### 6.2.2 `backend/src/server.js`
```diff
# backend/src/server.js
+ import emailBroadcastRoutes from './routes/emailBroadcast.routes.js';
+ add: app.use('/api/email-broadcast', emailBroadcastRoutes);
```

## 7) Mapa de Trazabilidad FE↔BE

| UI/Evento | Servicio FE | Método+Path | Controlador | Modelo | Request DTO | Response DTO |
|-----------|-------------|-------------|-------------|--------|-------------|--------------|
| Crear Email | crearEmailApi.sendEmail | POST /api/email-broadcast/campaigns | createCampaign | EmailCampaign | CreateCampaign | Campaign |
| Listar Campañas | listadoEmailsApi.fetchCampaigns | GET /api/email-broadcast/campaigns | getCampaigns | EmailCampaign | - | Campaign[] |
| Ver Detalle | campaignDetailApi.fetchCampaignDetail | GET /api/email-broadcast/campaigns/:id | getCampaignById | EmailCampaign | - | Campaign |
| Crear Plantilla | plantillasEmailApi.createTemplate | POST /api/email-broadcast/templates | createTemplate | EmailTemplate | CreateTemplate | EmailTemplate |
| Listar Plantillas | plantillasEmailApi.getEmailTemplates | GET /api/email-broadcast/templates | getTemplates | EmailTemplate | - | EmailTemplate[] |
| Ver Métricas | reportesEnvioApi.fetchMetricasEmail | GET /api/email-broadcast/metrics | getEmailMetrics | EmailMetrics | - | EmailMetrics |
| Exportar Reporte | campaignDetailApi.exportCampaignReport | GET /api/email-broadcast/campaigns/:id/export | exportCampaignReport | EmailCampaign | - | Blob |

## 8) Configuración y Seguridad

### 8.1 Frontend
- **VITE_API_URL**: `http://localhost:5000/api`
- **Headers**: `Authorization: Bearer ${token}`
- **Content-Type**: `application/json`

### 8.2 Backend
- **CORS_ORIGIN**: `http://localhost:5173`
- **JWT_SECRET**: Configurado en .env
- **DB_URI**: MongoDB connection string
- **Auth**: Middleware `protect` en todas las rutas
- **Validation**: Express-validator para DTOs

## 9) Plan de Tareas Atómicas (convertible a prompts)

### T1: Crear API centralizada
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/shared/emailBroadcastApi.ts`  
**Objetivo**: Crear servicio centralizado con todas las funciones HTTP  
**Pasos concretos**: Crear archivo con funciones para campañas, plantillas y reportes  
**Criterios de aceptación**: Funciones tipadas, manejo de errores, baseURL configurable  

### T2: Implementar modelos backend
**Target**: backend  
**Archivos**: `backend/src/models/EmailCampaign.model.js`, `backend/src/models/EmailTemplate.model.js`  
**Objetivo**: Crear esquemas MongoDB para campañas y plantillas  
**Pasos concretos**: Definir schemas, validaciones, índices, métodos estáticos  
**Criterios de aceptación**: Schemas completos, validaciones funcionando, índices optimizados  

### T3: Crear controladores backend
**Target**: backend  
**Archivos**: `backend/src/controllers/emailBroadcast.controller.js`  
**Objetivo**: Implementar lógica de negocio para todas las operaciones  
**Pasos concretos**: CRUD completo, validaciones, manejo de errores, respuestas tipadas  
**Criterios de aceptación**: Todos los endpoints funcionando, validaciones correctas, respuestas consistentes  

### T4: Configurar rutas backend
**Target**: backend  
**Archivos**: `backend/src/routes/emailBroadcast.routes.js`, `backend/src/routes/api.routes.js`, `backend/src/server.js`  
**Objetivo**: Montar rutas y conectar con el servidor principal  
**Pasos concretos**: Crear router, aplicar middlewares, registrar en API principal  
**Criterios de aceptación**: Rutas accesibles, autenticación funcionando, CORS configurado  

### T5: Migrar crear-email API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/crear-email/crearEmailApi.ts`  
**Objetivo**: Reemplazar mocks con llamadas reales al backend  
**Pasos concretos**: Importar API centralizada, reemplazar funciones, manejar errores  
**Criterios de aceptación**: Envío de emails funcionando, borradores guardándose, errores manejados  

### T6: Migrar listado-emails API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/listado-emails/listadoEmailsApi.ts`  
**Objetivo**: Conectar listado de campañas con backend  
**Pasos concretos**: Reemplazar mocks, implementar paginación, filtros y búsqueda  
**Criterios de aceptación**: Lista de campañas real, filtros funcionando, paginación correcta  

### T7: Migrar plantillas-email API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/plantillas-email/plantillasEmailApi.ts`  
**Objetivo**: Conectar gestión de plantillas con backend  
**Pasos concretos**: CRUD de plantillas, favoritos, categorías  
**Criterios de aceptación**: Plantillas persistentes, favoritos funcionando, categorías organizadas  

### T8: Migrar campaign-detail API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/campaign-detail/campaignDetailApi.ts`  
**Objetivo**: Conectar detalles y analíticas con backend  
**Pasos concretos**: Detalles de campaña, métricas en tiempo real, exportación  
**Criterios de aceptación**: Datos reales, métricas actualizadas, exportación funcionando  

### T9: Migrar historial-completo API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/historial-completo/historialCompletoApi.ts`  
**Objetivo**: Conectar historial completo con backend  
**Pasos concretos**: Historial paginado, filtros por fecha/estado, exportación masiva  
**Criterios de aceptación**: Historial completo, filtros funcionando, exportación masiva  

### T10: Migrar reportes-envio API
**Target**: frontend  
**Archivos**: `src/features/plancreatorpro/email-broadcast/email-broadcast/reportes-envio/reportesEnvioApi.ts`  
**Objetivo**: Conectar reportes y métricas con backend  
**Pasos concretos**: Métricas agregadas, embudos de conversión, análisis de ingresos  
**Criterios de aceptación**: Métricas reales, gráficos actualizados, análisis completos  

### T11: Implementar validaciones backend
**Target**: backend  
**Archivos**: `backend/src/middleware/emailBroadcastValidation.js`  
**Objetivo**: Crear validaciones específicas para email-broadcast  
**Pasos concretos**: Validar DTOs, sanitizar inputs, mensajes de error personalizados  
**Criterios de aceptación**: Validaciones completas, mensajes claros, seguridad mejorada  

### T12: Implementar autenticación y autorización
**Target**: backend  
**Archivos**: `backend/src/middleware/emailBroadcastAuth.js`  
**Objetivo**: Controlar acceso a campañas y plantillas por trainer  
**Pasos concretos**: Verificar ownership, filtrar por trainerId, validar permisos  
**Criterios de aceptación**: Acceso controlado, datos aislados por trainer, seguridad garantizada  

### T13: Optimizar consultas y rendimiento
**Target**: backend  
**Archivos**: `backend/src/models/EmailCampaign.model.js`, `backend/src/controllers/emailBroadcast.controller.js`  
**Objetivo**: Mejorar rendimiento de consultas y agregaciones  
**Pasos concretos**: Índices optimizados, agregaciones eficientes, caché de métricas  
**Criterios de aceptación**: Consultas rápidas, métricas en tiempo real, escalabilidad mejorada  

### T14: Implementar manejo de errores frontend
**Target**: frontend  
**Archivos**: Todos los `*Api.ts` del módulo  
**Objetivo**: Manejo consistente de errores en toda la aplicación  
**Pasos concretos**: Try-catch uniforme, mensajes de usuario, estados de error  
**Criterios de aceptación**: Errores manejados, UX mejorada, debugging facilitado  

### T15: Testing y documentación
**Target**: both  
**Archivos**: `backend/src/__tests__/emailBroadcast.test.js`, `src/features/plancreatorpro/email-broadcast/email-broadcast/README.md`  
**Objetivo**: Asegurar calidad y documentar funcionalidades  
**Pasos concretos**: Tests unitarios, tests de integración, documentación de API  
**Criterios de aceptación**: Cobertura de tests >80%, documentación completa, ejemplos de uso  


