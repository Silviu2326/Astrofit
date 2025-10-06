import Dieta from '../models/Dieta.model.js';
import Cliente from '../models/Cliente.model.js';
import Trainer from '../models/Trainer.model.js';
import PlantillaDieta from '../models/PlantillaDieta.model.js';

// @desc    Get all dietas for a trainer with filters and pagination
// @route   GET /api/dietas
// @access  Private
export const getDietas = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      estado,
      objetivo,
      tipoDieta,
      clienteId,
      nutricionista,
      fechaInicio,
      sortBy = 'fechaInicio',
      sortDir = 'desc',
      page = 1,
      pageSize = 20
    } = req.query;

    // Build query
    const query = {
      trainerId,
      isDeleted: false
    };

    // Text search
    if (q && q.trim()) {
      query.$or = [
        { nombre: { $regex: q.trim(), $options: 'i' } },
        { descripcion: { $regex: q.trim(), $options: 'i' } },
        { 'nutricionista.nombre': { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Filters
    if (estado) {
      query.estado = estado;
    }

    if (objetivo) {
      query.objetivo = objetivo;
    }

    if (tipoDieta) {
      query.tipoDieta = tipoDieta;
    }

    if (clienteId) {
      query.clienteId = clienteId;
    }

    if (nutricionista) {
      query['nutricionista.nombre'] = { $regex: nutricionista, $options: 'i' };
    }

    if (fechaInicio) {
      query.fechaInicio = { $gte: new Date(fechaInicio) };
    }

    // Get stats
    const stats = await Dieta.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'fechaInicio', 'fechaFin', 'estado', 'objetivo', 'adherencia', 'progreso', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.fechaInicio = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Dieta.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get dietas
    const dietas = await Dieta.find(query)
      .populate('clienteId', 'nombre email foto')
      .populate('trainerId', 'name email')
      .populate('plantillaDietaId', 'name objective dietType')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: dietas,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting dietas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las dietas',
      details: error.message
    });
  }
};

// @desc    Get single dieta
// @route   GET /api/dietas/:id
// @access  Private
export const getDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    })
      .populate('clienteId', 'nombre email foto telefono')
      .populate('trainerId', 'name email')
      .populate('plantillaDietaId', 'name description objective dietType calories macros duration_weeks')
      .populate('nutricionista.trainerId', 'name email');

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: dieta
    });
  } catch (error) {
    console.error('Error getting dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la dieta',
      details: error.message
    });
  }
};

// @desc    Create new dieta
// @route   POST /api/dietas
// @access  Private
export const createDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      clienteId,
      plantillaDietaId,
      nombre,
      descripcion,
      objetivo,
      tipoDieta,
      fechaInicio,
      duracion,
      calorias_objetivo,
      macros_objetivo,
      restricciones,
      alergenos,
      peso_inicial,
      peso_actual,
      peso_objetivo,
      nutricionista,
      notas,
      estado
    } = req.body;

    // Verificar que el cliente existe y pertenece al trainer
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

    // Si se proporciona una plantilla, verificar que existe y obtener datos
    let plantillaData = null;
    if (plantillaDietaId) {
      plantillaData = await PlantillaDieta.findOne({
        _id: plantillaDietaId,
        $or: [
          { trainerId },
          { is_public: true, estado: 'activa' }
        ],
        isDeleted: false
      });

      if (!plantillaData) {
        return res.status(404).json({
          success: false,
          error: 'Plantilla de dieta no encontrada'
        });
      }

      // Incrementar el contador de usos de la plantilla
      await plantillaData.incrementarUso();
    }

    // Crear objeto nutricionista
    let nutricionistaData = null;
    if (nutricionista) {
      if (nutricionista.trainerId) {
        const nutricionistaTrainer = await Trainer.findById(nutricionista.trainerId);
        if (nutricionistaTrainer) {
          nutricionistaData = {
            nombre: nutricionista.nombre || nutricionistaTrainer.name,
            trainerId: nutricionista.trainerId
          };
        }
      } else if (nutricionista.nombre) {
        nutricionistaData = {
          nombre: nutricionista.nombre
        };
      }
    }

    // Si se usa una plantilla, usar sus datos como base si no se proporcionan
    const dietaData = {
      trainerId,
      clienteId,
      plantillaDietaId: plantillaDietaId || null,
      nombre: nombre || (plantillaData ? plantillaData.name : 'Plan nutricional personalizado'),
      descripcion: descripcion || (plantillaData ? plantillaData.description : ''),
      objetivo: objetivo || (plantillaData ? plantillaData.objective : undefined),
      tipoDieta: tipoDieta || (plantillaData ? plantillaData.dietType : undefined),
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
      duracion: duracion || (plantillaData ? plantillaData.duration_weeks * 7 : 30),
      calorias_objetivo: calorias_objetivo || (plantillaData ? plantillaData.calories : undefined),
      macros_objetivo: macros_objetivo || (plantillaData ? plantillaData.macros : { proteinas: 0, carbohidratos: 0, grasas: 0 }),
      restricciones: restricciones || (plantillaData ? plantillaData.restrictions : []),
      alergenos: alergenos || (plantillaData ? plantillaData.allergens : []),
      peso_inicial: peso_inicial || null,
      peso_actual: peso_actual || peso_inicial || null,
      peso_objetivo: peso_objetivo || null,
      nutricionista: nutricionistaData,
      notas: notas || '',
      estado: estado || 'activo',
      seguimientos: []
    };

    const dieta = await Dieta.create(dietaData);

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');
    await dieta.populate('trainerId', 'name email');
    if (plantillaDietaId) {
      await dieta.populate('plantillaDietaId', 'name objective dietType');
    }

    res.status(201).json({
      success: true,
      data: dieta,
      message: 'Dieta creada correctamente'
    });
  } catch (error) {
    console.error('Error creating dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear la dieta',
      details: error.message
    });
  }
};

