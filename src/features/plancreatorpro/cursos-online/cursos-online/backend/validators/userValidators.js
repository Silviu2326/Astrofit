const Joi = require('joi');

// Esquemas de validación para usuarios
const userSchemas = {
  // Validación para crear usuario
  crearUsuario: Joi.object({
    nombre: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required()
      .messages({
        'string.empty': 'El nombre es obligatorio',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 50 caracteres',
        'any.required': 'El nombre es obligatorio'
      }),
    
    apellido: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required()
      .messages({
        'string.empty': 'El apellido es obligatorio',
        'string.min': 'El apellido debe tener al menos 2 caracteres',
        'string.max': 'El apellido no puede exceder 50 caracteres',
        'any.required': 'El apellido es obligatorio'
      }),
    
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required()
      .messages({
        'string.email': 'Por favor ingresa un email válido',
        'string.empty': 'El email es obligatorio',
        'any.required': 'El email es obligatorio'
      }),
    
    password: Joi.string()
      .min(6)
      .max(128)
      .required()
      .messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'string.max': 'La contraseña no puede exceder 128 caracteres',
        'any.required': 'La contraseña es obligatoria'
      }),
    
    telefono: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .trim()
      .optional()
      .allow('')
      .messages({
        'string.pattern.base': 'Por favor ingresa un número de teléfono válido'
      }),
    
    fechaNacimiento: Joi.date()
      .max('now')
      .optional()
      .messages({
        'date.max': 'La fecha de nacimiento debe ser anterior a hoy'
      }),
    
    rol: Joi.string()
      .valid('estudiante', 'instructor', 'admin')
      .default('estudiante')
      .messages({
        'any.only': 'El rol debe ser: estudiante, instructor o admin'
      }),
    
    direccion: Joi.object({
      calle: Joi.string().trim().optional().allow(''),
      ciudad: Joi.string().trim().optional().allow(''),
      codigoPostal: Joi.string().trim().optional().allow(''),
      pais: Joi.string().trim().default('España').optional()
    }).optional(),
    
    preferencias: Joi.object({
      idioma: Joi.string()
        .valid('es', 'en', 'fr', 'de')
        .default('es')
        .optional(),
      notificaciones: Joi.object({
        email: Joi.boolean().default(true).optional(),
        push: Joi.boolean().default(true).optional()
      }).optional()
    }).optional()
  }),

  // Validación para actualizar usuario
  actualizarUsuario: Joi.object({
    nombre: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .optional()
      .messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 50 caracteres'
      }),
    
    apellido: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .optional()
      .messages({
        'string.min': 'El apellido debe tener al menos 2 caracteres',
        'string.max': 'El apellido no puede exceder 50 caracteres'
      }),
    
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .optional()
      .messages({
        'string.email': 'Por favor ingresa un email válido'
      }),
    
    telefono: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .trim()
      .optional()
      .allow('')
      .messages({
        'string.pattern.base': 'Por favor ingresa un número de teléfono válido'
      }),
    
    fechaNacimiento: Joi.date()
      .max('now')
      .optional()
      .allow(null)
      .messages({
        'date.max': 'La fecha de nacimiento debe ser anterior a hoy'
      }),
    
    rol: Joi.string()
      .valid('estudiante', 'instructor', 'admin')
      .optional()
      .messages({
        'any.only': 'El rol debe ser: estudiante, instructor o admin'
      }),
    
    estado: Joi.string()
      .valid('activo', 'inactivo', 'suspendido')
      .optional()
      .messages({
        'any.only': 'El estado debe ser: activo, inactivo o suspendido'
      }),
    
    direccion: Joi.object({
      calle: Joi.string().trim().optional().allow(''),
      ciudad: Joi.string().trim().optional().allow(''),
      codigoPostal: Joi.string().trim().optional().allow(''),
      pais: Joi.string().trim().optional()
    }).optional(),
    
    preferencias: Joi.object({
      idioma: Joi.string()
        .valid('es', 'en', 'fr', 'de')
        .optional(),
      notificaciones: Joi.object({
        email: Joi.boolean().optional(),
        push: Joi.boolean().optional()
      }).optional()
    }).optional()
  }),

  // Validación para cambio de contraseña
  cambiarPassword: Joi.object({
    passwordActual: Joi.string()
      .required()
      .messages({
        'string.empty': 'La contraseña actual es obligatoria',
        'any.required': 'La contraseña actual es obligatoria'
      }),
    
    passwordNueva: Joi.string()
      .min(6)
      .max(128)
      .required()
      .messages({
        'string.empty': 'La nueva contraseña es obligatoria',
        'string.min': 'La nueva contraseña debe tener al menos 6 caracteres',
        'string.max': 'La nueva contraseña no puede exceder 128 caracteres',
        'any.required': 'La nueva contraseña es obligatoria'
      }),
    
    confirmarPassword: Joi.string()
      .valid(Joi.ref('passwordNueva'))
      .required()
      .messages({
        'any.only': 'Las contraseñas no coinciden',
        'any.required': 'La confirmación de contraseña es obligatoria'
      })
  }),

  // Validación para login
  login: Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .trim()
      .required()
      .messages({
        'string.email': 'Por favor ingresa un email válido',
        'string.empty': 'El email es obligatorio',
        'any.required': 'El email es obligatorio'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'La contraseña es obligatoria',
        'any.required': 'La contraseña es obligatoria'
      })
  }),

  // Validación para parámetros de consulta
  consultarUsuarios: Joi.object({
    nombre: Joi.string().trim().optional(),
    email: Joi.string().trim().optional(),
    rol: Joi.string().valid('estudiante', 'instructor', 'admin').optional(),
    estado: Joi.string().valid('activo', 'inactivo', 'suspendido').optional(),
    fechaDesde: Joi.date().optional(),
    fechaHasta: Joi.date().optional(),
    pagina: Joi.number().integer().min(1).default(1).optional(),
    limite: Joi.number().integer().min(1).max(100).default(10).optional(),
    ordenar: Joi.string().default('-createdAt').optional()
  }),

  // Validación para ID de usuario
  idUsuario: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'ID de usuario inválido',
        'any.required': 'El ID del usuario es obligatorio'
      })
  })
};

// Middleware de validación
const validar = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const mensajesError = error.details.map(detail => ({
        campo: detail.path.join('.'),
        mensaje: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Error de validación',
          detalles: mensajesError
        }
      });
    }

    // Reemplazar los datos validados
    req[property] = value;
    next();
  };
};

module.exports = {
  userSchemas,
  validar
};
