# Astrofit Backend API

Backend API para la plataforma Astrofit construido con Node.js y Express.

## 🚀 Inicio Rápido

### Instalación

```bash
cd backend
npm install
```

### Configuración

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env
```

2. Configura las variables de entorno en `.env`:
- `PORT`: Puerto del servidor (default: 5000)
- `MONGODB_URI`: URI de conexión a MongoDB
- `JWT_SECRET`: Secreto para firmar tokens JWT
- Etc.

### Ejecución

**Modo desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración (DB, etc)
│   ├── controllers/     # Controladores de rutas
│   ├── middleware/      # Middleware personalizado
│   ├── models/          # Modelos de base de datos
│   ├── routes/          # Definición de rutas
│   ├── utils/           # Utilidades y helpers
│   └── server.js        # Punto de entrada
├── .env                 # Variables de entorno (no commitear)
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🛣️ Endpoints API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (protegido)
- `POST /api/auth/logout` - Cerrar sesión (protegido)

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario (admin)

### Clientes
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Crear cliente
- `GET /api/clients/:id` - Obtener cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

### Health Check
- `GET /health` - Estado del servidor

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación. Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

## 🗄️ Base de Datos

El proyecto usa MongoDB. Para conectar:

1. **Local**: Asegúrate de tener MongoDB instalado y corriendo
2. **MongoDB Atlas**: Usa la URI de conexión en `MONGODB_URI`

## 📦 Dependencias Principales

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **jsonwebtoken**: Autenticación JWT
- **bcryptjs**: Hash de contraseñas
- **cors**: CORS middleware
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **dotenv**: Variables de entorno

## 🔧 TODO

- [ ] Implementar lógica de base de datos en controladores
- [ ] Crear modelos de Mongoose
- [ ] Agregar validación de datos
- [ ] Implementar refresh tokens
- [ ] Agregar rate limiting
- [ ] Configurar tests
- [ ] Agregar documentación con Swagger
- [ ] Implementar logging avanzado

## 📝 Notas

Los controladores actuales son **mocks** que devuelven datos de ejemplo. Para producción:

1. Conecta la base de datos en `server.js`
2. Crea los modelos en `/models`
3. Implementa la lógica real en los controladores
4. Agrega validación de entrada
5. Implementa manejo de errores robusto
