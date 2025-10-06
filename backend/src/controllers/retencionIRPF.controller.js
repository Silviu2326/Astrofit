import RetencionIRPF from '../models/RetencionIRPF.model.js';
import Factura from '../models/Factura.model.js';
import Cliente from '../models/Cliente.model.js';

// @desc    Get all retenciones IRPF for a trainer
// @route   GET /api/retenciones-irpf
// @access  Private
export const getRetencionesIRPF = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      año,
      trimestre,
      estado,
      clienteId,
      fechaInicio,
      fechaFin
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (año) query.año = parseInt(año);
    if (trimestre) query.trimestre = parseInt(trimestre);
    if (estado) query.estado = estado;
    if (clienteId) query.cliente = clienteId;

    // Date range filter
    if (fechaInicio || fechaFin) {
      query.fecha = {};
      if (fechaInicio) query.fecha.$gte = new Date(fechaInicio);
      if (fechaFin) query.fecha.$lte = new Date(fechaFin);
    }

    // Execute query with pagination
    const retenciones = await RetencionIRPF.find(query)
      .populate('factura')
      .populate('cliente')
      .sort({ fecha: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await RetencionIRPF.countDocuments(query);

    res.status(200).json({
      success: true,
      count: retenciones.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: retenciones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single retencion IRPF
// @route   GET /api/retenciones-irpf/:id
// @access  Private
export const getRetencionIRPF = async (req, res) => {
  try {
    const retencion = await RetencionIRPF.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    })
      .populate('factura')
      .populate('cliente');

    if (!retencion) {
      return res.status(404).json({
        success: false,
        error: 'Retención IRPF no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get retenciones by periodo
// @route   GET /api/retenciones-irpf/periodo/:año/:trimestre
// @access  Private
export const getRetencionesByPeriodo = async (req, res) => {
  try {
    const { año, trimestre } = req.params;

    const retenciones = await RetencionIRPF.findByPeriodo(
      req.user.id,
      parseInt(año),
      parseInt(trimestre)
    );

    res.status(200).json({
      success: true,
      count: retenciones.length,
      data: retenciones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get retenciones by cliente
// @route   GET /api/retenciones-irpf/cliente/:clienteId
// @access  Private
export const getRetencionesByCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { año } = req.query;

    // Verificar que el cliente pertenece al trainer
    const cliente = await Cliente.findOne({
      _id: clienteId,
      trainer: req.user.id,
      isActive: true
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    const retenciones = await RetencionIRPF.findByCliente(
      clienteId,
      año ? parseInt(año) : null
    );

    res.status(200).json({
      success: true,
      count: retenciones.length,
      data: retenciones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get resumen trimestral
// @route   GET /api/retenciones-irpf/resumen/trimestral/:año/:trimestre
// @access  Private
export const getResumenTrimestral = async (req, res) => {
  try {
    const { año, trimestre } = req.params;

    const resumen = await RetencionIRPF.getResumenTrimestral(
      req.user.id,
      parseInt(año),
      parseInt(trimestre)
    );

    res.status(200).json({
      success: true,
      data: resumen
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get resumen anual
// @route   GET /api/retenciones-irpf/resumen/anual/:año
// @access  Private
export const getResumenAnual = async (req, res) => {
  try {
    const { año } = req.params;

    const resumen = await RetencionIRPF.getResumenAnual(
      req.user.id,
      parseInt(año)
    );

    res.status(200).json({
      success: true,
      data: resumen
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create retencion IRPF
// @route   POST /api/retenciones-irpf
// @access  Private
export const createRetencionIRPF = async (req, res) => {
  try {
    const retencionData = {
      ...req.body,
      trainer: req.user.id
    };

    // Verificar que la factura existe y pertenece al trainer
    if (retencionData.factura) {
      const factura = await Factura.findOne({
        _id: retencionData.factura,
        trainerId: req.user.id,
        isDeleted: false
      });

      if (!factura) {
        return res.status(404).json({
          success: false,
          error: 'Factura no encontrada'
        });
      }

      // Obtener datos de la factura si no se proporcionan
      if (!retencionData.numeroFactura) {
        retencionData.numeroFactura = factura.numeroFactura;
      }
      if (!retencionData.fechaFactura) {
        retencionData.fechaFactura = factura.fecha;
      }
      if (!retencionData.cliente) {
        retencionData.cliente = factura.clienteId;
      }
    }

    // Verificar que el cliente existe
    const cliente = await Cliente.findOne({
      _id: retencionData.cliente,
      trainer: req.user.id,
      isActive: true
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Guardar datos del cliente
    retencionData.datosCliente = {
      nombre: cliente.nombre,
      nif: cliente.nif || cliente.dni,
      direccion: cliente.direccion
    };

    const retencion = await RetencionIRPF.create(retencionData);

    await retencion.populate('factura');
    await retencion.populate('cliente');

    res.status(201).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create retencion from factura
// @route   POST /api/retenciones-irpf/from-factura/:facturaId
// @access  Private
export const createRetencionFromFactura = async (req, res) => {
  try {
    const { facturaId } = req.params;
    const { porcentaje = 15 } = req.body;

    // Verificar que la factura existe
    const factura = await Factura.findOne({
      _id: facturaId,
      trainerId: req.user.id,
      isDeleted: false
    }).populate('clienteId');

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    // Verificar si ya existe una retención para esta factura
    const existente = await RetencionIRPF.findOne({
      factura: facturaId,
      isActive: true
    });

    if (existente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una retención para esta factura'
      });
    }

    // Calcular periodo
    const fecha = new Date(factura.fecha);
    const mes = fecha.getMonth() + 1;
    const trimestre = Math.ceil(mes / 3);
    const año = fecha.getFullYear();

    // Crear retención
    const retencion = new RetencionIRPF({
      trainer: req.user.id,
      factura: facturaId,
      cliente: factura.clienteId._id,
      baseRetencion: factura.subtotal || 0,
      porcentaje,
      fecha: factura.fecha,
      trimestre,
      año,
      periodo: `${año}-Q${trimestre}`,
      numeroFactura: factura.numeroFactura,
      fechaFactura: factura.fecha,
      datosCliente: {
        nombre: factura.clienteId.nombre,
        nif: factura.clienteId.nif || factura.clienteId.dni,
        direccion: factura.clienteId.direccion
      }
    });

    await retencion.save();
    await retencion.populate('factura');
    await retencion.populate('cliente');

    res.status(201).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update retencion IRPF
// @route   PUT /api/retenciones-irpf/:id
// @access  Private
export const updateRetencionIRPF = async (req, res) => {
  try {
    let retencion = await RetencionIRPF.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!retencion) {
      return res.status(404).json({
        success: false,
        error: 'Retención IRPF no encontrada'
      });
    }

    // No permitir editar si ya está declarada
    if (retencion.estado === 'declarado' || retencion.estado === 'pagado') {
      return res.status(400).json({
        success: false,
        error: 'No se puede editar una retención declarada o pagada'
      });
    }

    retencion = await RetencionIRPF.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('factura')
      .populate('cliente');

    res.status(200).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Emitir certificado
// @route   POST /api/retenciones-irpf/:id/certificado
// @access  Private
export const emitirCertificado = async (req, res) => {
  try {
    const { archivoUrl } = req.body;

    const retencion = await RetencionIRPF.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!retencion) {
      return res.status(404).json({
        success: false,
        error: 'Retención IRPF no encontrada'
      });
    }

    await retencion.emitirCertificado(archivoUrl);
    await retencion.populate('factura');
    await retencion.populate('cliente');

    res.status(200).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Marcar como declarado
// @route   POST /api/retenciones-irpf/:id/declarar
// @access  Private
export const marcarComoDeclarado = async (req, res) => {
  try {
    const { modelo111Id } = req.body;

    const retencion = await RetencionIRPF.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!retencion) {
      return res.status(404).json({
        success: false,
        error: 'Retención IRPF no encontrada'
      });
    }

    await retencion.marcarComoDeclarado(modelo111Id);
    await retencion.populate('factura');
    await retencion.populate('cliente');

    res.status(200).json({
      success: true,
      data: retencion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete retencion IRPF (soft delete)
// @route   DELETE /api/retenciones-irpf/:id
// @access  Private
export const deleteRetencionIRPF = async (req, res) => {
  try {
    const retencion = await RetencionIRPF.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!retencion) {
      return res.status(404).json({
        success: false,
        error: 'Retención IRPF no encontrada'
      });
    }

    // Solo permitir eliminar retenciones pendientes
    if (retencion.estado !== 'pendiente') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden eliminar retenciones pendientes'
      });
    }

    retencion.isActive = false;
    await retencion.save();

    res.status(200).json({
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
