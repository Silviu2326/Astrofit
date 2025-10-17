const logger = require('../utils/logger');

/**
 * Middleware de manejo de errores centralizado
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  logger.error(`Error ${err.name}: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message: `Error de validación: ${message}`,
      statusCode: 400
    };
  }

  // Error de duplicado en MongoDB
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} ya existe en la base de datos`;
    error = {
      message: `Error de duplicado: ${message}`,
      statusCode: 400
    };
  }

  // Error de Cast de MongoDB
  if (err.name === 'CastError') {
    const message = 'ID de recurso inválido';
    error = {
      message: `Error de formato: ${message}`,
      statusCode: 400
    };
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token JWT inválido';
    error = {
      message: `Error de autenticación: ${message}`,
      statusCode: 401
    };
  }

  // Error de expiración de JWT
  if (err.name === 'TokenExpiredError') {
    const message = 'Token JWT expirado';
    error = {
      message: `Error de autenticación: ${message}`,
      statusCode: 401
    };
  }

  // Error de validación de Joi
  if (err.isJoi) {
    const message = err.details.map(detail => detail.message).join(', ');
    error = {
      message: `Error de validación: ${message}`,
      statusCode: 400
    };
  }

  // Respuesta de error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = errorHandler;
