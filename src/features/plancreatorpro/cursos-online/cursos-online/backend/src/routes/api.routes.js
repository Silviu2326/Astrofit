const express = require('express');

// Importar rutas de módulos
const userRoutes = require('../../routes/userRoutes');
const cursosRoutes = require('./cursos.routes');

const router = express.Router();

// ========================================
// RUTAS DE MÓDULOS
// ========================================

// Rutas de usuarios
router.use('/users', userRoutes);

// Rutas de cursos
router.use('/cursos', cursosRoutes);

// ========================================
// RUTA DE INFORMACIÓN DE LA API
// ========================================

/**
 * GET /api
 * Información general de la API
 */
router.get('/', (req, res) => {
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
      users: {
        description: 'Gestión de usuarios e instructores',
        endpoints: [
          'POST /api/users - Crear usuario',
          'GET /api/users - Listar usuarios',
          'GET /api/users/:id - Obtener usuario',
          'PUT /api/users/:id - Actualizar usuario',
          'DELETE /api/users/:id - Eliminar usuario'
        ]
      },
      cursos: {
        description: 'Gestión completa de cursos online',
        endpoints: [
          'GET /api/cursos - Listar cursos',
          'POST /api/cursos - Crear curso',
          'GET /api/cursos/:id - Obtener curso',
          'PUT /api/cursos/:id - Actualizar curso',
          'DELETE /api/cursos/:id - Eliminar curso',
          'POST /api/cursos/upload - Subir archivo',
          'GET /api/cursos/:id/lecciones - Obtener lecciones',
          'POST /api/cursos/:id/lecciones - Crear lección',
          'GET /api/cursos/:id/quizzes - Obtener quizzes',
          'POST /api/cursos/:id/quizzes - Crear quiz',
          'POST /api/cursos/quizzes/:id/submit - Enviar quiz'
        ]
      }
    },
    authentication: {
      type: 'JWT Bearer Token',
      header: 'Authorization: Bearer <token>',
      note: 'Todas las rutas de cursos requieren autenticación'
    },
    documentation: {
      swagger: '/api/docs',
      postman: '/api/postman-collection'
    }
  });
});

module.exports = router;
