import Lead from '../models/Lead.model.js';

// @desc    Get all leads for authenticated trainer
// @route   GET /api/leads
// @access  Private
export const getLeads = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { q, estado, prioridad, fuente, etiquetas, sortBy = 'createdAt', sortDir = 'desc', page = 1, pageSize = 10 } = req.query;

    // Build query
    const query = { trainerId, isDeleted: false };

    // Text search
    if (q && q.trim()) {
      query.$or = [
        { nombre: { $regex: q.trim(), $options: 'i' } },
        { email: { $regex: q.trim(), $options: 'i' } },
        { telefono: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Filters
    if (estado) query.estado = estado;
    if (prioridad) query.prioridad = prioridad;
    if (fuente) query.fuente = fuente;
    if (etiquetas) {
      const etiquetasArray = Array.isArray(etiquetas) ? etiquetas : [etiquetas];
      query.etiquetas = { $in: etiquetasArray };
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    // Execute query
    const leads = await Lead.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(query);
    const pages = Math.ceil(total / limit);

    // Get stats
    const stats = await Lead.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: leads,
      total,
      page: parseInt(page),
      pages,
      stats
    });
  } catch (error) {
    console.error('Error al obtener leads:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los leads'
    });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
export const getLead = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;

    const lead = await Lead.findOne({ _id: id, trainerId, isDeleted: false });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error al obtener lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el lead'
    });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const leadData = { ...req.body, trainerId };

    // Check if lead with same email already exists for this trainer
    const existingLead = await Lead.findOne({
      trainerId,
      email: leadData.email,
      isDeleted: false
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un lead con este email'
      });
    }

    const lead = await Lead.create(leadData);

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear lead:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un lead con este email'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear el lead'
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;

    // Check if lead exists and belongs to trainer
    const lead = await Lead.findOne({ _id: id, trainerId, isDeleted: false });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead no encontrado'
      });
    }

    // Update lead
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedLead,
      message: 'Lead actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el lead'
    });
  }
};

// @desc    Delete lead (soft delete)
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;

    const lead = await Lead.findOne({ _id: id, trainerId, isDeleted: false });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead no encontrado'
      });
    }

    lead.isDeleted = true;
    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el lead'
    });
  }
};

// @desc    Bulk delete leads
// @route   POST /api/leads/bulk-delete
// @access  Private
export const bulkDeleteLeads = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de IDs'
      });
    }

    const result = await Lead.updateMany(
      { _id: { $in: ids }, trainerId, isDeleted: false },
      { $set: { isDeleted: true } }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} lead(s) eliminado(s) exitosamente`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error al eliminar leads:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar los leads'
    });
  }
};

// @desc    Bulk add tags to leads
// @route   POST /api/leads/bulk-add-tags
// @access  Private
export const bulkAddTags = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { ids, tags } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de IDs'
      });
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de etiquetas'
      });
    }

    const result = await Lead.updateMany(
      { _id: { $in: ids }, trainerId, isDeleted: false },
      { $addToSet: { etiquetas: { $each: tags } } }
    );

    res.status(200).json({
      success: true,
      message: `Etiquetas añadidas a ${result.modifiedCount} lead(s)`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error al añadir etiquetas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al añadir las etiquetas'
    });
  }
};

// @desc    Update lead contact date
// @route   PATCH /api/leads/:id/contacto
// @access  Private
export const updateContacto = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;

    const lead = await Lead.findOne({ _id: id, trainerId, isDeleted: false });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead no encontrado'
      });
    }

    await lead.actualizarContacto();

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Fecha de contacto actualizada'
    });
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el contacto'
    });
  }
};

// @desc    Convert lead to client
// @route   POST /api/leads/:id/convertir
// @access  Private
export const convertirACliente = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;
    const { clienteId } = req.body;

    if (!clienteId) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere el ID del cliente'
      });
    }

    const lead = await Lead.findOne({ _id: id, trainerId, isDeleted: false });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead no encontrado'
      });
    }

    await lead.convertirACliente(clienteId);

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead convertido a cliente exitosamente'
    });
  } catch (error) {
    console.error('Error al convertir lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error al convertir el lead'
    });
  }
};

// @desc    Get leads stats
// @route   GET /api/leads/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Lead.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las estadísticas'
    });
  }
};
