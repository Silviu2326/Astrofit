const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Controlador para gestión de usuarios
 */
class UserController {
  
  /**
   * Crear un nuevo usuario
   */
  static async crearUsuario(req, res, next) {
    try {
      const datosUsuario = req.body;
      
      // Verificar si el email ya existe
      const usuarioExistente = await User.findOne({ email: datosUsuario.email });
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'El email ya está registrado'
          }
        });
      }

      // Crear nuevo usuario
      const nuevoUsuario = new User(datosUsuario);
      await nuevoUsuario.save();

      logger.info(`Usuario creado: ${nuevoUsuario.email}`, {
        userId: nuevoUsuario._id,
        rol: nuevoUsuario.rol
      });

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: {
          usuario: nuevoUsuario.obtenerDatosPublicos()
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener todos los usuarios con filtros y paginación
   */
  static async obtenerUsuarios(req, res, next) {
    try {
      const {
        nombre,
        email,
        rol,
        estado,
        fechaDesde,
        fechaHasta,
        pagina = 1,
        limite = 10,
        ordenar = '-createdAt'
      } = req.query;

      const criterios = {
        nombre,
        email,
        rol,
        estado,
        fechaDesde,
        fechaHasta,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        ordenar
      };

      // Buscar usuarios
      const usuarios = await User.buscarUsuarios(criterios);
      
      // Contar total de usuarios que coinciden con los criterios
      const totalUsuarios = await User.countDocuments(User.buscarUsuarios(criterios).getQuery());

      const totalPaginas = Math.ceil(totalUsuarios / parseInt(limite));

      logger.info(`Consulta de usuarios realizada`, {
        totalUsuarios,
        pagina: parseInt(pagina),
        limite: parseInt(limite)
      });

      res.json({
        success: true,
        data: {
          usuarios,
          paginacion: {
            paginaActual: parseInt(pagina),
            totalPaginas,
            totalUsuarios,
            limite: parseInt(limite),
            tieneSiguiente: parseInt(pagina) < totalPaginas,
            tieneAnterior: parseInt(pagina) > 1
          }
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener un usuario por ID
   */
  static async obtenerUsuario(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await User.findById(id).select('-password -intentosLogin -bloqueadoHasta');
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Usuario no encontrado'
          }
        });
      }

      logger.info(`Usuario consultado: ${usuario.email}`, {
        userId: usuario._id
      });

      res.json({
        success: true,
        data: {
          usuario
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar un usuario
   */
  static async actualizarUsuario(req, res, next) {
    try {
      const { id } = req.params;
      const datosActualizacion = req.body;

      // Verificar si el usuario existe
      const usuario = await User.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Usuario no encontrado'
          }
        });
      }

      // Si se está actualizando el email, verificar que no esté en uso
      if (datosActualizacion.email && datosActualizacion.email !== usuario.email) {
        const emailExistente = await User.findOne({ 
          email: datosActualizacion.email,
          _id: { $ne: id }
        });
        
        if (emailExistente) {
          return res.status(400).json({
            success: false,
            error: {
              message: 'El email ya está en uso por otro usuario'
            }
          });
        }
      }

      // Actualizar usuario
      const usuarioActualizado = await User.findByIdAndUpdate(
        id,
        datosActualizacion,
        { 
          new: true, 
          runValidators: true 
        }
      ).select('-password -intentosLogin -bloqueadoHasta');

      logger.info(`Usuario actualizado: ${usuarioActualizado.email}`, {
        userId: usuarioActualizado._id,
        camposActualizados: Object.keys(datosActualizacion)
      });

      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: {
          usuario: usuarioActualizado
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar un usuario (soft delete)
   */
  static async eliminarUsuario(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await User.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Usuario no encontrado'
          }
        });
      }

      // Cambiar estado a inactivo en lugar de eliminar
      usuario.estado = 'inactivo';
      await usuario.save();

      logger.info(`Usuario desactivado: ${usuario.email}`, {
        userId: usuario._id
      });

      res.json({
        success: true,
        message: 'Usuario desactivado exitosamente'
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar un usuario permanentemente (solo para administradores)
   */
  static async eliminarUsuarioPermanente(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await User.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Usuario no encontrado'
          }
        });
      }

      await User.findByIdAndDelete(id);

      logger.warn(`Usuario eliminado permanentemente: ${usuario.email}`, {
        userId: usuario._id,
        eliminadoPor: req.user?.id
      });

      res.json({
        success: true,
        message: 'Usuario eliminado permanentemente'
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Cambiar contraseña de usuario
   */
  static async cambiarPassword(req, res, next) {
    try {
      const { id } = req.params;
      const { passwordActual, passwordNueva } = req.body;

      const usuario = await User.findById(id).select('+password');
      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Usuario no encontrado'
          }
        });
      }

      // Verificar contraseña actual
      const esPasswordValida = await usuario.verificarPassword(passwordActual);
      if (!esPasswordValida) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'La contraseña actual es incorrecta'
          }
        });
      }

      // Actualizar contraseña
      usuario.password = passwordNueva;
      await usuario.save();

      logger.info(`Contraseña cambiada para usuario: ${usuario.email}`, {
        userId: usuario._id
      });

      res.json({
        success: true,
        message: 'Contraseña cambiada exitosamente'
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener estadísticas de usuarios
   */
  static async obtenerEstadisticas(req, res, next) {
    try {
      const [
        totalUsuarios,
        usuariosActivos,
        usuariosPorRol,
        usuariosRecientes
      ] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ estado: 'activo' }),
        User.aggregate([
          { $group: { _id: '$rol', count: { $sum: 1 } } }
        ]),
        User.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        })
      ]);

      logger.info('Estadísticas de usuarios consultadas');

      res.json({
        success: true,
        data: {
          estadisticas: {
            totalUsuarios,
            usuariosActivos,
            usuariosInactivos: totalUsuarios - usuariosActivos,
            usuariosRecientes,
            distribucionPorRol: usuariosPorRol
          }
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
