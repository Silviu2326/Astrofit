# API de Trainers

Documentación completa de los endpoints para gestión de trainers.

## Modelo Trainer

### Campos del modelo:

```javascript
{
  name: String,              // Nombre del trainer
  email: String,             // Email único
  password: String,          // Contraseña (hasheada)
  plan: String,              // Plan de suscripción (ver planes disponibles)
  subscriptionStatus: String, // Estado: 'active', 'inactive', 'trial', 'cancelled'
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  avatar: String,
  telefono: String,
  especialidad: String,
  certificaciones: [String],
  biografia: String,
  redesSociales: {
    instagram: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  configuracion: {
    idioma: String,
    timezone: String,
    notificaciones: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    }
  },
  isActive: Boolean,
  lastLogin: Date
}
```

### Planes disponibles (basados en mockUsers.ts):

1. **core** - Plan básico
2. **plansolo-pro** - Para entrenadores individuales
3. **plansolo-max** - Plan individual máximo
4. **plancreator-pro** - Para creadores de contenido
5. **plancreator-max** - Creadores de contenido máximo
6. **planstudio-pro** - Para gimnasios/estudios
7. **planstudio-max** - Gimnasios/estudios máximo
8. **planteams-pro** - Para equipos deportivos
9. **planteams-elite** - Equipos deportivos élite

## Endpoints