// @desc    Update dieta
// @route   PUT /api/dietas/:id
// @access  Private
export const updateDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      objetivo,
      tipoDieta,
      fechaInicio,
      duracion,
      calorias_objetivo,
      macros_objetivo,
      restricciones,
      alergenos,
      peso_inicial,
      peso_actual,
      peso_objetivo,
      nutricionista,
      notas,
      estado
    } = req.body;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    // Update fields
    if (nombre) dieta.nombre = nombre;
    if (descripcion !== undefined) dieta.descripcion = descripcion;
    if (objetivo) dieta.objetivo = objetivo;
    if (tipoDieta) dieta.tipoDieta = tipoDieta;
    if (fechaInicio) dieta.fechaInicio = new Date(fechaInicio);
    if (duracion) dieta.duracion = duracion;
    if (calorias_objetivo) dieta.calorias_objetivo = calorias_objetivo;
    if (macros_objetivo) dieta.macros_objetivo = macros_objetivo;
    if (restricciones !== undefined) dieta.restricciones = restricciones;
    if (alergenos !== undefined) dieta.alergenos = alergenos;
    if (peso_inicial !== undefined) dieta.peso_inicial = peso_inicial;
    if (peso_actual !== undefined) dieta.peso_actual = peso_actual;
    if (peso_objetivo !== undefined) dieta.peso_objetivo = peso_objetivo;
    if (notas !== undefined) dieta.notas = notas;
    if (estado) dieta.estado = estado;

    // Actualizar nutricionista si se proporciona
    if (nutricionista) {
      if (nutricionista.trainerId) {
        const nutricionistaTrainer = await Trainer.findById(nutricionista.trainerId);
        if (nutricionistaTrainer) {
          dieta.nutricionista = {
            nombre: nutricionista.nombre || nutricionistaTrainer.name,
            trainerId: nutricionista.trainerId
          };
        }
      } else if (nutricionista.nombre) {
        dieta.nutricionista = {
          nombre: nutricionista.nombre
        };
      }
    }

    dieta.ultimaActualizacion = new Date();

    await dieta.save();

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');
    await dieta.populate('trainerId', 'name email');
    await dieta.populate('plantillaDietaId', 'name objective dietType');

    res.status(200).json({
      success: true,
      data: dieta,
      message: 'Dieta actualizada correctamente'
    });
  } catch (error) {
    console.error('Error updating dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la dieta',
      details: error.message
    });
  }
};

// @desc    Delete dieta (soft delete)
// @route   DELETE /api/dietas/:id
// @access  Private
export const deleteDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    // Soft delete
    dieta.isDeleted = true;
    await dieta.save();

    res.status(200).json({
      success: true,
      message: 'Dieta eliminada correctamente'
    });
  } catch (error) {
    console.error('Error deleting dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la dieta',
      details: error.message
    });
  }
};

// @desc    Add seguimiento to dieta
// @route   POST /api/dietas/:id/seguimiento
// @access  Private
export const addSeguimiento = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      fecha,
      peso,
      calorias_consumidas,
      macros_consumidos,
      adherencia_dia,
      notas
    } = req.body;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    const seguimientoData = {
      fecha: fecha ? new Date(fecha) : new Date(),
      peso: peso || null,
      calorias_consumidas: calorias_consumidas || 0,
      macros_consumidos: macros_consumidos || { proteinas: 0, carbohidratos: 0, grasas: 0 },
      adherencia_dia: adherencia_dia || 0,
      notas: notas || ''
    };

    await dieta.agregarSeguimiento(seguimientoData);
    await dieta.actualizarAdherencia();
    await dieta.actualizarProgreso();

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');

    res.status(200).json({
      success: true,
      data: dieta,
      message: 'Seguimiento agregado correctamente'
    });
  } catch (error) {
    console.error('Error adding seguimiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar el seguimiento',
      details: error.message
    });
  }
};

