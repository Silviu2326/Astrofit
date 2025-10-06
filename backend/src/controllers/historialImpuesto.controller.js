import HistorialImpuesto from '../models/HistorialImpuesto.model.js';

export const getHistorialImpuestos = async (req, res) => {
  try {
    const { page = 1, limit = 20, año, trimestre, tipoImpuesto, estado } = req.query;
    const query = { trainer: req.user.id, isActive: true };
    if (año) query.año = parseInt(año);
    if (trimestre) query.trimestre = parseInt(trimestre);
    if (tipoImpuesto) query.tipoImpuesto = tipoImpuesto;
    if (estado) query.estado = estado;

    const historial = await HistorialImpuesto.find(query)
      .populate('declaracionId')
      .sort({ fechaRegistro: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await HistorialImpuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: historial.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: historial
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getHistorialImpuesto = async (req, res) => {
  try {
    const historial = await HistorialImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    }).populate('declaracionId');

    if (!historial) {
      return res.status(404).json({ success: false, error: 'Historial no encontrado' });
    }
    res.status(200).json({ success: true, data: historial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getResumenAnual = async (req, res) => {
  try {
    const resumen = await HistorialImpuesto.getResumenAnual(req.user.id, parseInt(req.params.año));
    res.status(200).json({ success: true, data: resumen });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPendientesPago = async (req, res) => {
  try {
    const pendientes = await HistorialImpuesto.getPendientesPago(req.user.id);
    res.status(200).json({ success: true, count: pendientes.length, data: pendientes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createHistorialImpuesto = async (req, res) => {
  try {
    const historial = await HistorialImpuesto.create({ ...req.body, trainer: req.user.id });
    res.status(201).json({ success: true, data: historial });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateHistorialImpuesto = async (req, res) => {
  try {
    const historial = await HistorialImpuesto.findOneAndUpdate(
      { _id: req.params.id, trainer: req.user.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!historial) {
      return res.status(404).json({ success: false, error: 'Historial no encontrado' });
    }
    res.status(200).json({ success: true, data: historial });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const marcarComoPagado = async (req, res) => {
  try {
    const { metodoPago, numeroJustificante, comprobantePago } = req.body;
    const historial = await HistorialImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!historial) {
      return res.status(404).json({ success: false, error: 'Historial no encontrado' });
    }
    await historial.marcarComoPagado(metodoPago, numeroJustificante, comprobantePago);
    res.status(200).json({ success: true, data: historial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteHistorialImpuesto = async (req, res) => {
  try {
    const historial = await HistorialImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!historial) {
      return res.status(404).json({ success: false, error: 'Historial no encontrado' });
    }
    historial.isActive = false;
    await historial.save();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
