import OtroImpuesto from '../models/OtroImpuesto.model.js';

export const getOtrosImpuestos = async (req, res) => {
  try {
    const { page = 1, limit = 20, añoFiscal, categoria, estado } = req.query;
    const query = { trainer: req.user.id, isActive: true };
    if (añoFiscal) query.añoFiscal = parseInt(añoFiscal);
    if (categoria) query.categoria = categoria;
    if (estado) query.estado = estado;

    const impuestos = await OtroImpuesto.find(query)
      .sort({ proximoVencimiento: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await OtroImpuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: impuestos.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: impuestos
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOtroImpuesto = async (req, res) => {
  try {
    const impuesto = await OtroImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!impuesto) {
      return res.status(404).json({ success: false, error: 'Impuesto no encontrado' });
    }
    res.status(200).json({ success: true, data: impuesto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProximosVencimientos = async (req, res) => {
  try {
    const { dias = 30 } = req.query;
    const proximos = await OtroImpuesto.getProximosVencimientos(req.user.id, parseInt(dias));
    res.status(200).json({ success: true, count: proximos.length, data: proximos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getResumenAnual = async (req, res) => {
  try {
    const resumen = await OtroImpuesto.getResumenAnual(req.user.id, parseInt(req.params.añoFiscal));
    res.status(200).json({ success: true, data: resumen });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createOtroImpuesto = async (req, res) => {
  try {
    const impuesto = await OtroImpuesto.create({ ...req.body, trainer: req.user.id });
    res.status(201).json({ success: true, data: impuesto });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateOtroImpuesto = async (req, res) => {
  try {
    const impuesto = await OtroImpuesto.findOneAndUpdate(
      { _id: req.params.id, trainer: req.user.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!impuesto) {
      return res.status(404).json({ success: false, error: 'Impuesto no encontrado' });
    }
    res.status(200).json({ success: true, data: impuesto });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const registrarPago = async (req, res) => {
  try {
    const { importe, metodoPago, numeroJustificante, comprobante, notas } = req.body;
    const impuesto = await OtroImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!impuesto) {
      return res.status(404).json({ success: false, error: 'Impuesto no encontrado' });
    }
    await impuesto.registrarPago(importe, metodoPago, numeroJustificante, comprobante, notas);
    res.status(200).json({ success: true, data: impuesto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteOtroImpuesto = async (req, res) => {
  try {
    const impuesto = await OtroImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });
    if (!impuesto) {
      return res.status(404).json({ success: false, error: 'Impuesto no encontrado' });
    }
    impuesto.isActive = false;
    await impuesto.save();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
