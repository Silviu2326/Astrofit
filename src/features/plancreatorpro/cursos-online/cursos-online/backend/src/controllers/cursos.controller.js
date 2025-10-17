const Curso = require('../models/Curso.model');
const Modulo = require('../models/Modulo.model');
const Leccion = require('../models/Leccion.model');
const Quiz = require('../models/Quiz.model');
const QuizResult = require('../models/QuizResult.model');
const path = require('path');
const fs = require('fs').promises;

/**
 * Controlador para gestión de cursos online
 * Implementa operaciones CRUD completas con manejo de archivos
 */

/**
 * Listar cursos con paginación, filtros y búsqueda
 * GET /api/cursos
 */
const listarCursos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      estado,
      categoria,
      instructorId,
      search,
      sortBy = 'fechaCreacion',
      sortOrder = 'desc'
    } = req.query;

    // Construir filtros
    const filtros = {};
    if (estado) filtros.estado = estado;
    if (categoria) filtros.categoria = categoria;
    if (instructorId) filtros.instructorId = instructorId;
    if (search) {
      filtros.$or = [
        { titulo: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } }
      ];
    }

    // Configurar ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Ejecutar consulta con paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const cursos = await Curso.find(filtros)
      .populate('instructorId', 'nombre email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Curso.countDocuments(filtros);

    res.json({
      success: true,
      data: {
        cursos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error al listar cursos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Obtener curso específico con módulos y lecciones
 * GET /api/cursos/:id
 */
const obtenerCurso = async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Curso.findById(id)
      .populate('instructorId', 'nombre email')
      .populate({
        path: 'modulos',
        populate: {
          path: 'lecciones',
          model: 'Leccion'
        }
      });

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      data: curso
    });
  } catch (error) {
    console.error('Error al obtener curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Crear nuevo curso
 * POST /api/cursos
 */
const crearCurso = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      imagenPortada,
      precio,
      categoria,
      duracion
    } = req.body;

    // Validar campos requeridos
    if (!titulo || !descripcion || !precio || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: titulo, descripcion, precio, categoria'
      });
    }

    // Crear curso
    const nuevoCurso = new Curso({
      titulo,
      descripcion,
      imagenPortada,
      precio,
      categoria,
      duracion,
      instructorId: req.user.id, // Asignar instructor del usuario autenticado
      estado: 'borrador'
    });

    const cursoGuardado = await nuevoCurso.save();

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: cursoGuardado
    });
  } catch (error) {
    console.error('Error al crear curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Actualizar curso existente
 * PUT /api/cursos/:id
 */
const actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const camposPermitidos = [
      'titulo',
      'descripcion',
      'imagenPortada',
      'precio',
      'categoria',
      'duracion',
      'estado'
    ];

    // Filtrar solo campos permitidos
    const camposActualizacion = {};
    Object.keys(req.body).forEach(key => {
      if (camposPermitidos.includes(key)) {
        camposActualizacion[key] = req.body[key];
      }
    });

    // Verificar que el curso existe y el usuario tiene permisos
    const curso = await Curso.findById(id);
    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    if (curso.instructorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar este curso'
      });
    }

    // Actualizar curso
    camposActualizacion.fechaActualizacion = new Date();
    const cursoActualizado = await Curso.findByIdAndUpdate(
      id,
      camposActualizacion,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: cursoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Eliminar curso
 * DELETE /api/cursos/:id
 */
const eliminarCurso = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el curso existe y el usuario tiene permisos
    const curso = await Curso.findById(id);
    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    if (curso.instructorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este curso'
      });
    }

    // Eliminar referencias relacionadas
    await Modulo.deleteMany({ cursoId: id });
    await Leccion.deleteMany({ cursoId: id });
    await Quiz.deleteMany({ cursoId: id });
    await QuizResult.deleteMany({ cursoId: id });

    // Eliminar curso
    await Curso.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Curso eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Subir archivo (portadas, videos, documentos)
 * POST /api/cursos/upload
 */
const subirArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo'
      });
    }

    // Validar tipo de archivo
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'application/pdf'];
    if (!tiposPermitidos.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de archivo no permitido. Solo se permiten imágenes, videos y PDFs'
      });
    }

    // Validar tamaño (10MB máximo)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 10MB'
      });
    }

    // Generar URL del archivo
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Archivo subido exitosamente',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Obtener lecciones de un curso
 * GET /api/cursos/:id/lecciones
 */
