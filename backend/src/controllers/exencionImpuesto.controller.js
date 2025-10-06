import ExencionImpuesto from '../models/ExencionImpuesto.model.js';

export const getExencionesImpuesto = async (req, res) => {
  try {
    const { page = 1, limit = 50, tipoExencion, activo } = req.query;
    const query = { trainer: req.user.id, isActive: true };
    if (tipoExencion) query.tipoExencion = tipoExencion;
    if (activo !== undefined) query.activo = activo === 'true';

    const exenciones = await ExencionImpuesto.find(query)
      .sort({ nombre: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ExencionImpuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: exenciones.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: exenciones
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getExencionImpuesto = async (req, res) => {
  try {
    const exencion = await ExencionImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!exencion) {
      return res.status(404).json({ success: false, error: 'Exención no encontrada' });
    }
    res.status(200).json({ success: true, data: exencion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getExencionesActivas = async (req, res) => {
  try {
    const { tipoExencion } = req.query;
    const exenciones = await ExencionImpuesto.findActivasByTrainer(req.user.id, tipoExencion);
    res.status(200).json({ success: true, count: exenciones.length, data: exenciones });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createExencionImpuesto = async (req, res) => {
  try {
    const exencion = await ExencionImpuesto.create({ ...req.body, trainer: req.user.id });
    res.status(201).json({ success: true, data: exencion });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateExencionImpuesto = async (req, res) => {
  try {
    const exencion = await ExencionImpuesto.findOneAndUpdate(
      { _id: req.params.id, trainer: req.user.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!exencion) {
      return res.status(404).json({ success: false, error: 'Exención no encontrada' });
    }
    res.status(200).json({ success: true, data: exencion });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteExencionImpuesto = async (req, res) => {
  try {
    const exencion = await ExencionImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!exencion) {
      return res.status(404).json({ success: false, error: 'Exención no encontrada' });
    }
    exencion.isActive = false;
    await exencion.save();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
