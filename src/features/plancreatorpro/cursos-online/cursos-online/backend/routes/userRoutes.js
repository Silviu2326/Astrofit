const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { userSchemas, validar } = require('../validators/userValidators');

/**
 * Rutas para gestión de usuarios
 * Base path: /api/users
 */

// POST /api/users - Crear nuevo usuario
router.post(
  '/',
  validar(userSchemas.crearUsuario),
  UserController.crearUsuario
);

// GET /api/users - Obtener todos los usuarios con filtros
router.get(
  '/',
  validar(userSchemas.consultarUsuarios, 'query'),
  UserController.obtenerUsuarios
);

// GET /api/users/estadisticas - Obtener estadísticas de usuarios
router.get(
  '/estadisticas',
  UserController.obtenerEstadisticas
);

// GET /api/users/:id - Obtener usuario por ID
router.get(
  '/:id',
  validar(userSchemas.idUsuario, 'params'),
  UserController.obtenerUsuario
);

// PUT /api/users/:id - Actualizar usuario
router.put(
  '/:id',
  validar(userSchemas.idUsuario, 'params'),
  validar(userSchemas.actualizarUsuario),
  UserController.actualizarUsuario
);

// PATCH /api/users/:id/password - Cambiar contraseña
router.patch(
  '/:id/password',
  validar(userSchemas.idUsuario, 'params'),
  validar(userSchemas.cambiarPassword),
  UserController.cambiarPassword
);

// DELETE /api/users/:id - Desactivar usuario (soft delete)
router.delete(
  '/:id',
  validar(userSchemas.idUsuario, 'params'),
  UserController.eliminarUsuario
);

// DELETE /api/users/:id/permanente - Eliminar usuario permanentemente
router.delete(
  '/:id/permanente',
  validar(userSchemas.idUsuario, 'params'),
  UserController.eliminarUsuarioPermanente
);

module.exports = router;
