import Evento from '../models/Evento.model.js';
import Cliente from '../models/Cliente.model.js';

// @desc    Obtener todos los eventos del trainer
// @route   GET /api/eventos
// @access  Private
export const getEventos = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, tipo, clienteId, completado, page = 1, limit = 100 } = req.query;

    const query = {
      trainer: req.user._id,
      isDeleted: false
    };

    // Filtros opcionales
    if (fechaInicio && fechaFin) {
      query.fechaInicio = { $gte: new Date(fechaInicio) };
      query.fechaFin = { $lte: new Date(fechaFin) };
    }

    if (tipo) {
      query.tipo = tipo;
    }

    if (clienteId) {
      query.cliente = clienteId;
    }

    if (completado !== undefined) {
      query.completado = completado === 'true';
    }

    const eventos = await Evento.find(query)
      .populate('cliente', 'nombre email telefono')
      .sort({ fechaInicio: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Evento.countDocuments(query);

    res.json({
      success: true,
      data: eventos,
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

// @desc    Obtener un evento por ID
// @route   GET /api/eventos/:id
// @access  Private
export const getEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    }).populate('cliente', 'nombre email telefono');

    if (!evento) {
      return res.status(404).json({
        success: false,
        error: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Crear nuevo evento
// @route   POST /api/eventos
// @access  Private
export const createEvento = async (req, res) => {
  try {
    const eventoData = {
      ...req.body,
      trainer: req.user._id
    };

    // Validar cliente si existe
    if (eventoData.cliente) {
      const cliente = await Cliente.findOne({
        _id: eventoData.cliente,
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

    const evento = await Evento.create(eventoData);

    res.status(201).json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Actualizar evento
// @route   PUT /api/eventos/:id
// @access  Private
export const updateEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!evento) {
      return res.status(404).json({
        success: false,
        error: 'Evento no encontrado'
      });
    }

    // Validar cliente si se está actualizando
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

    Object.assign(evento, req.body);
    await evento.save();

    res.json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Eliminar evento (soft delete)
// @route   DELETE /api/eventos/:id
// @access  Private
export const deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!evento) {
      return res.status(404).json({
        success: false,
        error: 'Evento no encontrado'
      });
    }

    evento.isDeleted = true;
    await evento.save();

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

// @desc    Marcar evento como completado
// @route   PATCH /api/eventos/:id/completar
// @access  Private
export const completarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!evento) {
      return res.status(404).json({
        success: false,
        error: 'Evento no encontrado'
      });
    }

    await evento.marcarCompletado();

    res.json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Cancelar evento
// @route   PATCH /api/eventos/:id/cancelar
// @access  Private
export const cancelarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({
      _id: req.params.id,
      trainer: req.user._id,
      isDeleted: false
    });

    if (!evento) {
      return res.status(404).json({
        success: false,
        error: 'Evento no encontrado'
      });
    }

    await evento.cancelar();

    res.json({
      success: true,
      data: evento
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener eventos del día
// @route   GET /api/eventos/dia/:fecha
// @access  Private
export const getEventosDelDia = async (req, res) => {
  try {
    const eventos = await Evento.getEventosDelDia(req.user._id, req.params.fecha)
      .populate('cliente', 'nombre email telefono');

    res.json({
      success: true,
      data: eventos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener próximos eventos
// @route   GET /api/eventos/proximos
// @access  Private
export const getProximosEventos = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const eventos = await Evento.findProximos(req.user._id, parseInt(limit))
      .populate('cliente', 'nombre email telefono');

    res.json({
      success: true,
      data: eventos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
