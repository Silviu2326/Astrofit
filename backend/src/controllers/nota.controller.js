import Nota from '../models/Nota.model.js';
import Cliente from '../models/Cliente.model.js';
import Lead from '../models/Lead.model.js';
import Tarea from '../models/Tarea.model.js';
import Evento from '../models/Evento.model.js';

// @desc    Obtener todas las notas del trainer
// @route   GET /api/notas
// @access  Private
export const getNotas = async (req, res) => {
  try {
    const {
      cliente,
      lead,
      tarea,
      evento,
      categoria,
      etiqueta,
      fijada,
      archivada,
      search,
      page = 1,
      limit = 50
    } = req.query;

    let query = {
      trainer: req.user._id,
      isDeleted: false
    };

    // Filtros opcionales
    if (cliente) query.cliente = cliente;
    if (lead) query.lead = lead;
    if (tarea) query.tarea = tarea;
    if (evento) query.evento = evento;
    if (categoria) query.categoria = categoria;
    if (etiqueta) query.etiquetas = etiqueta.toLowerCase();
    if (fijada !== undefined) query.fijada = fijada === 'true';
    if (archivada !== undefined) query.archivada = archivada === 'true';

    let notasQuery;

    // Búsqueda por texto si se proporciona
    if (search) {
      notasQuery = Nota.find({
        ...query,
        $text: { $search: search }
      }, {
        score: { $meta: 'textScore' }
      }).sort({ score: { $meta: 'textScore' } });
    } else {
      notasQuery = Nota.find(query).sort({ fijada: -1, createdAt: -1 });
    }

    const notas = await notasQuery
      .populate('cliente', 'nombre email')
      .populate('lead', 'nombre email')
      .populate('tarea', 'titulo')
      .populate('evento', 'titulo')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Nota.countDocuments(query);

    res.json({
      success: true,
      data: notas,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener una nota por ID
// @route   GET /api/notas/:id
// @access  Private
export const getNota = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    })
      .populate('cliente', 'nombre email telefono')
      .populate('lead', 'nombre email telefono')
      .populate('tarea', 'titulo estado prioridad')
      .populate('evento', 'titulo fechaInicio fechaFin');

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Crear nueva nota
// @route   POST /api/notas
// @access  Private
export const createNota = async (req, res) => {
  try {
    const notaData = {
      ...req.body,
      trainer: req.user._id
    };

    // Validar relaciones si existen
    if (notaData.cliente) {
      const cliente = await Cliente.findOne({
        _id: notaData.cliente,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }
    }

    if (notaData.lead) {
      const lead = await Lead.findOne({
        _id: notaData.lead,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!lead) {
        return res.status(404).json({
          success: false,
          error: 'Lead no encontrado'
        });
      }
    }

    if (notaData.tarea) {
      const tarea = await Tarea.findOne({
        _id: notaData.tarea,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!tarea) {
        return res.status(404).json({
          success: false,
          error: 'Tarea no encontrada'
        });
      }
    }

    if (notaData.evento) {
      const evento = await Evento.findOne({
        _id: notaData.evento,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!evento) {
        return res.status(404).json({
          success: false,
          error: 'Evento no encontrado'
        });
      }
    }

    const nota = await Nota.create(notaData);

    res.status(201).json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Actualizar nota
// @route   PUT /api/notas/:id
// @access  Private
export const updateNota = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    // Validar relaciones si se están actualizando
    if (req.body.cliente) {
      const cliente = await Cliente.findOne({
        _id: req.body.cliente,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }
    }

    if (req.body.lead) {
      const lead = await Lead.findOne({
        _id: req.body.lead,
        trainer: req.user._id,
        isDeleted: false
      });

      if (!lead) {
        return res.status(404).json({
          success: false,
          error: 'Lead no encontrado'
        });
      }
    }

    Object.assign(nota, req.body);
    await nota.save();

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Eliminar nota (soft delete)
// @route   DELETE /api/notas/:id
// @access  Private
export const deleteNota = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    nota.isDeleted = true;
    await nota.save();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Fijar/desfijar nota
// @route   PATCH /api/notas/:id/fijar
// @access  Private
export const toggleFijar = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    nota.fijada = !nota.fijada;
    await nota.save();

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Archivar/desarchivar nota
// @route   PATCH /api/notas/:id/archivar
// @access  Private
export const toggleArchivar = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    nota.archivada = !nota.archivada;
    await nota.save();

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener notas fijadas
// @route   GET /api/notas/fijadas
// @access  Private
export const getNotasFijadas = async (req, res) => {
  try {
    const notas = await Nota.findFijadas(req.user._id)
      .populate('cliente', 'nombre email')
      .populate('lead', 'nombre email')
      .populate('tarea', 'titulo')
      .populate('evento', 'titulo');

    res.json({
      success: true,
      data: notas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener notas archivadas
// @route   GET /api/notas/archivadas
// @access  Private
export const getNotasArchivadas = async (req, res) => {
  try {
    const notas = await Nota.findArchivadas(req.user._id)
      .populate('cliente', 'nombre email')
      .populate('lead', 'nombre email')
      .populate('tarea', 'titulo')
      .populate('evento', 'titulo');

    res.json({
      success: true,
      data: notas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Agregar etiqueta a nota
// @route   POST /api/notas/:id/etiquetas
// @access  Private
export const agregarEtiqueta = async (req, res) => {
  try {
    const { etiqueta } = req.body;

    if (!etiqueta) {
      return res.status(400).json({
        success: false,
        error: 'La etiqueta es requerida'
      });
    }

    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    await nota.agregarEtiqueta(etiqueta);

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Eliminar etiqueta de nota
// @route   DELETE /api/notas/:id/etiquetas/:etiqueta
// @access  Private
export const eliminarEtiqueta = async (req, res) => {
  try {
    const nota = await Nota.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!nota) {
      return res.status(404).json({
        success: false,
        error: 'Nota no encontrada'
      });
    }

    await nota.eliminarEtiqueta(req.params.etiqueta);

    res.json({
      success: true,
      data: nota
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
