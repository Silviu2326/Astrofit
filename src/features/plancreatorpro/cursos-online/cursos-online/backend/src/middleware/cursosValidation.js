const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware de validación para el módulo de cursos
 * Implementa validaciones específicas con express-validator
 */

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

/**
 * Validaciones para crear curso
 */
const validateCreateCurso = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres')
    .trim(),
  
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres')
    .trim(),
  
  body('precio')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser mayor o igual a 0'),
  
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
    .trim(),
  
  body('imagenPortada')
    .optional()
    .isURL()
    .withMessage('La imagen de portada debe ser una URL válida'),
  
  body('duracion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La duración no puede exceder 100 caracteres')
    .trim(),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar curso
 */
const validateUpdateCurso = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  body('titulo')
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres')
    .trim(),
  
  body('descripcion')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres')
    .trim(),
  
  body('precio')
    .optional()
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser mayor o igual a 0'),
  
  body('estado')
    .optional()
    .isIn(['borrador', 'activo', 'pausado', 'archivado'])
    .withMessage('El estado debe ser: borrador, activo, pausado o archivado'),
  
  body('imagenPortada')
    .optional()
    .isURL()
    .withMessage('La imagen de portada debe ser una URL válida'),
  
  body('categoria')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
    .trim(),
  
  body('duracion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('La duración no puede exceder 100 caracteres')
    .trim(),
  
  handleValidationErrors
];

/**
 * Validaciones para crear/actualizar lección
 */
const validateLeccion = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 3, max: 200 })
    .withMessage('El título debe tener entre 3 y 200 caracteres')
    .trim(),
  
  body('descripcion')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres')
    .trim(),
  
  body('tipo')
    .notEmpty()
    .withMessage('El tipo es requerido')
    .isIn(['video', 'texto', 'quiz', 'archivo'])
    .withMessage('El tipo debe ser: video, texto, quiz o archivo'),
  
  body('contenido')
    .if(body('tipo').not().equals('quiz'))
    .notEmpty()
    .withMessage('El contenido es requerido para este tipo de lección')
    .isLength({ min: 1, max: 10000 })
    .withMessage('El contenido debe tener entre 1 y 10000 caracteres'),
  
  body('duracion')
    .optional()
    .isNumeric()
    .withMessage('La duración debe ser un número')
    .isInt({ min: 1 })
    .withMessage('La duración debe ser mayor a 0'),
  
  body('orden')
    .notEmpty()
    .withMessage('El orden es requerido')
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número mayor o igual a 0'),
  
  body('moduloId')
    .optional()
    .isMongoId()
    .withMessage('ID de módulo inválido'),
  
  body('bloqueada')
    .optional()
    .isBoolean()
    .withMessage('Bloqueada debe ser true o false'),
  
  handleValidationErrors
];

/**
 * Validaciones para crear/actualizar quiz
 */
const validateQuiz = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres')
    .trim(),
  
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres')
    .trim(),
  
  body('duracion')
    .notEmpty()
    .withMessage('La duración es requerida')
    .isNumeric()
    .withMessage('La duración debe ser un número')
    .isInt({ min: 1 })
    .withMessage('La duración debe ser mayor a 0'),
  
  body('intentosPermitidos')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Los intentos permitidos deben estar entre 1 y 10'),
  
  body('puntuacionMinima')
    .notEmpty()
    .withMessage('La puntuación mínima es requerida')
    .isNumeric()
    .withMessage('La puntuación mínima debe ser un número')
    .isFloat({ min: 0, max: 100 })
    .withMessage('La puntuación mínima debe estar entre 0 y 100'),
  
  body('estado')
    .optional()
    .isIn(['borrador', 'activo', 'pausado'])
    .withMessage('El estado debe ser: borrador, activo o pausado'),
  
  body('preguntas')
    .isArray({ min: 1, max: 50 })
    .withMessage('Debe tener entre 1 y 50 preguntas'),
  
  body('preguntas.*')
    .custom((value, { req }) => {
      // Validar cada pregunta individualmente
      const errors = [];
      
      if (!value.pregunta || value.pregunta.length < 10 || value.pregunta.length > 500) {
        errors.push('La pregunta debe tener entre 10 y 500 caracteres');
      }
      
      if (!value.tipo || !['opcion-multiple', 'verdadero-falso', 'texto-libre'].includes(value.tipo)) {
        errors.push('El tipo debe ser: opcion-multiple, verdadero-falso o texto-libre');
      }
      
      if (value.tipo === 'opcion-multiple') {
        if (!value.opciones || !Array.isArray(value.opciones) || value.opciones.length < 2 || value.opciones.length > 6) {
          errors.push('Las opciones múltiples deben tener entre 2 y 6 opciones');
        }
        if (!value.respuestaCorrecta) {
          errors.push('La respuesta correcta es requerida para opción múltiple');
        }
      }
      
      if (value.tipo !== 'texto-libre' && !value.respuestaCorrecta) {
        errors.push('La respuesta correcta es requerida para este tipo de pregunta');
      }
      
      if (!value.puntos || value.puntos < 1 || value.puntos > 100) {
        errors.push('Los puntos deben estar entre 1 y 100');
      }
      
      if (!value.orden || value.orden < 0) {
        errors.push('El orden debe ser mayor o igual a 0');
      }
      
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      return true;
    }),
  
  body('leccionId')
    .optional()
    .isMongoId()
    .withMessage('ID de lección inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para envío de quiz
 */
const validateSubmitQuiz = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  body('respuestas')
    .isArray({ min: 1 })
    .withMessage('Debe proporcionar al menos una respuesta'),
  
  body('respuestas.*.questionId')
    .notEmpty()
    .withMessage('El ID de la pregunta es requerido')
    .isMongoId()
    .withMessage('ID de pregunta inválido'),
  
  body('respuestas.*.answerText')
    .notEmpty()
    .withMessage('La respuesta es requerida')
    .isLength({ min: 1, max: 1000 })
    .withMessage('La respuesta debe tener entre 1 y 1000 caracteres')
    .trim(),
  
  handleValidationErrors
];

