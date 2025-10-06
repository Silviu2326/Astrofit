import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import clientRoutes from './client.routes.js';
import trainerRoutes from './trainer.routes.js';
import clienteRoutes from './cliente.routes.js';
import leadRoutes from './lead.routes.js';
import tareaRoutes from './tarea.routes.js';
import segmentoRoutes from './segmento.routes.js';
import eventoRoutes from './evento.routes.js';
import notaRoutes from './nota.routes.js';
import ejercicioRoutes from './ejercicio.routes.js';
import plantillaEntrenamientoRoutes from './plantillaEntrenamiento.routes.js';
import entrenamientoRoutes from './entrenamiento.routes.js';
import plantillaDietaRoutes from './plantillaDieta.routes.js';
import dietaRoutes from './dieta.routes.js';
import recetaRoutes from './receta.routes.js';
import facturaRoutes from './factura.routes.js';
import gastoRoutes from './gasto.routes.js';
import presupuestoRoutes from './presupuesto.routes.js';
import tasaImpuestoRoutes from './tasaImpuesto.routes.js';
import calculoImpuestoRoutes from './calculoImpuesto.routes.js';
import declaracionTrimestralRoutes from './declaracionTrimestral.routes.js';
import retencionIRPFRoutes from './retencionIRPF.routes.js';
import historialImpuestoRoutes from './historialImpuesto.routes.js';
import exencionImpuestoRoutes from './exencionImpuesto.routes.js';
import otroImpuestoRoutes from './otroImpuesto.routes.js';

const router = express.Router();

// API version and info
router.get('/', (req, res) => {
  res.json({
    message: 'Astrofit API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      clients: '/api/clients',
      trainers: '/api/trainers',
      clientes: '/api/clientes',
      leads: '/api/leads',
      tareas: '/api/tareas',
      segmentos: '/api/segmentos',
      eventos: '/api/eventos',
      notas: '/api/notas',
      ejercicios: '/api/ejercicios',
      plantillasEntrenamiento: '/api/plantillas-entrenamiento',
      entrenamientos: '/api/entrenamientos',
      plantillasDietas: '/api/plantillas-dietas',
      dietas: '/api/dietas',
      recetas: '/api/recetas',
      facturas: '/api/facturas',
      gastos: '/api/gastos',
      presupuestos: '/api/presupuestos',
      tasasImpuesto: '/api/tasas-impuesto',
      calculosImpuesto: '/api/calculos-impuesto',
      declaracionesTrimestrales: '/api/declaraciones-trimestrales',
      retencionesIRPF: '/api/retenciones-irpf',
      historialImpuestos: '/api/historial-impuestos',
      exencionesImpuesto: '/api/exenciones-impuesto',
      otrosImpuestos: '/api/otros-impuestos'
    }
  });
});

// Route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/trainers', trainerRoutes);
router.use('/clientes', clienteRoutes);
router.use('/leads', leadRoutes);
router.use('/tareas', tareaRoutes);
router.use('/segmentos', segmentoRoutes);
router.use('/eventos', eventoRoutes);
router.use('/notas', notaRoutes);
router.use('/ejercicios', ejercicioRoutes);
router.use('/plantillas-entrenamiento', plantillaEntrenamientoRoutes);
router.use('/entrenamientos', entrenamientoRoutes);
router.use('/plantillas-dietas', plantillaDietaRoutes);
router.use('/dietas', dietaRoutes);
router.use('/recetas', recetaRoutes);
router.use('/facturas', facturaRoutes);
router.use('/gastos', gastoRoutes);
router.use('/presupuestos', presupuestoRoutes);
router.use('/tasas-impuesto', tasaImpuestoRoutes);
router.use('/calculos-impuesto', calculoImpuestoRoutes);
router.use('/declaraciones-trimestrales', declaracionTrimestralRoutes);
router.use('/retenciones-irpf', retencionIRPFRoutes);
router.use('/historial-impuestos', historialImpuestoRoutes);
router.use('/exenciones-impuesto', exencionImpuestoRoutes);
router.use('/otros-impuestos', otroImpuestoRoutes);

export default router;
