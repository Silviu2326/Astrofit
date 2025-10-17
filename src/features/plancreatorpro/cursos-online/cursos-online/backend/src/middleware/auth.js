const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware de autenticación
 * Verifica el token JWT y asigna el usuario a req.user
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si el token está en el header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado, token no proporcionado'
      });
    }

    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar el usuario en la base de datos
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado, usuario no encontrado'
        });
      }

      // Verificar si el usuario está activo
      if (!user.activo) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado, usuario inactivo'
        });
      }

      // Asignar el usuario a la request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado, token inválido'
      });
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

/**
 * Middleware de autorización por roles
 * Verifica si el usuario tiene el rol requerido
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado, usuario no autenticado'
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `No autorizado, se requiere uno de los siguientes roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Middleware opcional de autenticación
 * No falla si no hay token, pero asigna el usuario si existe
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.activo) {
          req.user = user;
        }
      } catch (error) {
        // Token inválido, continuar sin usuario
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  authorize,
  optionalAuth
};
