const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./src/routes/api.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite de 100 requests por ventana
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de gestión de cursos online funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    modules: {
      users: 'active',
      cursos: 'active'
    }
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST para gestión de cursos online',
    version: '1.0.0',
    description: 'API completa para gestión de cursos, lecciones, quizzes y usuarios',
    endpoints: {
      users: '/api/users',
      cursos: '/api/cursos',
      health: '/health'
    },
    modules: {
      users: 'Gestión de usuarios e instructores',
      cursos: 'Gestión completa de cursos online'
    }
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en esta API`
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info('✅ Conectado a MongoDB exitosamente');
  } catch (error) {
    logger.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      logger.info(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  logger.info('🛑 Señal SIGTERM recibida, cerrando servidor...');
  mongoose.connection.close(() => {
    logger.info('📦 Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('🛑 Señal SIGINT recibida, cerrando servidor...');
  mongoose.connection.close(() => {
    logger.info('📦 Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

// Iniciar la aplicación
if (require.main === module) {
  startServer();
}

module.exports = app;
