const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Importar controlador
const {
  listarCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  subirArchivo,
  obtenerLecciones,
  crearLeccion,
  obtenerQuizzes,
  crearQuiz,
  enviarQuiz
} = require('../controllers/cursos.controller');

// Importar middleware de autenticación
const { protect } = require('../middleware/auth');

// Importar validaciones
const {
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
  validateObtenerQuizzes
} = require('../middleware/cursosValidation');

const router = express.Router();

// Configuración de multer para upload de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    
    // Crear directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Tipos de archivo permitidos
  const allowedTypes = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'video/mp4': '.mp4',
    'video/avi': '.avi',
    'application/pdf': '.pdf'
  };

  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes, videos y PDFs'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB máximo
  },
  fileFilter: fileFilter
});

// ========================================
// RUTAS PRINCIPALES DE CURSOS
// ========================================

/**
 * GET /api/cursos
 * Listar cursos con paginación, filtros y búsqueda
 */
router.get('/', protect, validateListarCursos, listarCursos);

/**
 * POST /api/cursos
 * Crear nuevo curso
 */
router.post('/', protect, validateCreateCurso, crearCurso);

/**
 * GET /api/cursos/:id
 * Obtener curso específico con módulos y lecciones
 */
router.get('/:id', protect, validateObtenerCurso, obtenerCurso);

/**
 * PUT /api/cursos/:id
 * Actualizar curso existente
 */
router.put('/:id', protect, validateUpdateCurso, actualizarCurso);

/**
 * DELETE /api/cursos/:id
 * Eliminar curso
 */
router.delete('/:id', protect, validateEliminarCurso, eliminarCurso);

// ========================================
// RUTA DE UPLOAD DE ARCHIVOS
// ========================================

/**
 * POST /api/cursos/upload
 * Subir archivo (portadas, videos, documentos)
 */
router.post('/upload', protect, upload.single('file'), validateSubirArchivo, subirArchivo);

// ========================================
// RUTAS DE LECCIONES
// ========================================

/**
 * GET /api/cursos/:id/lecciones
 * Obtener lecciones de un curso
 */
router.get('/:id/lecciones', protect, validateObtenerLecciones, obtenerLecciones);

/**
 * POST /api/cursos/:id/lecciones
 * Crear lección en un curso
 */
router.post('/:id/lecciones', protect, validateLeccion, crearLeccion);

/**
 * PUT /api/cursos/:id/lecciones/:leccionId
 * Actualizar lección
 */
router.put('/:id/lecciones/:leccionId', protect, validateLeccion, async (req, res) => {
  // TODO: Implementar actualizarLeccion en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

/**
 * DELETE /api/cursos/:id/lecciones/:leccionId
 * Eliminar lección
 */
router.delete('/:id/lecciones/:leccionId', protect, async (req, res) => {
  // TODO: Implementar eliminarLeccion en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

// ========================================
// RUTAS DE QUIZZES
// ========================================

/**
 * GET /api/cursos/:id/quizzes
 * Obtener quizzes de un curso
 */
router.get('/:id/quizzes', protect, validateObtenerQuizzes, obtenerQuizzes);

/**
 * POST /api/cursos/:id/quizzes
 * Crear quiz en un curso
 */
router.post('/:id/quizzes', protect, validateQuiz, crearQuiz);

/**
 * GET /api/cursos/quizzes/:quizId
 * Obtener quiz específico
 */
router.get('/quizzes/:quizId', protect, async (req, res) => {
  // TODO: Implementar obtenerQuiz en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

/**
 * PUT /api/cursos/quizzes/:quizId
 * Actualizar quiz
 */
router.put('/quizzes/:quizId', protect, async (req, res) => {
  // TODO: Implementar actualizarQuiz en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

/**
 * DELETE /api/cursos/quizzes/:quizId
 * Eliminar quiz
 */
router.delete('/quizzes/:quizId', protect, async (req, res) => {
  // TODO: Implementar eliminarQuiz en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

// ========================================
// RUTA DE ENVÍO DE QUIZ
// ========================================

/**
 * POST /api/cursos/quizzes/:quizId/submit
 * Enviar respuestas de quiz
 */
router.post('/quizzes/:quizId/submit', protect, validateSubmitQuiz, enviarQuiz);

// ========================================
// RUTAS DE RESULTADOS Y ESTADÍSTICAS
// ========================================

/**
 * GET /api/cursos/quizzes/:quizId/results
 * Obtener resultados de un quiz
 */
router.get('/quizzes/:quizId/results', protect, async (req, res) => {
  // TODO: Implementar obtenerResultados en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

/**
 * GET /api/cursos/quizzes/:quizId/statistics
 * Obtener estadísticas de un quiz
 */
router.get('/quizzes/:quizId/statistics', protect, async (req, res) => {
  // TODO: Implementar obtenerEstadisticas en el controlador
  res.status(501).json({
    success: false,
    message: 'Función no implementada aún'
  });
});

// ========================================
// MIDDLEWARE DE MANEJO DE ERRORES DE MULTER
// ========================================

// Middleware para manejar errores de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 10MB'
      });
    }
  }
  
  if (error.message === 'Tipo de archivo no permitido. Solo se permiten imágenes, videos y PDFs') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
});

module.exports = router;