// @desc    Update seguimiento in dieta
// @route   PUT /api/dietas/:id/seguimiento/:seguimientoId
// @access  Private
export const updateSeguimiento = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { seguimientoId } = req.params;
    const {
      fecha,
      peso,
      calorias_consumidas,
      macros_consumidos,
      adherencia_dia,
      notas
    } = req.body;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    const seguimiento = dieta.seguimientos.id(seguimientoId);
    if (!seguimiento) {
      return res.status(404).json({
        success: false,
        error: 'Seguimiento no encontrado'
      });
    }

    // Actualizar campos del seguimiento
    if (fecha) seguimiento.fecha = new Date(fecha);
    if (peso !== undefined) seguimiento.peso = peso;
    if (calorias_consumidas !== undefined) seguimiento.calorias_consumidas = calorias_consumidas;
    if (macros_consumidos !== undefined) seguimiento.macros_consumidos = macros_consumidos;
    if (adherencia_dia !== undefined) seguimiento.adherencia_dia = adherencia_dia;
    if (notas !== undefined) seguimiento.notas = notas;

    // Actualizar peso actual si se proporciona
    if (peso !== undefined) {
      dieta.peso_actual = peso;
    }

    dieta.ultimaActualizacion = new Date();

    await dieta.save();
    await dieta.actualizarAdherencia();

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');

    res.status(200).json({
      success: true,
      data: dieta,
      message: 'Seguimiento actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating seguimiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el seguimiento',
      details: error.message
    });
  }
};

// @desc    Delete seguimiento from dieta
// @route   DELETE /api/dietas/:id/seguimiento/:seguimientoId
// @access  Private
export const deleteSeguimiento = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { seguimientoId } = req.params;

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    const seguimiento = dieta.seguimientos.id(seguimientoId);
    if (!seguimiento) {
      return res.status(404).json({
        success: false,
        error: 'Seguimiento no encontrado'
      });
    }

    seguimiento.deleteOne();
    dieta.ultimaActualizacion = new Date();

    await dieta.save();
    await dieta.actualizarAdherencia();

    res.status(200).json({
      success: true,
      message: 'Seguimiento eliminado correctamente'
    });
  } catch (error) {
    console.error('Error deleting seguimiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el seguimiento',
      details: error.message
    });
  }
};

// @desc    Change dieta status
// @route   PATCH /api/dietas/:id/estado
// @access  Private
export const cambiarEstado = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({
        success: false,
        error: 'El estado es requerido'
      });
    }

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    await dieta.cambiarEstado(estado);

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');

    res.status(200).json({
      success: true,
      data: dieta,
      message: `Estado cambiado a ${estado} correctamente`
    });
  } catch (error) {
    console.error('Error changing estado:', error);
    res.status(500).json({
      success: false,
      error: 'Error al cambiar el estado',
      details: error.message
    });
  }
};

// @desc    Update peso in dieta
// @route   PATCH /api/dietas/:id/peso
// @access  Private
export const actualizarPeso = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { peso } = req.body;

    if (!peso) {
      return res.status(400).json({
        success: false,
        error: 'El peso es requerido'
      });
    }

    const dieta = await Dieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!dieta) {
      return res.status(404).json({
        success: false,
        error: 'Dieta no encontrada'
      });
    }

    await dieta.actualizarPeso(peso);

    // Populate para devolver datos completos
    await dieta.populate('clienteId', 'nombre email foto');

    res.status(200).json({
      success: true,
      data: dieta,
      message: 'Peso actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating peso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el peso',
      details: error.message
    });
  }
};

// @desc    Get dietas statistics for a trainer
// @route   GET /api/dietas/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Dieta.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      details: error.message
    });
  }
};

// @desc    Get dietas by client
// @route   GET /api/dietas/cliente/:clienteId
// @access  Private
export const getDietasByCliente = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { clienteId } = req.params;
    const { estado } = req.query;

    // Verificar que el cliente existe y pertenece al trainer
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

    const filters = {};
    if (estado) {
      filters.estado = estado;
    }

    const dietas = await Dieta.findByCliente(clienteId, filters)
      .populate('trainerId', 'name email')
      .populate('plantillaDietaId', 'name objective dietType')
      .sort({ fechaInicio: -1 });

    res.status(200).json({
      success: true,
      data: dietas,
      total: dietas.length
    });
  } catch (error) {
    console.error('Error getting dietas by cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las dietas del cliente',
      details: error.message
    });
  }
};