/**
 * Validaciones para parámetros de consulta en listar cursos
 */
const validateListarCursos = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe estar entre 1 y 100'),
  
  query('estado')
    .optional()
    .isIn(['borrador', 'activo', 'pausado', 'archivado'])
    .withMessage('El estado debe ser: borrador, activo, pausado o archivado'),
  
  query('categoria')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('La categoría debe tener entre 1 y 50 caracteres')
    .trim(),
  
  query('instructorId')
    .optional()
    .isMongoId()
    .withMessage('ID de instructor inválido'),
  
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('La búsqueda debe tener entre 1 y 100 caracteres')
    .trim(),
  
  query('sortBy')
    .optional()
    .isIn(['fechaCreacion', 'titulo', 'precio', 'categoria'])
    .withMessage('El ordenamiento debe ser: fechaCreacion, titulo, precio o categoria'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('El orden debe ser: asc o desc'),
  
  handleValidationErrors
];

/**
 * Validaciones para obtener curso específico
 */
const validateObtenerCurso = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para eliminar curso
 */
const validateEliminarCurso = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para subir archivo
 */
const validateSubirArchivo = [
  // Las validaciones de archivo se manejan en multer middleware
  // Aquí solo validamos que se proporcione un archivo
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo'
      });
    }
    next();
  }
];

/**
 * Validaciones para obtener lecciones
 */
const validateObtenerLecciones = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para obtener quizzes
 */
const validateObtenerQuizzes = [
  param('id')
    .isMongoId()
    .withMessage('ID de curso inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para obtener quiz específico
 */
const validateObtenerQuiz = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar quiz
 */
const validateActualizarQuiz = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  body('titulo')
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres')
    .trim(),
  
  body('descripcion')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres')
    .trim(),
  
  body('duracion')
    .optional()
    .isNumeric()
    .withMessage('La duración debe ser un número')
    .isInt({ min: 1 })
    .withMessage('La duración debe ser mayor a 0'),
  
  body('intentosPermitidos')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Los intentos permitidos deben estar entre 1 y 10'),
  
  body('puntuacionMinima')
    .optional()
    .isNumeric()
    .withMessage('La puntuación mínima debe ser un número')
    .isFloat({ min: 0, max: 100 })
    .withMessage('La puntuación mínima debe estar entre 0 y 100'),
  
  body('estado')
    .optional()
    .isIn(['borrador', 'activo', 'pausado'])
    .withMessage('El estado debe ser: borrador, activo o pausado'),
  
  handleValidationErrors
];

/**
 * Validaciones para eliminar quiz
 */
const validateEliminarQuiz = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para obtener resultados de quiz
 */
const validateObtenerResultados = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para obtener estadísticas de quiz
 */
const validateObtenerEstadisticas = [
  param('id')
    .isMongoId()
    .withMessage('ID de quiz inválido'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateCreateCurso,
  validateUpdateCurso,
  validateLeccion,
  validateQuiz,
  validateSubmitQuiz,
  validateListarCursos,
  validateObtenerCurso,
  validateEliminarCurso,
  validateSubirArchivo,
  validateObtenerLecciones,
  validateObtenerQuizzes,
  validateObtenerQuiz,
  validateActualizarQuiz,
  validateEliminarQuiz,
  validateObtenerResultados,
  validateObtenerEstadisticas
};
