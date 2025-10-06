import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tarea from '../models/Tarea.model.js';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';

dotenv.config();

const seedTareas = async () => {
  try {
    console.log('🌱 Iniciando seed de tareas...');

    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Obtener el trainer CORE
    const coreTrainer = await Trainer.findOne({ email: 'core@trainerpro.com' });
    if (!coreTrainer) {
      console.error('❌ No se encontró el trainer CORE');
      process.exit(1);
    }
    console.log(`✅ Trainer CORE encontrado: ${coreTrainer.name}`);

    // Obtener algunos clientes del trainer
    const clientes = await Cliente.find({
      trainerId: coreTrainer._id,
      isDeleted: false
    }).limit(3);

    // Eliminar tareas existentes del trainer
    await Tarea.deleteMany({ trainerId: coreTrainer._id });
    console.log('🗑️  Tareas anteriores eliminadas');

    // Tareas de ejemplo
    const tareasData = [
      {
        trainerId: coreTrainer._id,
        titulo: 'Llamar a María para seguimiento de rutina',
        descripcion: 'Revisar cómo se siente con la nueva rutina de piernas y ajustar si es necesario',
        fechaVencimiento: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // En 2 días
        estado: 'pendiente',
        prioridad: 'alta',
        asignadoA: coreTrainer.name,
        clienteId: clientes[0]?._id,
        clienteRelacionado: clientes[0]?.nombre,
        notasAdicionales: 'Mencionar que puede reducir peso si siente dolor',
        etiquetas: ['seguimiento', 'rutina']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Actualizar plan nutricional de Carlos',
        descripcion: 'Aumentar calorías en 200 kcal y ajustar distribución de macros para fase de volumen',
        fechaVencimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Mañana
        estado: 'en progreso',
        prioridad: 'alta',
        asignadoA: coreTrainer.name,
        clienteId: clientes[1]?._id,
        clienteRelacionado: clientes[1]?.nombre,
        notasAdicionales: 'Cliente quiere ganar masa muscular de forma limpia',
        etiquetas: ['nutrición', 'volumen']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Preparar sesión de valoración inicial',
        descripcion: 'Diseñar protocolo de evaluación física para nuevos clientes del mes',
        fechaVencimiento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // En 5 días
        estado: 'pendiente',
        prioridad: 'media',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Incluir tests de fuerza, resistencia cardiovascular y composición corporal',
        etiquetas: ['valoración', 'nuevos-clientes']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Enviar recordatorio de pago a Ana',
        descripcion: 'Recordar que la mensualidad vence en 3 días',
        fechaVencimiento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // En 3 días
        estado: 'pendiente',
        prioridad: 'media',
        asignadoA: coreTrainer.name,
        clienteId: clientes[2]?._id,
        clienteRelacionado: clientes[2]?.nombre,
        etiquetas: ['facturación', 'pago']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Crear contenido para redes sociales',
        descripcion: 'Preparar 5 posts para Instagram sobre mitos del fitness',
        fechaVencimiento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // En 1 semana
        estado: 'pendiente',
        prioridad: 'baja',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Incluir imágenes y videos cortos para mayor engagement',
        etiquetas: ['marketing', 'redes-sociales']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Renovar certificación de primeros auxilios',
        descripcion: 'Inscribirse en curso de recertificación antes de que expire',
        fechaVencimiento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // En 2 semanas
        estado: 'pendiente',
        prioridad: 'media',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Certificación actual expira el próximo mes',
        etiquetas: ['certificación', 'formación']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Revisar progreso mensual de todos los clientes',
        descripcion: 'Analizar métricas de todos los clientes activos y generar reporte',
        fechaVencimiento: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // En 10 días
        estado: 'pendiente',
        prioridad: 'alta',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Identificar clientes que necesiten ajustes en su plan',
        etiquetas: ['análisis', 'reporte']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Comprar material deportivo nuevo',
        descripcion: 'Adquirir bandas elásticas, kettlebells y colchonetas adicionales',
        fechaVencimiento: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // En 6 días
        estado: 'pendiente',
        prioridad: 'baja',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Presupuesto aprobado: $500',
        etiquetas: ['compras', 'equipamiento']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'Tarea completada: Actualizar web personal',
        descripcion: 'Agregar testimonios de clientes y actualizar fotos del gimnasio',
        fechaVencimiento: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días
        fechaCompletada: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Completada hace 1 día
        estado: 'completada',
        prioridad: 'media',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Web actualizada y publicada',
        etiquetas: ['marketing', 'web']
      },
      {
        trainerId: coreTrainer._id,
        titulo: 'URGENTE: Reunión con proveedor de suplementos',
        descripcion: 'Negociar descuentos para clientes y revisar nuevo catálogo',
        fechaVencimiento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Mañana
        estado: 'en progreso',
        prioridad: 'alta',
        asignadoA: coreTrainer.name,
        notasAdicionales: 'Llevar lista de productos más demandados',
        etiquetas: ['reunión', 'proveedores']
      }
    ];

    // Crear las tareas
    const tareasCreadas = await Tarea.insertMany(tareasData);
    console.log(`✅ ${tareasCreadas.length} tareas creadas exitosamente`);

    // Mostrar estadísticas
    const stats = await Tarea.getStatsByTrainer(coreTrainer._id);
    console.log('\n📊 Estadísticas de tareas:');
    console.log(`   Total: ${stats.total}`);
    console.log(`   Pendientes: ${stats.pendientes}`);
    console.log(`   En Progreso: ${stats.enProgreso}`);
    console.log(`   Completadas: ${stats.completadas}`);
    console.log(`   Vencidas: ${stats.vencidas}`);
    console.log(`   Urgentes: ${stats.urgentes}`);

    console.log('\n✨ Seed de tareas completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed de tareas:', error);
    process.exit(1);
  }
};

seedTareas();