const obtenerLecciones = async (req, res) => {
  try {
    const { id } = req.params;

    const lecciones = await Leccion.find({ cursoId: id })
      .populate('moduloId', 'titulo orden')
      .sort({ orden: 1 });

    res.json({
      success: true,
      data: lecciones
    });
  } catch (error) {
    console.error('Error al obtener lecciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Crear lección en un curso
 * POST /api/cursos/:id/lecciones
 */
const crearLeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcion,
      tipo,
      contenido,
      duracion,
      orden,
      moduloId
    } = req.body;

    // Validar campos requeridos
    if (!titulo || !tipo || !orden) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: titulo, tipo, orden'
      });
    }

    // Verificar que el curso existe
    const curso = await Curso.findById(id);
    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // Crear lección
    const nuevaLeccion = new Leccion({
      titulo,
      descripcion,
      tipo,
      contenido,
      duracion,
      orden,
      moduloId,
      cursoId: id
    });

    const leccionGuardada = await nuevaLeccion.save();

    res.status(201).json({
      success: true,
      message: 'Lección creada exitosamente',
      data: leccionGuardada
    });
  } catch (error) {
    console.error('Error al crear lección:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Obtener quizzes de un curso
 * GET /api/cursos/:id/quizzes
 */
const obtenerQuizzes = async (req, res) => {
  try {
    const { id } = req.params;

    const quizzes = await Quiz.find({ cursoId: id })
      .populate('leccionId', 'titulo')
      .sort({ fechaCreacion: -1 });

    res.json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    console.error('Error al obtener quizzes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Crear quiz en un curso
 * POST /api/cursos/:id/quizzes
 */
const crearQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcion,
      duracion,
      intentosPermitidos,
      puntuacionMinima,
      estado,
      preguntas,
      leccionId
    } = req.body;

    // Validar campos requeridos
    if (!titulo || !descripcion || !duracion || !puntuacionMinima || !preguntas) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: titulo, descripcion, duracion, puntuacionMinima, preguntas'
      });
    }

    // Verificar que el curso existe
    const curso = await Curso.findById(id);
    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // Crear quiz
    const nuevoQuiz = new Quiz({
      titulo,
      descripcion,
      duracion,
      intentosPermitidos: intentosPermitidos || 1,
      puntuacionMinima,
      estado: estado || 'borrador',
      preguntas,
      cursoId: id,
      leccionId
    });

    const quizGuardado = await nuevoQuiz.save();

    res.status(201).json({
      success: true,
      message: 'Quiz creado exitosamente',
      data: quizGuardado
    });
  } catch (error) {
    console.error('Error al crear quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

/**
 * Enviar respuestas de quiz
 * POST /api/quizzes/:id/submit
 */
const enviarQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuestas } = req.body;

    if (!respuestas || !Array.isArray(respuestas)) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren las respuestas del quiz'
      });
    }

    // Obtener quiz
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz no encontrado'
      });
    }

    // Calcular puntuación
    let puntuacionTotal = 0;
    let puntuacionMaxima = 0;
    const respuestasProcesadas = [];

    for (const pregunta of quiz.preguntas) {
      puntuacionMaxima += pregunta.puntos;
      const respuestaUsuario = respuestas.find(r => r.questionId === pregunta._id.toString());
      
      if (respuestaUsuario) {
        let puntosObtenidos = 0;
        let esCorrecta = false;

        // Verificar respuesta según tipo de pregunta
        if (pregunta.tipo === 'opcion-multiple') {
          esCorrecta = respuestaUsuario.answerText === pregunta.respuestaCorrecta;
        } else if (pregunta.tipo === 'verdadero-falso') {
          esCorrecta = respuestaUsuario.answerText === pregunta.respuestaCorrecta;
        }
        // Para texto-libre, se asume correcto (requiere revisión manual)

        if (esCorrecta) {
          puntosObtenidos = pregunta.puntos;
          puntuacionTotal += puntosObtenidos;
        }

        respuestasProcesadas.push({
          questionId: pregunta._id,
          answerText: respuestaUsuario.answerText,
          esCorrecta,
          puntosObtenidos
        });
      }
    }

    const porcentaje = (puntuacionTotal / puntuacionMaxima) * 100;
    const aprobado = porcentaje >= quiz.puntuacionMinima;

    // Guardar resultado
    const resultado = new QuizResult({
      quizId: id,
      estudianteId: req.user.id,
      estudianteNombre: req.user.nombre || 'Usuario',
      puntuacion: puntuacionTotal,
      puntuacionMaxima,
      porcentaje,
      aprobado,
      respuestas: respuestasProcesadas
    });

    const resultadoGuardado = await resultado.save();

    res.json({
      success: true,
      message: 'Quiz enviado exitosamente',
      data: {
        resultado: resultadoGuardado,
        aprobado,
        porcentaje: Math.round(porcentaje * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error al enviar quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
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
};
