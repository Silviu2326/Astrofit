import Factura from '../models/Factura.model.js';
import Cliente from '../models/Cliente.model.js';

// @desc    Obtener todas las facturas de un trainer
// @route   GET /api/facturas
// @access  Private
export const getFacturas = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { estado, clienteId, fechaDesde, fechaHasta, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (estado) filters.estado = estado;
    if (clienteId) filters.clienteId = clienteId;
    if (fechaDesde) filters.fechaDesde = fechaDesde;
    if (fechaHasta) filters.fechaHasta = fechaHasta;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const facturas = await Factura.findByTrainer(trainerId, filters)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Factura.countDocuments({
      trainerId,
      isDeleted: false,
      ...(estado && { estado }),
      ...(clienteId && { clienteId })
    });

    res.status(200).json({
      success: true,
      count: facturas.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: facturas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener una factura específica
// @route   GET /api/facturas/:id
// @access  Private
export const getFactura = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    }).populate('clienteId', 'nombre email telefono');

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: factura
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Crear una nueva factura
// @route   POST /api/facturas
// @access  Private
export const createFactura = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const {
      clienteId,
      fecha,
      fechaVencimiento,
      items,
      descuento,
      impuestos,
      metodoPago,
      notas,
      suscripcionId
    } = req.body;

    // Verificar que el cliente pertenece al trainer
    const cliente = await Cliente.findOne({
      _id: clienteId,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Capturar datos del cliente
    const datosCliente = {
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      nombreFiscal: cliente.facturacion?.nombreFiscal || cliente.nombre,
      nif: cliente.facturacion?.nif || '',
      direccionFiscal: cliente.facturacion?.direccionFiscal || ''
    };

    // Crear factura
    const factura = new Factura({
      trainerId,
      clienteId,
      fecha: fecha || new Date(),
      fechaVencimiento,
      items,
      descuento: descuento || 0,
      impuestos: impuestos || 0,
      metodoPago: metodoPago || 'Transferencia',
      notas,
      datosCliente,
      suscripcionId
    });

    // Los totales se calculan automáticamente en el pre-save
    await factura.save();

    res.status(201).json({
      success: true,
      data: factura
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Actualizar una factura
// @route   PUT /api/facturas/:id
// @access  Private
export const updateFactura = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;
    const updates = req.body;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    // No permitir actualizar facturas pagadas o anuladas
    if (factura.estado === 'Pagada' || factura.estado === 'Anulada') {
      return res.status(400).json({
        success: false,
        error: `No se puede actualizar una factura ${factura.estado.toLowerCase()}`
      });
    }

    // Campos permitidos para actualizar
    const allowedUpdates = [
      'fecha',
      'fechaVencimiento',
      'items',
      'descuento',
      'impuestos',
      'metodoPago',
      'notas',
      'notasInternas'
    ];

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        factura[field] = updates[field];
      }
    });

    await factura.save();

    res.status(200).json({
      success: true,
      data: factura
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Marcar factura como pagada
// @route   PUT /api/facturas/:id/pagar
// @access  Private
export const marcarComoPagada = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;
    const { metodoPago, referenciaPago } = req.body;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    if (factura.estado === 'Pagada') {
      return res.status(400).json({
        success: false,
        error: 'La factura ya está pagada'
      });
    }

    if (factura.estado === 'Anulada') {
      return res.status(400).json({
        success: false,
        error: 'No se puede pagar una factura anulada'
      });
    }

    await factura.marcarComoPagada(metodoPago, referenciaPago);

    res.status(200).json({
      success: true,
      data: factura
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Anular una factura
// @route   PUT /api/facturas/:id/anular
// @access  Private
export const anularFactura = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;
    const { motivo } = req.body;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    if (factura.estado === 'Anulada') {
      return res.status(400).json({
        success: false,
        error: 'La factura ya está anulada'
      });
    }

    await factura.anular(motivo);

    res.status(200).json({
      success: true,
      data: factura
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Eliminar una factura (soft delete)
// @route   DELETE /api/facturas/:id
// @access  Private
export const deleteFactura = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    // Solo permitir eliminar facturas pendientes
    if (factura.estado === 'Pagada') {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar una factura pagada. Anúlela en su lugar.'
      });
    }

    factura.isDeleted = true;
    await factura.save();

    res.status(200).json({
      success: true,
      message: 'Factura eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener estadísticas de facturas del trainer
// @route   GET /api/facturas/stats
// @access  Private
export const getFacturasStats = async (req, res) => {
  try {
    const trainerId = req.user._id;

    const stats = await Factura.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener facturas de un cliente específico
// @route   GET /api/facturas/cliente/:clienteId
// @access  Private
export const getFacturasByCliente = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { clienteId } = req.params;

    // Verificar que el cliente pertenece al trainer
    const cliente = await Cliente.findOne({
      _id: clienteId,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    const facturas = await Factura.findByCliente(clienteId);

    res.status(200).json({
      success: true,
      count: facturas.length,
      data: facturas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Enviar recordatorio de pago
// @route   POST /api/facturas/:id/recordatorio
// @access  Private
export const enviarRecordatorio = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { id } = req.params;
    const { tipo = 'pago', canal = 'email' } = req.body;

    const factura = await Factura.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    if (factura.estado !== 'Pendiente' && factura.estado !== 'Vencida') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden enviar recordatorios para facturas pendientes o vencidas'
      });
    }

    // TODO: Implementar lógica de envío de email/SMS
    await factura.agregarRecordatorio(tipo, canal);

    res.status(200).json({
      success: true,
      message: 'Recordatorio enviado correctamente',
      data: factura
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener ingresos por mes
// @route   GET /api/facturas/ingresos/por-mes
// @access  Private
export const getIngresosPorMes = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { year = new Date().getFullYear() } = req.query;

    const facturas = await Factura.find({
      trainerId,
      isDeleted: false,
      estado: 'Pagada',
      fechaPago: {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31)
      }
    });

    const ingresosPorMes = Array(12).fill(0);
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    facturas.forEach(factura => {
      const mes = factura.fechaPago.getMonth();
      ingresosPorMes[mes] += factura.montoTotal;
    });

    const resultado = meses.map((mes, index) => ({
      mes,
      ingresos: ingresosPorMes[index]
    }));

    res.status(200).json({
      success: true,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