### 1. Registrar Trainer
```http
POST /api/trainers/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "plan": "plansolo-pro"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "trainer": {
      "id": "64f8a9b2c3d4e5f6a7b8c9d0",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "plan": "plansolo-pro",
      "subscriptionStatus": "trial",
      "features": ["landing-servicios", "calendario-publico", ...]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login Trainer
```http
POST /api/trainers/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "trainer": {
      "id": "64f8a9b2c3d4e5f6a7b8c9d0",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "plan": "plansolo-pro",
      "subscriptionStatus": "active",
      "features": [...]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Obtener Trainer Actual
```http
GET /api/trainers/me
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "trainer": {
      "id": "64f8a9b2c3d4e5f6a7b8c9d0",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "plan": "plansolo-pro",
      "subscriptionStatus": "active",
      "avatar": null,
      "telefono": "+34 600 123 456",
      "especialidad": "Entrenamiento funcional",
      "certificaciones": ["NSCA-CPT", "CrossFit L1"],
      "biografia": "Entrenador con 10 años de experiencia...",
      "redesSociales": {
        "instagram": "@juantrainer",
        "facebook": "juan.trainer"
      },
      "configuracion": {
        "idioma": "es",
        "timezone": "Europe/Madrid",
        "notificaciones": {
          "email": true,
          "push": true,
          "sms": false
        }
      },
      "features": [...],
      "createdAt": "2024-10-01T10:00:00.000Z",
      "lastLogin": "2024-10-03T20:00:00.000Z"
    }
  }
}
```

### 4. Listar Trainers (Admin)
```http
GET /api/trainers?plan=plansolo-pro&subscriptionStatus=active&search=juan&page=1&limit=10
Authorization: Bearer <admin-token>
```

**Parámetros de query:**
- `plan` - Filtrar por plan
- `subscriptionStatus` - Filtrar por estado de suscripción
- `search` - Buscar por nombre o email
- `page` - Número de página (default: 1)
- `limit` - Resultados por página (default: 10)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [...]
}
```

### 5. Obtener Trainer por ID
```http
GET /api/trainers/:id
Authorization: Bearer <token>
```

### 6. Actualizar Trainer
```http
PUT /api/trainers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Juan Pérez García",
  "telefono": "+34 600 123 456",
  "especialidad": "Entrenamiento funcional y CrossFit",
  "certificaciones": ["NSCA-CPT", "CrossFit L1", "CrossFit L2"],
  "biografia": "Entrenador con 10 años de experiencia...",
  "redesSociales": {
    "instagram": "@juantrainer",
    "facebook": "juan.trainer",
    "youtube": "JuanTrainerTV"
  },
  "configuracion": {
    "idioma": "es",
    "timezone": "Europe/Madrid",
    "notificaciones": {
      "email": true,
      "push": true,
      "sms": true
    }
  }
}
```

### 7. Actualizar Plan del Trainer (Admin)
```http
PUT /api/trainers/:id/plan
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "plan": "plansolo-max",
  "subscriptionStatus": "active",
  "subscriptionEndDate": "2025-10-03T00:00:00.000Z"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "trainer": {
      "id": "64f8a9b2c3d4e5f6a7b8c9d0",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "plan": "plansolo-max",
      "subscriptionStatus": "active",
      "subscriptionEndDate": "2025-10-03T00:00:00.000Z",
      "features": [...]
    }
  }
}
```

### 8. Eliminar Trainer (Admin)
```http
DELETE /api/trainers/:id
Authorization: Bearer <admin-token>
```

### 9. Verificar Acceso a Feature
```http
GET /api/trainers/:id/features/:featureId
Authorization: Bearer <token>
```

**Ejemplo:**
```http
GET /api/trainers/64f8a9b2c3d4e5f6a7b8c9d0/features/calendario-publico
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "featureId": "calendario-publico",
    "hasAccess": true,
    "plan": "plansolo-pro"
  }
}
```

## Características por Plan

### Core
- inicio, panel-control, asistente-onboarding, centro-ayuda
- importador-datos, integraciones-esenciales
- clientes-listado, cliente-detalle, leads-listado, bandeja-entrada
- biblioteca-ejercicios, plantillas-entrenos, entrenamientos-listado
- plantillas-dietas, dietas-listado
- panel-financiero, cobros-facturacion, productos-servicios
- campanas, fuentes-lead

### Plan Solo Pro (incluye Core +)
- landing-servicios, calendario-publico, pagina-reserva
- testimonios-clientes, blog-noticias
- listado-habitos, crear-habito, estadisticas-habitos, retos-habitos
- videollamada-sala, grabaciones-sesiones, chat-sesion, notas-sesion
- listado-cupones, crear-cupon, reportes-uso
- customer-journey, hitos-clientes, alertas-retencion

### Plan Solo Max (incluye Solo Pro +)
- analitica-ingresos, cohortes-clientes, ltv-clientes
- retencion-clientes-analytics
- crear-flujo, constructor-visual, historial-flujos
- libreria-plantillas, listado-automatizaciones
- personalizacion-app-cliente, personalizacion-dominio, personalizacion-estilos
- configuracion-upsells, conversion-report, sugerencias-productos
- dispositivos-conectados, panel-datos-wearables, reportes-rendimiento

### Plan Creator Pro
- buscador-contenidos, contenidos-video, contenidos-articulos, contenidos-descargables
- feed-comunidad, grupos-comunidad, moderacion-comunidad, ranking-actividad
- listado-cursos, crear-curso, curso-detalle, gestion-lecciones, quizzes-evaluaciones
- listado-emails, crear-email, plantillas-email, reportes-envio
- listado-membresias, pagina-membresia, beneficios-membresia, pagos-membresia

### Plan Creator Max (incluye Creator Pro +)
- configuracion-app, vista-preview-app, personalizacion-push
- flujos-retencion, mensajes-personalizados, reactivacion-clientes
- listado-afiliados, panel-comisiones, pagos-afiliados, recursos-afiliados
- experimentos, resultados-test, historial-experimentos
- catalogo-productos, configuracion-tienda, pedidos-clientes, informes-ventas

### Plan Studio Pro
- escaner-entrada, pases-virtuales, historial-asistencias
- calendario-clases, reservas-clase, gestion-coach, reportes-asistencia
- listado-pases, crear-contrato, renovaciones
- ventas-rapidas, tickets-diarios, caja-diaria
- wod-dia, leaderboard, historial-marcas

### Plan Studio Max (incluye Studio Pro +)
- gestion-tornos, tarjetas-socios, reportes-accesos
- convenios-corporativos, empleados-socios, facturacion-empresas
- catalogo-stock, control-pedidos, alertas-inventario
- interfaz-cliente, historial-kiosko
- listado-sedes, comparativa-sedes, transferencias-clientes

### Plan Teams Pro
- lista-convocatorias, gestion-plantillas-convocatoria, asistencia-eventos
- cuestionario-diario, informes-semanales, alertas-fatiga
- pruebas-fisicas, resultados-historicos, comparador-resultados
- ficha-atleta, historial-rendimiento, comparador-atletas
- calendario-periodizacion, plantillas-mesociclos, editar-mesociclo
- listado-roles, asignacion-roles, permisos-entrenadores

### Plan Teams Elite (incluye Teams Pro +)
- dashboards-equipos, reportes-rendimiento-elite, comparativas-longitudinales
- equipo-a-vs-b, analisis-posicion, proyeccion-partido
- torneos, campeonatos, resultados-eventos
- listado-jugadores, evaluacion-jugador, historial-scouting
- dispositivos-conectados-elite, datos-tiempo-real, informes-sensores

## Métodos del Modelo

### getFeatures()
Obtiene todas las features disponibles para el plan del trainer.

```javascript
const features = trainer.getFeatures();
// Retorna un array con todas las features (core + específicas del plan)
```

### hasFeatureAccess(featureId)
Verifica si el trainer tiene acceso a una feature específica.

```javascript
const hasAccess = trainer.hasFeatureAccess('calendario-publico');
// Retorna true o false
```

### matchPassword(password)
Compara la contraseña proporcionada con la hasheada.

```javascript
const isMatch = await trainer.matchPassword('password123');
// Retorna true o false
```

## Autenticación

Todos los endpoints protegidos requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login o registro y contiene:
- `id` del trainer
- `plan` del trainer
- Tiempo de expiración (configurable en JWT_EXPIRE)

## Errores Comunes

### 400 Bad Request
```json
{
  "success": false,
  "error": "Por favor proporciona todos los campos requeridos"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "User role user is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Trainer no encontrado"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Error message..."
}
```
