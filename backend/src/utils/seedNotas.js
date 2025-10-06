import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Nota from '../models/Nota.model.js';
import Trainer from '../models/Trainer.model.js';
import Cliente from '../models/Cliente.model.js';
import Lead from '../models/Lead.model.js';
import Tarea from '../models/Tarea.model.js';
import Evento from '../models/Evento.model.js';

dotenv.config();

const seedNotas = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Conectado a MongoDB');

    // Buscar el usuario CORE
    const coreTrainer = await Trainer.findOne({ email: 'core@trainerpro.com' });

    if (!coreTrainer) {
      console.error('❌ No se encontró el usuario CORE');
      process.exit(1);
    }

    console.log('✅ Usuario CORE encontrado:', coreTrainer.nombre);

    // Obtener datos relacionados
    const clientes = await Cliente.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(5);

    const leads = await Lead.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(3);

    const tareas = await Tarea.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(3);

    const eventos = await Evento.find({
      trainer: coreTrainer._id,
      isDeleted: false
    }).limit(3);

    console.log(`📋 Datos relacionados encontrados:`);
    console.log(`   Clientes: ${clientes.length}`);
    console.log(`   Leads: ${leads.length}`);
    console.log(`   Tareas: ${tareas.length}`);
    console.log(`   Eventos: ${eventos.length}`);

    // Eliminar notas existentes del trainer CORE
    await Nota.deleteMany({ trainer: coreTrainer._id });
    console.log('🧹 Notas anteriores eliminadas');

    // Crear notas de ejemplo
    const notas = [
      // Notas generales
      {
        titulo: 'Ideas para nuevas clases grupales',
        contenido: 'Considerar implementar:\n- Clase de HIIT los martes y jueves a las 18:00\n- Yoga flow los sábados por la mañana\n- Spinning + Core los viernes\n\nVerificar disponibilidad de instructores y salas.',
        trainer: coreTrainer._id,
        categoria: 'general',
        etiquetas: ['clases', 'programación', 'ideas'],
        color: '#3b82f6',
        fijada: true
      },

      {
        titulo: 'Recordatorio: Renovar equipos',
        contenido: 'Contactar a proveedores para renovar:\n- Mancuernas (varias unidades desgastadas)\n- Esterillas de yoga (comprar 10 nuevas)\n- Bandas elásticas\n\nPresupuesto aprobado: 2.500€',
        trainer: coreTrainer._id,
        categoria: 'recordatorio',
        etiquetas: ['equipamiento', 'mantenimiento'],
        color: '#f59e0b',
        fijada: true,
        recordatorio: {
          activo: true,
          fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
        }
      },

      // Notas relacionadas con clientes
      {
        titulo: 'Progreso María García - Mes 3',
        contenido: 'Excelente evolución:\n✅ Ha perdido 4kg en el último mes\n✅ Mejora notable en fuerza de tren superior\n✅ Muy motivada y constante\n\nPróximos pasos:\n- Aumentar peso en sentadillas\n- Introducir ejercicios pliométricos\n- Evaluar nutrición para fase de definición',
        trainer: coreTrainer._id,
        cliente: clientes[0]?._id,
        categoria: 'seguimiento',
        etiquetas: ['progreso', 'entrenamiento'],
        color: '#10b981'
      },

      {
        titulo: 'Observación: Carlos Rodríguez',
        contenido: 'Nota importante:\n⚠️ Menciona molestias en rodilla derecha durante sentadillas\n⚠️ Revisar técnica y considerar reducir carga\n⚠️ Sugerir consulta con fisioterapeuta si persiste\n\nHa comentado que lleva 2 semanas con esta molestia.',
        trainer: coreTrainer._id,
        cliente: clientes[1]?._id,
        categoria: 'importante',
        etiquetas: ['salud', 'lesiones', 'seguimiento'],
        color: '#ef4444',
        fijada: true
      },

      {
        titulo: 'Feedback positivo - Ana Martínez',
        contenido: 'Ana ha expresado:\n😊 Muy contenta con los resultados\n😊 Le encanta el ambiente del gimnasio\n😊 Quiere contratar sesiones adicionales\n\nPropuesta: Ofrecerle pack de 8 sesiones con descuento del 15%',
        trainer: coreTrainer._id,
        cliente: clientes[2]?._id,
        categoria: 'seguimiento',
        etiquetas: ['feedback', 'satisfacción', 'ventas'],
        color: '#8b5cf6'
      },

      // Notas relacionadas con leads
      {
        titulo: 'Lead interesado: Juan Pérez',
        contenido: 'Contacto telefónico realizado:\n📞 Interesado en entrenamiento personal\n📞 Objetivo: perder peso (aprox 15kg)\n📞 Disponibilidad: tardes de lunes a viernes\n📞 Presupuesto: 150-200€/mes\n\nAcciones:\n- Enviar propuesta de plan personalizado\n- Agendar sesión de prueba gratuita\n- Hacer seguimiento en 3 días',
        trainer: coreTrainer._id,
        lead: leads[0]?._id,
        categoria: 'seguimiento',
        etiquetas: ['ventas', 'captación', 'seguimiento'],
        color: '#06b6d4'
      },

      {
        titulo: 'Seguimiento lead corporativo',
        contenido: 'Empresa TechCorp contactó para clases grupales:\n🏢 50 empleados potenciales\n🏢 Quieren 3 clases semanales en horario de mediodía\n🏢 Presupuesto: 1.000€/mes\n\nPróxima reunión: Jueves 10:00 AM\nPreparar: Propuesta comercial, disponibilidad de instructores',
        trainer: coreTrainer._id,
        lead: leads[1]?._id,
        categoria: 'importante',
        etiquetas: ['corporativo', 'ventas', 'b2b'],
        color: '#8b5cf6',
        fijada: true
      },

      // Notas relacionadas con tareas
      {
        titulo: 'Preparación taller técnicas de levantamiento',
        contenido: 'Para el taller del próximo sábado:\n\n📋 Material necesario:\n- Proyector y presentación\n- Barra olímpica y discos\n- Mancuernas variadas\n- Colchonetas\n\n📋 Contenido a cubrir:\n- Sentadilla profunda\n- Peso muerto\n- Press de banca\n- Técnicas de respiración\n- Prevención de lesiones\n\n👥 Confirmados: 12 asistentes',
        trainer: coreTrainer._id,
        tarea: tareas[0]?._id,
        categoria: 'general',
        etiquetas: ['taller', 'educación', 'evento'],
        color: '#f59e0b'
      },

      {
        titulo: 'Checklist evaluaciones mensuales',
        contenido: 'Evaluaciones físicas pendientes este mes:\n\n✅ María García - Completada\n✅ Ana Martínez - Completada\n⏳ Juan López - Programada 15/10\n⏳ Laura Fernández - Programada 18/10\n⏳ Carlos Rodríguez - Pendiente de agendar\n\nRecordar: Actualizar fichas y enviar informes a clientes',
        trainer: coreTrainer._id,
        tarea: tareas[1]?._id,
        categoria: 'recordatorio',
        etiquetas: ['evaluaciones', 'seguimiento'],
        color: '#06b6d4'
      },

      // Notas relacionadas con eventos
      {
        titulo: 'Detalles Open Day',
        contenido: 'Planificación del día de puertas abiertas:\n\n🎯 Objetivos:\n- Captar 20+ leads\n- Convertir 5+ clientes nuevos\n- Mejorar visibilidad de marca\n\n📅 Actividades:\n- 10:00 - Clase demo de spinning\n- 11:30 - Clase demo de yoga\n- 13:00 - Demostración entrenamiento funcional\n- Todo el día: Tours por instalaciones\n- Todo el día: Asesorías gratuitas\n\n🎁 Promociones:\n- 50% dto. primera mensualidad\n- Sesión personal gratis\n- Pack bienvenida (botella + toalla)',
        trainer: coreTrainer._id,
        evento: eventos[0]?._id,
        categoria: 'importante',
        etiquetas: ['marketing', 'evento', 'captación'],
        color: '#f59e0b',
        fijada: true
      },

      // Notas de observación
      {
        titulo: 'Tendencias y observaciones',
        contenido: 'Patrones observados en el último mes:\n\n📈 Incremento de interés en:\n- Clases de yoga (+30%)\n- Entrenamientos funcionales (+25%)\n- Nutrición deportiva\n\n📉 Menor demanda en:\n- Clases de spinning (-15%)\n- Entrenamientos de fuerza tradicional\n\nAcciones sugeridas:\n- Ampliar horarios de yoga\n- Crear taller de nutrición\n- Renovar programa de spinning',
        trainer: coreTrainer._id,
        categoria: 'observacion',
        etiquetas: ['análisis', 'tendencias', 'estrategia'],
        color: '#8b5cf6'
      },

      // Nota archivada
      {
        titulo: 'Planificación trimestre anterior',
        contenido: 'Objetivos Q3 2024:\n✅ Aumentar clientes en 20% - LOGRADO (23%)\n✅ Lanzar 2 nuevas clases - LOGRADO\n✅ Mejorar retención - LOGRADO (del 75% al 82%)\n\nLecciones aprendidas:\n- Las clases de tarde tienen más demanda\n- Los programas personalizados aumentan la retención\n- El marketing digital funciona mejor que el tradicional',
        trainer: coreTrainer._id,
        categoria: 'general',
        etiquetas: ['planificación', 'objetivos', 'resultados'],
        color: '#6b7280',
        archivada: true
      }
    ];

    // Insertar notas
    const createdNotas = await Nota.insertMany(notas);
    console.log(`✅ ${createdNotas.length} notas creadas exitosamente`);

    // Mostrar resumen
    console.log('\n📋 RESUMEN DE NOTAS CREADAS:');
    console.log('================================');

    const finalNotas = await Nota.find({ trainer: coreTrainer._id })
      .populate('cliente', 'nombre')
      .populate('lead', 'nombre')
      .populate('tarea', 'titulo')
      .populate('evento', 'titulo');

    // Estadísticas
    const porCategoria = {};
    const fijadas = finalNotas.filter(n => n.fijada && !n.archivada).length;
    const archivadas = finalNotas.filter(n => n.archivada).length;
    const activas = finalNotas.filter(n => !n.archivada && !n.isDeleted).length;

    finalNotas.forEach(nota => {
      porCategoria[nota.categoria] = (porCategoria[nota.categoria] || 0) + 1;
    });

    console.log(`\n📊 Estadísticas:`);
    console.log(`   Total notas: ${finalNotas.length}`);
    console.log(`   Activas: ${activas}`);
    console.log(`   Fijadas: ${fijadas}`);
    console.log(`   Archivadas: ${archivadas}`);

    console.log(`\n📂 Por categoría:`);
    Object.entries(porCategoria).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });

    console.log('\n📌 Notas fijadas:');
    finalNotas.filter(n => n.fijada && !n.archivada).forEach(nota => {
      const relacion = nota.cliente?.nombre || nota.lead?.nombre || nota.tarea?.titulo || nota.evento?.titulo || 'Sin relación';
      console.log(`   - ${nota.titulo} (${relacion})`);
    });

    console.log('\n🔗 Notas con relaciones:');
    const conCliente = finalNotas.filter(n => n.cliente).length;
    const conLead = finalNotas.filter(n => n.lead).length;
    const conTarea = finalNotas.filter(n => n.tarea).length;
    const conEvento = finalNotas.filter(n => n.evento).length;

    console.log(`   Con cliente: ${conCliente}`);
    console.log(`   Con lead: ${conLead}`);
    console.log(`   Con tarea: ${conTarea}`);
    console.log(`   Con evento: ${conEvento}`);

    console.log('\n✅ Seed de notas completado exitosamente!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al crear notas:', error);
    process.exit(1);
  }
};

seedNotas();
