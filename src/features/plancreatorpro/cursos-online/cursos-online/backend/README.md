# API REST para Gestión de Usuarios - Cursos Online

Esta API REST desarrollada con Express.js permite gestionar usuarios en una plataforma de cursos online, incluyendo operaciones CRUD completas, validación de datos, autenticación y logging.

## 🚀 Características

- **API REST completa** con Express.js
- **Base de datos MongoDB** con Mongoose ODM
- **Validación robusta** con Joi
- **Sistema de logging** con Winston
- **Rate limiting** para protección
- **Manejo de errores** centralizado
- **Documentación completa** con ejemplos

## 📋 Requisitos

- Node.js >= 16.0.0
- MongoDB >= 4.4
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar el archivo `.env` con tus configuraciones:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cursos-online
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
```

4. **Iniciar MongoDB**
```bash
# Con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# O instalar MongoDB localmente
```

5. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 Documentación de la API

### Base URL
```
http://localhost:3000/api
```

### Endpoints Disponibles

#### 👥 Gestión de Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users` | Crear nuevo usuario |
| GET | `/users` | Obtener usuarios con filtros |
| GET | `/users/:id` | Obtener usuario por ID |
| PUT | `/users/:id` | Actualizar usuario |
| PATCH | `/users/:id/password` | Cambiar contraseña |
| DELETE | `/users/:id` | Desactivar usuario |
| DELETE | `/users/:id/permanente` | Eliminar permanentemente |
| GET | `/users/estadisticas` | Obtener estadísticas |

#### 🏥 Health Check
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servidor |

## 📖 Ejemplos de Uso

### 1. Crear un nuevo usuario

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@email.com",
    "password": "miPassword123",
    "telefono": "+34612345678",
    "fechaNacimiento": "1990-05-15",
    "rol": "estudiante",
    "direccion": {
      "calle": "Calle Mayor 123",
      "ciudad": "Madrid",
      "codigoPostal": "28001",
      "pais": "España"
    },
    "preferencias": {
      "idioma": "es",
      "notificaciones": {
        "email": true,
        "push": true
      }
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "usuario": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan.perez@email.com",
      "telefono": "+34612345678",
      "fechaNacimiento": "1990-05-15T00:00:00.000Z",
      "rol": "estudiante",
      "estado": "activo",
      "nombreCompleto": "Juan Pérez",
      "edad": 33,
      "direccion": {
        "calle": "Calle Mayor 123",
        "ciudad": "Madrid",
        "codigoPostal": "28001",
        "pais": "España"
      },
      "preferencias": {
        "idioma": "es",
        "notificaciones": {
          "email": true,
          "push": true
        }
      },
      "ultimoAcceso": "2023-09-05T10:30:00.000Z",
      "createdAt": "2023-09-05T10:30:00.000Z",
      "updatedAt": "2023-09-05T10:30:00.000Z"
    }
  }
}
```

### 2. Obtener usuarios con filtros

**Request:**
```bash
curl "http://localhost:3000/api/users?rol=estudiante&estado=activo&pagina=1&limite=10"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "usuarios": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "nombre": "Juan",
        "apellido": "Pérez",
        "email": "juan.perez@email.com",
        "rol": "estudiante",
        "estado": "activo",
        "createdAt": "2023-09-05T10:30:00.000Z"
      }
    ],
    "paginacion": {
      "paginaActual": 1,
      "totalPaginas": 1,
      "totalUsuarios": 1,
      "limite": 10,
      "tieneSiguiente": false,
      "tieneAnterior": false
    }
  }
}
```

### 3. Actualizar usuario

**Request:**
```bash
curl -X PUT http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "telefono": "+34698765432",
    "direccion": {
      "ciudad": "Barcelona"
    }
  }'
```

### 4. Cambiar contraseña

**Request:**
```bash
curl -X PATCH http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0/password \
  -H "Content-Type: application/json" \
  -d '{
    "passwordActual": "miPassword123",
    "passwordNueva": "nuevaPassword456",
    "confirmarPassword": "nuevaPassword456"
  }'
```

### 5. Obtener estadísticas

**Request:**
```bash
curl http://localhost:3000/api/users/estadisticas
```

**Response:**
```json
{
  "success": true,
  "data": {
    "estadisticas": {
      "totalUsuarios": 150,
      "usuariosActivos": 142,
      "usuariosInactivos": 8,
      "usuariosRecientes": 25,
      "distribucionPorRol": [
        { "_id": "estudiante", "count": 120 },
        { "_id": "instructor", "count": 25 },
        { "_id": "admin", "count": 5 }
      ]
    }
  }
}
```

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | 3000 |
| `NODE_ENV` | Entorno de ejecución | development |
| `MONGODB_URI` | URI de conexión a MongoDB | mongodb://localhost:27017/cursos-online |
| `JWT_SECRET` | Secreto para JWT | (requerido) |
| `RATE_LIMIT_WINDOW_MS` | Ventana de rate limiting (ms) | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requests por ventana | 100 |
| `LOG_LEVEL` | Nivel de logging | info |

### Estructura del Proyecto

```
backend/
├── controllers/          # Controladores de la API
├── middleware/          # Middleware personalizado
├── models/              # Modelos de Mongoose
├── routes/              # Definición de rutas
├── utils/               # Utilidades (logger, etc.)
├── validators/          # Validaciones con Joi
├── logs/                # Archivos de log
├── server.js            # Punto de entrada
├── package.json         # Dependencias
└── README.md           # Documentación
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm run test:coverage
```

## 📊 Logging

Los logs se guardan en la carpeta `logs/`:
- `error.log`: Solo errores
- `combined.log`: Todos los logs

Niveles de log disponibles:
- `error`: Errores críticos
- `warn`: Advertencias
- `info`: Información general
- `http`: Requests HTTP
- `debug`: Información de depuración

## 🚨 Manejo de Errores

La API maneja errores de forma centralizada:

- **400**: Error de validación
- **401**: No autorizado
- **404**: Recurso no encontrado
- **409**: Conflicto (email duplicado)
- **429**: Demasiadas solicitudes
- **500**: Error interno del servidor

Ejemplo de respuesta de error:
```json
{
  "success": false,
  "error": {
    "message": "Error de validación",
    "detalles": [
      {
        "campo": "email",
        "mensaje": "Por favor ingresa un email válido"
      }
    ]
  },
  "timestamp": "2023-09-05T10:30:00.000Z",
  "path": "/api/users",
  "method": "POST"
}
```

## 🔒 Seguridad

- **Helmet**: Headers de seguridad
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: Protección contra abuso
- **Validación**: Entrada de datos segura
- **Encriptación**: Contraseñas hasheadas con bcrypt

## 📈 Monitoreo

- Health check en `/health`
- Logs estructurados con Winston
- Métricas de uso y rendimiento
- Manejo graceful de señales del sistema

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
